---
name: convertize-design-system
description: >-
  Convertize Design System v2 (2.0.0): tokens, ícones e componentes cz-* (CSS e JS puros) para qualquer tela, protótipo ou produto da Convertize. Use sempre que for criar ou alterar interface para a Convertize ou para lojas/lojistas da plataforma — painel da loja, admin, dashboard, tabela de pedidos ou produtos, checkout, carrinho, card de produto, login, app mobile, landing page, artifact HTML ou protótipo — mesmo que o pedido não cite "design system", "cz-" ou o kit, e também quando pedirem "no padrão Convertize", "com a nossa identidade", "no nosso UI kit" ou "igual ao painel". Não use para textos sem interface nem para marcas de terceiros.
---

# Convertize Design System v2

Kit de interface da Convertize: tokens de cor, tipo e medida (tema claro e escuro), ícones e cerca de 60 componentes `cz-*` com comportamento pronto. É CSS e JavaScript puros, sem framework e sem build, então funciona em HTML solto, em artifacts do claude.ai e dentro de projetos React, Vue ou server-side.

O objetivo é que toda tela pareça ter saído do mesmo produto. Por isso, antes de escrever um estilo próprio, procure o componente pronto: o kit já resolve estados, foco, tema escuro, acessibilidade e responsivo.

## Arquivos desta skill

| Arquivo | Para quê |
| --- | --- |
| `assets/convertize.css` | Tokens, ícones e todos os componentes. Não edite; sobrescreva tokens depois dele se precisar |
| `assets/convertize.js` | Comportamento (diálogos, menus, abas, toasts, busca Ctrl K, calendário, validação...) em `window.Convertize`, mais o sprite dos ícones da sidebar |
| `assets/starter.html` | Tela completa de referência: sidebar, topo com busca, indicadores, abas, tabela, diálogo com validação, toast, tema |
| `assets/logo-*.svg`, `assets/img/*.webp` | Logotipo (primário, invertido, símbolo) e fotos de produto/pessoa para dados de exemplo |
| `references/components.md` | **Markup de cada componente**, página a página (arquivo grande: ache a seção pelo índice ou com `grep -n 'cz-nome'`, não leia tudo) |
| `references/api.md` | Atributos `data-*`, eventos `cz:*`, API JS, tema e ícones |
| `scripts/make_artifact.py` | Transforma uma página que usa o kit num artifact autocontido (CSS/JS e ícones embutidos) |

## Como trabalhar

1. **Entenda a tela.** Quem usa (lojista no painel, cliente final na loja), a tarefa principal e os dados. Use dados realistas de e-commerce brasileiro: R$ com vírgula, datas dd/mm/aaaa, pedidos `#CV-2051`, SKUs `FRM-002`, nomes de produtos e clientes plausíveis.
2. **Parta da estrutura certa.** Para telas de painel, copie o esqueleto de `assets/starter.html` (sidebar + `main`). Para loja/landing, monte com os componentes de comércio e `cz-cta`.
3. **Monte com componentes.** Para cada peça, abra a seção correspondente em `references/components.md` e copie o markup. Os componentes ligam sozinhos por atributo (`data-open`, `data-menu-trigger`, `data-tabs`, `data-toast`...); só escreva JS para a lógica do produto, usando a API (`Convertize.toast`, `Convertize.openDialog`, `Convertize.createCmd`) e os eventos `cz:*`.
4. **Entregue no formato do destino** (seção abaixo). O CSS dá a aparência e o `convertize.js` dá o funcionamento: sem o JS, a tela fica com o visual certo mas a sidebar, os menus, os diálogos e a busca não respondem. Em toda entrega, o JS tem de estar na página.
5. **Confira** a lista do final antes de entregar.

## Entrega por destino

**Artifact no claude.ai.** Faça sempre uma página HTML, não um artifact React: o kit é HTML + CSS + JS e precisa estar dentro da página. O visualizador não carrega CSS nem imagens do jsDelivr, então o artifact precisa ser autocontido. Escreva a página normalmente, com `<link href="convertize.css">`, `<script src="convertize.js">` e ícones por link, e rode:

```bash
python3 scripts/make_artifact.py pagina.html pagina-artifact.html
```

