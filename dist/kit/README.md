# Convertize Design System 2.0.0

Kit de interface da Convertize para protótipos e produtos: tokens (claro e escuro), ícones e os componentes `cz-*` com o comportamento pronto. CSS e JavaScript puros, sem framework e sem build.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `convertize.css` | Tokens, ícones e todos os componentes `cz-*` |
| `convertize.js` | Comportamento dos componentes e o sprite de ícones, em `window.Convertize` |
| `starter.html` | Página inicial pronta: sidebar, busca Ctrl K, tabela, abas, diálogo e toast |
| `icons.svg`, `icons/*.svg` | Ícones da sidebar (os demais vêm por link do jsDelivr) |

## Começar

Copie a pasta para o projeto e abra `starter.html`. Para uma página nova:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tenor+Sans&display=swap">
<link rel="stylesheet" href="convertize.css">

<button class="cz-btn">
  <span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Novo produto
</button>

<script src="convertize.js"></script>
```

O script põe na página, sozinho, o sprite com os ícones da sidebar.

### Por link

Se o repositório for público, o jsDelivr serve os arquivos direto do GitHub:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/izaqueotaviano/ui-design-convertize@main/dist/kit/convertize.css">
<script src="https://cdn.jsdelivr.net/gh/izaqueotaviano/ui-design-convertize@main/dist/kit/convertize.js"></script>
```

Troque `@main` por uma tag (por exemplo `@ds-v2.0.0`) para travar a versão.

## Regras da marca

- Inter em toda a interface, inclusive números. Tenor Sans só em títulos editoriais, nunca em números.
- Ação principal em carvão (`cz-btn`). Laranja `#ff5e2c` marca foco, seleção e a marca (`cz-btn--brand` só em campanha).
- Texto laranja sempre com o token `--accent-text`, nunca `#ff5e2c` sobre branco.
- Todo botão só com ícone precisa de `aria-label`.

## Tema

`<html data-theme="light">` ou `"dark"`. Sem o atributo, segue o sistema. Qualquer botão com `data-theme-toggle` alterna e guarda a escolha. `[data-theme-icon="light"]` e `[data-theme-icon="dark"]` mostram o ícone certo.

## Ícones

A interface usa a biblioteca de ícones Convertize pelo link do jsDelivr. Nada é copiado para o projeto.
Os nomes estão em `https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/icons.json`.

```html
<span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>        <!-- 20 px -->
<span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>  <!-- 16 px -->
```

O SVG entra como máscara, então a cor vem do texto nos dois temas. Em JavaScript, `Convertize.icon('cart')` gera o mesmo HTML e aceita o nome curto do kit ou qualquer nome de `icons.json`.

A sidebar é a exceção. Itens `cz-side-item` usam o conjunto desenhado da marca, que vem no sprite do `convertize.js`, com o detalhe laranja no item ativo:

```html
<button class="cz-side-item" aria-current="page"><svg class="i" aria-hidden="true"><use href="#i-catalog"/></svg><span class="lbl">Produtos</span></button>
```

`icons.svg` e `icons/*.svg` trazem esse conjunto da sidebar.

## Comportamento por atributo

Tudo liga ao carregar, inclusive o HTML inserido depois (React, Vue, `innerHTML`): o kit percebe o conteúdo novo e liga sozinho. `Convertize.init(elemento)` continua disponível para forçar.

**A aparência vem do CSS; o funcionamento vem do JS.** Se a página tem o visual mas a sidebar, os menus ou a busca não respondem, o `convertize.js` não foi carregado. Confira no console: `window.Convertize` precisa existir.

| Atributo | Componente |
| --- | --- |
| `data-cmd` em `.cz-cmd-trigger` | Busca (paleta Ctrl/⌘ K) sem código. Resultados: `data-cmd-items='[{"title","desc","cat","icon","href"}]'`, elementos com `data-cmd-item="Rótulo"` e, sozinhos, os itens da sidebar, as abas e a navegação inferior. Escolher clica no item; itens sem link disparam `cz:cmd-pick` |
| `data-open="id"`, `data-close` | Abre e fecha `cz-scrim` (diálogo, drawer, folha). Esc e clique fora fecham, e o foco fica preso dentro |
| `data-menu-trigger` + `.cz-menu` dentro de `.cz-pop` | Menu. Com `data-select-menu="Prefixo: "` vira seletor |
| `data-popover` | Popover no elemento seguinte |
| `data-tabs` | Abas com `role="tab"` e `aria-controls` |
| `data-accordion` | Acordeão com `.cz-acc-btn` |
| `data-toast="success"` + `data-title`, `data-msg` | Toast ao clicar |
| `data-copy="texto"` | Copia e confirma |
| `data-toggle`, `data-toggle-group` | Botões de alternância e grupos |
| `data-collapse` | Recolhe a `cz-sidebar` |
| `data-combo='["A","B"]'` | Autocompletar. `data-combo-create` permite criar opções |
| `data-cal`, `data-date-input` | Calendário (`data-mode="range"`, datas em `AAAA-MM-DD`) |
| `data-qty`, `.cz-range`, `data-count`, `data-tags`, `data-drop` | Quantidade, slider, contador, tags e upload |
| `data-pagination` | Paginação (`data-total`, `data-current`, `data-per`, `data-items`, `data-noun`) |
| `data-stepper` | Etapas com `data-step-prev` e `data-step-next` (`data-last-label`) |
| `form[data-validate]` | Validação com mensagens (`data-msg` em cada campo) |
| `data-rating`, `data-check-all`, `data-pay`, `data-spark` | Estrelas, checkbox pai, pagamento e minigráfico |
| `data-bars-bg="15"` em `.cz-bars` | Fundo de barras preto e laranja |

## API JavaScript

```js
Convertize.toast('success', 'Produto salvo', 'Vaso Terra entrou no catálogo.', () => desfazer());
Convertize.openDialog('dlg-novo');            // e Convertize.closeDialog()
Convertize.theme.set('dark');                 // 'light', 'dark' ou 'system'
const busca = Convertize.createCmd({ label, placeholder, items: () => [...], onPick: item => {} });
Convertize.renderPager(el, paginaAtual, total, pagina => {}, '1–20 de 468 pedidos');
Convertize.icon('cart', 'i-sm');              // HTML de um ícone
```

## Eventos

Todos borbulham e começam com `cz:`: `cz:theme`, `cz:menu-pick`, `cz:select`, `cz:combo-create`, `cz:dismiss`, `cz:date`, `cz:range`, `cz:page`, `cz:step`, `cz:steps-done`, `cz:rate`, `cz:cmd-pick` e `cz:valid`. `cz:valid` sai quando um `form[data-validate]` passa na validação. Chame `preventDefault()` para não enviar.

A documentação completa, com exemplos vivos de cada componente, está em `convertize-design-system.html`.
