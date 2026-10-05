#!/usr/bin/env python3
"""Gera dist/convertize-design-system.html (a documentação, arquivo único) e
dist/kit/ + dist/convertize-kit.zip (o pacote para usar em outros projetos).

Marcadores aceitos nas páginas (src/pages/*.html):
  {{i:nome}} / {{i:nome:classe}}  ícone da biblioteca Convertize (link jsDelivr)
  {{si:nome}}                     ícone da sidebar (sprite desenhado; automático em cz-side-item)
  {{img:arquivo}}                 imagem de src/assets como data URI
  {{svg:caminho}}                 SVG de src/assets embutido inline
  {{logo}} / {{sym}}              logotipo e símbolo Convertize (wordmark em currentColor)
"""
import base64, glob, json, os, re, shutil, sys, zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
ASSETS = os.path.join(SRC, "assets")
sys.path.insert(0, SRC)
from icons import ICONS, ICON_CDN, CDN_NAMES  # noqa: E402


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def clean_svg(txt):
    txt = re.sub(r"<\?xml.*?\?>", "", txt, flags=re.S)
    txt = re.sub(r"<!--.*?-->", "", txt, flags=re.S)
    txt = re.sub(r"<title>.*?</title>", "", txt, flags=re.S)
    txt = re.sub(r'\s(id|data-name)="[^"]*"', "", txt)
    return re.sub(r">\s+<", "><", txt).strip()


def brand_svg(name, cls):
    txt = clean_svg(read(os.path.join(ASSETS, name)))
    txt = re.sub(r"<defs>.*?</defs>", "", txt, flags=re.S)
    txt = txt.replace('class="st0"', 'fill="currentColor"').replace('class="st1"', 'fill="#ff5e2c"')
    if name == "symbol.svg":
        txt = txt.replace('fill="currentColor"', 'fill="#ff5e2c"')
    return txt.replace("<svg ", f'<svg class="{cls}" role="img" aria-label="Convertize" ', 1)


SITE_ASSETS = None  # pasta de destino quando o build gera o site em arquivos separados


def data_uri(name):
    p = os.path.join(ASSETS, name)
    if SITE_ASSETS:
        dest = os.path.join(SITE_ASSETS, name)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy(p, dest)
        return "assets/" + name
    ext = name.rsplit(".", 1)[-1]
    mime = {"webp": "image/webp", "png": "image/png", "svg": "image/svg+xml", "jpg": "image/jpeg"}[ext]
    return f"data:{mime};base64," + base64.b64encode(open(p, "rb").read()).decode()


def cdn_icon(name, klass="i"):
    """Ícone da biblioteca Convertize por link (nome do kit ou nome direto da biblioteca)."""
    url = ICON_CDN + CDN_NAMES.get(name, name) + ".svg"
    return f'<span class="{klass}" style="--icon:url({url})" aria-hidden="true"></span>'


def mark_sidebar(html):
    """Ícones dentro das sidebars continuam com o conjunto desenhado ({{si:}})."""
    html = re.sub(r'<button class="cz-sidebar-foot".*?</button>', lambda m: m.group(0).replace("{{i:", "{{si:"), html, flags=re.S)
    return "\n".join(l.replace("{{i:", "{{si:") if re.search(r"cz-side-item|cz-sidebar-head", l) else l
                     for l in html.split("\n"))


def expand(html):
    html = html.replace("{{logo}}", brand_svg("primary.svg", "logo"))
    html = html.replace("{{logo-inverse}}", brand_svg("inverse.svg", "logo"))
    html = html.replace("{{sym}}", brand_svg("symbol.svg", "sym"))

    def icon(m):
        side, name, cls = m.group(1), m.group(2), m.group(3)
        klass = f"i {cls}" if cls else "i"
        if side:  # sidebar: conjunto desenhado, pelo sprite
            if name not in ICONS:
                raise SystemExit(f"ícone de sidebar desconhecido: {name}")
            return f'<svg class="{klass}" aria-hidden="true"><use href="#i-{name}"/></svg>'
        return cdn_icon(name, klass)

    html = mark_sidebar(html)
    html = re.sub(r"\{\{(s)?i:([a-z0-9-]+)(?::([a-z0-9 -]+))?\}\}", icon, html)
    html = re.sub(r"\{\{img:([^}]+)\}\}", lambda m: data_uri(m.group(1)), html)
    html = re.sub(r"\{\{svg:([^}]+)\}\}", lambda m: clean_svg(read(os.path.join(ASSETS, m.group(1)))), html)
    left = re.findall(r"\{\{[^}]+\}\}", html)
    if left:
        raise SystemExit(f"marcadores não resolvidos: {left[:5]}")
    return html


