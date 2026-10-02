#!/usr/bin/env python3
"""Cópia da documentação para publicar como artifact, com os ícones da biblioteca embutidos.

O visualizador de artifacts não carrega imagens do jsDelivr, então só esta cópia leva os SVGs
dentro da página. O repositório e o kit continuam usando apenas os links.

Uso: python3 publish.py <clone de izaqueotaviano/icons> <arquivo de saída> [pasta com os SVGs do site]
     (git clone --depth 1 https://github.com/izaqueotaviano/icons.git /tmp/icons)
"""
import re, sys, json, urllib.parse
ROOT = __import__('os').path.dirname(__import__('os').path.abspath(__file__))
ICONS_DIR, OUT = sys.argv[1], sys.argv[2]
# Pasta opcional com os SVGs do site (convertize.com.br/wp-content/uploads/...), para os Segmentos
SITE_DIR = sys.argv[3] if len(sys.argv) > 3 else None
sys.path.insert(0, ROOT + '/src')
from icons import ICON_CDN, CDN_NAMES
src = open(ROOT + '/dist/convertize-design-system.html').read()
names = set(re.findall(re.escape(ICON_CDN) + r'([a-z0-9-]+)\.svg', src)) | set(CDN_NAMES.values())
def uri(n):
    s = open(f'{ICONS_DIR}/svg/{n}.svg').read()
    s = re.sub(r'<\?xml.*?\?>|<!--.*?-->|<metadata.*?</metadata>|<sodipodi:namedview.*?/>|<defs[^>]*/>', '', s, flags=re.S)
    s = re.sub(r'\s(style|id|version|xmlns:\w+|\w+:docname|inkscape:[\w-]+|sodipodi:[\w-]+|ns\d:[\w-]+)="[^"]*"', '', s)
    s = re.sub(r'>\s+<', '><', s).strip()
    s = re.sub(r'<svg([^>]*?)\sfill="none"', r'<svg\1', s, count=1).replace('<svg ', '<svg fill="#000" ', 1)
    return 'data:image/svg+xml,' + urllib.parse.quote(s, safe="=:/-.,")
data = {n: uri(n) for n in sorted(names)}
out = re.sub(re.escape(ICON_CDN) + r'([a-z0-9-]+)\.svg', lambda m: data[m.group(1)], src)
old = "var iconUrl = function (name) { return ICON_CDN + (CDN_NAMES[name] || name) + '.svg'; };"
assert old in out
out = out.replace(old, "var ICON_DATA = " + json.dumps(data) +
  ";\n  var iconUrl = function (name) { var n = CDN_NAMES[name] || name; return ICON_DATA[n] || ICON_CDN + n + '.svg'; };")
if SITE_DIR:
    def site(m):
        f = __import__('os').path.join(SITE_DIR, m.group(1) + '.svg')
        if not __import__('os').path.exists(f):
            print('ícone do site não encontrado:', m.group(1)); return m.group(0)
        return 'data:image/svg+xml,' + urllib.parse.quote(open(f).read().strip(), safe="=:/-.,")
    out = re.sub(r'https://convertize\.com\.br/wp-content/uploads/\d{4}/\d{2}/([a-z0-9-]+)\.svg', site, out)
print('links do site restantes:', out.count('convertize.com.br/wp-content'))
open(OUT, 'w').write(out)
print(len(names), 'ícones embutidos;', len(out)//1024, 'KB; links restantes:', out.count('@main/svg/'))