O script embute o CSS e o JS do kit, as imagens locais (`assets/img/...`) e cada ícone da biblioteca, inclusive os que o JS do kit cria em toasts e na busca. Ícones que o seu JS monta com o nome numa variável não são detectados: escreva o nome literal (`Convertize.icon('truck')`) ou liste-os com `--icons truck,package`. Publique o arquivo gerado. Se não puder rodar Python, embuta manualmente: `<style>` com o conteúdo de `convertize.css`, `<script>` com `convertize.js`, e ícones como `--icon:url("data:image/svg+xml,...")`.

**Projeto com arquivos (HTML, protótipo, repositório).** Copie `assets/convertize.css` e `assets/convertize.js` para o projeto (ou use o link do jsDelivr do repositório do kit, se estiver disponível) e referencie. Os ícones continuam por link — não baixe SVGs da biblioteca para o projeto.

**React / Vue / outro framework.** Importe `convertize.css` globalmente e use as classes `cz-*` no JSX (`className`). Carregue `convertize.js` uma vez (no `index.html` ou com um import de efeito colateral); o kit percebe o conteúdo que o framework renderiza depois e liga os componentes sozinho. Se o framework já controla o estado (abas, diálogo), pode usar só o CSS e controlar `hidden`, `aria-selected`, `aria-expanded` pelo framework.

## Regras da marca (por que importam)

- **Tipografia:** Inter em toda a interface, inclusive números (tabular). Tenor Sans só em títulos editoriais (`h1` de página, título de diálogo, destaque de hero) — nunca em números, botões ou tabelas; ela é serifada e decorativa, e números nela ficam ilegíveis.
- **Cor:** a ação principal é carvão (`cz-btn`), não laranja. O laranja `#ff5e2c` (`--accent`) marca foco, seleção, item ativo e a marca; se tudo for laranja, nada chama atenção. `cz-btn--brand` só em momentos de campanha. Texto laranja sempre com `--accent-text` (o `#ff5e2c` puro não passa contraste sobre branco).
- **Tokens, não valores soltos:** use `var(--surface)`, `var(--text)`, `var(--line)`, `var(--radius-md)`, `var(--h-md)` etc. Assim o tema escuro funciona sem esforço. Linhas usam `var(--hairline)` (0,7px).
- **Números em títulos:** títulos de página, diálogo e drawer são Tenor Sans; envolva o número em `<span class="num">` ("Pedido <span class=\"num\">#CV-2051</span>") que ele volta para Inter.
- **Medidas:** controles têm 28/36/44 px (`--h-sm/md/lg`); raios 4/6/10/12/20 px (`--radius-xs` a `--radius-xl`).
- **Tema:** todo componente já tem claro e escuro. Inclua o botão `data-theme-toggle` em telas de painel.
- **Acessibilidade:** botão só com ícone leva `aria-label`; campos têm `<label>`; estados usam atributos ARIA (`aria-pressed`, `aria-current`, `aria-invalid`), que o CSS do kit já estiliza.

## Ícones

- **Interface (fora da sidebar):** biblioteca de ícones Convertize, sempre por link. Nomes em `https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/icons.json` (cerca de 5 mil). Escolha o ícone pela ação e use:
  ```html
  <span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/<nome>.svg)" aria-hidden="true"></span>
  ```
  Tamanhos: `i` (20 px), `i i-sm` (16), `i i-lg` (24). A cor vem do texto. Em JS, `Convertize.icon('cart')` gera o mesmo HTML e aceita os nomes curtos do kit (`plus`, `chev-down`, `catalog`, `box`...) ou qualquer nome da biblioteca.
- **Sidebar (`cz-side-item`):** conjunto desenhado da marca, pelo sprite que o `convertize.js` injeta: `<svg class="i" aria-hidden="true"><use href="#i-catalog"/></svg>`. Nomes: search, home, bag, users, user, catalog, analytics, cart, box, truck, store, tag, card, chat, headset, bell, sliders, grid, layers, file, calendar, percent, zap, edit, copy, image, globe, plug, sidebar, entre outros. O detalhe do ícone fica laranja no item ativo.

## Componentes mais usados

Veja o markup completo em `references/components.md`. Nomes para achar a seção certa:

- **Ações:** `cz-btn` (+ `--secondary`, `--ghost`, `--tonal`, `--danger`, `--brand`, `--sm`, `--lg`), `cz-icon-btn`, `cz-split`, `cz-cta` (site), `cz-fab`, links.
- **Formulários:** `cz-field` + `cz-input` / `cz-input-wrap` / `cz-prefix` / `cz-suffix`, `cz-select`, combobox `data-combo`, `cz-check`, `cz-radio`, `cz-switch`, `cz-range`, `data-qty`, upload `data-drop`, calendário `data-cal`, `cz-chip`, validação `form[data-validate]`, busca `cz-cmd-trigger`.
- **Navegação:** `cz-sidebar` / `cz-side-item`, `cz-topbar`, `cz-tabs`, `cz-breadcrumb`, `cz-pagination`, `cz-steps`, `cz-bottom-nav`, `cz-menu` em `cz-pop`.
- **Feedback:** `cz-alert`, `cz-banner`, `cz-toast` (ou `Convertize.toast`), `cz-progress`, `cz-empty` com `cz-ill-icon` (ícone da biblioteca num círculo fino com o ponto laranja; `--sm`, `--danger`, `--muted`), `cz-badge`, `cz-count-badge`, `cz-tooltip`, `cz-popover`.
- **Sobreposições:** `cz-scrim` + `cz-dialog` / `cz-drawer` / `cz-sheet`, abertos por `data-open="id"`.
- **Dados:** `cz-card`, `cz-stat` (+ `data-spark`), `cz-table` em `cz-table-scroll` + `cz-action-bar`, `cz-list`, `cz-avatar`, acordeão, `cz-timeline`, `cz-file`, `cz-delta`.
- **Comércio:** `cz-product`, `cz-price`, `cz-stars`, variações/swatches, `cz-cart-line`, resumo, checkout e pagamento `data-pay`, `cz-track` (rastreamento), `cz-tag--ship`.
- **Atendimento e marca:** `cz-msg`, composer, ticket, fundo de barras `cz-bars-bg`.

## Armadilhas conhecidas

- **Atributos reservados.** `data-count`, `data-toggle`, `data-open`, `data-close`, `data-copy`, `data-clear`, `data-tabs`, `data-qty` e os demais de `references/api.md` são do kit. Para os seus dados use outro nome (`data-n`, `data-pedido`), senão o kit tenta ligar um componente ali.
- **Filtro de status sobre uma única lista:** use chips em grupo (`<div data-toggle-group>` com `<button class="cz-chip" aria-pressed="true">`) e filtre no seu JS. `data-tabs` é para abas com um painel por aba.
- **Drawer e diálogo:** `<div class="cz-scrim cz-drawer-scrim" id="x" hidden><aside class="cz-drawer">` com `cz-drawer-head/body/foot`, aberto por `data-open="x"` ou `Convertize.openDialog('x', gatilho)`. O corpo rola e o rodapé fica fixo.
- **Linhas de tabela geradas por JS:** monte o `<tr>` com as mesmas classes do exemplo de tabela (`td.r.num` para valores, `cz-badge` para status) ; os componentes interativos dentro dela ligam sozinhos.

- **Busca:** o `cz-cmd-trigger` sozinho é só a caixa. Para funcionar sem escrever JS, adicione `data-cmd` no botão: a paleta (Ctrl/⌘ K) lista os itens da sidebar, as abas e o que você passar em `data-cmd-items` (JSON com `title`, `desc`, `cat`, `icon`, `href`) ou marcar com `data-cmd-item`. Para resultados vindos de dados, use `Convertize.createCmd`.

## Antes de entregar

- [ ] Fontes Inter + Tenor Sans carregadas; `convertize.css` **e** `convertize.js` na página (embutidos, em artifact). Teste: `window.Convertize` existe, a sidebar recolhe, os menus abrem e a busca abre com Ctrl K.
- [ ] Nenhuma cor, raio ou altura solta onde existe token; nada de estilo próprio para algo que o kit já tem.
- [ ] Ação principal em carvão, laranja só em foco/seleção/marca; números em Inter.
- [ ] Ícones da biblioteca por link (ou embutidos pelo script em artifact); sidebar com o sprite.
- [ ] Botões só com ícone com `aria-label`; campos com `<label>`.
- [ ] Testado mentalmente no tema escuro e em 390 px de largura (o kit já é responsivo; não force larguras fixas).