GROUP_ICONS = {
    "Começar": "home", "Fundamentos": "layers", "Ações": "zap", "Formulários": "edit",
    "Navegação": "sidebar", "Feedback": "bell", "Sobreposições": "copy", "Dados": "analytics",
    "Comércio": "cart", "Atendimento": "headset", "Padrões de tela": "grid", "Marca": "image",
}


def sprite():
    syms = "".join(f'<symbol id="i-{k}" viewBox="0 0 24 24">{v}</symbol>' for k, v in ICONS.items())
    return f'<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0" aria-hidden="true">{syms}</svg>'


VERSION = "2.0.0"
BANNER = f"/*! Convertize Design System {VERSION} — https://github.com/izaqueotaviano/ui-design-convertize */\n"


def kit_js(with_sprite=True):
    js = read(os.path.join(SRC, "convertize.js")).replace("__VERSION__", VERSION)
    svg = sprite() if with_sprite else ""
    js = js.replace("'__ICON_CDN__'", json.dumps(ICON_CDN)).replace("'__CDN_NAMES__'", json.dumps(CDN_NAMES, separators=(",", ":")))
    return js.replace("'__SPRITE__'", json.dumps(svg).replace("</", "<\\/"))


def standalone_icon(body):
    """Ícone solto (Figma, e-mail, outro projeto): as classes viram atributos."""
    body = re.sub(r'class="s a"', 'fill="none" stroke="currentColor" opacity=".38"', body)
    body = re.sub(r'class="j a"', 'stroke="currentColor" stroke-width="1.6" opacity=".38"', body)
    body = body.replace('class="s"', 'fill="none" stroke="currentColor"')
    body = body.replace('class="j"', 'stroke="currentColor" stroke-width="1.6"')
    body = body.replace('class="a"', 'opacity=".38"')
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" '
            'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' + body + "</svg>\n")


def build_kit():
    """dist/kit/: o pacote para usar em outros projetos."""
    kit = os.path.join(ROOT, "dist", "kit")
    if os.path.isdir(kit):
        shutil.rmtree(kit)
    os.makedirs(os.path.join(kit, "icons"))
    files = {
        "convertize.css": BANNER + read(os.path.join(SRC, "kit.css")),
        "convertize.js": BANNER + kit_js(),
        "icons.svg": sprite().replace('style="position:absolute;width:0;height:0" aria-hidden="true"', "") + "\n",
        "README.md": read(os.path.join(SRC, "kit", "README.md")).replace("{{version}}", VERSION),
        "starter.html": expand(read(os.path.join(SRC, "kit", "starter.html"))).replace("{{version}}", VERSION),
    }
    for name, body in ICONS.items():
        files[f"icons/{name}.svg"] = standalone_icon(body)
    for rel, txt in files.items():
        with open(os.path.join(kit, rel), "w", encoding="utf-8") as f:
            f.write(txt)
    zpath = os.path.join(ROOT, "dist", "convertize-kit.zip")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for rel in sorted(files):
            info = zipfile.ZipInfo(f"convertize-kit/{rel}", date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, files[rel])
    print(f"{kit} — {len(files) - len(ICONS)} arquivos + {len(ICONS)} ícones; {zpath}")


def balanced_divs(html, start):
    """Blocos <div ...>...</div> completos que começam com `start`."""
    out, i = [], 0
    while True:
        i = html.find(start, i)
        if i < 0:
            return out
        depth, j = 0, i
        for m in re.finditer(r"<div\b|</div>", html[i:]):
            depth += 1 if m.group(0) == "<div" else -1
            if depth == 0:
                j = i + m.end()
                break
        out.append(html[i:j])
        i = j


