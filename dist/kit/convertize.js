/*! Convertize Design System 2.0.0 — https://github.com/izaqueotaviano/ui-design-convertize */
/*!
 * Convertize Design System — convertize.js
 * Comportamento dos componentes cz-*: diálogos, menus, abas, toasts, busca (cz-cmd),
 * calendário, upload, validação e o resto. Sem dependências.
 *
 * Tudo liga sozinho ao carregar a página, inclusive o que for inserido depois (React, Vue,
 * innerHTML): um MutationObserver chama init() de novo. A API fica em window.Convertize.
 * Eventos (todos borbulham, prefixo cz:): cz:theme, cz:menu-pick, cz:select,
 * cz:combo-create, cz:dismiss, cz:date, cz:range, cz:page, cz:step, cz:steps-done,
 * cz:valid (cancelável), cz:rate, cz:cmd-pick, qty.
 */
(function () {
  'use strict';
  var VERSION = '2.0.0';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  // Ícones da biblioteca Convertize, por link no jsDelivr: <span class="i" style="--icon:url(...)"></span>.
  // Aceita o nome do kit (cart, chev-down...) ou qualquer nome de icons.json.
  var ICON_CDN = "https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/", CDN_NAMES = {"search":"search","plus":"add","minus":"minus","x":"x","check":"check","chev-down":"chevron-down","chev-up":"chevron-up","chev-left":"chevron-left","chev-right":"chevron-right","arrow-right":"arrow-right","arrow-left":"arrow-left","arrow-up":"arrow-up","arrow-down":"arrow-down","arrow-up-right":"arrow-up-right","sort":"arrows-sort","menu":"menu-2","sidebar":"layout-sidebar","home":"home","bag":"shopping-bag","users":"users","user":"user-circle","sliders":"adjustments-horizontal","bell":"bell","heart":"heart","star":"star","trash":"trash","edit":"pencil","copy":"copy","download":"download","upload":"upload","filter":"filter","more":"dots","more-v":"dots-vertical","eye":"eye","eye-off":"eye-off","info":"info-circle","alert":"alert-triangle","check-circle":"circle-check","x-circle":"circle-x","help":"help-circle","calendar":"calendar","clock":"clock","mail":"mail","lock":"lock","logout":"logout","send":"send","paperclip":"paperclip","chat":"message-circle","grid":"layout-grid","list":"list","sun":"sun","moon":"moon","refresh":"refresh","external":"external-link","image":"photo","file":"file-text","folder":"folder","sparkle":"sparkles","percent":"percentage","pin":"map-pin","stop":"player-stop","thumb-up":"thumb-up","thumb-down":"thumb-down","phone":"phone","globe":"world","shield":"shield-check","gift":"gift","qr":"qrcode","barcode":"barcode","layers":"stack-2","wand":"wand","analytics":"chart-bar","trend":"trending-up","headset":"headset","zap":"bolt","cart":"cart","catalog":"category","return":"arrow-back-up","truck":"truck","box":"package","tag":"tag","plug":"plug","store":"building-store","monitor":"device-desktop","card":"credit-card-2"};
  var iconUrl = function (name) { return ICON_CDN + (CDN_NAMES[name] || name) + '.svg'; };
  var icon = function (name, cls) { return '<span class="i' + (cls ? ' ' + cls : '') + '" style="--icon:url(' + iconUrl(name) + ')" aria-hidden="true"></span>'; };
  // Ícone da sidebar (conjunto desenhado, no sprite)
  var sideIcon = function (name, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };
  // O sprite da sidebar vem junto com o script e entra no começo do <body>, uma vez só.
  var SPRITE = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"position:absolute;width:0;height:0\" aria-hidden=\"true\"><symbol id=\"i-search\" viewBox=\"0 0 24 24\"><circle class=\"a\" cx=\"10.5\" cy=\"10.5\" r=\"4.8\"/><path fill-rule=\"evenodd\" d=\"M2.9 10.5A7.6 7.6 0 1 0 18.1 10.5A7.6 7.6 0 1 0 2.9 10.5ZM5.7 10.5A4.8 4.8 0 1 0 15.3 10.5A4.8 4.8 0 1 0 5.7 10.5Z\"/><path class=\"s\" stroke-width=\"3\" d=\"m16.4 16.4 4.1 4.1\"/><\/symbol><symbol id=\"i-plus\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M12 5v14M5 12h14\"/><\/symbol><symbol id=\"i-minus\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M5 12h14\"/><\/symbol><symbol id=\"i-x\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M6.5 6.5l11 11M17.5 6.5l-11 11\"/><\/symbol><symbol id=\"i-check\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"m5 12.5 4.5 4.5L19 7.5\"/><\/symbol><symbol id=\"i-chev-down\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"m6 9.5 6 6 6-6\"/><\/symbol><symbol id=\"i-chev-up\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"m6 14.5 6-6 6 6\"/><\/symbol><symbol id=\"i-chev-left\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"m14.5 6-6 6 6 6\"/><\/symbol><symbol id=\"i-chev-right\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"m9.5 6 6 6-6 6\"/><\/symbol><symbol id=\"i-arrow-right\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M4 12h9.5\"/><path class=\"j\" d=\"M12.6 5.8 19.3 12l-6.7 6.2Z\"/><\/symbol><symbol id=\"i-arrow-left\" viewBox=\"0 0 24 24\"><g transform=\"rotate(180 12 12)\"><path class=\"s\" d=\"M4 12h9.5\"/><path class=\"j\" d=\"M12.6 5.8 19.3 12l-6.7 6.2Z\"/><\/g><\/symbol><symbol id=\"i-arrow-up\" viewBox=\"0 0 24 24\"><g transform=\"rotate(-90 12 12)\"><path class=\"s\" d=\"M4 12h9.5\"/><path class=\"j\" d=\"M12.6 5.8 19.3 12l-6.7 6.2Z\"/><\/g><\/symbol><symbol id=\"i-arrow-down\" viewBox=\"0 0 24 24\"><g transform=\"rotate(90 12 12)\"><path class=\"s\" d=\"M4 12h9.5\"/><path class=\"j\" d=\"M12.6 5.8 19.3 12l-6.7 6.2Z\"/><\/g><\/symbol><symbol id=\"i-arrow-up-right\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M6 18 15.5 8.5\"/><path class=\"j\" d=\"M9.6 5.5h8.9v8.9Z\"/><\/symbol><symbol id=\"i-sort\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M8 19.5V9\"/><path class=\"j\" d=\"M3.8 9.4 8 4.4l4.2 5Z\"/><path class=\"s a\" d=\"M16 4.5V15\"/><path class=\"j a\" d=\"M11.8 14.6h8.4L16 19.6Z\"/><\/symbol><symbol id=\"i-menu\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M4 6.5h16M4 12h16M4 17.5h10\"/><\/symbol><symbol id=\"i-sidebar\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"4\" width=\"6\" height=\"16\" rx=\"2.5\"/><rect class=\"a\" x=\"11\" y=\"4\" width=\"10\" height=\"16\" rx=\"2.5\"/><\/symbol><symbol id=\"i-home\" viewBox=\"0 0 24 24\"><path d=\"M3.5 10.9a2 2 0 0 1 .7-1.5l6.5-5.6a2 2 0 0 1 2.6 0l6.5 5.6a2 2 0 0 1 .7 1.5V19a2 2 0 0 1-2 2h-3.9v-5.2a1.3 1.3 0 0 0-1.3-1.3h-2.6a1.3 1.3 0 0 0-1.3 1.3V21H5.5a2 2 0 0 1-2-2Z\"/><rect class=\"a\" x=\"10.6\" y=\"16.4\" width=\"2.8\" height=\"4.6\" rx=\"1\"/><\/symbol><symbol id=\"i-more\" viewBox=\"0 0 24 24\"><circle cx=\"5\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"19\" cy=\"12\" r=\"2\"/><\/symbol><symbol id=\"i-more-v\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"5\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"19\" r=\"2\"/><\/symbol><symbol id=\"i-filter\" viewBox=\"0 0 24 24\"><path d=\"M4 5.2h16a.8.8 0 0 1 .6 1.3l-6.1 7.1v5.6a1 1 0 0 1-.6.9l-2.8 1.3a.8.8 0 0 1-1.1-.7v-7.1L3.4 6.5A.8.8 0 0 1 4 5.2Z\"/><\/symbol><symbol id=\"i-sliders\" viewBox=\"0 0 24 24\"><g class=\"a\"><path class=\"s\" stroke-width=\"2.2\" d=\"M4 7h16M4 17h16\"/><\/g><circle cx=\"15\" cy=\"7\" r=\"3.1\"/><circle cx=\"9\" cy=\"17\" r=\"3.1\"/><\/symbol><symbol id=\"i-refresh\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M4.81 10.73A7.3 7.3 0 0 1 15.65 5.68\"/><path class=\"j\" d=\"M18.59 7.38L17.2 2.99L14.1 8.36Z\"/><path class=\"s a\" d=\"M19.19 13.27A7.3 7.3 0 0 1 8.35 18.32\"/><path class=\"j a\" d=\"M5.41 16.62L6.8 21.01L9.9 15.64Z\"/><\/symbol><symbol id=\"i-external\" viewBox=\"0 0 24 24\"><rect class=\"a\" x=\"3\" y=\"6\" width=\"15\" height=\"15\" rx=\"3.2\"/><path class=\"s\" d=\"M10.5 13.5 17.6 6.4\"/><path class=\"j\" d=\"M13.4 3.3h7.3v7.3Z\"/><\/symbol><symbol id=\"i-download\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M12 3.8v7.4\"/><path class=\"j\" d=\"M7.6 10h8.8L12 15Z\"/><rect class=\"a\" x=\"3.5\" y=\"18\" width=\"17\" height=\"3\" rx=\"1.5\"/><\/symbol><symbol id=\"i-upload\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M12 8.5v6.7\"/><path class=\"j\" d=\"M12 3.6 16.4 8.6H7.6Z\"/><rect class=\"a\" x=\"3.5\" y=\"18\" width=\"17\" height=\"3\" rx=\"1.5\"/><\/symbol><symbol id=\"i-copy\" viewBox=\"0 0 24 24\"><rect class=\"a\" x=\"3\" y=\"3\" width=\"12.5\" height=\"12.5\" rx=\"3\"/><rect x=\"8.5\" y=\"8.5\" width=\"12.5\" height=\"12.5\" rx=\"3\"/><\/symbol><symbol id=\"i-edit\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M14.9 4.6a2.1 2.1 0 0 1 3 0l1.5 1.5a2.1 2.1 0 0 1 0 3L9.3 19.2l-4.8 1.2a.7.7 0 0 1-.85-.85L4.8 14.7ZM13.04 7.46L16.54 10.96L17.46 10.04L13.96 6.54Z\"/><rect class=\"a\" x=\"13\" y=\"18.6\" width=\"7.5\" height=\"2.6\" rx=\"1.3\"/><\/symbol><symbol id=\"i-trash\" viewBox=\"0 0 24 24\"><path class=\"a\" d=\"M9.5 5V4a1.2 1.2 0 0 1 1.2-1.2h2.6A1.2 1.2 0 0 1 14.5 4v1h4.6a1.4 1.4 0 0 1 0 2.8H4.9a1.4 1.4 0 0 1 0-2.8Z\"/><path fill-rule=\"evenodd\" d=\"M5.6 9.3h12.8l-.9 10a2 2 0 0 1-2 1.9H8.5a2 2 0 0 1-2-1.9ZM10.1 11.8H10.1A0.9 0.9 0 0 1 11 12.7V17.1A0.9 0.9 0 0 1 10.1 18H10.1A0.9 0.9 0 0 1 9.2 17.1V12.7A0.9 0.9 0 0 1 10.1 11.8ZM13.9 11.8H13.9A0.9 0.9 0 0 1 14.8 12.7V17.1A0.9 0.9 0 0 1 13.9 18H13.9A0.9 0.9 0 0 1 13 17.1V12.7A0.9 0.9 0 0 1 13.9 11.8Z\"/><\/symbol><symbol id=\"i-send\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M4.6 2.9a1 1 0 0 0-1.4 1.2L5.6 12l-2.4 7.9a1 1 0 0 0 1.4 1.2l16.2-8.2a1 1 0 0 0 0-1.8ZM8 11H12A1 1 0 0 1 13 12V12A1 1 0 0 1 12 13H8A1 1 0 0 1 7 12V12A1 1 0 0 1 8 11Z\"/><\/symbol><symbol id=\"i-paperclip\" viewBox=\"0 0 24 24\"><path class=\"s\" stroke-width=\"2.2\" d=\"m20 11-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7\"/><\/symbol><symbol id=\"i-stop\" viewBox=\"0 0 24 24\"><rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"3\"/><\/symbol><symbol id=\"i-logout\" viewBox=\"0 0 24 24\"><rect class=\"a\" x=\"3\" y=\"3.5\" width=\"10\" height=\"17\" rx=\"3\"/><path class=\"s\" d=\"M9.5 12h8\"/><path class=\"j\" d=\"M16.2 7.6 20.6 12l-4.4 4.4Z\"/><\/symbol><symbol id=\"i-wand\" viewBox=\"0 0 24 24\"><path class=\"s\" stroke-width=\"3\" d=\"M4.5 19.5 13 11\"/><path class=\"a\" d=\"M17 2.4Q17.74 6.26 21.6 7Q17.74 7.74 17 11.6Q16.26 7.74 12.4 7Q16.26 6.26 17 2.4Z\"/><\/symbol><symbol id=\"i-sparkle\" viewBox=\"0 0 24 24\"><path d=\"M10.5 5.7Q11.75 12.25 18.3 13.5Q11.75 14.75 10.5 21.3Q9.25 14.75 2.7 13.5Q9.25 12.25 10.5 5.7Z\"/><path class=\"a\" d=\"M18.6 2Q19.11 4.69 21.8 5.2Q19.11 5.71 18.6 8.4Q18.09 5.71 15.4 5.2Q18.09 4.69 18.6 2Z\"/><\/symbol><symbol id=\"i-zap\" viewBox=\"0 0 24 24\"><path class=\"j\" d=\"M13.2 2.6 4.6 13.4a.7.7 0 0 0 .5 1.1H11l-1 6.9 8.6-10.9a.7.7 0 0 0-.5-1.1H12.2Z\"/><\/symbol><symbol id=\"i-info\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M2.5 12A9.5 9.5 0 1 0 21.5 12A9.5 9.5 0 1 0 2.5 12ZM12 10.3H12A1.15 1.15 0 0 1 13.15 11.45V16.05A1.15 1.15 0 0 1 12 17.2H12A1.15 1.15 0 0 1 10.85 16.05V11.45A1.15 1.15 0 0 1 12 10.3ZM10.65 7.7A1.35 1.35 0 1 0 13.35 7.7A1.35 1.35 0 1 0 10.65 7.7Z\"/><\/symbol><symbol id=\"i-alert\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M10.2 4.3a2.1 2.1 0 0 1 3.6 0l7.8 13.5a2.1 2.1 0 0 1-1.8 3.2H4.2a2.1 2.1 0 0 1-1.8-3.2ZM12 8.8H12A1.15 1.15 0 0 1 13.15 9.95V13.85A1.15 1.15 0 0 1 12 15H12A1.15 1.15 0 0 1 10.85 13.85V9.95A1.15 1.15 0 0 1 12 8.8ZM10.7 17.6A1.3 1.3 0 1 0 13.3 17.6A1.3 1.3 0 1 0 10.7 17.6Z\"/><\/symbol><symbol id=\"i-check-circle\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M2.5 12A9.5 9.5 0 1 0 21.5 12A9.5 9.5 0 1 0 2.5 12ZM6.8 13.13L10.61 16.81L17.41 10.01L15.79 8.39L10.59 13.59L8.4 11.47Z\"/><\/symbol><symbol id=\"i-x-circle\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M2.5 12A9.5 9.5 0 1 0 21.5 12A9.5 9.5 0 1 0 2.5 12ZM16.07 9.56L13.63 12L16.07 14.44L14.44 16.07L12 13.63L9.56 16.07L7.93 14.44L10.37 12L7.93 9.56L9.56 7.93L12 10.37L14.44 7.93Z\"/><\/symbol><symbol id=\"i-help\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M2.5 12A9.5 9.5 0 1 0 21.5 12A9.5 9.5 0 1 0 2.5 12ZM10.38 10.11L10.54 9.31L10.86 8.8L11.36 8.46L11.94 8.32L12.54 8.42L13.06 8.73L13.42 9.21L13.58 9.79L13.53 10.2L11 12.52L11 14.4L13.2 14.4L13.2 13.48L15.61 11.27L15.81 9.63L15.43 8.23L14.56 7.06L13.31 6.31L11.87 6.08L10.45 6.41L9.25 7.25L8.46 8.47L8.22 9.69ZM10.8 17.2A1.3 1.3 0 1 0 13.4 17.2A1.3 1.3 0 1 0 10.8 17.2Z\"/><\/symbol><symbol id=\"i-bell\" viewBox=\"0 0 24 24\"><path d=\"M12 3a6 6 0 0 1 6 6v4.2l1.6 2.4a1 1 0 0 1-.8 1.5H5.2a1 1 0 0 1-.8-1.5L6 13.2V9a6 6 0 0 1 6-6Z\"/><circle class=\"a\" cx=\"12\" cy=\"19.9\" r=\"2.1\"/><\/symbol><symbol id=\"i-heart\" viewBox=\"0 0 24 24\"><path d=\"M12 20.3c-.3 0-.6-.1-.8-.3C7.6 17.1 3.5 13.7 3.5 9.4A4.6 4.6 0 0 1 8.1 4.8c1.6 0 3 .8 3.9 2.1.9-1.3 2.3-2.1 3.9-2.1a4.6 4.6 0 0 1 4.6 4.6c0 4.3-4.1 7.7-7.7 10.6-.2.2-.5.3-.8.3Z\"/><\/symbol><symbol id=\"i-star\" viewBox=\"0 0 24 24\"><path class=\"j\" d=\"m12 3.5 2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.85l-5.25 2.75 1-5.8L3.5 9.7l5.9-.9Z\"/><\/symbol><symbol id=\"i-thumb-up\" viewBox=\"0 0 24 24\"><rect class=\"a\" x=\"3\" y=\"10\" width=\"4.6\" height=\"10.5\" rx=\"1.6\"/><path d=\"M9.2 10.3 12.3 4a1.9 1.9 0 0 1 3.5 1.3L15.2 9h3.9a2.1 2.1 0 0 1 2 2.6l-1.4 6.8a2.6 2.6 0 0 1-2.6 2.1H9.2Z\"/><\/symbol><symbol id=\"i-thumb-down\" viewBox=\"0 0 24 24\"><g transform=\"rotate(180 12 12)\"><rect class=\"a\" x=\"3\" y=\"10\" width=\"4.6\" height=\"10.5\" rx=\"1.6\"/><path d=\"M9.2 10.3 12.3 4a1.9 1.9 0 0 1 3.5 1.3L15.2 9h3.9a2.1 2.1 0 0 1 2 2.6l-1.4 6.8a2.6 2.6 0 0 1-2.6 2.1H9.2Z\"/><\/g><\/symbol><symbol id=\"i-eye\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M12 5c4.6 0 8.1 3 9.8 6.3a1.5 1.5 0 0 1 0 1.4C20.1 16 16.6 19 12 19s-8.1-3-9.8-6.3a1.5 1.5 0 0 1 0-1.4C3.9 8 7.4 5 12 5ZM7.9 12A4.1 4.1 0 1 0 16.1 12A4.1 4.1 0 1 0 7.9 12Z\"/><circle cx=\"12\" cy=\"12\" r=\"2.2\"/><\/symbol><symbol id=\"i-eye-off\" viewBox=\"0 0 24 24\"><g class=\"a\"><path fill-rule=\"evenodd\" d=\"M12 5c4.6 0 8.1 3 9.8 6.3a1.5 1.5 0 0 1 0 1.4C20.1 16 16.6 19 12 19s-8.1-3-9.8-6.3a1.5 1.5 0 0 1 0-1.4C3.9 8 7.4 5 12 5ZM7.9 12A4.1 4.1 0 1 0 16.1 12A4.1 4.1 0 1 0 7.9 12Z\"/><circle cx=\"12\" cy=\"12\" r=\"2.2\"/><\/g><path class=\"s\" d=\"M4 3.5 20 20.5\"/><\/symbol><symbol id=\"i-lock\" viewBox=\"0 0 24 24\"><path class=\"s a\" d=\"M8 10V7.8a4 4 0 0 1 8 0V10\"/><path fill-rule=\"evenodd\" d=\"M7.7 10H16.3A3.2 3.2 0 0 1 19.5 13.2V17.8A3.2 3.2 0 0 1 16.3 21H7.7A3.2 3.2 0 0 1 4.5 17.8V13.2A3.2 3.2 0 0 1 7.7 10ZM12 13.3H12A1.2 1.2 0 0 1 13.2 14.5V16.5A1.2 1.2 0 0 1 12 17.7H12A1.2 1.2 0 0 1 10.8 16.5V14.5A1.2 1.2 0 0 1 12 13.3Z\"/><\/symbol><symbol id=\"i-shield\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M11.2 2.8a2 2 0 0 1 1.6 0l6 2.5a1.9 1.9 0 0 1 1.2 1.8V12c0 4.4-3 7.7-7.1 9.3a2.4 2.4 0 0 1-1.8 0C7 19.7 4 16.4 4 12V7.1a1.9 1.9 0 0 1 1.2-1.8ZM7.96 12.84L11 15.88L16.14 10.74L14.66 9.26L11 12.92L9.44 11.36Z\"/><\/symbol><symbol id=\"i-clock\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M2.5 12A9.5 9.5 0 1 0 21.5 12A9.5 9.5 0 1 0 2.5 12ZM10.9 6.8L10.9 12.95L15.07 15.26L16.13 13.34L13.1 11.65L13.1 6.8Z\"/><\/symbol><symbol id=\"i-sun\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"4.6\"/><path class=\"s a\" d=\"M12 2.5v1.8M12 19.7v1.8M2.5 12h1.8M19.7 12h1.8M5.3 5.3l1.3 1.3M17.4 17.4l1.3 1.3M5.3 18.7l1.3-1.3M17.4 6.6l1.3-1.3\"/><\/symbol><symbol id=\"i-moon\" viewBox=\"0 0 24 24\"><path d=\"M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z\"/><path class=\"a\" d=\"M18 2.9Q18.42 5.08 20.6 5.5Q18.42 5.92 18 8.1Q17.58 5.92 15.4 5.5Q17.58 5.08 18 2.9Z\"/><\/symbol><symbol id=\"i-user\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"7.5\" r=\"4.2\"/><path class=\"a\" d=\"M4 19.3A8 8 0 0 1 12 13.6a8 8 0 0 1 8 5.7 1.5 1.5 0 0 1-1.5 1.7H5.5A1.5 1.5 0 0 1 4 19.3Z\"/><\/symbol><symbol id=\"i-users\" viewBox=\"0 0 24 24\"><g class=\"a\"><circle cx=\"16.6\" cy=\"7.4\" r=\"3\"/><path d=\"M17 13.1a5.5 5.5 0 0 1 4.8 5.4 1.5 1.5 0 0 1-1.5 1.5h-2.9a8 8 0 0 0-2.6-6.6 5.4 5.4 0 0 1 2.2-.3Z\"/><\/g><circle cx=\"9\" cy=\"8\" r=\"3.6\"/><path d=\"M2.5 19.2A6.5 6.5 0 0 1 9 13.5a6.5 6.5 0 0 1 6.5 5.7 1.6 1.6 0 0 1-1.6 1.8H4.1a1.6 1.6 0 0 1-1.6-1.8Z\"/><\/symbol><symbol id=\"i-chat\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M8 3.5h9a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6.6l-4.8 3.6a1 1 0 0 1-1.6-.8V7.5a4 4 0 0 1 4-4ZM8.6 8H15.4A1.1 1.1 0 0 1 16.5 9.1V9.1A1.1 1.1 0 0 1 15.4 10.2H8.6A1.1 1.1 0 0 1 7.5 9.1V9.1A1.1 1.1 0 0 1 8.6 8ZM8.6 11.8H11.9A1.1 1.1 0 0 1 13 12.9V12.9A1.1 1.1 0 0 1 11.9 14H8.6A1.1 1.1 0 0 1 7.5 12.9V12.9A1.1 1.1 0 0 1 8.6 11.8Z\"/><\/symbol><symbol id=\"i-mail\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M6 4.5H18A3.5 3.5 0 0 1 21.5 8V16A3.5 3.5 0 0 1 18 19.5H6A3.5 3.5 0 0 1 2.5 16V8A3.5 3.5 0 0 1 6 4.5ZM5.62 9.62L12 14.12L18.38 9.62L17.22 7.98L12 11.68L6.78 7.98Z\"/><\/symbol><symbol id=\"i-phone\" viewBox=\"0 0 24 24\"><path d=\"M6.2 3.5h2.4a1.2 1.2 0 0 1 1.1.8l1.3 3.6a1.2 1.2 0 0 1-.4 1.4L9 10.4a11.5 11.5 0 0 0 4.6 4.6l1.1-1.6a1.2 1.2 0 0 1 1.4-.4l3.6 1.3a1.2 1.2 0 0 1 .8 1.1v2.4a2.7 2.7 0 0 1-2.9 2.7C10.3 20 4 13.7 3.5 6.4A2.7 2.7 0 0 1 6.2 3.5Z\"/><path class=\"s a\" stroke-width=\"2\" d=\"M14.6 3.6a6.2 6.2 0 0 1 5.8 5.8\"/><\/symbol><symbol id=\"i-headset\" viewBox=\"0 0 24 24\"><path class=\"s a\" d=\"M4.5 12.5v-1a7.5 7.5 0 0 1 15 0v1\"/><rect x=\"2.5\" y=\"11.5\" width=\"5\" height=\"8\" rx=\"2\"/><rect x=\"16.5\" y=\"11.5\" width=\"5\" height=\"8\" rx=\"2\"/><path class=\"s\" stroke-width=\"2\" d=\"M19 19.5c0 1.2-1 2-2.2 2H13.5\"/><\/symbol><symbol id=\"i-grid\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"8\" height=\"8\" rx=\"2.2\"/><rect class=\"a\" x=\"13\" y=\"3\" width=\"8\" height=\"8\" rx=\"2.2\"/><rect x=\"3\" y=\"13\" width=\"8\" height=\"8\" rx=\"2.2\"/><rect x=\"13\" y=\"13\" width=\"8\" height=\"8\" rx=\"2.2\"/><\/symbol><symbol id=\"i-list\" viewBox=\"0 0 24 24\"><g class=\"a\"><rect x=\"3\" y=\"4.6\" width=\"3.5\" height=\"3.5\" rx=\"1\"/><rect x=\"3\" y=\"10.25\" width=\"3.5\" height=\"3.5\" rx=\"1\"/><rect x=\"3\" y=\"15.9\" width=\"3.5\" height=\"3.5\" rx=\"1\"/><\/g><rect x=\"9\" y=\"5\" width=\"12\" height=\"2.7\" rx=\"1.35\"/><rect x=\"9\" y=\"10.65\" width=\"12\" height=\"2.7\" rx=\"1.35\"/><rect x=\"9\" y=\"16.3\" width=\"8\" height=\"2.7\" rx=\"1.35\"/><\/symbol><symbol id=\"i-layers\" viewBox=\"0 0 24 24\"><g class=\"a\"><path class=\"s\" stroke-width=\"2.2\" d=\"m4 13.2 8 4.2 8-4.2M4 17.2l8 4.2 8-4.2\"/><\/g><path d=\"M11.1 3.4a2 2 0 0 1 1.8 0l7.3 3.8a1 1 0 0 1 0 1.8l-7.3 3.8a2 2 0 0 1-1.8 0L3.8 9a1 1 0 0 1 0-1.8Z\"/><\/symbol><symbol id=\"i-calendar\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M8 3.2v3.5M16 3.2v3.5\"/><path fill-rule=\"evenodd\" d=\"M6.5 5.5H17.5A3.5 3.5 0 0 1 21 9V17.5A3.5 3.5 0 0 1 17.5 21H6.5A3.5 3.5 0 0 1 3 17.5V9A3.5 3.5 0 0 1 6.5 5.5ZM7.3 10.7H16.7A1.6 1.6 0 0 1 18.3 12.3V16.7A1.6 1.6 0 0 1 16.7 18.3H7.3A1.6 1.6 0 0 1 5.7 16.7V12.3A1.6 1.6 0 0 1 7.3 10.7Z\"/><rect class=\"a\" x=\"13.3\" y=\"12.7\" width=\"3.2\" height=\"3.2\" rx=\"0.8\"/><\/symbol><symbol id=\"i-image\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M6 4H18A3.5 3.5 0 0 1 21.5 7.5V16.5A3.5 3.5 0 0 1 18 20H6A3.5 3.5 0 0 1 2.5 16.5V7.5A3.5 3.5 0 0 1 6 4ZM6.5 6.5H17.5A1.5 1.5 0 0 1 19 8V16A1.5 1.5 0 0 1 17.5 17.5H6.5A1.5 1.5 0 0 1 5 16V8A1.5 1.5 0 0 1 6.5 6.5Z\"/><path d=\"M5 17.5 9.8 11.8a1 1 0 0 1 1.5 0l3.2 3.8 1.4-1.4a1 1 0 0 1 1.4 0L19 15.9v1.6Z\"/><circle class=\"a\" cx=\"15.3\" cy=\"9.6\" r=\"1.7\"/><\/symbol><symbol id=\"i-file\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M7 2.5h5.5v5a2 2 0 0 0 2 2h5V19a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 19V5A2.5 2.5 0 0 1 7 2.5ZM9.1 13H14.9A1.1 1.1 0 0 1 16 14.1V14.1A1.1 1.1 0 0 1 14.9 15.2H9.1A1.1 1.1 0 0 1 8 14.1V14.1A1.1 1.1 0 0 1 9.1 13ZM9.1 16.6H11.9A1.1 1.1 0 0 1 13 17.7V17.7A1.1 1.1 0 0 1 11.9 18.8H9.1A1.1 1.1 0 0 1 8 17.7V17.7A1.1 1.1 0 0 1 9.1 16.6Z\"/><path class=\"a\" d=\"M14 2.9 19.1 8H15a1 1 0 0 1-1-1Z\"/><\/symbol><symbol id=\"i-folder\" viewBox=\"0 0 24 24\"><path class=\"a\" d=\"M2.5 6.5a3 3 0 0 1 3-3h3.6a2 2 0 0 1 1.5.7l2 2.3Z\"/><rect x=\"2.5\" y=\"8\" width=\"19\" height=\"12.5\" rx=\"3\"/><\/symbol><symbol id=\"i-percent\" viewBox=\"0 0 24 24\"><path class=\"s a\" d=\"M18.5 5.5 5.5 18.5\"/><circle cx=\"7\" cy=\"7\" r=\"2.8\"/><circle cx=\"17\" cy=\"17\" r=\"2.8\"/><\/symbol><symbol id=\"i-pin\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M12 2.5a7.5 7.5 0 0 1 7.5 7.5c0 5-5.2 9.6-6.6 10.8a1.4 1.4 0 0 1-1.8 0C9.7 19.6 4.5 15 4.5 10A7.5 7.5 0 0 1 12 2.5ZM9.2 10A2.8 2.8 0 1 0 14.8 10A2.8 2.8 0 1 0 9.2 10Z\"/><\/symbol><symbol id=\"i-globe\" viewBox=\"0 0 24 24\"><circle class=\"a\" cx=\"12\" cy=\"12\" r=\"8.6\"/><circle class=\"s\" stroke-width=\"2.3\" cx=\"12\" cy=\"12\" r=\"8.6\"/><ellipse class=\"s\" stroke-width=\"1.9\" cx=\"12\" cy=\"12\" rx=\"3.4\" ry=\"8.6\"/><path class=\"s\" stroke-width=\"1.9\" d=\"M3.4 12h17.2\"/><\/symbol><symbol id=\"i-qr\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M5 3H8.5A2 2 0 0 1 10.5 5V8.5A2 2 0 0 1 8.5 10.5H5A2 2 0 0 1 3 8.5V5A2 2 0 0 1 5 3ZM5.95 5.25H7.55A0.7 0.7 0 0 1 8.25 5.95V7.55A0.7 0.7 0 0 1 7.55 8.25H5.95A0.7 0.7 0 0 1 5.25 7.55V5.95A0.7 0.7 0 0 1 5.95 5.25Z\"/><path fill-rule=\"evenodd\" d=\"M15.5 3H19A2 2 0 0 1 21 5V8.5A2 2 0 0 1 19 10.5H15.5A2 2 0 0 1 13.5 8.5V5A2 2 0 0 1 15.5 3ZM16.45 5.25H18.05A0.7 0.7 0 0 1 18.75 5.95V7.55A0.7 0.7 0 0 1 18.05 8.25H16.45A0.7 0.7 0 0 1 15.75 7.55V5.95A0.7 0.7 0 0 1 16.45 5.25Z\"/><path fill-rule=\"evenodd\" d=\"M5 13.5H8.5A2 2 0 0 1 10.5 15.5V19A2 2 0 0 1 8.5 21H5A2 2 0 0 1 3 19V15.5A2 2 0 0 1 5 13.5ZM5.95 15.75H7.55A0.7 0.7 0 0 1 8.25 16.45V18.05A0.7 0.7 0 0 1 7.55 18.75H5.95A0.7 0.7 0 0 1 5.25 18.05V16.45A0.7 0.7 0 0 1 5.95 15.75Z\"/><g class=\"a\"><rect x=\"13.5\" y=\"13.5\" width=\"3\" height=\"3\" rx=\"0.8\"/><rect x=\"18\" y=\"13.5\" width=\"3\" height=\"3\" rx=\"0.8\"/><rect x=\"15.75\" y=\"18\" width=\"3\" height=\"3\" rx=\"0.8\"/><\/g><\/symbol><symbol id=\"i-barcode\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"4.5\" width=\"2.6\" height=\"15\" rx=\"0.8\"/><rect x=\"7.2\" y=\"4.5\" width=\"1.4\" height=\"15\" rx=\"0.7\"/><rect x=\"10.2\" y=\"4.5\" width=\"2.8\" height=\"15\" rx=\"0.8\"/><rect x=\"14.6\" y=\"4.5\" width=\"1.4\" height=\"15\" rx=\"0.7\"/><rect class=\"a\" x=\"17.6\" y=\"4.5\" width=\"3.4\" height=\"15\" rx=\"0.8\"/><\/symbol><symbol id=\"i-monitor\" viewBox=\"0 0 24 24\"><rect x=\"2.5\" y=\"3.5\" width=\"19\" height=\"13\" rx=\"3\"/><rect class=\"a\" x=\"7.5\" y=\"18.5\" width=\"9\" height=\"2.6\" rx=\"1.3\"/><\/symbol><symbol id=\"i-card\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M5.5 4.5H18.5A3.5 3.5 0 0 1 22 8V16A3.5 3.5 0 0 1 18.5 19.5H5.5A3.5 3.5 0 0 1 2 16V8A3.5 3.5 0 0 1 5.5 4.5ZM6 8H9A1 1 0 0 1 10 9V10.6A1 1 0 0 1 9 11.6H6A1 1 0 0 1 5 10.6V9A1 1 0 0 1 6 8ZM6.1 14.2H11.9A1.1 1.1 0 0 1 13 15.3V15.3A1.1 1.1 0 0 1 11.9 16.4H6.1A1.1 1.1 0 0 1 5 15.3V15.3A1.1 1.1 0 0 1 6.1 14.2Z\"/><\/symbol><symbol id=\"i-gift\" viewBox=\"0 0 24 24\"><path class=\"a\" d=\"M12 7.5c-1-2.5-2.8-4-4.3-3.6-1.4.4-1.2 2.4.3 3.6ZM12 7.5c1-2.5 2.8-4 4.3-3.6 1.4.4 1.2 2.4-.3 3.6Z\"/><rect x=\"2.5\" y=\"8\" width=\"8.5\" height=\"4\" rx=\"1.5\"/><rect x=\"13\" y=\"8\" width=\"8.5\" height=\"4\" rx=\"1.5\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"8\" rx=\"1.5\"/><rect x=\"13\" y=\"13\" width=\"7\" height=\"8\" rx=\"1.5\"/><\/symbol><symbol id=\"i-analytics\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"13\" width=\"5\" height=\"8\" rx=\"1.6\"/><rect x=\"9.5\" y=\"8.5\" width=\"5\" height=\"12.5\" rx=\"1.6\"/><rect class=\"a\" x=\"16\" y=\"3\" width=\"5\" height=\"18\" rx=\"1.6\"/><\/symbol><symbol id=\"i-trend\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M3.5 17.5 9 12l3.5 3.5 4.8-4.8\"/><path class=\"j a\" d=\"M14.4 5.5h6.1v6.1Z\"/><\/symbol><symbol id=\"i-catalog\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"8\" height=\"9.5\" rx=\"2.2\"/><rect class=\"a\" x=\"13\" y=\"3\" width=\"8\" height=\"9.5\" rx=\"2.2\"/><rect x=\"3\" y=\"15\" width=\"8\" height=\"2.6\" rx=\"1.3\"/><rect x=\"3\" y=\"18.6\" width=\"5\" height=\"2.6\" rx=\"1.3\"/><rect x=\"13\" y=\"15\" width=\"8\" height=\"2.6\" rx=\"1.3\"/><rect x=\"13\" y=\"18.6\" width=\"5\" height=\"2.6\" rx=\"1.3\"/><\/symbol><symbol id=\"i-store\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3.5\" width=\"5\" height=\"8.5\" rx=\"1.6\"/><rect x=\"9.5\" y=\"3.5\" width=\"5\" height=\"8.5\" rx=\"1.6\"/><rect x=\"16\" y=\"3.5\" width=\"5\" height=\"8.5\" rx=\"1.6\"/><rect x=\"4.8\" y=\"11\" width=\"1.4\" height=\"4\" rx=\"0\"/><rect x=\"11.3\" y=\"11\" width=\"1.4\" height=\"4\" rx=\"0\"/><rect x=\"17.8\" y=\"11\" width=\"1.4\" height=\"4\" rx=\"0\"/><rect class=\"a\" x=\"3\" y=\"14.5\" width=\"18\" height=\"6.5\" rx=\"2.2\"/><\/symbol><symbol id=\"i-cart\" viewBox=\"0 0 24 24\"><path class=\"s\" stroke-width=\"2.3\" d=\"M2.5 4h1.8a1.2 1.2 0 0 1 1.2.9L8 15.5h10\"/><path d=\"M6.3 6.5h14a.9.9 0 0 1 .9 1.1l-1.4 5.4a2 2 0 0 1-1.9 1.5H8.5Z\"/><g class=\"a\"><circle cx=\"9\" cy=\"19.6\" r=\"1.9\"/><circle cx=\"17.5\" cy=\"19.6\" r=\"1.9\"/><\/g><\/symbol><symbol id=\"i-bag\" viewBox=\"0 0 24 24\"><path class=\"s a\" d=\"M8.5 7.5V7a3.5 3.5 0 0 1 7 0v.5\"/><rect x=\"3.5\" y=\"7.5\" width=\"17\" height=\"13.5\" rx=\"3.2\"/><\/symbol><symbol id=\"i-box\" viewBox=\"0 0 24 24\"><rect class=\"a\" x=\"2.5\" y=\"3.5\" width=\"19\" height=\"4.5\" rx=\"1.8\"/><path fill-rule=\"evenodd\" d=\"M4 9.5h16v9A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5ZM10.7 12H13.3A1.2 1.2 0 0 1 14.5 13.2V13.2A1.2 1.2 0 0 1 13.3 14.4H10.7A1.2 1.2 0 0 1 9.5 13.2V13.2A1.2 1.2 0 0 1 10.7 12Z\"/><\/symbol><symbol id=\"i-tag\" viewBox=\"0 0 24 24\"><path fill-rule=\"evenodd\" d=\"M3 5a2 2 0 0 1 2-2h6.2a2 2 0 0 1 1.4.6l8.3 8.3a2 2 0 0 1 0 2.8l-6.2 6.2a2 2 0 0 1-2.8 0L3.6 12.6a2 2 0 0 1-.6-1.4ZM6.1 8A1.9 1.9 0 1 0 9.9 8A1.9 1.9 0 1 0 6.1 8Z\"/><\/symbol><symbol id=\"i-truck\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"5\" width=\"12.5\" height=\"11\" rx=\"2.5\"/><path class=\"a\" d=\"M16 8.5h2.6a2 2 0 0 1 1.6.8l1.4 1.9a2 2 0 0 1 .4 1.2V15a1 1 0 0 1-1 1H16Z\"/><circle cx=\"6.5\" cy=\"18.6\" r=\"2.3\"/><circle cx=\"17.5\" cy=\"18.6\" r=\"2.3\"/><\/symbol><symbol id=\"i-return\" viewBox=\"0 0 24 24\"><path class=\"s\" d=\"M6.5 9h8a5.5 5.5 0 0 1 0 11H10\"/><path class=\"j\" d=\"M8.8 4.4 3.8 9l5 4.6Z\"/><\/symbol><symbol id=\"i-plug\" viewBox=\"0 0 24 24\"><path class=\"s\" stroke-width=\"3\" d=\"M9.5 6H7a2.5 2.5 0 0 0-2.5 2.5v7A2.5 2.5 0 0 0 7 18h2.5\"/><path class=\"s a\" stroke-width=\"3\" d=\"M14.5 6H17a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 18h-2.5\"/><rect x=\"8.5\" y=\"10.5\" width=\"7\" height=\"3\" rx=\"1.5\"/><\/symbol><\/svg>";
  function injectSprite() {
    if (!SPRITE || document.getElementById('i-search')) return;
    var box = document.createElement('div');
    box.innerHTML = SPRITE;
    document.body.insertBefore(box.firstChild, document.body.firstChild);
  }
  var brl = function (v) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } }
  };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function cssVar(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  // Dispara um evento cz:*; devolve false se alguém chamou preventDefault
  function emit(el, name, detail) { return el.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: true, detail: detail || {} })); }

  var scope = document;
  // Liga cada elemento uma única vez, mesmo com init() chamado de novo
  function each(sel, fn) {
    $$(sel, scope).forEach(function (el) {
      var k = el.__cz || (el.__cz = {});
      if (k[sel]) return;
      k[sel] = 1; fn(el);
    });
  }

  /* ---------------------------------------------------------------- Tema */
  // data-theme no <html>: "light", "dark" ou ausente (segue o sistema). Guardado em localStorage.
  var root = document.documentElement;
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function paintThemeIcon() {
    var dark = currentTheme() === 'dark';
    $$('[data-theme-icon="light"]').forEach(function (el) { el.hidden = dark; });
    $$('[data-theme-icon="dark"]').forEach(function (el) { el.hidden = !dark; });
  }
  function setTheme(next) {
    if (next === 'system' || !next) { root.removeAttribute('data-theme'); store.set('cz-theme', ''); }
    else { root.setAttribute('data-theme', next); store.set('cz-theme', next); }
    paintThemeIcon();
    emit(document, 'cz:theme', { theme: currentTheme() });
  }
  var saved = store.get('cz-theme');
  if (saved) root.setAttribute('data-theme', saved);
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { paintThemeIcon(); emit(document, 'cz:theme', { theme: currentTheme() }); });

  /* ---------------------------------------------------------------- Busca (cz-cmd) */
  var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var cmds = [], cmdSeq = 0;
  // Paleta de busca: botão que abre uma lista filtrável de resultados e ações.
  function createCmd(o) {
    var id = 'cmd' + (++cmdSeq), scrim = document.createElement('div');
    scrim.className = 'cz-cmd-scrim'; scrim.hidden = true;
    scrim.innerHTML = '<div class="cz-cmd" role="dialog" aria-modal="true"><div class="cz-cmd-card"><label class="cz-cmd-input">' + icon('search') +
      '<input type="text" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="' + id + '-list" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></label>' +
      '<div class="cz-cmd-list" id="' + id + '-list" role="listbox"></div></div></div>';
    document.body.appendChild(scrim);
    var box = scrim.firstChild, input = $('input', scrim), list = $('.cz-cmd-list', scrim), shown = [], sel = 0, last = null;
    box.setAttribute('aria-label', o.label); input.placeholder = o.placeholder || 'Buscar...'; input.setAttribute('aria-label', o.label); list.setAttribute('aria-label', 'Resultados');
    function mark() {
      $$('.cz-cmd-item', list).forEach(function (el) { var on = +el.dataset.i === sel; el.setAttribute('aria-selected', String(on)); if (on) el.scrollIntoView({ block: 'nearest' }); });
      if (shown.length) input.setAttribute('aria-activedescendant', id + '-o' + sel); else input.removeAttribute('aria-activedescendant');
    }
    function render() {
      var q = norm(input.value.trim()), all = o.items();
      shown = !q ? all : all.filter(function (it) { return norm(it.title + ' ' + (it.desc || '') + ' ' + (it.cat || '') + ' ' + (it.keys || '')).indexOf(q) > -1; });
      if (q) shown.sort(function (x, y) { return (norm(x.title).indexOf(q) < 0) - (norm(y.title).indexOf(q) < 0); });
      sel = 0;
      if (!shown.length) {
        list.innerHTML = '<div class="cz-cmd-empty">' + icon('search') + '<p>Nada encontrado para “<span></span>”</p><button type="button" class="cz-btn cz-btn--ghost cz-btn--sm" data-cmd-clear>Limpar busca</button></div>';
        $('span', list).textContent = input.value; mark(); return;
      }
      list.innerHTML = shown.map(function (it, i) {
        return '<div class="cz-cmd-item" role="option" id="' + id + '-o' + i + '" data-i="' + i + '" aria-selected="false">' + icon(it.icon || 'arrow-right') + '<span class="t"><b></b><small></small></span><span class="cat"></span></div>';
      }).join('');
      $$('.cz-cmd-item', list).forEach(function (el, i) { $('b', el).textContent = shown[i].title; $('small', el).textContent = shown[i].desc || ''; $('.cat', el).textContent = shown[i].cat || ''; });
      mark();
    }
    function open() { cmds.forEach(function (c) { if (c.isOpen()) c.close(true); }); last = document.activeElement; scrim.hidden = false; input.value = ''; render(); input.focus(); document.body.style.overflow = 'hidden'; }
    function close(silent) { scrim.hidden = true; document.body.style.overflow = ''; if (!silent && last && last.focus) last.focus(); }
    function pick(i) { var it = shown[i]; if (!it) return; close(); o.onPick(it); }
    input.addEventListener('input', render);
    scrim.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { if (!shown.length) return; e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length; mark(); }
      if (e.key === 'Enter' && e.target === input) { e.preventDefault(); pick(sel); }
      if (e.key === 'Tab') { var clr = $('[data-cmd-clear]', list); if (!clr) { e.preventDefault(); input.focus(); } else if (e.target === clr) { e.preventDefault(); input.focus(); } }
    });
    list.addEventListener('mousemove', function (e) { var it = e.target.closest('[data-i]'); if (it && +it.dataset.i !== sel) { sel = +it.dataset.i; mark(); } });
    list.addEventListener('click', function (e) {
      if (e.target.closest('[data-cmd-clear]')) { input.value = ''; render(); input.focus(); return; }
      var it = e.target.closest('[data-i]'); if (it) pick(+it.dataset.i);
    });
    scrim.addEventListener('mousedown', function (e) { if (e.target === scrim) close(); });
    var api = { open: open, close: close, isOpen: function () { return !scrim.hidden; } };
    cmds.push(api);
    return api;
  }
  /* ---------------------------------------------------------------- Copiar */
  // data-copy="texto" em qualquer botão. Botões com data-copied mostram o rótulo no lugar do toast.
  function copyText(text, btn) {
    var done = function () {
      if (btn && btn.dataset.copied) { var old = btn.textContent; btn.textContent = btn.dataset.copied; setTimeout(function () { btn.textContent = old; }, 1600); }
      else toast('success', 'Copiado', text.length < 40 ? text : 'Conteúdo na área de transferência.');
    };
    var legacy = function () {
      var t = document.createElement('textarea'), ok = false;
      t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(t); t.select();
      try { ok = document.execCommand('copy'); } catch (e) { /* seleção manual */ }
      t.remove();
      if (ok) done(); else toast('info', 'Não deu para copiar', 'O navegador bloqueou a área de transferência.');
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, legacy); else legacy();
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-copy]');
    if (c) copyText(c.dataset.copy, c);
  });

  /* ---------------------------------------------------------------- Toasts */
  // Região criada sob demanda se a página não tiver um #cz-toasts
  function toastRegion() {
    var r = $('#cz-toasts');
    if (!r) { r = document.createElement('div'); r.className = 'cz-toast-region'; r.id = 'cz-toasts'; r.setAttribute('aria-live', 'polite'); document.body.appendChild(r); }
    return r;
  }
  var toastIcon = { success: 'check-circle', danger: 'x-circle', warning: 'alert', info: 'info' };
  function toast(type, title, msg, undo) {
    var region = toastRegion();
    var t = document.createElement('div');
    t.className = 'cz-toast cz-toast--' + type;
    t.setAttribute('role', type === 'danger' ? 'alert' : 'status');
    t.innerHTML = icon(toastIcon[type] || 'info') + '<div><strong></strong>' + (msg ? '<small></small>' : '') + '</div>' +
      (undo ? '<button class="undo" type="button">Desfazer</button>' : '<button class="close" type="button" aria-label="Fechar aviso">' + icon('x', 'i-sm') + '</button>');
    t.querySelector('strong').textContent = title;
    if (msg) t.querySelector('small').textContent = msg;
    region.appendChild(t);
    var kill = function () { t.classList.add('is-leaving'); setTimeout(function () { t.remove(); }, 220); };
    var timer = setTimeout(kill, undo ? 8000 : 5000);
    t.querySelector('button').addEventListener('click', function () {
      clearTimeout(timer); kill();
      if (typeof undo === 'function') { undo(); toast('info', 'Ação desfeita', 'Tudo voltou como estava.'); }
      else if (undo) toast('info', 'Ação desfeita', title + ' foi revertido.');
    });
    while (region.children.length > 3) region.firstChild.remove();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-toast]');
    if (b && !b.disabled) toast(b.dataset.toast, b.dataset.title, b.dataset.msg, b.hasAttribute('data-undo'));
  });
  /* ---------------------------------------------------------------- Diálogos e drawers */
  var openStack = [];
  function focusables(el) { return $$('button:not([disabled]),[href],input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', el).filter(function (x) { return x.offsetParent !== null; }); }
  function openDialog(id, trigger) {
    var s = document.getElementById(id);
    if (!s) return;
    s.hidden = false;
    openStack.push({ el: s, trigger: trigger });
    var f = focusables(s);
    var first = f.find(function (x) { return x.tagName === 'INPUT'; }) || f[0];
    if (first) first.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeDialog() {
    var top = openStack.pop();
    if (!top) return;
    top.el.hidden = true;
    if (!openStack.length) document.body.style.overflow = '';
    if (top.trigger) top.trigger.focus();
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { openDialog(o.dataset.open, o); return; }
    if (e.target.closest('[data-close]') && e.target.closest('.cz-scrim')) { closeDialog(); return; }
    if (e.target.classList && e.target.classList.contains('cz-scrim')) closeDialog();
  });
  document.addEventListener('keydown', function (e) {
    if (!openStack.length) return;
    var top = openStack[openStack.length - 1].el;
    if (e.key === 'Escape') { closeDialog(); e.stopPropagation(); }
    if (e.key === 'Tab') {
      var f = focusables(top);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { f[f.length - 1].focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { f[0].focus(); e.preventDefault(); }
    }
  });
  /* ---------------------------------------------------------------- Menus e popovers */
  function closeMenus(except) {
    $$('[data-menu-trigger][aria-expanded="true"]').forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
      var m = t.parentElement.querySelector('.cz-menu'); if (m) m.hidden = true;
    });
    $$('[data-popover][aria-expanded="true"]').forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false'); t.nextElementSibling.hidden = true;
    });
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-menu-trigger]');
    if (t) {
      var menu = t.parentElement.querySelector('.cz-menu');
      var open = t.getAttribute('aria-expanded') !== 'true';
      closeMenus(t);
      t.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      if (open) { var first = menu.querySelector('.cz-menu-item'); if (first) first.focus(); }
      return;
    }
    var p = e.target.closest('[data-popover]');
    if (p) {
      var pop = p.nextElementSibling, o = p.getAttribute('aria-expanded') !== 'true';
      closeMenus(p); p.setAttribute('aria-expanded', String(o)); pop.hidden = !o; return;
    }
    if (e.target.closest('[data-close-pop]')) { closeMenus(); return; }
    var item = e.target.closest('.cz-menu .cz-menu-item');
    if (item && item.closest('.cz-pop')) {
      var wrap = item.closest('.cz-pop'), trig = wrap.querySelector('[data-menu-trigger]');
      if (trig && trig.hasAttribute('data-select-menu')) {
        $$('.cz-menu-item', wrap).forEach(function (x) { x.setAttribute('aria-selected', String(x === item)); });
        trig.querySelector('span').textContent = trig.dataset.selectMenu + item.textContent.trim();
        emit(trig, 'cz:select', { value: item.dataset.value || item.textContent.trim(), item: item });
      } else if (trig) {
        emit(trig, 'cz:menu-pick', { label: item.textContent.trim(), item: item });
      }
      closeMenus(); if (trig) trig.focus();
      return;
    }
    if (!e.target.closest('.cz-menu') && !e.target.closest('.cz-popover') && !e.target.closest('[data-date-input]')) { closeMenus(); closeCalPops(); }
  });
  document.addEventListener('keydown', function (e) {
    var menu = e.target.closest && e.target.closest('.cz-menu');
    if (menu && !menu.id) {
      var items = $$('.cz-menu-item', menu), i = items.indexOf(e.target);
      if (e.key === 'ArrowDown') { items[(i + 1) % items.length].focus(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { items[(i - 1 + items.length) % items.length].focus(); e.preventDefault(); }
    }
    if (e.key === 'Escape' && !openStack.length) {
      var t = $('[data-menu-trigger][aria-expanded="true"],[data-popover][aria-expanded="true"]');
      closeMenus(); closeCalPops(); if (t) t.focus();
    }
  });
  /* ---------------------------------------------------------------- Alternâncias */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toggle]');
    if (t) { t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true')); return; }
    var g = e.target.closest('[data-toggle-group] > button');
    if (g && !g.disabled) {
      var grp = g.parentElement;
      $$(':scope > button', grp).forEach(function (b) { b.setAttribute('aria-pressed', String(b === g)); });
      if (grp.hasAttribute('data-swatch')) { var n = grp.closest('.cz-field').querySelector('[data-swatch-name]'); if (n) n.textContent = g.getAttribute('aria-label'); }
    }
    var d = e.target.closest('[data-dismiss]');
    if (d) { var box = d.closest('.cz-alert,.cz-banner'); box.hidden = true; emit(box, 'cz:dismiss'); }
    var r = e.target.closest('[data-reveal]');
    if (r) {
      var f = document.getElementById(r.dataset.reveal), show = f.type === 'password';
      f.type = show ? 'text' : 'password';
      r.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
      r.innerHTML = icon(show ? 'eye-off' : 'eye', 'i-sm');
    }
    var c = e.target.closest('[data-clear]');
    if (c) { var ci = document.getElementById(c.dataset.clear); if (ci) { ci.value = ''; ci.dispatchEvent(new Event('input', { bubbles: true })); ci.focus(); } }
    var x = e.target.closest('.cz-chip .x');
    if (x) { var chip = x.closest('.cz-chip'), wrap = chip.parentElement; chip.remove(); var i = wrap.querySelector('input'); if (i) i.focus(); }
    var rm = e.target.closest('[data-remove]');
    if (rm) rm.closest('.cz-upload-item').remove();
    var side = e.target.closest('.cz-side-item');
    if (side) { $$('.cz-side-item', side.closest('.cz-sidebar')).forEach(function (b) { b.toggleAttribute('aria-current', b === side); if (b === side) b.setAttribute('aria-current', 'page'); }); }
    var col = e.target.closest('[data-collapse]');
    if (col) {
      var sb = col.closest('.cz-sidebar'), narrow = window.matchMedia('(max-width:700px)').matches, collapsed;
      if (narrow) { sb.classList.remove('is-collapsed'); collapsed = !sb.classList.toggle('is-open'); }
      else collapsed = sb.classList.toggle('is-collapsed');
      col.setAttribute('aria-expanded', String(!collapsed));
      col.setAttribute('aria-label', collapsed ? 'Expandir menu' : 'Recolher menu');
    }
    var bn = e.target.closest('[data-bottom-nav] button');
    if (bn) $$('button', bn.parentElement).forEach(function (b) { if (b === bn) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    var opt = e.target.closest('[data-single-select] [role="option"]');
    if (opt) $$('[role="option"]', opt.parentElement).forEach(function (o) { o.setAttribute('aria-selected', String(o === opt)); });
  });
  /* ---------------------------------------------------------------- Ícones de arquivo */
  // Ícones de arquivo do kit original: corpo cinza, dobra branca, símbolo do tipo e faixa com a extensão
  var FILE_KINDS = {
    pdf: { kind: 'pdf', color: '#ff5e2c', name: 'Documento PDF' },
    jpg: { kind: 'image', color: '#5e4668', name: 'Imagem JPEG', label: 'JPEG' }, jpeg: { kind: 'image', color: '#5e4668', name: 'Imagem JPEG' },
    png: { kind: 'image', color: '#7b9771', name: 'Imagem PNG' }, webp: { kind: 'image', color: '#5e4668', name: 'Imagem WebP' },
    gif: { kind: 'image', color: '#ff5e2c', name: 'Imagem animada' }, svg: { kind: 'vector', color: '#858a58', name: 'Vetor SVG' },
    doc: { kind: 'document', color: '#5e4668', name: 'Documento de texto', label: 'DOCX' }, docx: { kind: 'document', color: '#5e4668', name: 'Documento de texto' },
    txt: { kind: 'document', color: '#777169', name: 'Texto simples' },
    xls: { kind: 'spreadsheet', color: '#7b9771', name: 'Planilha', label: 'XLSX' }, xlsx: { kind: 'spreadsheet', color: '#7b9771', name: 'Planilha' },
    csv: { kind: 'spreadsheet', color: '#858a58', name: 'Dados tabulares' },
    ppt: { kind: 'presentation', color: '#ff5e2c', name: 'Apresentação', label: 'PPTX' }, pptx: { kind: 'presentation', color: '#ff5e2c', name: 'Apresentação' },
    zip: { kind: 'archive', color: '#4e4e4e', name: 'Arquivo compactado' }, rar: { kind: 'archive', color: '#4e4e4e', name: 'Arquivo compactado' },
    mp4: { kind: 'video', color: '#5e4668', name: 'Vídeo' }, mov: { kind: 'video', color: '#5e4668', name: 'Vídeo' },
    mp3: { kind: 'audio', color: '#858a58', name: 'Áudio' }, wav: { kind: 'audio', color: '#858a58', name: 'Áudio' },
    xml: { kind: 'code', color: '#d94d1e', name: 'Nota fiscal XML' }, json: { kind: 'code', color: '#4e4e4e', name: 'Dados JSON' }
  };
  var FILE_ART = {
    pdf: '<path d="M23 45c4-7 10-22 10-30 0-3-1-5-3-5-3 0-3 5-2 9 2 10 10 21 17 21 4 0 6-1 6-3 0-4-6-4-12-3-10 2-20 6-24 10-2 2-2 4 0 5 3 2 6-1 8-4Z"/>',
    image: '<rect x="15" y="18" width="34" height="31" rx="3"/><circle cx="25" cy="27" r="3"/><path d="m17 44 10-10 7 7 5-5 8 9"/>',
    vector: '<path d="M18 43c5-15 11-20 28-21M19 44c12 0 21-5 27-21"/><circle cx="18" cy="44" r="2"/><circle cx="30" cy="30" r="2"/><circle cx="47" cy="21" r="2"/>',
    document: '<path d="M18 21h27M18 27h27M18 33h22M18 39h27M18 45h17"/>',
    spreadsheet: '<rect x="16" y="19" width="32" height="29" rx="2"/><path d="M16 28h32M16 38h32M27 19v29M38 19v29"/>',
    presentation: '<rect x="15" y="18" width="34" height="27" rx="2"/><path d="M32 45v6m-10 0h20M21 38l8-8 5 4 8-9"/>',
    archive: '<path d="M28 18h8m-8 5h8m-8 5h8m-8 5h8M32 19v21"/><rect x="27" y="39" width="10" height="8" rx="2"/>',
    video: '<rect x="15" y="19" width="34" height="29" rx="3"/><path d="m27 27 11 6-11 6z"/>',
    audio: '<path d="M17 34h4m3-8v16m4-23v30m4-24v18m4-12v7m4-16v24m4-15v7m4-5h3"/>',
    code: '<path d="m25 23-9 10 9 10M39 23l9 10-9 10M35 19l-6 28"/>',
    generic: '<path d="M18 24h27M18 31h27M18 38h18"/>'
  };
  function fileIconSvg(ext) {
    var key = ext.toLowerCase(), meta = FILE_KINDS[key] || { kind: 'generic', color: '#777169', name: 'Arquivo' };
    var label = (meta.label || ext).toUpperCase().slice(0, 4);
    var art = FILE_ART[meta.kind].replace(/<(path|rect|circle)\b/g, '<$1 vector-effect="non-scaling-stroke"');
    var size = label.length <= 3 ? 20 : 17, width = meta.kind === 'pdf' ? 3 : 1.7;
    return '<svg viewBox="0 0 80 100" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 1h47l18 21v68c0 5-4 9-9 9H10c-5 0-9-4-9-9V14C1 7 7 1 14 1Z" fill="#f1f2f3" stroke="#e0e2e2" stroke-width="1"/>' +
      '<path d="M61 1 59 18c-.6 5.5 3.4 9.5 9 9.5H79" stroke="#fff" stroke-width="2"/>' +
      '<g transform="translate(8 8)" stroke="' + meta.color + '" stroke-width="' + width + '">' + art + '</g>' +
      '<path d="M1 73h78v17c0 5-4 9-9 9H10c-5 0-9-4-9-9V73Z" fill="' + meta.color + '"/>' +
      '<text x="40" y="92" text-anchor="middle" fill="#fff" stroke="none" font-family="Inter,Arial,sans-serif" font-size="' + size + '" font-weight="700">' + esc(label) + '</text></svg>';
  }
  function drawFiles(scope) {
    $$('.cz-file[data-file]', scope).forEach(function (el) {
      if (el.firstChild) return;
      var ext = el.dataset.file, meta = FILE_KINDS[ext.toLowerCase()];
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', (meta ? meta.name : 'Arquivo') + ' (.' + ext.toLowerCase() + ')');
      el.innerHTML = fileIconSvg(ext);
    });
  }
  var MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  // Datas em data-today, data-value, data-start e data-end no formato AAAA-MM-DD
  var parseDay = function (s) { if (!s) return null; var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2] || 1); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var sameDay = function (a, b) { return a && b && a.toDateString() === b.toDateString(); };
  function closeCalPops() { $$('[data-cal-pop]').forEach(function (p) { p.hidden = true; }); }

  /* ---------------------------------------------------------------- Paginação */
  function pageList(cur, total) {
    var out = [1];
    for (var p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) out.push(p);
    if (total > 1) out.push(total);
    var res = [];
    out.forEach(function (p, i) { if (i && p - out[i - 1] > 1) res.push('…'); res.push(p); });
    return res;
  }
  function renderPager(el, cur, total, onGo, info) {
    el.innerHTML = (info ? '<span class="cz-pagination-info">' + info + '</span>' : '') +
      '<button data-go="' + (cur - 1) + '" aria-label="Página anterior"' + (cur <= 1 ? ' disabled' : '') + '>' + icon('chev-left', 'i-sm') + '</button>' +
      pageList(cur, total).map(function (p) { return p === '…' ? '<span class="gap">…</span>' : '<button data-go="' + p + '"' + (p === cur ? ' aria-current="page"' : '') + '>' + p + '</button>'; }).join('') +
      '<button data-go="' + (cur + 1) + '" aria-label="Próxima página"' + (cur >= total ? ' disabled' : '') + '>' + icon('chev-right', 'i-sm') + '</button>';
    el.onclick = function (e) { var b = e.target.closest('[data-go]'); if (b && !b.disabled) onGo(+b.dataset.go); };
  }

  /* ---------------------------------------------------------------- Minigráfico */
  // <svg data-spark="3,5,4,8" data-color="..."> desenha linha com área
  function drawSparks(scope, force) {
    $$('[data-spark]', scope).forEach(function (svg) {
      if (!svg.getClientRects().length) return;
      if (!force && svg.__spark === svg.dataset.spark) return;
      svg.__spark = svg.dataset.spark;
      var d = svg.dataset.spark.split(',').map(Number), W = 200, H = 44, min = Math.min.apply(0, d), max = Math.max.apply(0, d);
      var pts = d.map(function (v, i) { return [i / (d.length - 1) * W, H - 4 - (v - min) / (max - min || 1) * (H - 8)]; });
      var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('');
      var color = svg.dataset.color || cssVar('--text');
      if (!svg.getAttribute('viewBox')) { svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('preserveAspectRatio', 'none'); }
      svg.innerHTML = '<path d="' + line + ' L' + W + ' ' + H + ' L0 ' + H + 'Z" fill="' + color + '" opacity=".12"/><path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    });
  }
  document.addEventListener('cz:theme', function () { drawSparks(document, true); });

  /* ---------------------------------------------------------------- Busca sem código (data-cmd) */
  // <button class="cz-cmd-trigger" data-cmd> abre a paleta de busca sem escrever JS. Os resultados são
  // os itens de data-cmd-items (JSON no gatilho: title, desc, cat, icon, href), tudo com data-cmd-item,
  // os itens da sidebar, as abas e a navegação inferior. Escolher um item clica nele; Ctrl/⌘ K abre a busca.
  function autoItems(trig) {
    var out = [], seen = {};
    try { if (trig.dataset.cmdItems) out = JSON.parse(trig.dataset.cmdItems); } catch (e) { /* JSON inválido: ignora */ }
    $$('[data-cmd-item], .cz-side-item, .cz-tabs [role="tab"], .cz-bottom-nav button, .cz-bottom-nav a').forEach(function (el) {
      if (el.closest('.cz-cmd-scrim') || !el.getClientRects().length && !el.closest('.cz-sidebar')) return;
      var lbl = el.querySelector('.lbl');
      var t = (el.dataset.cmdItem || (lbl || el).textContent || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
      if (!t || seen[t]) return;
      seen[t] = 1;
      var cat = el.dataset.cmdCat || (el.classList.contains('cz-side-item') ? 'Navegação' : el.getAttribute('role') === 'tab' ? 'Aba' : 'Ir para');
      out.push({ title: t, desc: el.dataset.cmdDesc || '', cat: cat, icon: el.dataset.cmdIcon || 'arrow-right', el: el });
    });
    return out;
  }
  function openAuto(trig) {
    if (!trig.__cmd) {
      trig.__cmd = createCmd({
        label: trig.getAttribute('aria-label') || 'Buscar', placeholder: trig.dataset.cmdPlaceholder || 'Buscar...',
        items: function () { return autoItems(trig); },
        onPick: function (it) {
          if (it.el) { it.el.click(); if (it.el.focus) it.el.focus(); }
          else if (it.href) location.href = it.href;
          emit(trig, 'cz:cmd-pick', { item: it });
        }
      });
    }
    trig.__cmd.isOpen() ? trig.__cmd.close() : trig.__cmd.open();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cmd]');
    if (t) { e.preventDefault(); openAuto(t); }
  });
  document.addEventListener('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'k' || e.defaultPrevented) return;
    var t = $('[data-cmd]');
    if (t) { e.preventDefault(); openAuto(t); }
  });

  /* ---------------------------------------------------------------- Inicialização por elemento */
  function init(target) {
    injectSprite();
    scope = target || document;
  /* ---------------------------------------------------------------- Sobreposições e fundo de barras */
  each('.cz-scrim', function (el) { if (el.parentElement !== document.body) document.body.appendChild(el); });
  each('[data-bars-bg]', function (el) {
    var n = Math.max(3, +el.dataset.barsBg || 15), h = '';
    for (var i = 0; i < n; i++) {
      var s = 0.3 + 0.7 * Math.pow(Math.abs(i / (n - 1) - 0.5) * 2, 1.2);
      h += '<i style="--s:' + s.toFixed(3) + ';animation-delay:' + (i * 0.1).toFixed(1) + 's"></i>';
    }
    el.innerHTML = h;
  });

  each('[data-confirm-text]', function (inp) {
    var btn = document.getElementById(inp.dataset.confirmBtn);
    inp.addEventListener('input', function () { btn.disabled = inp.value.trim() !== inp.dataset.confirmText; });
  });
  /* ---------------------------------------------------------------- Combobox */
  each('[data-combo]', function (inp) {
    var opts = JSON.parse(inp.dataset.combo), list = document.getElementById(inp.getAttribute('aria-controls')), idx = -1, shown = [];
    function render() {
      var q = norm(inp.value.trim());
      shown = opts.filter(function (o) { return norm(o).indexOf(q) > -1; });
      idx = Math.min(idx, shown.length - 1);
      list.innerHTML = shown.length ? shown.map(function (o, i) {
        var n = norm(o), at = q ? n.indexOf(q) : -1;
        var label = at > -1 ? esc(o.slice(0, at)) + '<mark>' + esc(o.slice(at, at + q.length)) + '</mark>' + esc(o.slice(at + q.length)) : esc(o);
        return '<button type="button" class="cz-menu-item' + (i === idx ? ' is-active' : '') + '" role="option" id="' + list.id + '-' + i + '" aria-selected="' + (o === inp.value) + '" tabindex="-1">' + label + '</button>';
      }).join('') : '<div class="cz-menu-empty">' + esc((inp.dataset.comboEmpty || 'Nada encontrado para “{q}”.').replace('{q}', inp.value)) + '</div>';
      inp.setAttribute('aria-activedescendant', idx > -1 ? list.id + '-' + idx : '');
    }
    function open() { list.hidden = false; inp.setAttribute('aria-expanded', 'true'); render(); }
    function close() { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); idx = -1; }
    inp.addEventListener('focus', open);
    inp.addEventListener('input', function () { idx = 0; open(); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { if (list.hidden) open(); idx = Math.min(idx + 1, shown.length - 1); render(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { idx = Math.max(idx - 1, 0); render(); e.preventDefault(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (shown[idx]) inp.value = shown[idx];
        else if (inp.value.trim() && inp.hasAttribute('data-combo-create')) { opts.push(inp.value.trim()); emit(inp, 'cz:combo-create', { value: inp.value.trim() }); }
        close();
      } else if (e.key === 'Escape') close();
    });
    list.addEventListener('mousedown', function (e) { e.preventDefault(); });
    list.addEventListener('click', function (e) { var b = e.target.closest('.cz-menu-item'); if (b) { inp.value = b.textContent; close(); } });
    inp.addEventListener('blur', function () { setTimeout(close, 100); });
  });
  /* ---------------------------------------------------------------- Abas */
  each('[data-tabs]', function (w) {
    var tabs = $$('[role="tab"]', w);
    function select(t) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? tabs[(i + 1) % tabs.length] : e.key === 'ArrowLeft' ? tabs[(i - 1 + tabs.length) % tabs.length] : null;
        if (n) { select(n); n.focus(); e.preventDefault(); }
      });
    });
  });
  /* ---------------------------------------------------------------- Acordeão */
  each('[data-accordion] .cz-acc-btn', function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    });
  });
  /* ---------------------------------------------------------------- Checkbox pai */
  each('[data-check-all]', function (all) {
    var kids = $$('[data-check-child="' + all.dataset.checkAll + '"]');
    function sync() {
      var n = kids.filter(function (k) { return k.checked; }).length;
      all.checked = n === kids.length; all.indeterminate = n > 0 && n < kids.length;
    }
    all.addEventListener('change', function () { kids.forEach(function (k) { k.checked = all.checked; }); });
    kids.forEach(function (k) { k.addEventListener('change', sync); });
    sync();
  });
  /* ---------------------------------------------------------------- Slider */
  function paintRange(r) {
    var p = (r.value - r.min) / (r.max - r.min) * 100;
    r.style.setProperty('--p', p + '%');
    var o = document.querySelector('output[for="' + r.id + '"]');
    if (o) o.textContent = (o.dataset.prefix || '') + Number(r.value).toLocaleString('pt-BR') + (o.dataset.suffix || '');
  }
  each('.cz-range', function (r) { paintRange(r); r.addEventListener('input', function () { paintRange(r); }); });
  /* ---------------------------------------------------------------- Quantidade */
  function syncQty(q) {
    var i = q.querySelector('input'), min = +q.dataset.min, max = +q.dataset.max, v = Math.max(min, Math.min(max, parseInt(i.value, 10) || min));
    i.value = v;
    q.querySelector('[data-step="-1"]').disabled = v <= min;
    q.querySelector('[data-step="1"]').disabled = v >= max;
    q.dispatchEvent(new CustomEvent('qty', { bubbles: true, detail: v }));
  }
  each('[data-qty]', function (q) {
    q.addEventListener('click', function (e) {
      var b = e.target.closest('[data-step]'); if (!b) return;
      var i = q.querySelector('input'); i.value = (parseInt(i.value, 10) || 0) + (+b.dataset.step); syncQty(q);
    });
    q.querySelector('input').addEventListener('change', function () { syncQty(q); });
    syncQty(q);
  });
  /* ---------------------------------------------------------------- Contador de caracteres */
  each('[data-count]', function (t) {
    var out = document.getElementById(t.dataset.count);
    if (!out) return; // data-count="id" aponta para o contador; sem ele, ignora
    var paint = function () { out.textContent = t.value.length + ' / ' + t.maxLength; };
    t.addEventListener('input', paint); paint();
  });
  /* ---------------------------------------------------------------- Tags */
  each('[data-tags] input', function (inp) {
    inp.addEventListener('keydown', function (e) {
      var v = inp.value.trim().replace(/,$/, '');
      if ((e.key === 'Enter' || e.key === ',') && v) {
        e.preventDefault();
        var c = document.createElement('span');
        c.className = 'cz-chip cz-chip--input';
        c.textContent = v;
        c.insertAdjacentHTML('beforeend', '<button class="x" aria-label="Remover ' + esc(v) + '">' + icon('x') + '</button>');
        inp.before(c); inp.value = '';
      } else if (e.key === 'Backspace' && !inp.value) {
        var prev = inp.previousElementSibling; if (prev) prev.remove();
      }
    });
  });
  /* ---------------------------------------------------------------- Upload */
  each('[data-drop]', function (drop) {
    var input = drop.querySelector('input'), list = drop.parentElement.querySelector('[data-upload-list]');
    function add(files) {
      Array.prototype.forEach.call(files, function (f) {
        var ext = (f.name.split('.').pop() || 'file').toLowerCase().slice(0, 4);
        var tooBig = f.size > 10 * 1024 * 1024;
        var row = document.createElement('div');
        row.className = 'cz-upload-item';
        row.innerHTML = '<span class="cz-file" data-file="' + esc(ext) + '" style="--s:32px"></span><div><b></b>' +
          (tooBig ? '<div class="cz-error">Arquivo maior que 10 MB. Reduza o tamanho e tente de novo.</div>' : '<div class="cz-progress cz-progress--brand" style="margin-top:6px"><i style="--v:0%"></i></div>') +
          '</div><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Remover arquivo" data-remove>' + icon('x', 'i-sm') + '</button>';
        row.querySelector('b').textContent = f.name;
        if (tooBig) { row.style.borderColor = 'var(--danger-line)'; row.style.background = 'var(--danger-bg)'; }
        list.prepend(row); drawFiles(row);
        if (!tooBig) {
          var bar = row.querySelector('.cz-progress i'), v = 0;
          var tick = setInterval(function () {
            v = Math.min(100, v + 12 + Math.random() * 18); bar.style.setProperty('--v', v + '%');
            if (v >= 100) { clearInterval(tick); bar.parentElement.outerHTML = '<div class="cz-help">' + (f.size / 1024 / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' MB · enviado</div>'; }
          }, 180);
        }
      });
    }
    input.addEventListener('change', function () { add(input.files); input.value = ''; });
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-over'); }); });
    drop.addEventListener('drop', function (e) { add(e.dataTransfer.files); });
  });
  drawFiles(scope);

  /* ---------------------------------------------------------------- Calendário */
  each('[data-cal]', function (cal) {
    var range = cal.dataset.mode === 'range', today = parseDay(cal.dataset.today) || new Date();
    var start = parseDay(range ? cal.dataset.start : cal.dataset.value), end = range ? parseDay(cal.dataset.end) : null;
    var view = parseDay(cal.dataset.view) || new Date((start || today).getFullYear(), (start || today).getMonth(), 1);
    function render() {
      var y = view.getFullYear(), m = view.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
      var html = '<div class="cz-cal-head"><button class="cz-icon-btn cz-icon-btn--sm" data-nav="-1" aria-label="Mês anterior">' + icon('chev-left') + '</button><strong aria-live="polite">' + MONTHS[m] + ' de ' + y + '</strong><button class="cz-icon-btn cz-icon-btn--sm" data-nav="1" aria-label="Próximo mês">' + icon('chev-right') + '</button></div><div class="cz-cal-grid" role="grid">';
      html += ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(function (d) { return '<span>' + d + '</span>'; }).join('');
      for (var i = 0; i < first; i++) { var pd = new Date(y, m, i - first + 1); html += '<button class="out" tabindex="-1" data-d="' + pd.toISOString() + '">' + pd.getDate() + '</button>'; }
      for (var d = 1; d <= days; d++) {
        var dt = new Date(y, m, d), cls = [], sel = sameDay(dt, start) || sameDay(dt, end);
        if (sameDay(dt, today)) cls.push('today');
        if (range && start && end && dt > start && dt < end) cls.push('in-range');
        html += '<button class="' + cls.join(' ') + '" aria-selected="' + sel + '" data-d="' + dt.toISOString() + '" aria-label="' + d + ' de ' + MONTHS[m] + '">' + d + '</button>';
      }
      html += '</div>';
      if (range) html += '<div class="cz-cal-foot"><span class="cz-help" style="margin-right:auto;align-self:center">' + (start ? pad(start.getDate()) + '/' + pad(start.getMonth() + 1) : '') + (end ? ' – ' + pad(end.getDate()) + '/' + pad(end.getMonth() + 1) : ' – escolha o fim') + '</span><button class="cz-btn cz-btn--ghost cz-btn--sm" data-cal-clear>Limpar</button><button class="cz-btn cz-btn--sm" data-cal-apply>Aplicar</button></div>';
      cal.innerHTML = html;
    }
    cal.addEventListener('click', function (e) {
      e.stopPropagation();
      var n = e.target.closest('[data-nav]');
      if (n) { view.setMonth(view.getMonth() + (+n.dataset.nav)); render(); return; }
      if (e.target.closest('[data-cal-clear]')) { start = end = null; render(); return; }
      if (e.target.closest('[data-cal-apply]')) { emit(cal, 'cz:range', { start: start, end: end, label: cal.querySelector('.cz-cal-foot .cz-help').textContent }); return; }
      var b = e.target.closest('[data-d]'); if (!b) return;
      var dt = new Date(b.dataset.d);
      if (range) {
        if (!start || end) { start = dt; end = null; } else if (dt < start) { end = start; start = dt; } else end = dt;
      } else {
        start = dt;
        var target = document.getElementById(cal.dataset.target);
        emit(cal, 'cz:date', { date: dt });
        if (target) { target.value = pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1) + '/' + dt.getFullYear(); closeCalPops(); target.focus(); }
      }
      if (dt.getMonth() !== view.getMonth()) view = new Date(dt.getFullYear(), dt.getMonth(), 1);
      render();
    });
    render();
  });
  each('[data-date-input]', function (inp) {
    var pop = inp.closest('.cz-field').querySelector('[data-cal-pop]');
    inp.addEventListener('focus', function () { pop.hidden = false; });
    inp.addEventListener('click', function () { pop.hidden = false; });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Escape') pop.hidden = true; });
  });
  each('[data-pagination]', function (el) {
    var total = +el.dataset.total, per = +el.dataset.per, items = +el.dataset.items, noun = el.dataset.noun || 'itens';
    (function go(cur) {
      var a = (cur - 1) * per + 1, b = Math.min(cur * per, items);
      renderPager(el, cur, total, go, a + '–' + b + ' de ' + items.toLocaleString('pt-BR') + ' ' + noun);
      emit(el, 'cz:page', { page: cur });
    })(+el.dataset.current);
  });
  /* ---------------------------------------------------------------- Etapas */
  each('[data-stepper]', function (w) {
    var steps = $$('.cz-steps li', w);
    var cur = steps.findIndex(function (s) { return s.classList.contains('current'); });
    function paint() {
      steps.forEach(function (s, i) {
        s.classList.toggle('done', i < cur); s.classList.toggle('current', i === cur);
        if (i === cur) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
        s.querySelector('.dot').innerHTML = i < cur ? icon('check', 'i-sm') : String(i + 1);
      });
      w.querySelector('[data-step-prev]').disabled = cur === 0;
      var nx = w.querySelector('[data-step-next]'); if (!nx.dataset.label) nx.dataset.label = nx.textContent.trim();
      nx.textContent = cur === steps.length - 1 ? (nx.dataset.lastLabel || 'Concluir') : nx.dataset.label;
    }
    w.querySelector('[data-step-prev]').addEventListener('click', function () { cur = Math.max(0, cur - 1); paint(); });
    w.querySelector('[data-step-next]').addEventListener('click', function () {
      if (cur === steps.length - 1) { emit(w, 'cz:steps-done'); return; }
      cur++; paint(); emit(w, 'cz:step', { step: cur });
    });
    paint();
  });
  /* ---------------------------------------------------------------- Validação */
  each('form[data-validate]', function (form) {
    function check(f) {
      var field = f.closest('.cz-field') || f.closest('.cz-check');
      var old = field.parentElement.querySelector('[data-err-for="' + f.id + '"]'); if (old) old.remove();
      var ok = f.checkValidity();
      f.setAttribute('aria-invalid', String(!ok));
      if (!ok) {
        var m = document.createElement('span');
        m.className = 'cz-error'; m.id = f.id + '-err'; m.dataset.errFor = f.id;
        m.innerHTML = icon('alert', 'i-sm'); m.appendChild(document.createTextNode(f.dataset.msg || 'Preencha este campo.'));
        (f.closest('.cz-field') || field).insertAdjacentElement(f.closest('.cz-field') ? 'beforeend' : 'afterend', m);
        f.setAttribute('aria-describedby', m.id);
      } else f.removeAttribute('aria-describedby');
      return ok;
    }
    var fields = $$('[required]', form);
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value || f.getAttribute('aria-invalid')) check(f); });
      f.addEventListener('change', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    // Inválido: foca o primeiro campo e avisa. Válido: dispara cz:valid (cancelável) e deixa o envio seguir.
    form.addEventListener('submit', function (e) {
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); toast('danger', bad.length === 1 ? '1 campo precisa de atenção' : bad.length + ' campos precisam de atenção', 'Corrija e envie de novo.'); return; }
      if (!emit(form, 'cz:valid')) e.preventDefault();
    });
    form.addEventListener('reset', function () {
      $$('.cz-error', form).forEach(function (x) { x.remove(); });
      fields.forEach(function (f) { f.removeAttribute('aria-invalid'); });
    });
  });
  /* ---------------------------------------------------------------- Avaliação por estrelas */
  each('[data-rating]', function (w) {
    var labels = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'], val = 0;
    var out = w.parentElement.querySelector('[data-rating-label]');
    w.innerHTML = labels.map(function (l, i) { return '<button type="button" role="radio" aria-checked="false" aria-label="' + (i + 1) + ' estrela' + (i ? 's' : '') + ', ' + l + '" data-v="' + (i + 1) + '">' + icon('star') + '</button>'; }).join('');
    var btns = $$('button', w);
    function paint(n) { btns.forEach(function (b, i) { b.classList.toggle('on', i < n); }); }
    btns.forEach(function (b, i) {
      b.addEventListener('mouseenter', function () { paint(i + 1); });
      b.addEventListener('click', function () { val = i + 1; btns.forEach(function (x, j) { x.setAttribute('aria-checked', String(j === i)); }); if (out) out.textContent = val + ' de 5 · ' + labels[i]; paint(val); emit(w, 'cz:rate', { value: val }); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' && btns[i + 1]) { btns[i + 1].focus(); btns[i + 1].click(); }
        if (e.key === 'ArrowLeft' && btns[i - 1]) { btns[i - 1].focus(); btns[i - 1].click(); }
      });
    });
    w.addEventListener('mouseleave', function () { paint(val); });
  });
  /* ---------------------------------------------------------------- Pagamento */
  each('[data-pay]', function (w) {
    w.addEventListener('change', function (e) {
      if (e.target.name !== 'pay') return;
      $$('[data-pay-panel]', w).forEach(function (p) { p.hidden = p.dataset.payPanel !== e.target.value; });
    });
  });
  drawSparks(scope);
  paintThemeIcon();
    scope = document;
  }

  window.Convertize = {
    version: VERSION,
    init: init,
    icon: icon, iconUrl: iconUrl, iconNames: CDN_NAMES, sideIcon: sideIcon, toast: toast, copy: copyText,
    openDialog: openDialog, closeDialog: closeDialog, closeMenus: closeMenus,
    createCmd: createCmd, renderPager: renderPager, drawFiles: drawFiles, drawSparks: drawSparks,
    theme: { get: currentTheme, set: setTheme },
    util: { $: $, $$: $$, esc: esc, norm: norm, brl: brl, cssVar: cssVar, store: store, emit: emit, pad: pad, openStack: openStack, cmds: cmds }
  };
  function start() {
    init();
    // Conteúdo inserido depois (React, Vue, fetch, innerHTML) liga sozinho, sem chamar init()
    if (!window.MutationObserver) return;
    var queued = false;
    new MutationObserver(function (records) {
      if (queued) return;
      var relevant = records.some(function (r) {
        return Array.prototype.some.call(r.addedNodes, function (n) {
          return n.nodeType === 1 && !(n.closest && n.closest('.cz-cmd-scrim,.cz-toast-region,[data-spark]'));
        });
      });
      if (!relevant) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; init(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
