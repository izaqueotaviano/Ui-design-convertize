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
  var SPRITE = "";
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