def component_reference():
    """references/components.md da skill: o markup de cada página da documentação."""
    out = [f"# Componentes — Convertize Design System {VERSION}\n",
           "Markup pronto de cada componente, na ordem da documentação. Ícones da biblioteca vêm por link; "
           "`{{logo}}` indica o SVG de `assets/logo-primary.svg` embutido inline (a palavra usa currentColor). "
           "Imagens de exemplo estão em `assets/img/`.\n",
           "O arquivo é grande: procure a seção pelo índice (`## Grupo › Nome`) ou pela classe (`grep -n 'cz-dialog'`) "
           "em vez de ler tudo. Classes `ds-*` são só da documentação (organizam o exemplo); troque por layout próprio. "
           "Atributos `data-dash`, `data-products-table`, `data-metric-card`, `data-cart`, `data-chat`, `data-segments`, "
           "`data-sidebar-demo`, `data-sb-page` e `data-bm-*` ligam demos da documentação: o visual está no kit, mas a lógica "
           "(dados, cálculos) você escreve no projeto.\n"]
    toc, body = [], []
    for p in sorted(glob.glob(os.path.join(SRC, "pages", "*.html"))):
        for m in re.finditer(r'<section class="ds-page" id="([^"]+)" data-title="([^"]+)" data-group="([^"]+)"[^>]*>(.*?)</section>', read(p), flags=re.S):
            pid, title, group, html = m.groups()
            if group == "Começar":
                continue
            lead = re.search(r'<p class="ds-lead">(.*?)</p>', html, flags=re.S)
            lead = re.sub(r"<[^>]+>", "", lead.group(1)).strip() if lead else ""
            # markup vivo de cada exemplo (completo), mais as sobreposições da página
            snippets = []
            for blk in balanced_divs(html, '<div class="ds-spec'):
                st = re.search(r'<div class="ds-stage[^"]*"[^>]*>', blk)
                cap = re.search(r'<div class="ds-cap"><span>(.*?)</span>', blk, flags=re.S)
                end = blk.rfind('<div class="ds-cap">')
                inner = blk[st.end():end if end > 0 else len(blk)] if st else ""
                if end < 0:
                    inner = re.sub(r"(</div>\s*){2}$", "", inner.strip())
                inner = re.sub(r"</div>\s*$", "", inner.strip())
                if inner and "cz-" in inner:
                    snippets.append(("<!-- " + re.sub(r"<[^>]+>", "", cap.group(1)).strip() + " -->\n" if cap else "") + inner)
            if not snippets and html.count("cz-") > 5:
                # página sem palco de exemplo: o conteúdo inteiro é a tela de exemplo
                body_html = re.sub(r'<p class="ds-crumb">.*?</p>\s*<h1>.*?</h1>\s*<p class="ds-lead">.*?</p>', "", html, flags=re.S)
                body_html = re.sub(r'<script type="text/plain" class="ds-snippet">.*?</script>', "", body_html, flags=re.S)
                body_html = re.sub(r'<div class="cz-scrim.*', "", body_html, flags=re.S)
                body_html = re.sub(r'<div class="ds-scroll"><table class="ds-props">.*?</table></div>|<table class="ds-props">.*?</table>', "", body_html, flags=re.S)
                body_html = re.sub(r"<h2[^>]*>(.*?)</h2>", r"<!-- \1 -->", body_html, flags=re.S)
                body_html = re.sub(r"<p>(.*?)</p>", "", body_html, flags=re.S)
                snippets.append(body_html.strip())
            snippets += [x for x in balanced_divs(html, '<div class="cz-scrim')]
            if group in ("Fundamentos",):
                snippets = [x.replace("<\\/", "</").strip("\n") for x in re.findall(r'<script type="text/plain" class="ds-snippet">(.*?)</script>', html, flags=re.S)]
            if not snippets:
                continue
            toc.append(f"- {group} › [{title}](#{pid})")
            body.append(f'\n<a id="{pid}"></a>\n## {group} › {title}\n\n{lead}\n')
            for sn in snippets:
                sn = mark_sidebar(sn)
                sn = re.sub(r"\{\{img:([^}]+)\}\}", lambda m: "assets/img/" + os.path.basename(m.group(1)), sn)
                sn = re.sub(r"\{\{svg:[^}]+\}\}", "<!-- ilustração da marca -->", sn)
                sn = sn.replace("{{logo-inverse}}", "{{logo-invertido}}")
                sn = re.sub(r"\{\{(s)?i:([a-z0-9-]+)(?::([a-z0-9 -]+))?\}\}",
                            lambda m: (f'<svg class="i{" " + m.group(3) if m.group(3) else ""}" aria-hidden="true"><use href="#i-{m.group(2)}"/></svg>'
                                       if m.group(1) else cdn_icon(m.group(2), "i" + (" " + m.group(3) if m.group(3) else ""))), sn)
                body.append("```html\n" + sn + "\n```\n")
    return "\n".join(out) + "\n## Índice\n\n" + "\n".join(toc) + "\n" + "".join(body)


