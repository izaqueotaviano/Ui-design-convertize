# Conjunto de ícones Convertize — desenho sólido e geométrico, grade de 24 px.
# Segue as ilustrações de comércio: blocos com cantos arredondados, barras grossas
# e um único detalhe de destaque por ícone.
#   (sem classe)  forma sólida, cor do texto
#   class="s"     barra em traço grosso (setas, chevrons, x, +)
#   class="j"     forma sólida com cantos suavizados
#   class="a"     detalhe de destaque: tom claro por padrão, laranja em contexto de destaque
import math


def _n(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def rr(x, y, w, h, r):
    """Retângulo arredondado como subcaminho (para somar furos com evenodd)."""
    return (f"M{_n(x + r)} {_n(y)}H{_n(x + w - r)}A{_n(r)} {_n(r)} 0 0 1 {_n(x + w)} {_n(y + r)}"
            f"V{_n(y + h - r)}A{_n(r)} {_n(r)} 0 0 1 {_n(x + w - r)} {_n(y + h)}"
            f"H{_n(x + r)}A{_n(r)} {_n(r)} 0 0 1 {_n(x)} {_n(y + h - r)}"
            f"V{_n(y + r)}A{_n(r)} {_n(r)} 0 0 1 {_n(x + r)} {_n(y)}Z")


def ci(cx, cy, r):
    return (f"M{_n(cx - r)} {_n(cy)}A{_n(r)} {_n(r)} 0 1 0 {_n(cx + r)} {_n(cy)}"
            f"A{_n(r)} {_n(r)} 0 1 0 {_n(cx - r)} {_n(cy)}Z")


def poly(pts):
    return "M" + "L".join(f"{_n(x)} {_n(y)}" for x, y in pts) + "Z"


def band(pts, w):
    """Contorno de uma polilinha grossa (junções em quina), usado para recortar
    traços dentro de uma forma sólida — o check do círculo, os ponteiros do relógio."""
    h = w / 2
    segs = []
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        L = math.hypot(x1 - x0, y1 - y0)
        segs.append((-(y1 - y0) / L, (x1 - x0) / L))
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        if i == 0:
            nx, ny, k = *segs[0], h
        elif i == len(pts) - 1:
            nx, ny, k = *segs[-1], h
        else:
            (ax, ay), (bx, by) = segs[i - 1], segs[i]
            mx, my = ax + bx, ay + by
            ml = math.hypot(mx, my)
            nx, ny = mx / ml, my / ml
            k = h / (nx * bx + ny * by)
        left.append((x + nx * k, y + ny * k))
        right.append((x - nx * k, y - ny * k))
    return poly(left + right[::-1])


def cross(cx, cy, e, w, deg=45):
    h = w / 2
    base = [(h, -e), (h, -h), (e, -h), (e, h), (h, h), (h, e),
            (-h, e), (-h, h), (-e, h), (-e, -h), (-h, -h), (-h, -e)]
    c, s = math.cos(math.radians(deg)), math.sin(math.radians(deg))
    return poly([(cx + x * c - y * s, cy + x * s + y * c) for x, y in base])


def spark(cx, cy, r, k=0.16):
    """Brilho de quatro pontas."""
    d = r * k
    return (f"M{_n(cx)} {_n(cy - r)}Q{_n(cx + d)} {_n(cy - d)} {_n(cx + r)} {_n(cy)}"
            f"Q{_n(cx + d)} {_n(cy + d)} {_n(cx)} {_n(cy + r)}"
            f"Q{_n(cx - d)} {_n(cy + d)} {_n(cx - r)} {_n(cy)}"
            f"Q{_n(cx - d)} {_n(cy - d)} {_n(cx)} {_n(cy - r)}Z")


def P(*parts, cls=None, **attrs):
    """Um <path>; com mais de um subcaminho usa evenodd, e os internos viram furos."""
    a = f' class="{cls}"' if cls else ""
    a += "".join(f' {k.replace("_", "-")}="{v}"' for k, v in attrs.items())
    rule = ' fill-rule="evenodd"' if len(parts) > 1 else ""
    return f'<path{a}{rule} d="{"".join(parts)}"/>'


def R(x, y, w, h, r, cls=None):
    a = f' class="{cls}"' if cls else ""
    return f'<rect{a} x="{_n(x)}" y="{_n(y)}" width="{_n(w)}" height="{_n(h)}" rx="{_n(r)}"/>'


def C(cx, cy, r, cls=None):
    a = f' class="{cls}"' if cls else ""
    return f'<circle{a} cx="{_n(cx)}" cy="{_n(cy)}" r="{_n(r)}"/>'


def arc_arrow(cx, cy, r, a0, a1, cls=None):
    """Arco grosso no sentido horário com ponta triangular no fim (automação)."""
    t0, t1 = math.radians(a0), math.radians(a1)
    x0, y0 = cx + r * math.cos(t0), cy + r * math.sin(t0)
    x1, y1 = cx + r * math.cos(t1), cy + r * math.sin(t1)
    tx, ty = -math.sin(t1), math.cos(t1)
    nx, ny = math.cos(t1), math.sin(t1)
    tip = (x1 + tx * 3.4, y1 + ty * 3.4)
    b1 = (x1 + nx * 3.1, y1 + ny * 3.1)
    b2 = (x1 - nx * 3.1, y1 - ny * 3.1)
    big = 1 if (a1 - a0) % 360 > 180 else 0
    s = "s a" if cls == "a" else "s"
    j = "j a" if cls == "a" else "j"
    return (f'<path class="{s}" d="M{_n(x0)} {_n(y0)}A{_n(r)} {_n(r)} 0 {big} 1 {_n(x1)} {_n(y1)}"/>'
            + P(poly([tip, b1, b2]), cls=j))


def G(cls, *children, **attrs):
    a = "".join(f' {k}="{v}"' for k, v in attrs.items())
    return f'<g class="{cls}"{a}>' + "".join(children) + "</g>" if cls else f"<g{a}>" + "".join(children) + "</g>"


# Seta horizontal para a direita; as demais direções giram o mesmo desenho.
_ARROW = '<path class="s" d="M4 12h9.5"/>' + P("M12.6 5.8 19.3 12l-6.7 6.2Z", cls="j")
_THUMB = R(3, 10, 4.6, 10.5, 1.6, "a") + P(
    "M9.2 10.3 12.3 4a1.9 1.9 0 0 1 3.5 1.3L15.2 9h3.9a2.1 2.1 0 0 1 2 2.6l-1.4 6.8"
    "a2.6 2.6 0 0 1-2.6 2.1H9.2Z")
_EYE = "M12 5c4.6 0 8.1 3 9.8 6.3a1.5 1.5 0 0 1 0 1.4C20.1 16 16.6 19 12 19s-8.1-3-9.8-6.3a1.5 1.5 0 0 1 0-1.4C3.9 8 7.4 5 12 5Z"
_Q = [(12 + 2.7 * math.cos(math.radians(a)), 9.9 + 2.7 * math.sin(math.radians(a)))
      for a in range(180, 400, 22)] + [(12.1, 13), (12.1, 14.4)]

ICONS = {
    # Ações e direção
    "search": C(10.5, 10.5, 4.8, "a") + P(ci(10.5, 10.5, 7.6), ci(10.5, 10.5, 4.8))
              + '<path class="s" stroke-width="3" d="m16.4 16.4 4.1 4.1"/>',
    "plus": '<path class="s" d="M12 5v14M5 12h14"/>',
    "minus": '<path class="s" d="M5 12h14"/>',
    "x": '<path class="s" d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    "check": '<path class="s" d="m5 12.5 4.5 4.5L19 7.5"/>',
    "chev-down": '<path class="s" d="m6 9.5 6 6 6-6"/>',
    "chev-up": '<path class="s" d="m6 14.5 6-6 6 6"/>',
    "chev-left": '<path class="s" d="m14.5 6-6 6 6 6"/>',
    "chev-right": '<path class="s" d="m9.5 6 6 6-6 6"/>',
    "arrow-right": _ARROW,
    "arrow-left": G("", _ARROW, transform="rotate(180 12 12)"),
    "arrow-up": G("", _ARROW, transform="rotate(-90 12 12)"),
    "arrow-down": G("", _ARROW, transform="rotate(90 12 12)"),
    "arrow-up-right": '<path class="s" d="M6 18 15.5 8.5"/>' + P("M9.6 5.5h8.9v8.9Z", cls="j"),
    "sort": '<path class="s" d="M8 19.5V9"/>' + P("M3.8 9.4 8 4.4l4.2 5Z", cls="j")
            + '<path class="s a" d="M16 4.5V15"/>' + P("M11.8 14.6h8.4L16 19.6Z", cls="j a"),
    "menu": '<path class="s" d="M4 6.5h16M4 12h16M4 17.5h10"/>',
    "sidebar": R(3, 4, 6, 16, 2.5) + R(11, 4, 10, 16, 2.5, "a"),
    "home": P("M3.5 10.9a2 2 0 0 1 .7-1.5l6.5-5.6a2 2 0 0 1 2.6 0l6.5 5.6a2 2 0 0 1 .7 1.5V19"
              "a2 2 0 0 1-2 2h-3.9v-5.2a1.3 1.3 0 0 0-1.3-1.3h-2.6a1.3 1.3 0 0 0-1.3 1.3V21H5.5"
              "a2 2 0 0 1-2-2Z") + R(10.6, 16.4, 2.8, 4.6, 1, "a"),
    "more": C(5, 12, 2) + C(12, 12, 2) + C(19, 12, 2),
    "more-v": C(12, 5, 2) + C(12, 12, 2) + C(12, 19, 2),
    "filter": P("M4 5.2h16a.8.8 0 0 1 .6 1.3l-6.1 7.1v5.6a1 1 0 0 1-.6.9l-2.8 1.3a.8.8 0 0 1-1.1-.7v-7.1"
                "L3.4 6.5A.8.8 0 0 1 4 5.2Z"),
    "sliders": G("a", '<path class="s" stroke-width="2.2" d="M4 7h16M4 17h16"/>')
               + C(15, 7, 3.1) + C(9, 17, 3.1),
    "refresh": arc_arrow(12, 12, 7.3, 190, 300) + arc_arrow(12, 12, 7.3, 10, 120, "a"),
    "external": R(3, 6, 15, 15, 3.2, "a") + '<path class="s" d="M10.5 13.5 17.6 6.4"/>'
                + P("M13.4 3.3h7.3v7.3Z", cls="j"),
    "download": '<path class="s" d="M12 3.8v7.4"/>' + P("M7.6 10h8.8L12 15Z", cls="j")
                + R(3.5, 18, 17, 3, 1.5, "a"),
    "upload": '<path class="s" d="M12 8.5v6.7"/>' + P("M12 3.6 16.4 8.6H7.6Z", cls="j")
              + R(3.5, 18, 17, 3, 1.5, "a"),
    "copy": R(3, 3, 12.5, 12.5, 3, "a") + R(8.5, 8.5, 12.5, 12.5, 3),
    "edit": P("M14.9 4.6a2.1 2.1 0 0 1 3 0l1.5 1.5a2.1 2.1 0 0 1 0 3L9.3 19.2l-4.8 1.2a.7.7 0 0 1-.85-.85"
              "L4.8 14.7Z", band([(13.5, 7), (17, 10.5)], 1.3)) + R(13, 18.6, 7.5, 2.6, 1.3, "a"),
    "trash": P("M9.5 5V4a1.2 1.2 0 0 1 1.2-1.2h2.6A1.2 1.2 0 0 1 14.5 4v1h4.6a1.4 1.4 0 0 1 0 2.8H4.9"
               "a1.4 1.4 0 0 1 0-2.8Z", cls="a")
             + P("M5.6 9.3h12.8l-.9 10a2 2 0 0 1-2 1.9H8.5a2 2 0 0 1-2-1.9Z",
                 rr(9.2, 11.8, 1.8, 6.2, .9), rr(13, 11.8, 1.8, 6.2, .9)),
    "send": P("M4.6 2.9a1 1 0 0 0-1.4 1.2L5.6 12l-2.4 7.9a1 1 0 0 0 1.4 1.2l16.2-8.2a1 1 0 0 0 0-1.8Z",
              rr(7, 11, 6, 2, 1)),
    "paperclip": '<path class="s" stroke-width="2.2" d="m20 11-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8'
                 'a2 2 0 0 1-3-3l7-7"/>',
    "stop": R(6, 6, 12, 12, 3),
    "logout": R(3, 3.5, 10, 17, 3, "a") + '<path class="s" d="M9.5 12h8"/>'
              + P("M16.2 7.6 20.6 12l-4.4 4.4Z", cls="j"),
    "wand": '<path class="s" stroke-width="3" d="M4.5 19.5 13 11"/>' + P(spark(17, 7, 4.6), cls="a"),
    "sparkle": P(spark(10.5, 13.5, 7.8)) + P(spark(18.6, 5.2, 3.2), cls="a"),
    "zap": P("M13.2 2.6 4.6 13.4a.7.7 0 0 0 .5 1.1H11l-1 6.9 8.6-10.9a.7.7 0 0 0-.5-1.1H12.2Z", cls="j"),

    # Estado e feedback
    "info": P(ci(12, 12, 9.5), rr(10.85, 10.3, 2.3, 6.9, 1.15), ci(12, 7.7, 1.35)),
    "alert": P("M10.2 4.3a2.1 2.1 0 0 1 3.6 0l7.8 13.5a2.1 2.1 0 0 1-1.8 3.2H4.2a2.1 2.1 0 0 1-1.8-3.2Z",
               rr(10.85, 8.8, 2.3, 6.2, 1.15), ci(12, 17.6, 1.3)),
    "check-circle": P(ci(12, 12, 9.5), band([(7.6, 12.3), (10.6, 15.2), (16.6, 9.2)], 2.3)),
    "x-circle": P(ci(12, 12, 9.5), cross(12, 12, 4.6, 2.3)),
    "help": P(ci(12, 12, 9.5), band(_Q, 2.2), ci(12.1, 17.2, 1.3)),
    "bell": P("M12 3a6 6 0 0 1 6 6v4.2l1.6 2.4a1 1 0 0 1-.8 1.5H5.2a1 1 0 0 1-.8-1.5L6 13.2V9a6 6 0 0 1 6-6Z")
            + C(12, 19.9, 2.1, "a"),
    "heart": P("M12 20.3c-.3 0-.6-.1-.8-.3C7.6 17.1 3.5 13.7 3.5 9.4A4.6 4.6 0 0 1 8.1 4.8c1.6 0 3 .8 3.9 2.1"
               ".9-1.3 2.3-2.1 3.9-2.1a4.6 4.6 0 0 1 4.6 4.6c0 4.3-4.1 7.7-7.7 10.6-.2.2-.5.3-.8.3Z"),
    "star": P("m12 3.5 2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.85l-5.25 2.75 1-5.8L3.5 9.7l5.9-.9Z", cls="j"),
    "thumb-up": _THUMB,
    "thumb-down": G("", _THUMB, transform="rotate(180 12 12)"),
    "eye": P(_EYE, ci(12, 12, 4.1)) + C(12, 12, 2.2),
    "eye-off": G("a", P(_EYE, ci(12, 12, 4.1)), C(12, 12, 2.2)) + '<path class="s" d="M4 3.5 20 20.5"/>',
    "lock": '<path class="s a" d="M8 10V7.8a4 4 0 0 1 8 0V10"/>'
            + P(rr(4.5, 10, 15, 11, 3.2), rr(10.8, 13.3, 2.4, 4.4, 1.2)),
    "shield": P("M11.2 2.8a2 2 0 0 1 1.6 0l6 2.5a1.9 1.9 0 0 1 1.2 1.8V12c0 4.4-3 7.7-7.1 9.3a2.4 2.4 0 0 1-1.8 0"
                "C7 19.7 4 16.4 4 12V7.1a1.9 1.9 0 0 1 1.2-1.8Z",
                band([(8.7, 12.1), (11, 14.4), (15.4, 10)], 2.1)),
    "clock": P(ci(12, 12, 9.5), band([(12, 6.8), (12, 12.3), (15.6, 14.3)], 2.2)),
    "sun": C(12, 12, 4.6) + '<path class="s a" d="M12 2.5v1.8M12 19.7v1.8M2.5 12h1.8M19.7 12h1.8M5.3 5.3'
                            'l1.3 1.3M17.4 17.4l1.3 1.3M5.3 18.7l1.3-1.3M17.4 6.6l1.3-1.3"/>',
    "moon": P("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z") + P(spark(18, 5.5, 2.6), cls="a"),

    # Pessoas e conversa
    "user": C(12, 7.5, 4.2) + P("M4 19.3A8 8 0 0 1 12 13.6a8 8 0 0 1 8 5.7 1.5 1.5 0 0 1-1.5 1.7H5.5"
                                "A1.5 1.5 0 0 1 4 19.3Z", cls="a"),
    "users": G("a", C(16.6, 7.4, 3), P("M17 13.1a5.5 5.5 0 0 1 4.8 5.4 1.5 1.5 0 0 1-1.5 1.5h-2.9"
                                         "a8 8 0 0 0-2.6-6.6 5.4 5.4 0 0 1 2.2-.3Z"))
             + C(9, 8, 3.6) + P("M2.5 19.2A6.5 6.5 0 0 1 9 13.5a6.5 6.5 0 0 1 6.5 5.7 1.6 1.6 0 0 1-1.6 1.8"
                                "H4.1a1.6 1.6 0 0 1-1.6-1.8Z"),
    "chat": P("M8 3.5h9a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6.6l-4.8 3.6a1 1 0 0 1-1.6-.8V7.5a4 4 0 0 1 4-4Z",
              rr(7.5, 8, 9, 2.2, 1.1), rr(7.5, 11.8, 5.5, 2.2, 1.1)),
    "mail": P(rr(2.5, 4.5, 19, 15, 3.5), band([(6.2, 8.8), (12, 12.9), (17.8, 8.8)], 2)),
    "phone": P("M6.2 3.5h2.4a1.2 1.2 0 0 1 1.1.8l1.3 3.6a1.2 1.2 0 0 1-.4 1.4L9 10.4a11.5 11.5 0 0 0 4.6 4.6"
               "l1.1-1.6a1.2 1.2 0 0 1 1.4-.4l3.6 1.3a1.2 1.2 0 0 1 .8 1.1v2.4a2.7 2.7 0 0 1-2.9 2.7"
               "C10.3 20 4 13.7 3.5 6.4A2.7 2.7 0 0 1 6.2 3.5Z")
             + '<path class="s a" stroke-width="2" d="M14.6 3.6a6.2 6.2 0 0 1 5.8 5.8"/>',
    "headset": '<path class="s a" d="M4.5 12.5v-1a7.5 7.5 0 0 1 15 0v1"/>'
               + R(2.5, 11.5, 5, 8, 2) + R(16.5, 11.5, 5, 8, 2)
               + '<path class="s" stroke-width="2" d="M19 19.5c0 1.2-1 2-2.2 2H13.5"/>',

    # Organização e arquivos
    "grid": R(3, 3, 8, 8, 2.2) + R(13, 3, 8, 8, 2.2, "a") + R(3, 13, 8, 8, 2.2) + R(13, 13, 8, 8, 2.2),
    "list": G("a", R(3, 4.6, 3.5, 3.5, 1), R(3, 10.25, 3.5, 3.5, 1), R(3, 15.9, 3.5, 3.5, 1))
            + R(9, 5, 12, 2.7, 1.35) + R(9, 10.65, 12, 2.7, 1.35) + R(9, 16.3, 8, 2.7, 1.35),
    "layers": G("a", '<path class="s" stroke-width="2.2" d="m4 13.2 8 4.2 8-4.2M4 17.2l8 4.2 8-4.2"/>')
              + P("M11.1 3.4a2 2 0 0 1 1.8 0l7.3 3.8a1 1 0 0 1 0 1.8l-7.3 3.8a2 2 0 0 1-1.8 0L3.8 9"
                  "a1 1 0 0 1 0-1.8Z"),
    "calendar": '<path class="s" d="M8 3.2v3.5M16 3.2v3.5"/>'
                + P(rr(3, 5.5, 18, 15.5, 3.5), rr(5.7, 10.7, 12.6, 7.6, 1.6)) + R(13.3, 12.7, 3.2, 3.2, .8, "a"),
    "image": P(rr(2.5, 4, 19, 16, 3.5), rr(5, 6.5, 14, 11, 1.5))
             + P("M5 17.5 9.8 11.8a1 1 0 0 1 1.5 0l3.2 3.8 1.4-1.4a1 1 0 0 1 1.4 0L19 15.9v1.6Z")
             + C(15.3, 9.6, 1.7, "a"),
    "file": P("M7 2.5h5.5v5a2 2 0 0 0 2 2h5V19a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 19V5A2.5 2.5 0 0 1 7 2.5Z",
              rr(8, 13, 8, 2.2, 1.1), rr(8, 16.6, 5, 2.2, 1.1)) + P("M14 2.9 19.1 8H15a1 1 0 0 1-1-1Z", cls="a"),
    "folder": P("M2.5 6.5a3 3 0 0 1 3-3h3.6a2 2 0 0 1 1.5.7l2 2.3Z", cls="a") + R(2.5, 8, 19, 12.5, 3),
    "percent": '<path class="s a" d="M18.5 5.5 5.5 18.5"/>' + C(7, 7, 2.8) + C(17, 17, 2.8),
    "pin": P("M12 2.5a7.5 7.5 0 0 1 7.5 7.5c0 5-5.2 9.6-6.6 10.8a1.4 1.4 0 0 1-1.8 0C9.7 19.6 4.5 15 4.5 10"
             "A7.5 7.5 0 0 1 12 2.5Z", ci(12, 10, 2.8)),
    "globe": C(12, 12, 8.6, "a") + '<circle class="s" stroke-width="2.3" cx="12" cy="12" r="8.6"/>'
             + '<ellipse class="s" stroke-width="1.9" cx="12" cy="12" rx="3.4" ry="8.6"/>'
             + '<path class="s" stroke-width="1.9" d="M3.4 12h17.2"/>',
    "qr": P(rr(3, 3, 7.5, 7.5, 2), rr(5.25, 5.25, 3, 3, .7)) + P(rr(13.5, 3, 7.5, 7.5, 2), rr(15.75, 5.25, 3, 3, .7))
          + P(rr(3, 13.5, 7.5, 7.5, 2), rr(5.25, 15.75, 3, 3, .7))
          + G("a", R(13.5, 13.5, 3, 3, .8), R(18, 13.5, 3, 3, .8), R(15.75, 18, 3, 3, .8)),
    "barcode": R(3, 4.5, 2.6, 15, .8) + R(7.2, 4.5, 1.4, 15, .7) + R(10.2, 4.5, 2.8, 15, .8)
               + R(14.6, 4.5, 1.4, 15, .7) + R(17.6, 4.5, 3.4, 15, .8, "a"),
    "monitor": R(2.5, 3.5, 19, 13, 3) + R(7.5, 18.5, 9, 2.6, 1.3, "a"),
    "card": P(rr(2, 4.5, 20, 15, 3.5), rr(5, 8, 5, 3.6, 1), rr(5, 14.2, 8, 2.2, 1.1)),
    "gift": P("M12 7.5c-1-2.5-2.8-4-4.3-3.6-1.4.4-1.2 2.4.3 3.6ZM12 7.5c1-2.5 2.8-4 4.3-3.6 1.4.4 1.2 2.4-.3 3.6Z",
              cls="a")
            + R(2.5, 8, 8.5, 4, 1.5) + R(13, 8, 8.5, 4, 1.5) + R(4, 13, 7, 8, 1.5) + R(13, 13, 7, 8, 1.5),

    # Operação (das ilustrações de comércio)
    "analytics": R(3, 13, 5, 8, 1.6) + R(9.5, 8.5, 5, 12.5, 1.6) + R(16, 3, 5, 18, 1.6, "a"),
    "trend": '<path class="s" d="M3.5 17.5 9 12l3.5 3.5 4.8-4.8"/>' + P("M14.4 5.5h6.1v6.1Z", cls="j a"),
    "catalog": R(3, 3, 8, 9.5, 2.2) + R(13, 3, 8, 9.5, 2.2, "a")
               + R(3, 15, 8, 2.6, 1.3) + R(3, 18.6, 5, 2.6, 1.3) + R(13, 15, 8, 2.6, 1.3) + R(13, 18.6, 5, 2.6, 1.3),
    "store": R(3, 3.5, 5, 8.5, 1.6) + R(9.5, 3.5, 5, 8.5, 1.6) + R(16, 3.5, 5, 8.5, 1.6)
             + R(4.8, 11, 1.4, 4, 0) + R(11.3, 11, 1.4, 4, 0) + R(17.8, 11, 1.4, 4, 0)
             + R(3, 14.5, 18, 6.5, 2.2, "a"),
    "cart": '<path class="s" stroke-width="2.3" d="M2.5 4h1.8a1.2 1.2 0 0 1 1.2.9L8 15.5h10"/>'
            + P("M6.3 6.5h14a.9.9 0 0 1 .9 1.1l-1.4 5.4a2 2 0 0 1-1.9 1.5H8.5Z")
            + G("a", C(9, 19.6, 1.9), C(17.5, 19.6, 1.9)),
    "bag": '<path class="s a" d="M8.5 7.5V7a3.5 3.5 0 0 1 7 0v.5"/>' + R(3.5, 7.5, 17, 13.5, 3.2),
    "box": R(2.5, 3.5, 19, 4.5, 1.8, "a")
           + P("M4 9.5h16v9A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5Z", rr(9.5, 12, 5, 2.4, 1.2)),
    "tag": P("M3 5a2 2 0 0 1 2-2h6.2a2 2 0 0 1 1.4.6l8.3 8.3a2 2 0 0 1 0 2.8l-6.2 6.2a2 2 0 0 1-2.8 0L3.6 12.6"
             "a2 2 0 0 1-.6-1.4Z", ci(8, 8, 1.9)),
    "truck": R(2, 5, 12.5, 11, 2.5) + P("M16 8.5h2.6a2 2 0 0 1 1.6.8l1.4 1.9a2 2 0 0 1 .4 1.2V15a1 1 0 0 1-1 1H16Z",
                                        cls="a") + C(6.5, 18.6, 2.3) + C(17.5, 18.6, 2.3),
    "return": '<path class="s" d="M6.5 9h8a5.5 5.5 0 0 1 0 11H10"/>' + P("M8.8 4.4 3.8 9l5 4.6Z", cls="j"),
    "plug": '<path class="s" stroke-width="3" d="M9.5 6H7a2.5 2.5 0 0 0-2.5 2.5v7A2.5 2.5 0 0 0 7 18h2.5"/>'
            + '<path class="s a" stroke-width="3" d="M14.5 6H17a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 18h-2.5"/>'
            + R(8.5, 10.5, 7, 3, 1.5),
}


# Ícones da interface: vêm da biblioteca Convertize no jsDelivr, referenciados por link
# (nunca copiados para o projeto). Lista de nomes: ICON_CDN + "/../icons.json".
# O conjunto desenhado acima (ICONS) fica só na sidebar.
ICON_CDN = "https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/"
CDN_NAMES = {
    "search": "search", "plus": "add", "minus": "minus", "x": "x", "check": "check",
    "chev-down": "chevron-down", "chev-up": "chevron-up", "chev-left": "chevron-left", "chev-right": "chevron-right",
    "arrow-right": "arrow-right", "arrow-left": "arrow-left", "arrow-up": "arrow-up", "arrow-down": "arrow-down",
    "arrow-up-right": "arrow-up-right", "sort": "arrows-sort", "menu": "menu-2", "sidebar": "layout-sidebar",
    "home": "home", "bag": "shopping-bag", "users": "users", "user": "user-circle", "sliders": "adjustments-horizontal",
    "bell": "bell", "heart": "heart", "star": "star", "trash": "trash", "edit": "pencil", "copy": "copy",
    "download": "download", "upload": "upload", "filter": "filter", "more": "dots", "more-v": "dots-vertical",
    "eye": "eye", "eye-off": "eye-off", "info": "info-circle", "alert": "alert-triangle",
    "check-circle": "circle-check", "x-circle": "circle-x", "help": "help-circle", "calendar": "calendar",
    "clock": "clock", "mail": "mail", "lock": "lock", "logout": "logout", "send": "send", "paperclip": "paperclip",
    "chat": "message-circle", "grid": "layout-grid", "list": "list", "sun": "sun", "moon": "moon",
    "refresh": "refresh", "external": "external-link", "image": "photo", "file": "file-text", "folder": "folder",
    "sparkle": "sparkles", "percent": "percentage", "pin": "map-pin", "stop": "player-stop",
    "thumb-up": "thumb-up", "thumb-down": "thumb-down", "phone": "phone", "globe": "world", "shield": "shield-check",
    "gift": "gift", "qr": "qrcode", "barcode": "barcode", "layers": "stack-2", "wand": "wand",
    "analytics": "chart-bar", "trend": "trending-up", "headset": "headset", "zap": "bolt", "cart": "cart",
    "catalog": "category", "return": "arrow-back-up", "truck": "truck", "box": "package", "tag": "tag",
    "plug": "plug", "store": "building-store", "monitor": "device-desktop", "card": "credit-card-2",
}
