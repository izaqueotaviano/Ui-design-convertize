# Convertize Design System

Design system navegável da Convertize.
Reúne fundamentos, componentes e padrões de tela, com exemplos interativos e código para copiar.

**Abrir:** `dist/convertize-design-system.html`. É um arquivo único; só as fontes vêm do Google Fonts.

**Usar em outro projeto:** `dist/kit/` (ou `dist/convertize-kit.zip`) é o pacote do kit:
`convertize.css`, `convertize.js`, `starter.html`, `icons.svg`, `icons/*.svg` e um README com
atributos, eventos e API. Veja `dist/kit/README.md`.

## Conteúdo (68 páginas)

| Grupo | Páginas |
| --- | --- |
| Começar | Visão geral, Como usar |
| Fundamentos | Cores, Tipografia, Espaçamento e raios, Elevação, Iconografia, Grid e responsivo, Movimento |
| Ações | Botões, Botões de ícone, Grupos e segmentos, Links |
| Formulários | Campo de texto, Seleção e autocompletar, Checkbox e radio, Switch, Slider, Quantidade, Upload, Seletor de data, Chips e tags, Validação |
| Navegação | Barra superior, Sidebar, Abas, Breadcrumb, Paginação, Etapas, Navegação inferior, Menu |
| Feedback | Alertas e banners, Toasts, Progresso, Estados vazios, Badges, Tooltip e popover |
| Sobreposições | Diálogo, Confirmação destrutiva, Drawer, Folha inferior |
| Dados | Cards, Tabela, Lista, Métricas e gráficos, Avatar, Acordeão, Linha do tempo, Ícones de arquivo, Divisores |
| Comércio | Card de produto, Variações e avaliação, Carrinho, Checkout, Status do pedido, Segmentos |
| Atendimento | Chat, Ticket |
| Padrões de tela | Painel da loja, Entrar, App mobile |
| Marca | Logotipo, Ilustrações e patterns, Direção de imagens |

## Estrutura

```
src/kit.css        tokens (claro e escuro), ícones e componentes cz-*   → dist/kit/convertize.css
src/convertize.js  comportamento dos componentes (window.Convertize)     → dist/kit/convertize.js
src/icons.py       conjunto de ícones (sprite SVG)                      → dist/kit/icons.svg, icons/*.svg
src/kit/           starter.html e README.md do pacote
src/docs.css       estilos só da documentação (ds-*)
src/docs.js        rotas, busca (Ctrl K) e demos das páginas
src/pages/*.html   uma <section class="ds-page"> por página, em ordem
src/shell.html     cabeçalho, navegação e contêineres globais
src/assets/        logos, ilustrações e patterns do kit; imagens reduzidas em WebP
build.py           gera a documentação e o pacote do kit
```

Regra da divisão: o que um protótipo precisa vai em `kit.css` e `convertize.js`; o que só existe
para apresentar o kit (navegação da documentação, textos e dados das demos) vai em `docs.*`.
As demos reagem ao kit pelos eventos `cz:*`, sem mudar o comportamento dele.

Para gerar de novo: `python3 build.py`. Para publicar como artifact: `python3 publish.py <clone de izaqueotaviano/icons> <saída>`, que embute os ícones só na cópia publicada.

Marcadores aceitos nas páginas: `{{i:nome}}` (ícone), `{{img:arquivo}}` (imagem embutida),
`{{svg:caminho}}` (SVG inline), `{{logo}}`, `{{logo-inverse}}` e `{{sym}}`.
