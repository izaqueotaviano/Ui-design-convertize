#!/usr/bin/env python3
"""Deixa uma página que usa o Convertize Design System pronta para virar artifact no claude.ai.

O visualizador de artifacts só carrega scripts de alguns CDNs e CSS só do Google Fonts;
imagens do jsDelivr também são bloqueadas. Este script:
  1. troca <link ...convertize.css> por <style> com o CSS do kit;
  2. troca <script src=...convertize.js> pelo script do kit embutido;
  3. baixa cada ícone da biblioteca Convertize usado na página (e os que o JS do kit usa)
     e o embute como data URI, inclusive para os ícones criados em tempo de execução;
  4. tira doctype/html/head/body, que o artifact já fornece.

  5. embute como data URI as imagens locais (src="...webp/png/jpg/svg"), procurando ao lado da
     página e em assets/ da skill.

Uso: python3 make_artifact.py entrada.html saida.html [--icons nome1,nome2] [--icons-dir CLONE]
  --icons      ícones que o seu JS escolhe em tempo de execução (nome vindo de variável)
  --icons-dir  clone local de izaqueotaviano/icons, se a rede não alcançar o jsDelivr
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
ICON_CDN = "https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/"
MIRRORS = [ICON_CDN, "https://raw.githubusercontent.com/izaqueotaviano/icons/main/svg/"]


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def fetch_icon(name, icons_dir):
    if icons_dir:
        p = os.path.join(icons_dir, "svg", name + ".svg")
        if os.path.exists(p):
            return read(p)
    for base in MIRRORS:
        try:
            with urllib.request.urlopen(base + name + ".svg", timeout=20) as r:
                return r.read().decode("utf-8")
        except Exception:
            continue
    return None


def to_data_uri(svg):
    s = re.sub(r"<\?xml.*?\?>|<!--.*?-->|<metadata.*?</metadata>|<sodipodi:namedview.*?/>|<defs[^>]*/>", "", svg, flags=re.S)
    s = re.sub(r'\s(style|id|version|xmlns:\w+|\w+:docname|inkscape:[\w-]+|sodipodi:[\w-]+|ns\d:[\w-]+)="[^"]*"', "", s)
    s = re.sub(r">\s+<", "><", s).strip()
    # a máscara usa a forma; o preenchimento precisa ser opaco
    s = re.sub(r'<svg([^>]*?)\sfill="none"', r"<svg\1", s, count=1).replace("<svg ", '<svg fill="#000" ', 1)
    return "data:image/svg+xml," + urllib.parse.quote(s, safe="=:/-.,")


def main():
    args = sys.argv[1:]
    icons_dir, extra = None, []
    if "--icons" in args:
        i = args.index("--icons")
        extra = [x.strip() for x in args[i + 1].split(",") if x.strip()]
        del args[i:i + 2]
    if "--icons-dir" in args:
        i = args.index("--icons-dir")
        icons_dir = args[i + 1]
        del args[i:i + 2]
    if len(args) != 2:
        sys.exit(__doc__)
    src, dest = args
    html = read(src)
    css = read(os.path.join(ASSETS, "convertize.css"))
    js = read(os.path.join(ASSETS, "convertize.js"))

    # 1 e 2: kit embutido
    html, n_css = re.subn(r'<link[^>]+href="[^"]*convertize\.css"[^>]*>', lambda m: "<style>\n" + css + "\n</style>", html)
    html, n_js = re.subn(r'<script[^>]+src="[^"]*convertize\.js"[^>]*>\s*</script>', lambda m: "<script>\n" + js.replace("</script", "<\\/script") + "\n</script>", html)
    if not n_css:
        html = "<style>\n" + css + "\n</style>\n" + html
    if not n_js:
        html = html + "\n<script>\n" + js.replace("</script", "<\\/script") + "\n</script>\n"

    # 3: ícones
    m = re.search(r"CDN_NAMES = (\{.*?\});", js)
    cdn_names = json.loads(m.group(1)) if m else {}
    used = set(re.findall(re.escape(ICON_CDN) + r"([a-z0-9-]+)\.svg", html))
    for call in extra + re.findall(r"icon\(\s*['\"]([a-z0-9-]+)['\"]", html, flags=re.I):
        used.add(cdn_names.get(call, call))
    for key in re.findall(r"\bicon\s*:\s*['\"]([a-z0-9-]+)['\"]", html):  # itens de createCmd
        used.add(cdn_names.get(key, key))
    used |= set(cdn_names.values())
    data, missing = {}, []
    for name in sorted(used):
        svg = fetch_icon(name, icons_dir)
        if svg:
            data[name] = to_data_uri(svg)
        else:
            missing.append(name)
    html = re.sub(re.escape(ICON_CDN) + r"([a-z0-9-]+)\.svg", lambda m: data.get(m.group(1), m.group(0)), html)
    old = "var iconUrl = function (name) { return ICON_CDN + (CDN_NAMES[name] || name) + '.svg'; };"
    if old in html:
        html = html.replace(old, "var ICON_DATA = " + json.dumps(data) + ";\n  var iconUrl = function (name) { var n = CDN_NAMES[name] || name; return ICON_DATA[n] || ICON_CDN + n + '.svg'; };")

    # 5: imagens locais
    def embed_img(m):
        ref = m.group(2)
        if re.match(r"(https?:|data:|//)", ref):
            return m.group(0)
        for base in (os.path.dirname(os.path.abspath(src)), ASSETS, os.path.join(ASSETS, "img")):
            for cand in (os.path.join(base, ref), os.path.join(base, os.path.basename(ref))):
                if os.path.isfile(cand):
                    ext = cand.rsplit(".", 1)[-1].lower()
                    mime = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "svg": "image/svg+xml"}.get(ext)
                    if mime:
                        import base64
                        return m.group(1) + "data:" + mime + ";base64," + base64.b64encode(open(cand, "rb").read()).decode() + m.group(3)
        print("imagem não encontrada:", ref)
        return m.group(0)
    html = re.sub(r'(src=")([^"]+\.(?:webp|png|jpe?g|svg))(")', embed_img, html)

    # 4: sem doctype/html/head/body (o artifact já tem)
    html = re.sub(r"<!doctype[^>]*>|</?html[^>]*>|</?head>|</?body[^>]*>", "", html, flags=re.I)
    html = re.sub(r'<meta (charset|name="viewport")[^>]*>\n?', "", html)

    with open(dest, "w", encoding="utf-8") as f:
        f.write(html.strip() + "\n")
    print(f"{dest}: kit embutido, {len(data)} ícones embutidos, {len(html) // 1024} KB")
    if missing:
        print("sem acesso a estes ícones (ficaram por link e não aparecem no artifact):", ", ".join(missing))


if __name__ == "__main__":
    main()