def build_skill():
    """dist/skill/convertize-design-system/ e o pacote .skill para instalar."""
    base = os.path.join(ROOT, "dist", "skill")
    skill = os.path.join(base, "convertize-design-system")
    if os.path.isdir(skill):
        shutil.rmtree(skill)
    for d in ("assets/img", "references", "scripts"):
        os.makedirs(os.path.join(skill, d))
    kit = os.path.join(ROOT, "dist", "kit")
    texts = {
        "SKILL.md": read(os.path.join(SRC, "skill", "SKILL.md")).replace("{{version}}", VERSION),
        "assets/convertize.css": read(os.path.join(kit, "convertize.css")),
        "assets/convertize.js": read(os.path.join(kit, "convertize.js")),
        "assets/starter.html": read(os.path.join(kit, "starter.html")),
        "assets/logo-primary.svg": brand_svg("primary.svg", "logo").replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1) + "\n",
        "assets/logo-inverse.svg": brand_svg("inverse.svg", "logo").replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1) + "\n",
        "assets/logo-symbol.svg": brand_svg("symbol.svg", "sym").replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ', 1) + "\n",
        "references/api.md": re.sub(r"## Arquivos.*?(?=## Começar)", "", read(os.path.join(kit, "README.md")), flags=re.S)
            .replace("`icons.svg` e `icons/*.svg` trazem esse conjunto da sidebar.", "")
            .replace("A documentação completa, com exemplos vivos de cada componente, está em `convertize-design-system.html`.", "Exemplos de markup de cada componente: `references/components.md`."),
        "references/components.md": component_reference(),
        "scripts/make_artifact.py": read(os.path.join(SRC, "skill", "make_artifact.py")),
    }
    for rel, txt in texts.items():
        with open(os.path.join(skill, rel), "w", encoding="utf-8") as f:
            f.write(txt)
    for img in ("prod-vase.webp", "prod-lamp.webp", "prod-box.webp", "img-retrato.webp", "img-loja.webp"):
        shutil.copy(os.path.join(ASSETS, img), os.path.join(skill, "assets", "img", img))
    zpath = os.path.join(base, "convertize-design-system.skill")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for dirpath, _, names in sorted(os.walk(skill)):
            for n in sorted(names):
                full = os.path.join(dirpath, n)
                info = zipfile.ZipInfo(os.path.relpath(full, base), date_time=(2026, 1, 1, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                z.writestr(info, open(full, "rb").read())
    print(f"{skill} — {len(texts) + 5} arquivos; {zpath}")


def build_site(shell, pages):
    """dist/site/: a documentação em index.html + css/ + js/ + assets/, e dist/ui-convertize-v2.zip."""
    global SITE_ASSETS
    site = os.path.join(ROOT, "dist", "site")
    if os.path.isdir(site):
        shutil.rmtree(site)
    for d in ("css", "js", "assets"):
        os.makedirs(os.path.join(site, d))
    SITE_ASSETS = os.path.join(site, "assets")
    try:
        head, rest = shell.split("<style>\n/*STYLES*/\n</style>", 1)
        rest = re.sub(r"<script>\n/\*KIT\*/\n</script>", '<script src="js/convertize.js"></script>', rest)
        rest = re.sub(r"<script>\n/\*DOCS\*/\n</script>", '<script src="js/docs.js"></script>', rest)
        html = ('<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
                '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
                + head + '<link rel="stylesheet" href="css/convertize.css">\n<link rel="stylesheet" href="css/docs.css">\n'
                + '</head>\n<body>\n' + rest.replace("<!--SPRITE-->", sprite()).replace("<!--PAGES-->", pages) + '\n</body>\n</html>\n')
        html = expand(html)
    finally:
        SITE_ASSETS = None
    files = {
        "index.html": html,
        "css/convertize.css": BANNER + read(os.path.join(SRC, "kit.css")),
        "css/docs.css": read(os.path.join(SRC, "docs.css")),
        "js/convertize.js": BANNER + kit_js(with_sprite=False),
        "js/docs.js": read(os.path.join(SRC, "docs.js")),
        "README.txt": ("UI Convertize V2 — documentação do Convertize Design System " + VERSION + "\n\n"
                       "Abra index.html no navegador. Precisa de internet para as fontes (Google Fonts)\n"
                       "e para os ícones da biblioteca Convertize (jsDelivr). Ícones da sidebar e imagens vêm junto.\n\n"
                       "css/convertize.css e js/convertize.js: o kit (componentes cz-*)\n"
                       "css/docs.css e js/docs.js: só a navegação e as demos desta documentação\n"
                       "assets/: imagens, ilustrações e patterns\n"),
    }
    for rel, txt in files.items():
        with open(os.path.join(site, rel), "w", encoding="utf-8") as f:
            f.write(txt)
    zpath = os.path.join(ROOT, "dist", "ui-convertize-v2.zip")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for dirpath, _, names in sorted(os.walk(site)):
            for n in sorted(names):
                full = os.path.join(dirpath, n)
                info = zipfile.ZipInfo("ui-convertize-v2/" + os.path.relpath(full, site), date_time=(2026, 1, 1, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                z.writestr(info, open(full, "rb").read())
    print(f"{site} — site em arquivos; {zpath} ({os.path.getsize(zpath) // 1024} KB)")


def main():
    pages = "\n".join(read(p) for p in sorted(glob.glob(os.path.join(SRC, "pages", "*.html"))))
    # id vira data-page para o navegador não rolar até a seção ao abrir um link com #
    pages = re.sub(r'<section class="ds-page" id="([^"]+)"', r'<section class="ds-page" data-page="\1"', pages)
    shell = read(os.path.join(SRC, "shell.html"))
    # navegação gerada no build, para aparecer mesmo antes do script rodar
    groups = {}
    for pid, title, group in re.findall(r'<section class="ds-page" data-page="([^"]+)" data-title="([^"]+)" data-group="([^"]+)"', pages):
        groups.setdefault(group, []).append((pid, title))
    nav = "".join(
        f'<div class="ds-nav-group" data-group="{g}"><h2>{g}</h2>'
        + "".join(f'<a href="#{pid}">{title}</a>' for pid, title in links) + "</div>"
        for g, links in groups.items())
    rail = "".join(
        f'<a class="cz-side-item" href="#{links[0][0]}" data-group="{g}" data-tip="{g}">'
        f'{{{{i:{GROUP_ICONS.get(g, "grid")}}}}}<span class="lbl">{g}</span></a>'
        for g, links in groups.items())
    shell = shell.replace("<!--NAV-->", nav).replace("<!--RAIL-->", rail)
    # cabeçalho de cada página agrupado, para ganhar o tratamento de hero
    pages = re.sub(r'(<p class="ds-crumb">.*?</p>\s*<h1>.*?</h1>\s*<p class="ds-lead">.*?</p>)',
                   r'<header class="ds-head">\1</header>', pages, flags=re.S)
    pages = pages.replace(' data-group="Começar" data-keys="home capa início overview" hidden>', ' data-group="Começar" data-keys="home capa início overview">', 1)
    build_site(shell, pages)
    out = (shell
           .replace("/*STYLES*/", read(os.path.join(SRC, "kit.css")) + "\n" + read(os.path.join(SRC, "docs.css")))
           .replace("<!--SPRITE-->", sprite())
           .replace("<!--PAGES-->", pages)
           .replace("/*KIT*/", kit_js(with_sprite=False))
           .replace("/*DOCS*/", read(os.path.join(SRC, "docs.js"))))
    out = expand(out)
    os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
    dest = os.path.join(ROOT, "dist", "convertize-design-system.html")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(out)
    n = pages.count('class="ds-page"')
    print(f"{dest} — {len(out.encode()) / 1024:.0f} KB, {n} páginas")
    build_kit()
    build_skill()


if __name__ == "__main__":
    main()
