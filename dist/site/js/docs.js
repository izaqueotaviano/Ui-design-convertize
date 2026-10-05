/* Site da documentação: rotas, busca, trechos de código e as demos das páginas.
   Depende de convertize.js (window.Convertize). Não faz parte do kit. */
(function () {
  'use strict';
  var C = window.Convertize, U = C.util;
  var $ = U.$, $$ = U.$$, icon = C.icon, toast = C.toast, esc = U.esc, norm = U.norm, brl = U.brl, store = U.store, pad = U.pad;
  var createCmd = C.createCmd, openDialog = C.openDialog, closeDialog = C.closeDialog, closeMenus = C.closeMenus, renderPager = C.renderPager;
  var copyText = C.copy, cmds = U.cmds, css = U.cssVar;
  var root = document.documentElement;
  document.addEventListener('cz:theme', function () { drawCharts(); });

  /* ---------------------------------------------------------------- Rotas e navegação */
  var pages = $$('.ds-page');
  var nav = $('#ds-nav');
  $$('[data-page-count]').forEach(function (el) { el.textContent = pages.length + ' páginas'; });

  pages.forEach(function (p, i) {
    var prev = pages[i - 1], next = pages[i + 1];
    var html = '<nav class="ds-pager" aria-label="Página anterior e próxima">';
    if (prev) html += '<a href="#' + prev.dataset.page + '"><small>' + icon('arrow-left', 'i-sm') + ' Anterior</small><strong>' + prev.dataset.title + '</strong></a>';
    if (next) html += '<a class="next" href="#' + next.dataset.page + '"><small>Próxima ' + icon('arrow-right', 'i-sm') + '</small><strong>' + next.dataset.title + '</strong></a>';
    p.insertAdjacentHTML('beforeend', html + '</nav>');
  });

  var main = $('#ds-main'), drawer = $('#ds-drawer'), rail = $('#ds-rail'), currentGroup = '';
  var wide = window.matchMedia('(min-width:1101px)');

  function showGroup(group) {
    $$('.ds-nav-group', nav).forEach(function (g) { g.classList.toggle('on', g.dataset.group === group); });
    $$('.cz-side-item', rail).forEach(function (a) {
      if (a.dataset.group === group) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function route() {
    var id = (location.hash || '').slice(1);
    var page = pages.filter(function (p) { return p.dataset.page === id; })[0] || pages[0];
    pages.forEach(function (p) { p.hidden = p !== page; });
    currentGroup = page.dataset.group;
    showGroup(currentGroup);
    $$('.ds-nav-group a', nav).forEach(function (a) {
      if (a.getAttribute('href') === '#' + page.dataset.page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    setNav(false);
    drawCharts();
  }
  window.addEventListener('hashchange', function () { route(); main.focus({ preventScroll: true }); requestAnimationFrame(function () { window.scrollTo(0, 0); }); });

  function setNav(open) {
    drawer.classList.toggle('open', open);
    $('#ds-nav-scrim').hidden = !open || wide.matches;
    $('#ds-menu').setAttribute('aria-expanded', String(open));
    if (!open && currentGroup) showGroup(currentGroup);
  }
  $('#ds-menu').addEventListener('click', function () { setNav(!drawer.classList.contains('open')); });
  $('#ds-nav-scrim').addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) setNav(false); });

  // No rail, telas largas navegam direto; nas menores o clique abre o painel do grupo
  rail.addEventListener('click', function (e) {
    var item = e.target.closest('.cz-side-item');
    tip.hidden = true;
    if (!item || wide.matches) return;
    e.preventDefault();
    e.stopPropagation();
    if (drawer.classList.contains('open') && rail.querySelector('[aria-current][data-group="' + item.dataset.group + '"]')) { setNav(false); return; }
    setNav(true);
    showGroup(item.dataset.group);
  });

  var tip = $('#ds-tip');
  function showTip(e) {
    var item = e.target.closest('[data-tip]');
    if (!item || (drawer.classList.contains('open') && !wide.matches)) { tip.hidden = true; return; }
    var r = item.getBoundingClientRect();
    tip.textContent = item.dataset.tip;
    tip.hidden = false;
    tip.style.transform = 'translate(' + (r.right + 10) + 'px,' + (r.top + r.height / 2 - tip.offsetHeight / 2) + 'px)';
  }
  rail.addEventListener('mouseover', showTip);
  rail.addEventListener('focusin', showTip);
  rail.addEventListener('mouseleave', function () { tip.hidden = true; });
  rail.addEventListener('focusout', function () { tip.hidden = true; });
  rail.addEventListener('scroll', function () { tip.hidden = true; });
  // Busca da documentação
  var groupIcon = function (g) { var u = rail.querySelector('[data-group="' + g + '"] use'); return u ? u.getAttribute('href').slice(3) : 'grid'; };
  var docsCmd = createCmd({
    label: 'Buscar no design system', placeholder: 'Buscar componente, token ou padrão',
    items: function () {
      return pages.map(function (p) {
        var lead = p.querySelector('.ds-lead, .ds-hero-text > p:not(.ds-hero-kicker)'), d = lead ? lead.textContent.trim().split(/(?<=\.)\s/)[0] : '';
        return { title: p.dataset.title, desc: d.length > 90 ? d.slice(0, 88).trim() + '…' : d, cat: p.dataset.group, icon: groupIcon(p.dataset.group), keys: p.dataset.keys, page: p.dataset.page };
      });
    },
    onPick: function (it) { location.hash = it.page; }
  });
  $('#ds-search-open').addEventListener('click', docsCmd.open);
  var demoCmd = createCmd({
    label: 'Buscar na loja', placeholder: 'Buscar...',
    items: function () {
      return [
        { title: 'Ir para Pedidos', desc: 'Todos os pedidos da loja', cat: 'Navegação', icon: 'bag', go: 'pedido' },
        { title: 'Ir para Produtos', desc: 'Catálogo e estoque', cat: 'Navegação', icon: 'box', go: 'tabela' },
        { title: 'Ir para Clientes', desc: 'Contatos e histórico de compras', cat: 'Navegação', icon: 'users', go: 'lista' },
        { title: 'Ir para Atendimento', desc: 'Conversas e tickets abertos', cat: 'Navegação', icon: 'headset', go: 'chat' },
        { title: 'Pedido #CV-2051', desc: 'Ana Beatriz Lima, R$ 229,90', cat: 'Pedido', icon: 'bag' },
        { title: 'Pedido #CV-2050', desc: 'Farmácia Brito, aguardando pagamento', cat: 'Pedido', icon: 'bag' },
        { title: 'Vaso Terra', desc: 'FRM-002, 2 em estoque', cat: 'Produto', icon: 'box' },
        { title: 'Luminária Círculo', desc: 'FRM-001, 8 em estoque', cat: 'Produto', icon: 'box' },
        { title: 'Criar cupom', desc: 'Desconto em percentual ou valor fixo', cat: 'Ação', icon: 'percent' },
        { title: 'Gerar etiquetas', desc: '11 pedidos prontos para envio', cat: 'Ação', icon: 'truck' },
        { title: 'Exportar pedidos', desc: 'CSV do mês atual', cat: 'Ação', icon: 'download' },
        { title: 'Alternar tema', desc: 'Claro ou escuro', cat: 'Sistema', icon: 'moon', theme: true },
        { title: 'Central de ajuda', desc: 'Artigos e tutoriais', cat: 'Ajuda', icon: 'help' },
        { title: 'Atalhos de teclado', desc: 'Todos os atalhos do painel', cat: 'Ajuda', icon: 'zap' }
      ];
    },
    onPick: function (it) {
      if (it.go) { location.hash = it.go; return; }
      if (it.theme) { C.theme.set(C.theme.get() === 'dark' ? 'light' : 'dark'); return; }
      toast('success', it.title, it.cat + ' aberto no exemplo.');
    }
  });
  $$('[data-cmd-demo]').forEach(function (b) { b.addEventListener('click', demoCmd.open); });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      var openOne = cmds.filter(function (c) { return c.isOpen(); })[0];
      if (openOne) openOne.close(); else docsCmd.open();
    }
  });
  /* ---------------------------------------------------------------- Código com cópia */
  // Sem escapar aspas: o realce de atributos procura por ="..."
  function escCode(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlight(src) {
    var h = escCode(src);
    if (/^\s*</.test(src)) {
      h = h.replace(/ ([a-z-:]+)="(.*?)"/gi, ' \u0001$1\u0002"$2"\u0003')
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '\u0004$1\u0005')
        .replace(/(&lt;\/?)([a-z0-9-]+)/gi, '$1\u0006$2\u0005')
        .replace(/\u0001/g, '<span class="a">').replace(/\u0002/g, '</span>=<span class="s">').replace(/\u0003/g, '</span>')
        .replace(/\u0004/g, '<span class="c">').replace(/\u0006/g, '<span class="t">').replace(/\u0005/g, '</span>');
    } else if (/[{};]/.test(src) && /--|:root/.test(src)) {
      h = h.replace(/(--[a-z0-9-]+)/g, '<span class="a">$1</span>').replace(/(#[0-9a-f]{3,6})\b/gi, '<span class="s">$1</span>');
    }
    return h;
  }
  $$('script.ds-snippet').forEach(function (s) {
    // <\/script> no fonte evita fechar o bloco antes da hora
    var src = s.textContent.replace(/^\n/, '').replace(/\s+$/, '').replace(/<\\\//g, '</');
    var box = document.createElement('div');
    box.className = 'ds-code';
    box.innerHTML = '<pre><code>' + highlight(src) + '</code></pre><button class="ds-copy" type="button" data-copied="Copiado">Copiar</button>';
    box.querySelector('.ds-copy').addEventListener('click', function () { copyText(src, this); });
    s.replaceWith(box);
  });
  /* ---------------------------------------------------------------- Ícones (biblioteca) */
  var grid = $('#icon-grid');
  if (grid) {
    var names = Object.keys(C.iconNames);
    grid.innerHTML = names.map(function (n) { return '<button type="button" data-icon="' + n + '" title="Copiar código">' + icon(n) + '<span>' + n + '</span></button>'; }).join('');
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-icon]');
      if (b) copyText(icon(b.dataset.icon));
    });
    $('#icon-filter').addEventListener('input', function () {
      var q = norm(this.value);
      $$('[data-icon]', grid).forEach(function (b) { b.hidden = q && b.dataset.icon.indexOf(q) < 0; });
    });
  }
  /* ---------------------------------------------------------------- Respostas das demos aos eventos do kit */
  document.addEventListener('cz:menu-pick', function (e) { toast('success', e.detail.label, 'Ação executada no exemplo.'); });
  document.addEventListener('cz:combo-create', function (e) { toast('success', 'Categoria criada', e.detail.value); });
  document.addEventListener('cz:dismiss', function () { toast('info', 'Aviso fechado', 'Ele volta ao recarregar a página.'); });
  document.addEventListener('cz:range', function (e) { toast('success', 'Período aplicado', e.detail.label); });
  document.addEventListener('cz:steps-done', function () { toast('success', 'Pedido confirmado', '#CV-2052 · enviamos os detalhes por e-mail.'); });
  document.addEventListener('cz:valid', function (e) {
    e.preventDefault();
    var login = e.target.closest('#login');
    toast('success', login ? 'Bem-vinda de volta' : 'Conta criada', login ? 'Abrindo o painel da Ateliê Forma.' : 'Enviamos a confirmação para o seu e-mail.');
  });
  document.addEventListener('click', function (e) {
    var sbp = e.target.closest('[data-sb-page]');
    if (sbp) {
      var demo = sbp.closest('[data-sidebar-demo]'), parts = sbp.dataset.sbPage.split('|');
      demo.querySelector('[data-sb-title]').textContent = parts[1];
      demo.querySelector('[data-sb-desc]').textContent = parts[2];
    }
    var ld = e.target.closest('[data-loading-demo]');
    if (ld && !ld.classList.contains('is-loading')) {
      ld.classList.add('is-loading'); ld.setAttribute('aria-busy', 'true');
      setTimeout(function () { ld.classList.remove('is-loading'); ld.removeAttribute('aria-busy'); toast('success', ld.textContent.trim().replace(/^Publicar produto$/, 'Produto publicado').replace(/^Sincronizar estoque$/, 'Estoque sincronizado'), 'Concluído agora.'); }, 1600);
    }
  });

  /* ---------------------------------------------------------------- Menu inferior expansível */
  var BM_CONTENT = {
    quick: function () {
      return '<div class="cz-bottom-menu-list">' +
        '<button type="button" class="cz-menu-item" data-bm-action="pedido">' + icon('bag') + 'Novo pedido</button>' +
        '<button type="button" class="cz-menu-item" data-bm-action="nota">' + icon('edit') + 'Nota rápida</button>' +
        '<button type="button" class="cz-menu-item" data-bm-action="scan">' + icon('qr') + 'Escanear código</button>' +
        '</div>';
    },
    search: function () {
      return '<div class="cz-bottom-menu-search">' +
        '<div class="cz-input-wrap">' + icon('search', 'i-sm') + '<input class="cz-input cz-input--sm" placeholder="Buscar pedidos, produtos ou clientes" aria-label="Buscar"></div>' +
        '<div class="ds-row" style="gap:6px">' +
        '<button type="button" class="cz-chip" style="flex:1;justify-content:center">' + icon('filter', 'i-sm') + 'Filtros</button>' +
        '<button type="button" class="cz-chip" style="flex:1;justify-content:center">' + icon('sparkle', 'i-sm') + 'Em alta</button>' +
        '</div></div>';
    },
    alerts: function () {
      return '<div class="cz-bottom-menu-list">' +
        '<button type="button" class="cz-menu-item">' + icon('bag') + 'Pedidos<span class="cz-badge cz-badge--brand" style="margin-left:auto">4</span></button>' +
        '<button type="button" class="cz-menu-item">' + icon('chat') + 'Mensagens<span class="cz-badge cz-badge--brand" style="margin-left:auto">2</span></button>' +
        '<button type="button" class="cz-menu-item">' + icon('alert') + 'Estoque baixo</button>' +
        '</div>';
    },
    account: function () {
      return '<div class="cz-bottom-menu-list">' +
        '<button type="button" class="cz-menu-item">' + icon('user') + 'Minha conta</button>' +
        '<button type="button" class="cz-menu-item">' + icon('sliders') + 'Configurações</button>' +
        '<div class="cz-menu-sep"></div>' +
        '<button type="button" class="cz-menu-item cz-menu-item--danger">' + icon('logout') + 'Sair</button>' +
        '</div>';
    },
    theme: function () {
      var active = root.getAttribute('data-theme') || 'system';
      var opt = function (key, name, label) {
        return '<button type="button" class="cz-bm-theme-opt" data-theme-pick="' + key + '" aria-pressed="' + (active === key) + '">' + icon(name) + label + '</button>';
      };
      return '<div class="cz-bottom-menu-theme">' + opt('light', 'sun', 'Claro') + opt('dark', 'moon', 'Escuro') + opt('system', 'monitor', 'Sistema') + '</div>';
    }
  };
  function initBottomMenu(el) {
    var bar = $('[data-bm-bar]', el), panel = $('[data-bm-panel]', el), inner = $('[data-bm-inner]', el), measure = $('[data-bm-measure]', el);
    var open = null, closeTimer;
    function buttons() { return $$('[data-bm-key]', bar); }
    function setSize(html) {
      measure.innerHTML = html;
      var size = { w: measure.scrollWidth, h: measure.scrollHeight };
      measure.innerHTML = '';
      return size;
    }
    function close() {
      if (!open) return;
      buttons().forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      panel.style.width = '0px'; panel.style.height = '0px';
      panel.classList.remove('is-open');
      open = null;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () { panel.hidden = true; inner.innerHTML = ''; }, 320);
    }
    function show(key) {
      var html = BM_CONTENT[key] ? BM_CONTENT[key]() : '';
      var size = setSize(html);
      clearTimeout(closeTimer);
      buttons().forEach(function (b) { b.setAttribute('aria-expanded', String(b.dataset.bmKey === key)); });
      if (!open) {
        panel.hidden = false;
        panel.style.width = '0px'; panel.style.height = '0px';
        inner.innerHTML = html;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            panel.classList.add('is-open');
            panel.style.width = size.w + 'px'; panel.style.height = size.h + 'px';
          });
        });
      } else if (open === key) {
        inner.innerHTML = html;
        panel.style.width = size.w + 'px'; panel.style.height = size.h + 'px';
      } else {
        inner.classList.add('is-switching');
        setTimeout(function () {
          inner.innerHTML = html;
          panel.style.width = size.w + 'px'; panel.style.height = size.h + 'px';
          inner.classList.remove('is-switching');
        }, 120);
      }
      open = key;
    }
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-bm-key]');
      if (!b) return;
      var key = b.dataset.bmKey;
      if (open === key) close(); else show(key);
    });
    inner.addEventListener('click', function (e) {
      var pick = e.target.closest('[data-theme-pick]');
      if (pick) {
        var next = pick.dataset.themePick;
        C.theme.set(next);
        show('theme');
        return;
      }
      var action = e.target.closest('[data-bm-action]');
      if (action) {
        var msg = { pedido: ['Pedido iniciado', 'Escolha o cliente para continuar.'], nota: ['Nota criada', 'Salva em Notas rápidas.'], scan: ['Câmera indisponível', 'Exemplo estático: escaneie em um app real.'] }[action.dataset.bmAction];
        if (msg) toast('success', msg[0], msg[1]);
        close();
      }
    });
    document.addEventListener('click', function (e) {
      if (!open) return;
      var path = e.composedPath ? e.composedPath() : [e.target];
      if (path.indexOf(el) === -1) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !open) return;
      var key = open, btn = $('[data-bm-key="' + key + '"]', bar);
      close();
      if (btn) btn.focus();
    });
  }
  $$('[data-bottom-menu]').forEach(initBottomMenu);
  /* ---------------------------------------------------------------- Progresso */
  var progTimer;
  function runProgress() {
    var bar = $('[data-prog]'), label = $('[data-prog-label]'); if (!bar) return;
    var v = 0; clearInterval(progTimer);
    progTimer = setInterval(function () {
      v = Math.min(100, v + 4); bar.firstElementChild.style.setProperty('--v', v + '%'); bar.setAttribute('aria-valuenow', v);
      label.textContent = v < 100 ? v + '% · ' + Math.round(v * 2.4) + ' de 240 produtos' : 'Concluído · 240 produtos';
      if (v >= 100) clearInterval(progTimer);
    }, 120);
  }
  var pr = $('[data-prog-run]'); if (pr) pr.addEventListener('click', runProgress);
  runProgress();
  /* ---------------------------------------------------------------- Carrinho */
  $$('[data-cart]').forEach(function (cart) {
    var discount = 0;
    function recalc() {
      var lines = $$('.cz-cart-line', cart), sub = 0, items = 0;
      lines.forEach(function (l) {
        var q = +l.querySelector('input').value, price = +l.dataset.price;
        sub += q * price; items += q;
        l.querySelector('[data-line-total]').textContent = brl(q * price);
      });
      var disc = sub * discount, freeFrom = 199, ship = sub - disc >= freeFrom || !sub ? 0 : 23.9;
      cart.querySelector('[data-cart-count]').textContent = items === 1 ? '1 item' : items + ' itens';
      cart.querySelector('[data-sum-sub]').textContent = brl(sub);
      cart.querySelector('[data-sum-disc-row]').hidden = !discount;
      cart.querySelector('[data-sum-disc]').textContent = '− ' + brl(disc);
      cart.querySelector('[data-sum-ship]').textContent = ship ? brl(ship) : 'Grátis';
      var left = freeFrom - (sub - disc);
      cart.querySelector('[data-ship-bar]').style.setProperty('--v', Math.min(100, (sub - disc) / freeFrom * 100) + '%');
      cart.querySelector('[data-ship-msg]').textContent = !sub ? 'Seu carrinho está vazio.' : left > 0 ? 'Faltam ' + brl(left) + ' para o frete grátis.' : 'Você ganhou frete grátis.';
      cart.querySelector('[data-sum-total]').textContent = brl(sub - disc + ship);
    }
    cart.addEventListener('qty', recalc);
    cart.addEventListener('click', function (e) {
      var r = e.target.closest('[data-remove-line]');
      if (r) { var l = r.closest('.cz-cart-line'), name = l.querySelector('b').textContent; l.remove(); recalc(); toast('success', 'Item removido', name + ' saiu do carrinho.', true); }
      if (e.target.closest('[data-coupon-apply]')) {
        var inp = cart.querySelector('[data-coupon-input]'), msg = cart.querySelector('[data-coupon-msg]');
        if (inp.value.trim().toUpperCase() === 'CONVERTIZE10') {
          discount = .1; inp.setAttribute('aria-invalid', 'false'); msg.className = 'cz-help'; msg.textContent = 'Cupom aplicado: 10% de desconto.';
        } else {
          discount = 0; inp.setAttribute('aria-invalid', 'true'); msg.className = 'cz-error'; msg.textContent = 'Cupom “' + inp.value + '” não existe ou expirou. Confira as letras.';
        }
        recalc();
      }
    });
    recalc();
  });
  /* ---------------------------------------------------------------- Segmentos */
  $$('[data-segments]').forEach(function (w) {
    w.addEventListener('click', function (e) {
      var c = e.target.closest('[data-seg]'); if (!c) return;
      $$('[data-seg]', w).forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
      var p = c.dataset.seg.split('|');
      w.querySelector('[data-seg-name]').textContent = 'Modelo selecionado · ' + p[0];
      w.querySelector('[data-seg-title]').textContent = p[1];
      w.querySelector('[data-seg-desc]').textContent = p[2];
    });
  });

  /* ---------------------------------------------------------------- Chat */
  $$('[data-chat]').forEach(function (chat) {
    var body = chat.querySelector('[data-chat-body]'), form = chat.querySelector('[data-composer]'), ta = form.querySelector('textarea'), send = form.querySelector('.send');
    var replies = ['Pronto! Reconectei a integração e o estoque já voltou a sincronizar.', 'Ótimo, obrigado! Vou conferir aqui.', 'Se aparecer de novo, me chama por aqui mesmo.'];
    var turn = 0, busy = false;
    setTimeout(function () {
      var tool = body.querySelector('.cz-tool');
      if (tool) tool.innerHTML = icon('check-circle', 'ok') + '<span>Mercado Livre · token expirado há 2 dias</span>';
    }, 2200);
    function stamp() { var d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    function add(cls, text, who) {
      var m = document.createElement('div');
      m.className = 'cz-msg ' + cls; m.textContent = text;
      m.insertAdjacentHTML('beforeend', '<small>' + (who ? who + ' · ' : '') + stamp() + '</small>');
      body.appendChild(m); body.scrollTop = body.scrollHeight;
    }
    function autosize() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; send.disabled = !ta.value.trim() || busy; }
    ta.addEventListener('input', autosize);
    ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!send.disabled) form.requestSubmit(); } });
    chat.querySelectorAll('[data-quick]').forEach(function (q) { q.addEventListener('click', function () { ta.value = q.textContent; autosize(); ta.focus(); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = ta.value.trim(); if (!text || busy) return;
      add('cz-msg--me', text, 'Marina'); ta.value = ''; busy = true; autosize();
      var typing = document.createElement('div'); typing.className = 'cz-typing'; typing.setAttribute('aria-label', 'Eriton está digitando'); typing.innerHTML = '<i></i><i></i><i></i>';
      body.appendChild(typing); body.scrollTop = body.scrollHeight;
      setTimeout(function () {
        typing.remove(); busy = false;
        add('cz-msg--them', replies[Math.min(turn + 1, replies.length - 1)]); turn++; autosize();
      }, 1400);
    });
  });

  /* ---------------------------------------------------------------- Tabela de produtos */
  var PRODUCTS = [
    ['Vaso Terra', 'FRM-002', 'Cerâmica', 229.9, 2, '22/09', 'vase'], ['Luminária Círculo', 'FRM-001', 'Iluminação', 64.9, 8, '21/09', 'lamp'],
    ['Caixa Essencial', 'FRM-003', 'Embalagens', 39.9, 0, '20/09', 'box'], ['Tigela Rio', 'FRM-004', 'Cerâmica', 89.9, 34, '19/09', 'vase'],
    ['Pendente Aro', 'FRM-005', 'Iluminação', 349, 5, '18/09', 'lamp'], ['Caderno Linho', 'FRM-006', 'Papelaria', 54.9, 120, '18/09', 'box'],
    ['Manta Algodão Cru', 'FRM-007', 'Têxteis', 199, 17, '17/09', 'box'], ['Prato Areia', 'FRM-008', 'Cerâmica', 74.9, 0, '16/09', 'vase'],
    ['Cartão Postal Fig', 'FRM-009', 'Papelaria', 12.9, 300, '15/09', 'box'], ['Arandela Sol', 'FRM-010', 'Iluminação', 279.9, 3, '14/09', 'lamp'],
    ['Saco Kraft P', 'FRM-011', 'Embalagens', 9.9, 850, '13/09', 'box'], ['Caneca Oliva', 'FRM-012', 'Cerâmica', 59.9, 46, '12/09', 'vase'],
    ['Almofada Heather', 'FRM-013', 'Têxteis', 119, 9, '11/09', 'box'], ['Luminária Seixo', 'FRM-014', 'Iluminação', 159, 12, '10/09', 'lamp'],
    ['Fita de Papel', 'FRM-015', 'Embalagens', 18.5, 4, '09/09', 'box'], ['Agenda 2027', 'FRM-016', 'Papelaria', 89, 60, '08/09', 'box']
  ].map(function (r) { return { name: r[0], sku: r[1], cat: r[2], price: r[3], stock: r[4], updated: r[5], img: r[6] }; });
  var imgSrc = {};
  $$('img[src^="data:image/webp"], img[src$=".webp"]').forEach(function (im) {
    var a = im.getAttribute('alt') || '';
    if (/Vaso|vaso|cerâmica/.test(a) && !imgSrc.vase) imgSrc.vase = im.src;
    if (/Luminária|luminária/.test(a) && !imgSrc.lamp) imgSrc.lamp = im.src;
    if (/Caixa|caixa|kraft/.test(a) && !imgSrc.box) imgSrc.box = im.src;
  });
  var statusOf = function (p) { return p.stock === 0 ? 'Esgotado' : p.stock <= 5 ? 'Baixo estoque' : 'Ativo'; };
  var statusTone = { 'Ativo': 'success', 'Baixo estoque': 'warning', 'Esgotado': 'danger' };
  $$('[data-products-table]').forEach(function (w) {
    var state = { q: '', cat: '', status: '', sort: null, dir: 1, page: 1, sel: {} }, per = 6;
    var body = w.querySelector('[data-t-body]');
    function rows() {
      var q = norm(state.q);
      var r = PRODUCTS.filter(function (p) {
        return (!q || norm(p.name + ' ' + p.sku).indexOf(q) > -1) && (!state.cat || p.cat === state.cat) && (!state.status || statusOf(p) === state.status);
      });
      if (state.sort) r.sort(function (a, b) {
        var x = a[state.sort], y = b[state.sort];
        if (state.sort === 'updated') { x = x.split('/').reverse().join(''); y = y.split('/').reverse().join(''); }
        return (x > y ? 1 : x < y ? -1 : 0) * state.dir;
      });
      return r;
    }
    function render() {
      var r = rows(), pages = Math.max(1, Math.ceil(r.length / per));
      state.page = Math.min(state.page, pages);
      var slice = r.slice((state.page - 1) * per, state.page * per);
      body.innerHTML = slice.map(function (p) {
        var s = statusOf(p), on = !!state.sel[p.sku];
        return '<tr class="' + (on ? 'is-selected' : '') + '"><td style="padding-right:0"><label class="cz-check cz-check--round"><input type="checkbox" data-sku="' + p.sku + '" aria-label="Selecionar ' + p.name + '"' + (on ? ' checked' : '') + '></label></td>' +
          '<td><span class="sku">#' + p.sku + '<button type="button" class="cz-icon-btn cz-icon-btn--sm" data-row="copy" data-k="' + p.sku + '" aria-label="Copiar SKU ' + p.sku + '">' + icon('copy', 'i-sm') + '</button></span></td>' +
          '<td><div class="prod"><img src="' + (imgSrc[p.img] || '') + '" alt=""><div><b>' + p.name + '</b><small>' + p.cat + '</small></div></div></td>' +
          '<td class="r num">' + brl(p.price) + '</td><td class="r num">' + p.stock + '</td>' +
          '<td><span class="cz-badge cz-badge--' + statusTone[s] + '"><span class="d"></span>' + s + '</span></td><td class="num">' + p.updated + '/2026</td>' +
          '<td><div class="row-actions">' +
            '<button type="button" class="cz-icon-btn cz-icon-btn--sm cz-icon-btn--tonal" data-row="view" data-k="' + p.sku + '" aria-label="Ver ' + p.name + ' na loja" title="Ver na loja">' + icon('eye', 'i-sm') + '</button>' +
            '<button type="button" class="cz-icon-btn cz-icon-btn--sm cz-icon-btn--tonal" data-row="edit" data-k="' + p.sku + '" aria-label="Editar ' + p.name + '" title="Editar">' + icon('edit', 'i-sm') + '</button>' +
            '<button type="button" class="cz-icon-btn cz-icon-btn--sm cz-icon-btn--danger" data-row="delete" data-k="' + p.sku + '" aria-label="Excluir ' + p.name + '" title="Excluir">' + icon('trash', 'i-sm') + '</button>' +
          '</div></td></tr>';
      }).join('');
      w.querySelector('[data-t-empty]').hidden = r.length > 0;
      w.querySelector('.cz-table-scroll').hidden = !r.length;
      var a = r.length ? (state.page - 1) * per + 1 : 0, b = Math.min(state.page * per, r.length);
      w.querySelector('[data-t-info]').textContent = a + '–' + b + ' de ' + r.length + (r.length === 1 ? ' produto' : ' produtos');
      renderPager(w.querySelector('[data-t-pages]'), state.page, pages, function (p) { state.page = p; render(); });
      var n = Object.keys(state.sel).length, all = w.querySelector('[data-t-all]'), vis = slice.filter(function (p) { return state.sel[p.sku]; }).length;
      all.checked = slice.length && vis === slice.length; all.indeterminate = vis > 0 && vis < slice.length;
      var bar = w.querySelector('[data-t-bulk]'), total = r.length, selAll = w.querySelector('[data-t-select-all]');
      bar.hidden = !n;
      document.body.classList.toggle('has-action-bar', !!n);
      w.querySelector('[data-t-bulk-count]').textContent = n === 1 ? '1 selecionado' : n + ' selecionados';
      selAll.hidden = !(n && n < total && vis === slice.length);
      selAll.textContent = 'Selecionar os ' + total + ' produtos';
      if (n) placeBar();
      $$('th[data-sort]', w).forEach(function (th) { th.setAttribute('aria-sort', th.dataset.sort === state.sort ? (state.dir > 0 ? 'ascending' : 'descending') : 'none'); });
    }
    var qChip = w.querySelector('[data-t-q-chip]');
    function setQuery(q, label) {
      state.q = q; state.page = 1;
      qChip.hidden = !q; w.querySelector('[data-t-q-text]').textContent = label || q;
      render();
    }
    w.querySelector('[data-t-q-clear]').addEventListener('click', function () { setQuery(''); w.querySelector('[data-t-find]').focus(); });
    var tableCmd = createCmd({
      label: 'Buscar produtos', placeholder: 'Nome, SKU ou categoria',
      items: function () {
        return PRODUCTS.map(function (p) { return { title: p.name, desc: p.sku + ', ' + p.cat + ', ' + brl(p.price), cat: statusOf(p), icon: 'box', sku: p.sku }; }).concat([
          { title: 'Novo produto', desc: 'Cadastrar um item no catálogo', cat: 'Ação', icon: 'plus', act: 'new' },
          { title: 'Exportar CSV', desc: 'Todos os produtos da lista', cat: 'Ação', icon: 'download', act: 'export' },
          { title: 'Mostrar só esgotados', desc: 'Filtrar pelo status', cat: 'Filtro', icon: 'filter', act: 'st', v: 'Esgotado' },
          { title: 'Mostrar baixo estoque', desc: 'Até 5 unidades', cat: 'Filtro', icon: 'filter', act: 'st', v: 'Baixo estoque' },
          { title: 'Limpar filtros', desc: 'Busca, categoria e status', cat: 'Filtro', icon: 'x', act: 'clear' }
        ]);
      },
      onPick: function (it) {
        if (it.sku) { setQuery(it.sku, it.title); return; }
        if (it.act === 'st') { state.status = it.v; w.querySelector('[data-t-status]').value = it.v; state.page = 1; render(); return; }
        if (it.act === 'clear') { w.querySelector('[data-t-clear]').click(); return; }
        if (it.act === 'new') toast('info', 'Novo produto', 'O formulário de cadastro abre no painel.');
        if (it.act === 'export') toast('success', 'Exportação iniciada', 'Você recebe o CSV por e-mail em instantes.');
      }
    });
    w.querySelector('[data-t-find]').addEventListener('click', tableCmd.open);
    w.querySelector('[data-t-cat]').addEventListener('change', function () { state.cat = this.value; state.page = 1; render(); });
    w.querySelector('[data-t-status]').addEventListener('change', function () { state.status = this.value; state.page = 1; render(); });
    w.querySelector('[data-t-clear]').addEventListener('click', function () {
      state.cat = state.status = ''; w.querySelector('[data-t-cat]').value = ''; w.querySelector('[data-t-status]').value = ''; setQuery('');
    });
    $$('th[data-sort] button', w).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.parentElement.dataset.sort;
        if (state.sort === k) state.dir *= -1; else { state.sort = k; state.dir = 1; }
        render();
      });
    });
    var bar = w.querySelector('[data-t-bulk]');
    function placeBar() {
      if (window.matchMedia('(max-width:560px)').matches) { bar.style.left = ''; return; }
      var rc = w.getBoundingClientRect();
      bar.style.left = Math.round(rc.left + rc.width / 2) + 'px';
    }
    window.addEventListener('resize', function () { if (!bar.hidden) placeBar(); });
    function selected() { return PRODUCTS.filter(function (p) { return state.sel[p.sku]; }); }
    function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
    function clearSel() { state.sel = {}; render(); }
    // Ajuste de preço em massa
    var dlg = document.getElementById('dlg-bulk-price'), bpDir = -1;
    function bpPreview() {
      var pct = Math.max(0, Math.min(90, +dlg.querySelector('#bp-pct').value || 0)), items = selected();
      var f = function (v) { return Math.round(v * (1 + bpDir * pct / 100) * 100) / 100; };
      var ex = items[0];
      dlg.querySelector('[data-bp-preview]').textContent = ex ? 'Exemplo: ' + ex.name + ' passa de ' + brl(ex.price) + ' para ' + brl(f(ex.price)) + '.' : '';
      return f;
    }
    if (dlg) {
      dlg.querySelector('[data-bp-dir]').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        $$('button', b.parentElement).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        bpDir = +b.dataset.v; bpPreview();
      });
      dlg.querySelector('#bp-pct').addEventListener('input', bpPreview);
      dlg.querySelector('[data-bp-form]').addEventListener('submit', function (e) { e.preventDefault(); dlg.querySelector('[data-bp-apply]').click(); });
      dlg.querySelector('[data-bp-apply]').addEventListener('click', function () {
        var f = bpPreview(), items = selected(), pct = +dlg.querySelector('#bp-pct').value || 0;
        if (!pct) { dlg.querySelector('#bp-pct').focus(); return; }
        var before = items.map(function (p) { return p.price; });
        items.forEach(function (p) { p.price = f(p.price); });
        closeDialog(); render();
        toast('success', 'Preço ajustado em ' + plural(items.length, 'produto', 'produtos'), (bpDir > 0 ? 'Aumento' : 'Redução') + ' de ' + pct + '%.', function () { items.forEach(function (p, i) { p.price = before[i]; }); render(); });
      });
    }
    var ACTIONS = {
      price: function (n, btn) {
        dlg.querySelector('[data-bp-desc]').textContent = 'O novo preço vale para ' + plural(n, 'produto selecionado', 'produtos selecionados') + ', em todos os canais.';
        bpPreview(); openDialog('dlg-bulk-price', btn);
      },
      publish: function (n) { toast('success', plural(n, 'produto enviado', 'produtos enviados') + ' ao Mercado Livre', 'Os anúncios aparecem em até 15 minutos.'); },
      export: function (n) { toast('success', 'Exportação de ' + plural(n, 'produto', 'produtos') + ' iniciada', 'Você recebe o CSV por e-mail em instantes.'); },
      promo: function (n) { toast('success', plural(n, 'produto', 'produtos') + ' na promoção Primavera', '15% de desconto até 30 de setembro.'); },
      labels: function (n) { toast('success', 'Etiquetas prontas', plural(n, 'etiqueta', 'etiquetas') + ' de código de barras em PDF.'); },
      pause: function (n) { toast('info', 'Vendas pausadas', plural(n, 'produto saiu', 'produtos saíram') + ' da vitrine e dos marketplaces.'); },
      duplicate: function (n) {
        var copies = selected().map(function (p) { return { name: p.name + ' (cópia)', sku: p.sku + '-C', cat: p.cat, price: p.price, stock: 0, updated: '24/09', img: p.img }; });
        PRODUCTS.unshift.apply(PRODUCTS, copies); state.sel = {}; state.page = 1; render();
        toast('success', plural(n, 'cópia criada', 'cópias criadas'), 'As cópias começam sem estoque e fora da vitrine.', function () { copies.forEach(function (c) { var i = PRODUCTS.indexOf(c); if (i > -1) PRODUCTS.splice(i, 1); }); render(); });
      },
      'delete': function (n) {
        var gone = [];
        PRODUCTS.forEach(function (p, i) { if (state.sel[p.sku]) gone.push([i, p]); });
        for (var k = gone.length - 1; k >= 0; k--) PRODUCTS.splice(gone[k][0], 1);
        state.sel = {}; render();
        toast('success', plural(n, 'produto excluído', 'produtos excluídos'), 'Ficam na lixeira por 30 dias.', function () { gone.forEach(function (g) { PRODUCTS.splice(g[0], 0, g[1]); }); render(); });
      },
      clear: function () { clearSel(); }
    };
    function removeSkus(skus, title) {
      var gone = [];
      PRODUCTS.forEach(function (p, i) { if (skus.indexOf(p.sku) > -1) gone.push([i, p]); });
      for (var k = gone.length - 1; k >= 0; k--) { PRODUCTS.splice(gone[k][0], 1); delete state.sel[gone[k][1].sku]; }
      render();
      toast('success', title, 'Fica na lixeira por 30 dias.', function () { gone.forEach(function (g) { PRODUCTS.splice(g[0], 0, g[1]); }); render(); });
    }
    w.addEventListener('click', function (e) {
      var rb = e.target.closest('[data-row]');
      if (rb) {
        var prod = PRODUCTS.filter(function (p) { return p.sku === rb.dataset.k; })[0]; if (!prod) return;
        if (rb.dataset.row === 'copy') {
          var done = function () { toast('success', 'SKU copiado', prod.sku + ' está na área de transferência.'); };
          var legacy = function () {
            var t = document.createElement('textarea'); t.value = prod.sku; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (err) {} t.remove(); rb.focus();
            if (ok) done(); else toast('info', 'Não deu para copiar', 'O navegador bloqueou a área de transferência. O SKU é ' + prod.sku + '.');
          };
          if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(prod.sku).then(done, legacy); else legacy();
        }
        if (rb.dataset.row === 'view') toast('info', 'Abrindo ' + prod.name, 'A página do produto abre em outra aba na loja.');
        if (rb.dataset.row === 'edit') toast('info', 'Editando ' + prod.name, 'O formulário do produto abre no painel.');
        if (rb.dataset.row === 'delete') removeSkus([prod.sku], prod.name + ' excluído');
        return;
      }
      if (e.target.closest('[data-t-select-all]')) { rows().forEach(function (p) { state.sel[p.sku] = 1; }); render(); return; }
      var b = e.target.closest('[data-bulk]'); if (!b) return;
      e.stopPropagation(); closeMenus();
      var n = Object.keys(state.sel).length;
      ACTIONS[b.dataset.bulk](n, b.closest('.cz-pop') ? b.closest('.cz-pop').querySelector('[data-menu-trigger]') : b);
    });
    bar.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !bar.querySelector('[aria-expanded="true"]')) { clearSel(); var all = w.querySelector('[data-t-all]'); all.focus(); } });
    w.addEventListener('change', function (e) {
      if (e.target.matches('[data-sku]')) { if (e.target.checked) state.sel[e.target.dataset.sku] = 1; else delete state.sel[e.target.dataset.sku]; render(); }
      if (e.target.matches('[data-t-all]')) {
        var r = rows().slice((state.page - 1) * per, state.page * per);
        r.forEach(function (p) { if (e.target.checked) state.sel[p.sku] = 1; else delete state.sel[p.sku]; }); render();
      }
    });
    render();
  });

  /* ---------------------------------------------------------------- Cartão de métrica */
  var MONTHS_PT = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
  function fmtDatePt(d) { return d.getDate() + ' ' + MONTHS_PT[d.getMonth()]; }
  // Série diária determinística (sem Math.random): base + tendência + duas ondas.
  function metricSeries(days, base, amp, trendPerDay, seed, round) {
    var out = [], end = new Date(2026, 8, 22), start = new Date(end);
    start.setDate(end.getDate() - (days - 1));
    for (var i = 0; i < days; i++) {
      var day = new Date(start); day.setDate(start.getDate() + i);
      var noise = Math.sin(i * seed) * amp + Math.sin(i * 0.6 + seed * 2) * amp * 0.45;
      var v = base + trendPerDay * i + noise;
      out.push({ date: day, value: Math.max(0, round ? Math.round(v) : Math.round(v * 100) / 100) });
    }
    return out;
  }
  var metricCards = [];
  function initMetricCard(el) {
    var full = el.dataset.unit === 'currency'
      ? metricSeries(90, 780, 190, 9.6, 0.9, true)
      : metricSeries(90, 5.5, 2.6, 0.028, 1.7, true);
    if (el.dataset.demo === 'pedidos') full = metricSeries(90, 5.4, 2.4, 0.03, 2.3, true);
    var region = $('.cz-metric-region', el), svg = $('svg', region), tip = $('.cz-metric-tip', el);
    var state = { period: +el.dataset.period || 30, view: el.dataset.view || 'line' };
    var isCurrency = el.dataset.unit === 'currency';
    var shortFmt = function (v) { return isCurrency ? brl(v).replace(/,00$/, '') : Math.round(v).toLocaleString('pt-BR'); };
    var pts = [];
    function render() {
      pts = full.slice(-state.period);
      var vals = pts.map(function (p) { return p.value; });
      var sum = vals.reduce(function (a, b) { return a + b; }, 0);
      var first = vals[0], last = vals[vals.length - 1], prev = vals.length > 1 ? vals[vals.length - 2] : first;
      var net = last - first, pct = first ? net / first * 100 : 0;
      var trend = Math.abs(pct) < 1 ? 'flat' : net >= 0 ? 'up' : 'down';
      var peak = Math.max.apply(0, vals), low = Math.min.apply(0, vals), avg = sum / vals.length;
      $('[data-mc-total]', el).textContent = isCurrency ? brl(sum) : Math.round(sum).toLocaleString('pt-BR');
      var trendEl = $('[data-mc-trend]', el);
      trendEl.className = 'cz-metric-trend ' + trend;
      trendEl.innerHTML = icon(trend === 'down' ? 'arrow-down' : trend === 'flat' ? 'arrow-right' : 'arrow-up-right', 'i-sm') + Math.abs(pct).toFixed(1) + '%';
      var step = last - prev;
      $('[data-mc-delta]', el).innerHTML = '<b class="' + (step >= 0 ? 'up' : 'down') + '">' + (step >= 0 ? '+' : '−') + shortFmt(Math.abs(step)) + '</b> no último dia';
      $('[data-mc-peak]', el).textContent = shortFmt(peak);
      $('[data-mc-low]', el).textContent = shortFmt(low);
      $('[data-mc-avg]', el).textContent = shortFmt(avg);
      $$('[data-mc-period] button', el).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.mcPeriod === state.period)); });
      $$('[data-mc-view] button', el).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mcView === state.view)); });
      drawChart();
      hideTip();
    }
    function drawChart() {
      var W = 640, H = 400, pad = 20;
      var vals = pts.map(function (p) { return p.value; });
      var max = Math.max.apply(0, vals), min = Math.min.apply(0, vals);
      if (max === min) max = min + 1;
      var x = function (i) { return pad + (pts.length > 1 ? i / (pts.length - 1) : 0) * (W - pad * 2); };
      var y = function (v) { return H - pad - (v - min) / (max - min) * (H - pad * 2); };
      var color = css('--chart-1');
      var html;
      if (state.view === 'bar') {
        var bw = (W - pad * 2) / pts.length * 0.5;
        html = pts.map(function (p, i) {
          var cx = x(i), top = y(p.value);
          return '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(2, H - pad - top).toFixed(1) + '" rx="3" fill="' + color + '" opacity="' + (0.32 + 0.68 * i / Math.max(1, pts.length - 1)).toFixed(2) + '"/>';
        }).join('');
      } else {
        var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1); }).join('');
        html = '<path d="' + line + ' L' + x(pts.length - 1).toFixed(1) + ' ' + H + ' L' + x(0).toFixed(1) + ' ' + H + 'Z" fill="' + color + '" opacity=".14"/>' +
          '<path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>';
      }
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.innerHTML = html;
      svg._x = x; svg._W = W;
    }
    function hideTip() { tip.classList.remove('is-visible'); }
    region.addEventListener('pointermove', function (e) {
      if (!pts.length || !svg._x) return;
      var r = region.getBoundingClientRect(), frac = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      var idx = Math.round(frac * (pts.length - 1)), p = pts[idx];
      if (!p) return;
      var cardRect = el.getBoundingClientRect();
      var px = (r.left + frac * r.width) - cardRect.left;
      var py = e.clientY - cardRect.top;
      tip.style.left = px + 'px'; tip.style.top = py + 'px';
      tip.innerHTML = '<b>' + (isCurrency ? brl(p.value) : Math.round(p.value).toLocaleString('pt-BR')) + '</b>' + fmtDatePt(p.date);
      tip.classList.add('is-visible');
    });
    region.addEventListener('pointerleave', hideTip);
    el.addEventListener('click', function (e) {
      var pb = e.target.closest('[data-mc-period] button');
      if (pb) { state.period = +pb.dataset.mcPeriod; render(); return; }
      var vb = e.target.closest('[data-mc-view] button');
      if (vb) { state.view = vb.dataset.mcView; render(); }
    });
    render();
    metricCards.push({ el: el, redraw: drawChart });
  }
  $$('[data-metric-card]').forEach(initMetricCard);

  /* ---------------------------------------------------------------- Painel da loja */
  var dashRender = function () {};
  (function () {
    var root = $('[data-dash]');
    if (!root) return;
    var NOW = 14; // 14h02 de quinta, 24 de setembro
    var WD = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    function wave(i, n, phase) { return Math.sin(i * 1.7 + phase) * 0.5 + Math.sin(i * 0.63 + phase * 2) * 0.5; }
    function scaleTo(arr, upto, total) { var s = 0; for (var i = 0; i < upto; i++) s += arr[i]; return arr.map(function (v) { return v * total / s; }); }
    function hourShape(h, k) { var a = Math.exp(-Math.pow((h - 10.5) / 2.6, 2)), b = 0.75 * Math.exp(-Math.pow((h - 16) / 2.4, 2)), c = 0.5 * Math.exp(-Math.pow((h - 21) / 1.8, 2)); return 0.04 + a + b + c + 0.06 * wave(h, 24, k); }
    function dayLabels(n) {
      var out = [], d = new Date(2026, 8, 24);
      for (var i = n - 1; i >= 0; i--) { var x = new Date(d); x.setDate(d.getDate() - i); out.push(n <= 7 ? WD[x.getDay()] : String(x.getDate()).padStart(2, '0') + '/' + String(x.getMonth() + 1).padStart(2, '0')); }
      return out;
    }
    function daily(n, total, k) { return scaleTo(Array.apply(null, Array(n)).map(function (_, i) { var d = new Date(2026, 8, 24 - (n - 1 - i)).getDay(); return 1 + (d === 0 || d === 6 ? -0.18 : 0) + (d === 1 ? 0.12 : 0) + 0.08 * wave(i, n, k); }), n, total); }
    var hours = Array.apply(null, Array(24)).map(function (_, h) { return String(h).padStart(2, '0') + 'h'; });
    var todayO = scaleTo(hours.map(function (_, h) { return hourShape(h, 0.3); }), NOW + 1, 312);
    var ydayO = scaleTo(hours.map(function (_, h) { return hourShape(h, 1.1); }), NOW + 1, 292);
    var convH = function (k, base) { return hours.map(function (_, h) { return +(base * (0.55 + 0.45 * Math.min(1, hourShape(h, k) / 0.9)) + 0.12 * wave(h, 24, k)).toFixed(2); }); };
    var P = {
      hoje: {
        labels: hours, cut: NOW, note: 'ontem até 14h', compare: 'Comparar com ontem até 14h', curName: 'Hoje', prevName: 'Ontem',
        pedidos: [todayO, ydayO], conv: [convH(0.3, 4.2), convH(1.1, 4.4)],
        kpi: { receita: [48290, 12.4], pedidos: [312, 6.8], ticket: [154.77, 3.1], sessoes: [3004, 4.3], conv: [3.8, -0.2] },
        funnel: [[3004, 4.3], [1980, 2.1], [612, -1.4], [398, -3.0], [340, 0.8], [312, 6.8]]
      },
      7: {
        labels: dayLabels(7), note: 'os 7 dias anteriores', compare: 'Comparar com os 7 dias anteriores', curName: 'Últimos 7 dias', prevName: '7 dias anteriores',
        pedidos: [daily(7, 2071, 0.2), daily(7, 1969, 1.3)], conv: [daily(7, 25.2, 0.9), daily(7, 25.9, 2.1)],
        kpi: { receita: [318460, 8.9], pedidos: [2071, 5.2], ticket: [153.77, 3.5], sessoes: [19880, 6.1], conv: [3.6, -0.1] },
        funnel: [[19880, 6.1], [13120, 4.4], [4010, 1.2], [2590, -0.6], [2240, 2.8], [2071, 5.2]]
      },
      30: {
        labels: dayLabels(30), note: 'os 30 dias anteriores', compare: 'Comparar com os 30 dias anteriores', curName: 'Últimos 30 dias', prevName: '30 dias anteriores',
        pedidos: [daily(30, 8402, 0.5), daily(30, 7710, 1.9)], conv: [daily(30, 105, 1.4), daily(30, 102, 2.6)],
        kpi: { receita: [1284900, 11.6], pedidos: [8402, 9.0], ticket: [152.93, 2.4], sessoes: [81240, 7.8], conv: [3.5, 0.1] },
        funnel: [[81240, 7.8], [53400, 6.0], [16300, 3.1], [10500, 1.8], [9100, 5.5], [8402, 9.0]]
      }
    };
    var FUNNEL = ['Sessões', 'Viu produto', 'Carrinho', 'Entrega', 'Pagamento', 'Pedidos'];
    var state = { p: 'hoje', compare: true };
    var fmtN = function (v, d) { return v.toLocaleString('pt-BR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
    var FMT = {
      receita: function (v) { return 'R$ ' + fmtN(v); }, pedidos: function (v) { return fmtN(v); }, ticket: function (v) { return brl(v); },
      sessoes: function (v) { return fmtN(v); }, conv: function (v) { return fmtN(v, 1) + '%'; }
    };
    function delta(el, v, pp) {
      var cls = v > 0 ? 'up' : v < 0 ? 'down' : 'flat';
      el.className = 'cz-delta ' + cls;
      el.innerHTML = (v ? icon(v > 0 ? 'arrow-up' : 'arrow-down') : '') + fmtN(Math.abs(v), 1) + (pp ? ' p.p.' : '%');
      el.setAttribute('aria-label', (v > 0 ? 'Alta de ' : v < 0 ? 'Queda de ' : 'Estável, ') + fmtN(Math.abs(v), 1) + (pp ? ' ponto percentual' : '%') + ' contra ' + P[state.p].note);
      el.hidden = !state.compare;
    }

    function niceStep(v) { var e = Math.pow(10, Math.floor(Math.log10(v))), f = v / e; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e; }
    function chart(el, key) {
      var d = P[state.p], cur = d[key][0], prev = state.compare ? d[key][1] : null, n = d.labels.length, cut = d.cut != null ? d.cut : n - 1;
      var isPct = key === 'conv', f = function (v) { return isPct ? fmtN(v, 1) + '%' : fmtN(Math.round(v)); };
      var W = el.clientWidth, H = el.clientHeight, L = 34, R = 8, T = 10, B = 24;
      if (!W) return;
      var top = Math.max.apply(0, cur.slice(0, cut + 1).concat(prev || [])) * 1.05, stp = niceStep(top / 4), ticks = Math.ceil(top / stp), max = stp * ticks;
      var x = function (i) { return L + i * (W - L - R) / (n - 1); }, y = function (v) { return T + (1 - v / max) * (H - T - B); };
      var line = function (arr, upto) { return arr.slice(0, upto + 1).map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(''); };
      var g = '<defs><linearGradient id="dash-grad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--chart-1);stop-opacity:.18"/><stop offset="1" style="stop-color:var(--chart-1);stop-opacity:0"/></linearGradient></defs><g class="grid">';
      for (var t = 0; t <= ticks; t++) { var v = stp * t; g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="ax" x="' + (L - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + (isPct ? fmtN(v, stp % 1 ? 1 : 0) + '%' : fmtN(v)) + '</text>'; }
      g += '</g>';
      var step = Math.ceil(n / (W < 420 ? 5 : 8));
      for (var i = 0; i < n; i += step) g += '<text class="ax" x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + d.labels[i] + '</text>';
      if (prev) g += '<path class="prev" d="' + line(prev, n - 1) + '"/>';
      g += '<path class="area" d="' + line(cur, cut) + ' L' + x(cut) + ' ' + y(0) + ' L' + x(0) + ' ' + y(0) + 'Z"/><path class="cur" d="' + line(cur, cut) + '"/>';
      g += '<circle class="dot" r="4" cx="' + x(cut) + '" cy="' + y(cur[cut]) + '" style="fill:var(--chart-1)"/>';
      if (d.cut != null) g += '<text class="now" x="' + (x(cut) + 8) + '" y="' + (y(cur[cut]) - 8) + '">agora</text>';
      g += '<g class="hover" hidden><line class="cross" y1="' + T + '" y2="' + (H - B) + '"/><circle class="dot hp" r="4" style="fill:var(--muted)"/><circle class="dot hc" r="4" style="fill:var(--chart-1)"/></g><rect x="' + L + '" y="0" width="' + (W - L - R) + '" height="' + H + '" fill="transparent"/>';
      var total = cur.slice(0, cut + 1).reduce(function (a, b) { return a + b; }, 0);
      el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (isPct ? 'Taxa de conversão' : 'Pedidos') + ', ' + d.curName.toLowerCase() + (isPct ? '' : ': ' + fmtN(Math.round(total)) + ' no total') + '. Use as setas para ver cada ponto.">' + g + '</svg><div class="dash-tip" hidden></div>';
      $('[data-legend="' + key + '"]', root).innerHTML = '<span><i></i>' + d.curName + '</span>' + (prev ? '<span><i class="prev"></i>' + d.prevName + '</span>' : '');
      var svg = el.firstChild, hov = $('.hover', svg), tip = el.lastChild;
      function show(i) {
        i = Math.max(0, Math.min(n - 1, i)); el.dataset.i = i;
        var has = i <= cut; hov.hidden = false;
        $('.cross', hov).setAttribute('x1', x(i)); $('.cross', hov).setAttribute('x2', x(i));
        var hc = $('.hc', hov), hp = $('.hp', hov);
        hc.style.display = has ? '' : 'none'; if (has) { hc.setAttribute('cx', x(i)); hc.setAttribute('cy', y(cur[i])); }
        hp.style.display = prev ? '' : 'none'; if (prev) { hp.setAttribute('cx', x(i)); hp.setAttribute('cy', y(prev[i])); }
        tip.innerHTML = '<b>' + d.labels[i] + '</b>' + (has ? '<div><i></i>' + d.curName + '<strong>' + f(cur[i]) + '</strong></div>' : '<div>' + d.curName + '<strong>—</strong></div>') + (prev ? '<div><i class="prev"></i>' + d.prevName + '<strong>' + f(prev[i]) + '</strong></div>' : '');
        tip.hidden = false;
        var tx = x(i) + 12; if (tx + tip.offsetWidth > W) tx = x(i) - 12 - tip.offsetWidth;
        tip.style.transform = 'translate(' + tx + 'px,' + T + 'px)';
      }
      function hide() { hov.hidden = true; tip.hidden = true; }
      svg.addEventListener('mousemove', function (e) { var r = svg.getBoundingClientRect(); show(Math.round((e.clientX - r.left - L) / (W - L - R) * (n - 1))); });
      svg.addEventListener('mouseleave', hide);
      el.onkeydown = function (e) {
        var i = el.dataset.i != null ? +el.dataset.i : cut;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { show(i + (e.key === 'ArrowRight' ? 1 : -1)); e.preventDefault(); }
        if (e.key === 'Escape') hide();
      };
      el.onfocus = function () { show(el.dataset.i != null ? +el.dataset.i : cut); };
      el.onblur = hide;
    }

    function render() {
      if (root.closest('.ds-page[hidden]')) return;
      var d = P[state.p];
      Object.keys(d.kpi).forEach(function (k) {
        var tile = $('[data-kpi="' + k + '"]', root);
        $('.val', tile).textContent = FMT[k](d.kpi[k][0]);
        delta($('.cz-delta', tile), d.kpi[k][1], k === 'conv');
      });
      var top = d.funnel[0][0];
      $('[data-dash-funnel]', root).innerHTML = d.funnel.map(function (s, i) {
        var pc = s[0] / top * 100;
        return '<li><span class="lbl">' + FUNNEL[i] + '</span><span class="v">' + fmtN(s[0]) + '</span><span class="pc">' + fmtN(pc, 1) + '%<span class="cz-delta ' + (s[1] > 0 ? 'up' : 'down') + '"' + (state.compare ? '' : ' hidden') + '>' + icon(s[1] > 0 ? 'arrow-up' : 'arrow-down') + fmtN(Math.abs(s[1]), 1) + '%</span></span><span class="bar" aria-hidden="true"><i style="height:' + Math.max(4, pc).toFixed(1) + '%"></i></span></li>';
      }).join('');
      $$('[data-dash-chart]', root).forEach(function (el) { el.removeAttribute('data-i'); chart(el, el.dataset.dashChart); });
    }
    dashRender = render;

    $('[data-dash-period]', root).addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('button', b.parentElement).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      state.p = b.dataset.p;
      var sel = $('[data-dash-compare]', root); sel.options[0].textContent = P[state.p].compare;
      render();
    });
    $('[data-dash-compare]', root).addEventListener('change', function (e) { state.compare = e.target.value === 'on'; render(); });

    // Busca do sistema
    var DASH_ITEMS = [
      { title: 'Novo produto', desc: 'Cadastrar um item no catálogo', cat: 'Atalho', icon: 'plus' },
      { title: 'Criar cupom', desc: 'Desconto em percentual ou valor fixo', cat: 'Atalho', icon: 'percent' },
      { title: 'Gerar etiquetas', desc: '11 pedidos aguardando envio', cat: 'Atalho', icon: 'truck' },
      { title: '#CV-2051', desc: 'Ana Beatriz Lima, R$ 229,90', cat: 'Pedido pago', icon: 'bag' },
      { title: '#CV-2050', desc: 'Farmácia Brito, R$ 1.842,00', cat: 'Aguardando pagamento', icon: 'bag' },
      { title: '#CV-2049', desc: 'Rafael Souza, R$ 104,80', cat: 'Em trânsito', icon: 'bag' },
      { title: 'Vaso Terra', desc: 'FRM-002, 2 em estoque', cat: 'Produto', icon: 'box' },
      { title: 'Luminária Círculo', desc: 'FRM-001, 8 em estoque', cat: 'Produto', icon: 'box' },
      { title: 'Caixa Essencial', desc: 'FRM-003, sem estoque', cat: 'Produto', icon: 'box' },
      { title: 'Ana Beatriz Lima', desc: '12 pedidos, cliente desde 2024', cat: 'Cliente', icon: 'user' },
      { title: 'Rafael Souza', desc: '3 pedidos, cliente desde 2026', cat: 'Cliente', icon: 'user' },
      { title: 'Configurar análise de risco', desc: 'Pagamentos, antifraude', cat: 'Configuração', icon: 'shield' }
    ];
    var dashCmd = createCmd({ label: 'Pesquisar no sistema', placeholder: 'Pedido, produto, cliente ou ação', items: function () { return DASH_ITEMS; },
      onPick: function (it) { toast('success', 'Abrindo ' + it.title, it.cat + ' no painel do exemplo.'); } });
    $('[data-dash-search]', root).addEventListener('click', dashCmd.open);
    new MutationObserver(function () { dashRender(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (window.ResizeObserver) { var rw = 0, rt; new ResizeObserver(function (en) { var w = Math.round(en[0].contentRect.width); if (w === rw) return; rw = w; clearTimeout(rt); rt = setTimeout(render, 60); }).observe($('.dash-charts', root)); }
  })();

  /* ---------------------------------------------------------------- Gráficos */
  function drawCharts() {
    dashRender();
    metricCards.forEach(function (c) { if (!c.el.closest('.ds-page[hidden]')) c.redraw(); });
    $$('.ds-page:not([hidden])').forEach(function (p) { C.drawSparks(p); });
    $$('[data-bars]').forEach(function (el) {
      if (el.dataset.done) return; el.dataset.done = 1;
      var d = JSON.parse(el.dataset.bars), max = Math.max.apply(0, d.map(function (r) { return r[1]; }));
      el.style.display = 'grid'; el.style.gap = '12px';
      el.innerHTML = d.map(function (r, i) {
        return '<div style="display:grid;gap:6px"><div style="display:flex;justify-content:space-between;font-size:13px"><span>' + r[0] + '</span><b class="num">' + brl(r[1]).replace(',00', '') + '</b></div><div class="cz-progress" style="height:10px"><i style="--v:' + (r[1] / max * 100) + '%;background:' + (i ? 'var(--chart-2)' : 'var(--chart-1)') + ';opacity:' + (i ? 1 - i * .2 : 1) + '"></i></div></div>';
      }).join('');
    });
  }

  var rz;
  window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(drawCharts, 150); });
  route();
})();
