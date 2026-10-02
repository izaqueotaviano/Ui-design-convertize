# Componentes — Convertize Design System 2.0.0

Markup pronto de cada componente, na ordem da documentação. Ícones da biblioteca vêm por link; `{{logo}}` indica o SVG de `assets/logo-primary.svg` embutido inline (a palavra usa currentColor). Imagens de exemplo estão em `assets/img/`.

O arquivo é grande: procure a seção pelo índice (`## Grupo › Nome`) ou pela classe (`grep -n 'cz-dialog'`) em vez de ler tudo. Classes `ds-*` são só da documentação (organizam o exemplo); troque por layout próprio. Atributos `data-dash`, `data-products-table`, `data-metric-card`, `data-cart`, `data-chat`, `data-segments`, `data-sidebar-demo`, `data-sb-page` e `data-bm-*` ligam demos da documentação: o visual está no kit, mas a lógica (dados, cálculos) você escreve no projeto.

## Índice

- Fundamentos › [Iconografia](#iconografia)
- Ações › [Botões](#botoes)
- Ações › [Botões de ícone](#botoes-icone)
- Ações › [Grupos e segmentos](#grupos)
- Ações › [Botões do site](#botoes-site)
- Ações › [Links](#links)
- Formulários › [Campo de texto](#campos)
- Formulários › [Seleção e autocompletar](#selecao)
- Formulários › [Checkbox e radio](#checkbox)
- Formulários › [Switch](#switch)
- Formulários › [Slider](#slider)
- Formulários › [Busca](#busca)
- Formulários › [Quantidade](#quantidade)
- Formulários › [Upload de arquivos](#upload)
- Formulários › [Seletor de data](#data)
- Formulários › [Chips e tags](#chips)
- Formulários › [Validação de formulário](#formulario)
- Navegação › [Barra superior](#barra-superior)
- Navegação › [Sidebar](#sidebar)
- Navegação › [Abas](#abas)
- Navegação › [Breadcrumb](#breadcrumb)
- Navegação › [Paginação](#paginacao)
- Navegação › [Etapas](#etapas)
- Navegação › [Navegação inferior](#navegacao-inferior)
- Navegação › [Menu](#menu)
- Feedback › [Alertas e banners](#alertas)
- Feedback › [Toasts](#toast)
- Feedback › [Progresso e carregamento](#progresso)
- Feedback › [Estados vazios e erro](#vazio)
- Feedback › [Badges e status](#badges)
- Feedback › [Tooltip e popover](#tooltip)
- Sobreposições › [Diálogo](#dialogo)
- Sobreposições › [Confirmação destrutiva](#confirmacao)
- Sobreposições › [Drawer](#drawer)
- Sobreposições › [Folha inferior](#bottom-sheet)
- Dados › [Cards](#cards)
- Dados › [Tabela](#tabela)
- Dados › [Lista](#lista)
- Dados › [Métricas e gráficos](#metricas)
- Dados › [Avatar](#avatar)
- Dados › [Acordeão](#acordeao)
- Dados › [Linha do tempo](#timeline)
- Dados › [Ícones de arquivo](#arquivos)
- Dados › [Divisores e atalhos](#divisores)
- Comércio › [Card de produto](#produto)
- Comércio › [Variações e avaliação](#variacoes)
- Comércio › [Carrinho e resumo](#carrinho)
- Comércio › [Checkout](#checkout)
- Comércio › [Status do pedido](#pedido)
- Comércio › [Rastreamento de pedido](#rastreamento)
- Comércio › [Segmentos](#segmentos)
- Atendimento › [Chat](#chat)
- Atendimento › [Ticket de atendimento](#ticket)
- Padrões de tela › [Painel da loja](#dashboard)
- Padrões de tela › [Biblioteca de mídia](#biblioteca)
- Padrões de tela › [Entrar](#login)
- Padrões de tela › [App mobile](#mobile)
- Marca › [Ilustrações e patterns](#ilustracoes)
- Marca › [Direção de imagens](#imagens)

<a id="iconografia"></a>
## Fundamentos › Iconografia

A interface usa a biblioteca de ícones Convertize, com cerca de 5 mil ícones servidos pelo jsDelivr. Cada ícone é referenciado pelo link, nunca copiado para o projeto. A sidebar é a exceção: mantém o conjunto desenhado a partir das ilustrações de comércio.
```html
<span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>

<!-- Botão só com ícone precisa de rótulo -->
<button class="cz-icon-btn" aria-label="Abrir carrinho">
  <span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>
</button>
```

<a id="botoes"></a>
## Ações › Botões

O botão principal é carvão, não laranja: ele é o mais forte da tela sem competir com a marca. Use uma única ação principal por grupo e deixe as demais como secundárias ou fantasmas.
```html
<!-- Principal, secundário, tonal, fantasma, marca e perigo -->
<button class="cz-btn"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span>Salvar produto</button>
    <button class="cz-btn cz-btn--secondary">Ver detalhes</button>
    <button class="cz-btn cz-btn--tonal"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/external-link.svg)" aria-hidden="true"></span>Ver a loja</button>
    <button class="cz-btn cz-btn--ghost">Cancelar</button>
    <button class="cz-btn cz-btn--brand"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/sparkles.svg)" aria-hidden="true"></span>Criar campanha</button>
    <button class="cz-btn cz-btn--danger"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trash.svg)" aria-hidden="true"></span>Excluir</button>
  
```
```html
<!-- 28, 36 e 44 px, a mesma escala de campos e selects: botão, botão de ícone e campo do mesmo tamanho alinham na mesma linha. -->
<div class="ds-row"><button class="cz-btn cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Pequeno</button><button class="cz-icon-btn cz-icon-btn--sm cz-icon-btn--secondary" aria-label="Filtrar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/filter.svg)" aria-hidden="true"></span></button></div>
    <div class="ds-row"><button class="cz-btn"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Padrão</button><button class="cz-icon-btn cz-icon-btn--secondary" aria-label="Filtrar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/filter.svg)" aria-hidden="true"></span></button></div>
    <div class="ds-row"><button class="cz-btn cz-btn--lg"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Grande</button></div>
  
```
```html
<!-- Tonal pequeno, texto em caixa normal. O ícone de seta vai depois do texto quando o botão sai do sistema ou abre um menu. -->
<button class="cz-btn cz-btn--tonal cz-btn--sm">Ver a loja<span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/external-link.svg)" aria-hidden="true"></span></button>
    <button class="cz-btn cz-btn--tonal cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span>Chat</button>
    <button class="cz-btn cz-btn--tonal cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/help-circle.svg)" aria-hidden="true"></span>Ajuda<span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
  
```
```html
<div><p class="ds-label">Padrão</p><button class="cz-btn">Publicar</button></div>
    <div><p class="ds-label">Hover</p><button class="cz-btn is-hover">Publicar</button></div>
    <div><p class="ds-label">Pressionado</p><button class="cz-btn is-pressed">Publicar</button></div>
    <div><p class="ds-label">Foco por teclado</p><button class="cz-btn is-focus">Publicar</button></div>
    <div><p class="ds-label">Desativado</p><button class="cz-btn" disabled>Publicar</button></div>
    <div><p class="ds-label">Carregando</p><button class="cz-btn is-loading" aria-busy="true">Publicar</button>
```
```html
<!-- Clique: o botão mantém a largura e bloqueia um segundo clique até terminar. -->
<button class="cz-btn" data-loading-demo><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/upload.svg)" aria-hidden="true"></span>Publicar produto</button>
    <button class="cz-btn cz-btn--secondary" data-loading-demo>Sincronizar estoque</button>
  
```
```html
<button class="cz-btn cz-btn--lg cz-btn--block"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/lock.svg)" aria-hidden="true"></span>Finalizar compra</button>
    <button class="cz-btn cz-btn--secondary cz-btn--block">Continuar comprando</button>
```

<a id="botoes-icone"></a>
## Ações › Botões de ícone

Para ações frequentes e reconhecíveis por ícone: editar, copiar, favoritar, mais opções. Todo botão só com ícone tem rótulo acessível e, no desktop, tooltip.
```html
<!-- Fantasma · Contorno · Sólido · Redondo · Pequeno · Desativado -->
<span class="cz-tooltip"><button class="cz-icon-btn" aria-label="Editar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/pencil.svg)" aria-hidden="true"></span></button><span role="tooltip">Editar</span></span>
    <span class="cz-tooltip"><button class="cz-icon-btn cz-icon-btn--secondary" aria-label="Copiar link"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/copy.svg)" aria-hidden="true"></span></button><span role="tooltip">Copiar link</span></span>
    <span class="cz-tooltip"><button class="cz-icon-btn cz-icon-btn--primary" aria-label="Adicionar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button><span role="tooltip">Adicionar</span></span>
    <span class="cz-tooltip"><button class="cz-icon-btn cz-icon-btn--secondary cz-icon-btn--round" aria-label="Mais opções"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/dots.svg)" aria-hidden="true"></span></button><span role="tooltip">Mais opções</span></span>
    <button class="cz-icon-btn cz-icon-btn--sm" aria-label="Fechar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button>
    <button class="cz-icon-btn" aria-label="Excluir" disabled><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trash.svg)" aria-hidden="true"></span></button>
  
```
```html
<!-- Estado em aria-pressed: ligado usa laranja suave -->
<button class="cz-icon-btn cz-icon-btn--secondary" data-toggle aria-pressed="true" aria-label="Favorito"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/heart.svg)" aria-hidden="true"></span></button>
    <button class="cz-icon-btn cz-icon-btn--secondary" data-toggle aria-pressed="false" aria-label="Fixar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/map-pin.svg)" aria-hidden="true"></span></button>
    <div class="cz-segmented" data-toggle-group aria-label="Visualização">
      <button aria-pressed="true" aria-label="Grade"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/layout-grid.svg)" aria-hidden="true"></span></button>
      <button aria-pressed="false" aria-label="Lista"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/list.svg)" aria-hidden="true"></span></button>
    </div>
  
```
```html
<button class="cz-fab"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Novo pedido</button>
    <button class="cz-fab cz-fab--round" aria-label="Novo pedido"><span class="i i-lg" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button>
```

<a id="grupos"></a>
## Ações › Grupos e segmentos

O controle segmentado troca a visualização de um mesmo conteúdo. O grupo de botões junta ações irmãs. O botão dividido oferece uma ação padrão e variações.
```html
<!-- De 2 a 5 opções curtas. Mais que isso, use abas ou select. -->
<div class="cz-segmented" data-toggle-group aria-label="Período">
      <button aria-pressed="false">Hoje</button><button aria-pressed="true">7 dias</button><button aria-pressed="false">30 dias</button><button aria-pressed="false">12 meses</button>
    </div>
    <div class="cz-segmented" data-toggle-group aria-label="Canal">
      <button aria-pressed="true"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span>Loja</button><button aria-pressed="false"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span>Marketplace</button>
    </div>
  
```
```html
<div class="cz-btn-group" role="group" aria-label="Formatação">
      <button class="cz-btn cz-btn--secondary cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/download.svg)" aria-hidden="true"></span>Exportar</button>
      <button class="cz-btn cz-btn--secondary cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/upload.svg)" aria-hidden="true"></span>Importar</button>
      <button class="cz-btn cz-btn--secondary cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/copy.svg)" aria-hidden="true"></span>Duplicar</button>
    
```
```html
<!-- Principal, secundário e marca pequeno. A divisória interna ocupa metade da altura; a seta gira quando o menu está aberto. -->
<div class="cz-split cz-pop">
      <button class="cz-btn" data-toast="success" data-title="Produto publicado" data-msg="Vaso Terra já aparece na loja.">Publicar agora</button>
      <button class="cz-btn cz-split-toggle" data-menu-trigger aria-haspopup="menu" aria-expanded="false" aria-label="Outras formas de publicar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
      <div class="cz-menu" role="menu" hidden>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/clock.svg)" aria-hidden="true"></span>Agendar publicação</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/eye.svg)" aria-hidden="true"></span>Salvar como rascunho</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span>Publicar só no marketplace</button>
      </div>
    </div>
    <div class="cz-split cz-pop">
      <button class="cz-btn cz-btn--secondary"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/download.svg)" aria-hidden="true"></span>Exportar CSV</button>
      <button class="cz-btn cz-btn--secondary cz-split-toggle" data-menu-trigger aria-haspopup="menu" aria-expanded="false" aria-label="Outros formatos"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
      <div class="cz-menu" role="menu" hidden>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/file-text.svg)" aria-hidden="true"></span>Exportar planilha (.xlsx)</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/file-text.svg)" aria-hidden="true"></span>Exportar PDF</button>
      </div>
    </div>
    <div class="cz-split cz-pop">
      <button class="cz-btn cz-btn--brand cz-btn--sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/sparkles.svg)" aria-hidden="true"></span>Criar campanha</button>
      <button class="cz-btn cz-btn--brand cz-btn--sm cz-split-toggle" data-menu-trigger aria-haspopup="menu" aria-expanded="false" aria-label="Modelos de campanha"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
      <div class="cz-menu" role="menu" hidden>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/percentage.svg)" aria-hidden="true"></span>Cupom de desconto</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span>Frete grátis</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/gift.svg)" aria-hidden="true"></span>Brinde na compra</button>
      </div>
    </div>
  
```

<a id="botoes-site"></a>
## Ações › Botões do site

No site e nas páginas de campanha, o botão é o próximo passo de quem ainda não é cliente. Ele é maior, em pílula, e o círculo da seta atravessa para o outro lado quando o mouse passa ou o teclado foca. Dentro do painel, use os botões comuns.
```html
<!-- Carvão para a ação principal da seção; laranja só para a ação principal da página -->
<a class="cz-cta" href="#botoes-site">Criar minha loja<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
    <a class="cz-cta cz-cta--brand" href="#botoes-site">Testar grátis por 14 dias<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
  
```
```html
<!-- Em fundos escuros e no fundo de barras, a variante branca substitui a carvão -->
<div class="cz-bars cz-bars--soft" data-bars-bg="9" aria-hidden="true"></div>
    <a class="cz-cta cz-cta--light" href="#botoes-site">Falar com vendas<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
    <a class="cz-cta cz-cta--brand" href="#botoes-site">Testar grátis por 14 dias<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
  
```
```html
<!-- 44 px em seções e cartões; 52 px no topo da página -->
<a class="cz-cta" href="#botoes-site">Ver planos<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
    <a class="cz-cta cz-cta--lg" href="#botoes-site">Ver planos<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
  
```
```html
<a class="cz-cta cz-cta--flat" href="#botoes-site">Ver a loja de exemplo<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span></span></a>
    <button class="cz-cta cz-cta--brand cz-cta--flat" type="button" data-toast="success" data-title="Plano no carrinho" data-msg="Pro, cobrança mensal.">Assinar o Pro<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span></span></button>
```
```html
<a class="cz-cta" href="#botoes-site">Criar minha loja<span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></span></a>
    <a class="cz-cta-link" href="#botoes-site">Comparar planos<span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></a>
```

<a id="links"></a>
## Ações › Links

Links levam a outro lugar; botões fazem algo acontecer. No texto, o link é sublinhado e usa o laranja para texto, que tem contraste suficiente nos dois temas.
```html
<!-- Padrão · Discreto (em texto corrido de ajuda) · Externo com ícone -->
<p style="max-width:60ch">Os pedidos pagos por Pix são confirmados em segundos. Veja <a class="cz-link" href="#pedido">como acompanhar o status</a> ou <a class="cz-link cz-link--quiet" href="#chat">fale com o atendimento</a>.</p>
    <div class="ds-row"><a class="cz-link" href="#checkout">Revisar checkout <span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-right.svg)" aria-hidden="true"></span></a><a class="cz-link" href="https://convertize.com.br" target="_blank" rel="noopener">Site da Convertize <span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/external-link.svg)" aria-hidden="true"></span></a></div>
  
```

<a id="campos"></a>
## Formulários › Campo de texto

Rótulo sempre visível acima do campo, ajuda abaixo quando necessário. O foco troca a borda para laranja com um halo suave; o erro troca para vermelho e explica como corrigir.
```html
<div class="cz-field"><label for="f-nome">Nome da loja</label><input class="cz-input" id="f-nome" value="Ateliê Forma"></div>
    <div class="cz-field"><label for="f-email">E-mail</label><div class="cz-input-wrap"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/mail.svg)" aria-hidden="true"></span><input class="cz-input" id="f-email" type="email" placeholder="voce@loja.com.br"></div></div>
    <div class="cz-field"><label for="f-preco">Preço</label><div class="cz-input-wrap"><span class="cz-prefix">R$</span><input class="cz-input num" id="f-preco" inputmode="decimal" value="189,90"></div></div>
    <div class="cz-field"><label for="f-peso">Peso</label><div class="cz-input-wrap"><input class="cz-input num" id="f-peso" inputmode="decimal" value="1,2"><span class="cz-suffix">kg</span></div></div>
    <div class="cz-field"><label for="f-senha">Senha</label><div class="cz-input-wrap"><input class="cz-input" id="f-senha" type="password" value="convertize2026"><button class="cz-clear" type="button" data-reveal="f-senha" aria-label="Mostrar senha"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/eye.svg)" aria-hidden="true"></span></button></div><span class="cz-help">Mínimo de 8 caracteres.</span></div>
    <div class="cz-field"><label for="f-cep">CEP</label><div class="cz-input-wrap"><input class="cz-input num" id="f-cep" value="01310-100" data-clearable><button class="cz-clear" type="button" data-clear="f-cep" aria-label="Limpar CEP"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
```
```html
<div class="cz-field"><label for="s1">Padrão</label><input class="cz-input" id="s1" placeholder="Nome do produto"></div>
    <div class="cz-field"><label for="s2">Foco</label><input class="cz-input is-focus" id="s2" value="Vaso Terra"></div>
    <div class="cz-field"><label for="s3">Erro</label><input class="cz-input" id="s3" value="vaso-terra" aria-invalid="true" aria-describedby="s3e"><span class="cz-error" id="s3e"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/alert-triangle.svg)" aria-hidden="true"></span>Este SKU já está em uso. Tente FRM-002-B.</span></div>
    <div class="cz-field"><label for="s4">Desativado</label><input class="cz-input" id="s4" value="FRM-002" disabled></div>
    <div class="cz-field"><label for="s5">Somente leitura</label><input class="cz-input" id="s5" value="cvz_live_8f2a…" readonly>
```
```html
<div class="cz-field"><label for="f-desc">Descrição do produto <span class="opt">(opcional)</span></label><textarea class="cz-textarea" id="f-desc" maxlength="280" data-count="f-desc-c">Vaso em cerâmica de alta temperatura, esmaltado à mão. Cada peça tem pequenas variações de tom.</textarea><span class="cz-count" id="f-desc-c">0 / 280</span>
```
```html
<!-- Mesma escala dos botões: um campo e um botão do mesmo tamanho ficam alinhados. -->
<input class="cz-input cz-input--sm" style="max-width:200px" placeholder="Pequeno, 28 px" aria-label="Pequeno">
    <input class="cz-input" style="max-width:200px" placeholder="Padrão, 36 px" aria-label="Padrão">
    <input class="cz-input cz-input--lg" style="max-width:200px" placeholder="Grande, 44 px" aria-label="Grande">
  
```

<a id="selecao"></a>
## Formulários › Seleção e autocompletar

Use o select nativo para listas curtas e conhecidas. Com mais de 10 opções, ou quando a pessoa sabe o que procura, use o autocompletar com busca.
```html
<div class="cz-field"><label for="sel-canal">Canal de venda</label><select class="cz-select" id="sel-canal"><option>Loja online</option><option>Marketplace</option><option>Loja física</option><option>Televendas</option></select></div>
    <div class="cz-field"><label for="sel-uf">Estado</label><select class="cz-select" id="sel-uf"><option>São Paulo</option><option>Minas Gerais</option><option>Pernambuco</option><option>Rio Grande do Sul</option></select></div>
    <div class="cz-field"><label for="sel-dis">Transportadora</label><select class="cz-select" id="sel-dis" disabled><option>Defina o CEP primeiro</option></select><span class="cz-help">Liberado depois do CEP de origem.</span>
```
```html
<div class="cz-field cz-pop block" style="width:min(360px,100%)">
      <label for="combo-cat">Categoria</label>
      <div class="cz-input-wrap"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span><input class="cz-input" id="combo-cat" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="combo-cat-list" placeholder="Busque ou escolha" autocomplete="off" data-combo-create data-combo-empty="Nenhuma categoria com “{q}”. Pressione Enter para criar." data-combo='["Casa e decoração","Cerâmica","Iluminação","Papelaria","Embalagens","Kits presenteáveis","Têxteis","Utensílios de cozinha","Jardim","Arte e quadros","Organização","Aromas e velas"]'></div>
      <div class="cz-menu" id="combo-cat-list" role="listbox" style="width:100%;max-height:240px;overflow:auto" hidden></div>
      <span class="cz-help">Use as setas para navegar e Enter para escolher.</span>
    
```
```html
<div class="cz-pop">
      <button class="cz-btn cz-btn--secondary" data-menu-trigger data-select-menu="Ordenar: " aria-haspopup="listbox" aria-expanded="false"><span>Ordenar: Mais vendidos</span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
      <div class="cz-menu" role="listbox" hidden>
        <button class="cz-menu-item" role="option" aria-selected="true">Mais vendidos</button>
        <button class="cz-menu-item" role="option" aria-selected="false">Menor preço</button>
        <button class="cz-menu-item" role="option" aria-selected="false">Maior preço</button>
        <button class="cz-menu-item" role="option" aria-selected="false">Lançamentos</button>
      </div>
    
```

<a id="checkbox"></a>
## Formulários › Checkbox e radio

Checkbox para escolhas independentes; radio para uma única escolha entre opções que se excluem. Quando cada opção tem preço ou descrição, use o cartão de opção.
```html
<!-- O item pai fica indeterminado quando só parte dos filhos está marcada. -->
<div style="display:grid;gap:12px">
      <label class="cz-check"><input type="checkbox" id="chk-all" data-check-all="notif"><span>Todas as notificações</span></label>
      <div style="display:grid;gap:12px;padding-left:28px">
        <label class="cz-check"><input type="checkbox" data-check-child="notif" checked><span>Novo pedido</span></label>
        <label class="cz-check"><input type="checkbox" data-check-child="notif"><span>Estoque baixo</span></label>
        <label class="cz-check"><input type="checkbox" data-check-child="notif" checked><span>Avaliação recebida</span></label>
      </div>
    </div>
    <div style="display:grid;gap:12px">
      <label class="cz-check"><input type="checkbox" checked><span>Marcado</span></label>
      <label class="cz-check"><input type="checkbox"><span>Vazio</span></label>
      <label class="cz-check"><input type="checkbox" checked disabled><span>Desativado</span></label>
      <label class="cz-check"><input type="checkbox"><span>Aceito os termos de uso<small>Você pode cancelar quando quiser.</small></span></label>
    </div>
  
```
```html
<fieldset style="border:0;padding:0;margin:0;display:grid;gap:12px"><legend class="cz-label" style="margin-bottom:10px">Forma de pagamento</legend>
      <label class="cz-radio"><input type="radio" name="pg" checked><span>Pix</span></label>
      <label class="cz-radio"><input type="radio" name="pg"><span>Cartão de crédito</span></label>
      <label class="cz-radio"><input type="radio" name="pg"><span>Boleto</span></label>
      <label class="cz-radio"><input type="radio" name="pg" disabled><span>Crediário (indisponível)</span></label>
    </fieldset>
```
```html
<label class="cz-choice-card"><span class="cz-radio"><input type="radio" name="frete" checked></span><span><b>Expressa</b><br><small class="cz-help">Chega amanhã, 24 de setembro</small></span><span class="price num">R$ 24,90</span></label>
    <label class="cz-choice-card"><span class="cz-radio"><input type="radio" name="frete"></span><span><b>Econômica</b><br><small class="cz-help">De 5 a 7 dias úteis</small></span><span class="price num">R$ 12,40</span></label>
    <label class="cz-choice-card"><span class="cz-radio"><input type="radio" name="frete"></span><span><b>Retirar na loja</b><br><small class="cz-help">Rua Augusta, 1200 · pronto em 2 horas</small></span><span class="price">Grátis</span></label>
```

<a id="switch"></a>
## Formulários › Switch

Liga e desliga algo que tem efeito imediato, sem botão de salvar. Se a mudança só vale depois de confirmar, use checkbox.
```html
<!-- Ligado · Ligado · Desligado · Desativado -->
<div class="cz-list-item" style="padding:14px 0"><div class="body"><b>Vender no marketplace</b><small>Publica o catálogo nos canais conectados.</small></div><label class="cz-switch"><input type="checkbox" checked aria-label="Vender no marketplace"></label></div>
    <div class="cz-list-item" style="padding:14px 0"><div class="body"><b>Aceitar Pix</b><small>Confirmação em até 10 segundos.</small></div><label class="cz-switch"><input type="checkbox" checked aria-label="Aceitar Pix"></label></div>
    <div class="cz-list-item" style="padding:14px 0"><div class="body"><b>Modo férias</b><small>Pausa novos pedidos e avisa na vitrine.</small></div><label class="cz-switch"><input type="checkbox" aria-label="Modo férias"></label></div>
    <div class="cz-list-item" style="padding:14px 0;border:0"><div class="body"><b>Nota fiscal automática</b><small>Disponível no plano Pro.</small></div><label class="cz-switch"><input type="checkbox" disabled aria-label="Nota fiscal automática"></label></div>
  
```

<a id="slider"></a>
## Formulários › Slider

Para escolher um valor aproximado dentro de uma faixa: desconto, raio de entrega, preço máximo. Sempre mostre o valor atual ao lado do rótulo.
```html
<div class="cz-slider"><div class="cz-slider-head"><label for="rg1">Desconto da campanha</label><output for="rg1" data-suffix="%">15%</output></div><input class="cz-range" id="rg1" type="range" min="0" max="60" step="5" value="15"></div>
    <div class="cz-slider"><div class="cz-slider-head"><label for="rg2">Raio de entrega própria</label><output for="rg2" data-suffix=" km">8 km</output></div><input class="cz-range" id="rg2" type="range" min="1" max="30" value="8"></div>
    <div class="cz-slider"><div class="cz-slider-head"><label for="rg3">Preço máximo</label><output for="rg3" data-prefix="R$ ">R$ 350</output></div><input class="cz-range" id="rg3" type="range" min="0" max="1000" step="10" value="350"><div class="cz-slider-head cz-help"><span>R$ 0</span><span>R$ 1.000</span></div>
```

<a id="busca"></a>
## Formulários › Busca

Um botão discreto abre uma paleta com resultados e ações. A pessoa digita, navega com as setas e abre com Enter. Serve para ir direto a um pedido, produto ou cliente sem ocupar espaço na tela com um campo sempre aberto.
```html
<!-- Botão de 36 px, lista de 380 px, categoria alinhada à direita -->
<button type="button" class="cz-cmd-trigger" data-cmd-demo aria-label="Buscar na loja"><span class="lbl">Buscar...</span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span></button>
    <p class="cz-help">Experimente “pedido”, “tema” ou um nome que não existe.</p>
  
```

<a id="quantidade"></a>
## Formulários › Quantidade

Seletor numérico com limites. O botão de diminuir desativa no mínimo, o de aumentar no estoque disponível, e a pessoa também pode digitar.
```html
<div class="cz-field"><span class="cz-label" id="q1l">Padrão</span><div class="cz-qty" data-qty data-min="1" data-max="12" role="group" aria-labelledby="q1l"><button type="button" data-step="-1" aria-label="Diminuir"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/minus.svg)" aria-hidden="true"></span></button><input type="number" value="1" min="1" max="12" aria-label="Quantidade"><button type="button" data-step="1" aria-label="Aumentar"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button></div><span class="cz-help">12 em estoque</span></div>
    <div class="cz-field"><span class="cz-label" id="q2l">Compacto</span><div class="cz-qty cz-qty--sm" data-qty data-min="0" data-max="3" role="group" aria-labelledby="q2l"><button type="button" data-step="-1" aria-label="Diminuir"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/minus.svg)" aria-hidden="true"></span></button><input type="number" value="3" min="0" max="3" aria-label="Quantidade"><button type="button" data-step="1" aria-label="Aumentar"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button></div><span class="cz-help">Limite atingido</span>
```

<a id="upload"></a>
## Formulários › Upload de arquivos

Área de soltar com alternativa por clique. Diga antes quais formatos e tamanhos são aceitos, mostre o progresso de cada arquivo e explique a recusa quando houver.
```html
<!-- Arraste arquivos de verdade para testar. -->
<label class="cz-drop" data-drop>
      <span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/upload.svg)" aria-hidden="true"></span>
      <strong>Solte as fotos do produto aqui</strong>
      <small>ou <span class="cz-link">escolha no computador</span> · JPEG, PNG ou WebP até 10 MB</small>
      <input type="file" multiple accept="image/*,.pdf" class="vh">
    </label>
    <div class="cz-upload-list" data-upload-list>
      <div class="cz-upload-item"><span class="cz-file" data-file="png" style="--s:32px"></span><div><b>vaso-terra-frente.png</b><div class="cz-help">2,1 MB · enviado</div></div><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Remover arquivo" data-remove><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
      <div class="cz-upload-item"><span class="cz-file" data-file="pdf" style="--s:32px"></span><div><b>ficha-tecnica.pdf</b><div class="cz-progress cz-progress--brand" style="margin-top:6px"><i style="--v:64%"></i></div></div><span class="cz-help num">64%</span></div>
      <div class="cz-upload-item" style="border-color:var(--danger-line);background:var(--danger-bg)"><span class="cz-file" data-file="zip" style="--s:32px"></span><div><b>fotos-colecao.zip</b><div class="cz-error">Arquivos .zip não são aceitos. Envie as imagens separadas.</div></div><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Remover arquivo" data-remove><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
    </div>
  
```

<a id="data"></a>
## Formulários › Seletor de data

Campo com máscara dd/mm/aaaa e calendário opcional. Para relatórios, o modo de período marca início e fim, com atalhos para intervalos comuns.
```html
<!-- Clique em dois dias no calendário à direita para marcar um período. -->
<div class="cz-field cz-pop" style="width:240px">
      <label for="dt1">Início da promoção</label>
      <div class="cz-input-wrap"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/calendar.svg)" aria-hidden="true"></span><input class="cz-input num" id="dt1" value="24/09/2026" data-date-input="cal1" aria-haspopup="dialog"></div>
      <div class="cz-menu" style="padding:0;border:0;background:transparent;box-shadow:none" data-cal-pop hidden><div class="cz-cal" id="cal1" data-cal data-target="dt1" data-today="2026-09-22" data-value="2026-09-24"></div></div>
    </div>
    <div><p class="ds-label">Calendário aberto</p><div class="cz-cal" data-cal data-mode="range" data-today="2026-09-22" data-start="2026-09-14" data-end="2026-09-20"></div></div>
  
```

<a id="chips"></a>
## Formulários › Chips e tags

Chips de filtro refinam uma lista na hora. Chips de entrada representam valores digitados, como tags de produto ou e-mails, e podem ser removidos.
```html
<button class="cz-chip" data-toggle aria-pressed="true"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span>Em estoque</button>
    <button class="cz-chip" data-toggle aria-pressed="false">Frete grátis</button>
    <button class="cz-chip" data-toggle aria-pressed="false">Em promoção</button>
    <button class="cz-chip" data-toggle aria-pressed="false">Lançamentos</button>
    <button class="cz-chip"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/adjustments-horizontal.svg)" aria-hidden="true"></span>Mais filtros</button>
```
```html
<div class="cz-field"><label for="tags-in">Tags do produto</label>
      <div class="cz-tags-input" data-tags>
        <span class="cz-chip cz-chip--input">cerâmica<button class="x" aria-label="Remover cerâmica"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></span>
        <span class="cz-chip cz-chip--input">feito à mão<button class="x" aria-label="Remover feito à mão"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></span>
        <span class="cz-chip cz-chip--input">presente<button class="x" aria-label="Remover presente"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></span>
        <input id="tags-in" placeholder="Digite e pressione Enter">
      </div>
    </div>
    <div class="ds-row"><span class="cz-chip"><span class="cz-avatar cz-avatar--sky">MP</span>Marina Prado<button class="x" aria-label="Remover Marina"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></span><span class="cz-chip"><span class="cz-avatar cz-avatar--heather">EM</span>Eriton Muniz<button class="x" aria-label="Remover Eriton"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></span>
```
```html
<span class="cz-tag"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span>FRM-002</span><span class="cz-tag">Cerâmica</span><span class="cz-tag cz-tag--ship"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span>Envio em 24 h</span><span class="cz-tag cz-tag--ok"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span>Em estoque</span><span class="cz-tag cz-tag--brand"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/percentage.svg)" aria-hidden="true"></span>Primavera</span>
```

<a id="formulario"></a>
## Formulários › Validação de formulário

Valide ao sair do campo e novamente ao enviar. Erros ficam junto do campo, dizem o que fazer e o foco vai para o primeiro problema. Tente enviar o formulário vazio.
```html
<form class="ds-form-demo" novalidate data-validate style="display:grid;gap:18px">
      <div class="ds-grid two" style="gap:16px">
        <div class="cz-field"><label for="v-nome">Nome completo</label><input class="cz-input" id="v-nome" required data-msg="Informe o nome como está no documento." autocomplete="name"></div>
        <div class="cz-field"><label for="v-cpf">CPF</label><input class="cz-input num" id="v-cpf" required pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" data-msg="Use 11 números, como 123.456.789-09." inputmode="numeric"></div>
      </div>
      <div class="cz-field"><label for="v-email">E-mail</label><input class="cz-input" id="v-email" type="email" required data-msg="Use um e-mail completo, como nome@loja.com.br." autocomplete="email"></div>
      <div class="cz-field"><label for="v-seg">Segmento da loja</label><select class="cz-select" id="v-seg" required data-msg="Escolha o segmento principal."><option value="">Escolha</option><option>Casa e decoração</option><option>Moda</option><option>Farmácia e saúde</option><option>Alimentos</option></select></div>
      <label class="cz-check"><input type="checkbox" id="v-termos" required data-msg="Aceite os termos para criar a conta."><span>Li e aceito os termos de uso</span></label>
      <div class="ds-row"><button class="cz-btn" type="submit">Criar conta</button><button class="cz-btn cz-btn--ghost" type="reset">Limpar</button></div>
    </form>
```

<a id="barra-superior"></a>
## Navegação › Barra superior

Fixa no topo, com o título da tela ou a busca global à esquerda e as ações de conta à direita. Em telas pequenas, o botão de menu abre a sidebar em gaveta.
```html
<div class="cz-topbar">
      <button class="cz-icon-btn" aria-label="Abrir menu"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/menu-2.svg)" aria-hidden="true"></span></button>
      <div class="cz-input-wrap"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span><input class="cz-input" placeholder="Buscar pedidos, produtos ou clientes" aria-label="Busca global"></div>
      <div class="grow"></div>
      <span class="cz-tooltip"><button class="cz-icon-btn" aria-label="Ajuda"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/help-circle.svg)" aria-hidden="true"></span></button><span role="tooltip">Central de ajuda</span></span>
      <span class="cz-with-count"><button class="cz-icon-btn" aria-label="Notificações, 3 novas"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/bell.svg)" aria-hidden="true"></span></button><span class="cz-count-dot">3</span></span>
      <span class="cz-avatar cz-avatar--brand">MP</span>
    
```
```html
<div class="cz-topbar">
      <button class="cz-icon-btn" aria-label="Voltar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-left.svg)" aria-hidden="true"></span></button>
      <div><h3>Vaso Terra</h3><div class="cz-help">Produto · FRM-002</div></div>
      <span class="cz-badge cz-badge--success"><span class="d"></span>Ativo</span>
      <div class="grow"></div>
      <button class="cz-btn cz-btn--secondary cz-btn--sm">Pré-visualizar</button>
      <button class="cz-btn cz-btn--sm">Salvar</button>
    
```
```html
<div class="cz-topbar cz-topbar--dark">{{sym}}<h3>Convertize</h3><div class="grow"></div><button class="cz-icon-btn" aria-label="Notificações"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/bell.svg)" aria-hidden="true"></span></button><span class="cz-avatar cz-avatar--brand">MP</span>
```

<a id="sidebar"></a>
## Navegação › Sidebar

Navegação, conversas recentes e seletor de conta, nos estados expandido e recolhido. Use o botão ao lado do logo para recolher ou expandir; no celular ela já começa recolhida.
```html
<!-- Navegação Convertize -->
  
  <div class="cz-sidebar-demo" data-sidebar-demo>
    <aside class="cz-sidebar" data-sidebar aria-label="Exemplo de sidebar">
      <div class="cz-sidebar-head">{{logo}}{{sym}}<button data-collapse aria-label="Recolher menu" aria-expanded="true"><svg class="i" aria-hidden="true"><use href="#i-sidebar"/></svg></button></div>
      <button class="cz-side-item" aria-current="page" data-sb-page="Novo chat|Como posso ajudar hoje?|Escolha um app, retome uma conversa ou comece com uma nova pergunta."><svg class="i" aria-hidden="true"><use href="#i-edit"/></svg><span class="lbl">Novo chat</span></button>
      <button class="cz-side-item" data-sb-page="Chats|Suas conversas|Todas as conversas com clientes e com a Convertize, da mais recente para a mais antiga."><svg class="i" aria-hidden="true"><use href="#i-file"/></svg><span class="lbl">Chats</span></button>
      <button class="cz-side-item" data-sb-page="Buscar|Buscar em tudo|Pedidos, produtos, clientes e conversas em um só lugar."><svg class="i" aria-hidden="true"><use href="#i-search"/></svg><span class="lbl">Buscar</span></button>
      <button class="cz-side-item" data-sb-page="Conectores|Conectores|Marketplaces, meios de pagamento e transportadoras ligados à sua loja."><svg class="i" aria-hidden="true"><use href="#i-grid"/></svg><span class="lbl">Conectores</span></button>
      <button class="cz-side-item" data-sb-page="Biblioteca|Biblioteca|Arquivos, catálogos e respostas salvas para reutilizar."><svg class="i" aria-hidden="true"><use href="#i-layers"/></svg><span class="lbl">Biblioteca</span></button>
      <div class="cz-sidebar-section">Recentes</div>
      <button class="cz-side-item" data-sb-page="Explorar catálogo|Explorar catálogo|Conversa de ontem sobre os mais vendidos da Ateliê Forma."><svg class="i" aria-hidden="true"><use href="#i-clock"/></svg><span class="lbl">Explorar catálogo</span></button>
      <button class="cz-side-item" data-sb-page="Integração da loja|Integração da loja|Token do Mercado Livre renovado. Estoque sincronizado."><svg class="i" aria-hidden="true"><use href="#i-clock"/></svg><span class="lbl">Integração da loja</span></button>
      <div class="cz-sidebar-spacer"></div>
      <button class="cz-side-item" data-sb-page="Configurações|Configurações|Dados da loja, equipe, notificações e plano."><svg class="i" aria-hidden="true"><use href="#i-sliders"/></svg><span class="lbl">Configurações</span></button>
      <button class="cz-sidebar-foot" aria-label="Sarah Chen, plano Pro">
        <img src="assets/img/img-retrato.webp" alt=""><div>Sarah Chen<small>Plano Pro</small></div><svg class="i" aria-hidden="true"><use href="#i-chev-down"/></svg>
      </button>
    </aside>
    <div class="cz-sidebar-content" aria-live="polite">
      <h3 data-sb-title>Como posso ajudar hoje?</h3>
      <p data-sb-desc>Escolha um app, retome uma conversa ou comece com uma nova pergunta.</p>
      <div class="cz-suggestions"><button>Explorar objetos para casa</button><button>Pedidos atrasados hoje</button><button>Quais são os mais vendidos?</button><button>Criar cupom de primavera</button></div>
    </div>
  </div>

  <!-- Painel da loja -->
  
  <div class="cz-sidebar-demo">
    <aside class="cz-sidebar" data-sidebar>
      <div class="cz-sidebar-head">{{logo}}{{sym}}<button data-collapse aria-label="Recolher menu" aria-expanded="true"><svg class="i" aria-hidden="true"><use href="#i-sidebar"/></svg></button></div>
      <button class="cz-side-item" aria-current="page"><svg class="i" aria-hidden="true"><use href="#i-home"/></svg><span class="lbl">Visão geral</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-bag"/></svg><span class="lbl">Pedidos</span><span class="cz-badge cz-badge--brand">12</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-catalog"/></svg><span class="lbl">Catálogo</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-users"/></svg><span class="lbl">Clientes</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-analytics"/></svg><span class="lbl">Relatórios</span></button>
      <div class="cz-sidebar-section">Canais</div>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-store"/></svg><span class="lbl">Loja online</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-globe"/></svg><span class="lbl">Marketplaces</span></button>
      <div class="cz-sidebar-spacer"></div>
      <button class="cz-sidebar-foot" aria-label="Marina Prado, Ateliê Forma"><span class="cz-avatar cz-avatar--brand">MP</span><div>Marina Prado<small>Ateliê Forma · Pro</small></div><svg class="i" aria-hidden="true"><use href="#i-chev-down"/></svg></button>
    </aside>
    <div class="cz-sidebar-content"><p class="ds-label">Conteúdo da página</p><div style="display:grid;gap:12px;margin-top:8px"><div class="cz-skel" style="height:28px;width:40%"></div><div class="cz-skel" style="height:110px"></div><div class="cz-skel" style="height:110px"></div></div></div>
  </div>

  <!-- Variante escura -->
  
  <div class="cz-sidebar-demo" style="min-height:360px">
    <aside class="cz-sidebar cz-sidebar--dark" data-sidebar>
      <div class="cz-sidebar-head">{{logo}}{{sym}}<button data-collapse aria-label="Recolher menu" aria-expanded="true"><svg class="i" aria-hidden="true"><use href="#i-sidebar"/></svg></button></div>
      <button class="cz-side-item" aria-current="page"><svg class="i" aria-hidden="true"><use href="#i-home"/></svg><span class="lbl">Visão geral</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-bag"/></svg><span class="lbl">Pedidos</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-catalog"/></svg><span class="lbl">Catálogo</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-users"/></svg><span class="lbl">Clientes</span></button>
      <div class="cz-sidebar-spacer"></div>
      <button class="cz-sidebar-foot" aria-label="Marina Prado"><span class="cz-avatar cz-avatar--brand">MP</span><div>Marina Prado<small>Administração</small></div><svg class="i" aria-hidden="true"><use href="#i-chev-down"/></svg></button>
    </aside>
    <div class="cz-sidebar-content"><div class="cz-skel" style="height:28px;width:40%"></div></div>
  </div>

  <!-- Uso -->
  <div class="ds-guides">
    <div class="ds-guide do"><h3><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span>Faça</h3><ul><li>Até 7 itens principais; agrupe o resto em seções.</li><li>Configurações e conta sempre no rodapé.</li><li>Na versão recolhida, mantenha tooltip ou rótulo acessível em cada ícone.</li></ul></div>
    <div class="ds-guide dont"><h3><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span>Evite</h3><ul><li>Esconder a sidebar por completo em telas médias: recolha para 52 px.</li><li>Mais de um item ativo.</li></ul></div>
  </div>
```

<a id="abas"></a>
## Navegação › Abas

Separam conteúdos do mesmo nível dentro de uma página. O indicador laranja marca a aba ativa; as setas do teclado movem entre elas.
```html
<div data-tabs>
      <div class="cz-tabs" role="tablist" aria-label="Pedidos">
        <button class="cz-tab" role="tab" aria-selected="true" aria-controls="tp1" id="t1">Todos <span class="cz-count-badge">248</span></button>
        <button class="cz-tab" role="tab" aria-selected="false" aria-controls="tp2" id="t2" tabindex="-1">A enviar <span class="cz-count-badge">12</span></button>
        <button class="cz-tab" role="tab" aria-selected="false" aria-controls="tp3" id="t3" tabindex="-1">Em trânsito</button>
        <button class="cz-tab" role="tab" aria-selected="false" aria-controls="tp4" id="t4" tabindex="-1">Devoluções</button>
      </div>
      <div class="cz-tab-panel" role="tabpanel" id="tp1" aria-labelledby="t1">248 pedidos nos últimos 30 dias, de todos os canais.</div>
      <div class="cz-tab-panel" role="tabpanel" id="tp2" aria-labelledby="t2" hidden>12 pedidos pagos aguardando etiqueta de envio.</div>
      <div class="cz-tab-panel" role="tabpanel" id="tp3" aria-labelledby="t3" hidden>31 pedidos com a transportadora.</div>
      <div class="cz-tab-panel" role="tabpanel" id="tp4" aria-labelledby="t4" hidden>2 solicitações de troca abertas.</div>
    
```
```html
<div data-tabs>
      <div class="cz-tabs cz-tabs--pill" role="tablist" aria-label="Coleções">
        <button class="cz-tab" role="tab" aria-selected="true" aria-controls="pp1" id="p1">Cerâmica</button>
        <button class="cz-tab" role="tab" aria-selected="false" aria-controls="pp2" id="p2" tabindex="-1">Iluminação</button>
        <button class="cz-tab" role="tab" aria-selected="false" aria-controls="pp3" id="p3" tabindex="-1">Papelaria</button>
      </div>
      <div class="cz-tab-panel" role="tabpanel" id="pp1" aria-labelledby="p1">14 peças em cerâmica de alta temperatura.</div>
      <div class="cz-tab-panel" role="tabpanel" id="pp2" aria-labelledby="p2" hidden>6 luminárias de mesa e pendentes.</div>
      <div class="cz-tab-panel" role="tabpanel" id="pp3" aria-labelledby="p3" hidden>22 cadernos, cartões e embalagens.</div>
    
```

<a id="breadcrumb"></a>
## Navegação › Breadcrumb

Mostra onde a tela está na hierarquia e permite voltar um ou mais níveis. Use a partir do terceiro nível; o último item é a página atual e não é link.
```html
<nav class="cz-breadcrumb" aria-label="Você está em"><ol><li><a href="#inicio">Painel</a></li><li><a href="#tabela">Catálogo</a></li><li><a href="#tabela">Cerâmica</a></li><li><span aria-current="page">Vaso Terra</span></li></ol></nav>
    <nav class="cz-breadcrumb" aria-label="Você está em"><ol><li><a href="#inicio"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/home.svg)" aria-hidden="true"></span><span class="vh">Início</span></a></li><li><a href="#pedido">Pedidos</a></li><li><span aria-current="page">#CV-2048</span></li></ol></nav>
```

<a id="paginacao"></a>
## Navegação › Paginação

Para listas longas com posição estável, como pedidos e produtos. Mostre o intervalo exibido e o total; reticências resumem páginas intermediárias.
```html
<!-- Clique nas páginas: o intervalo e as reticências se ajustam. -->
<div class="cz-pagination" data-pagination data-noun="pedidos" data-total="24" data-current="6" data-per="20" data-items="468"></div>
  
```
```html
<!-- Compacta para mobile · “Carregar mais” para vitrines -->
<div class="cz-pagination"><button aria-label="Página anterior"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-left.svg)" aria-hidden="true"></span></button><span class="cz-help num" style="padding:0 8px">Página 2 de 9</span><button aria-label="Próxima página"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-right.svg)" aria-hidden="true"></span></button></div>
    <button class="cz-btn cz-btn--secondary">Carregar mais 20 produtos</button>
  
```

<a id="etapas"></a>
## Navegação › Etapas

Para fluxos com ordem fixa, como checkout, cadastro da loja ou importação de catálogo. Mostram o que foi feito, onde a pessoa está e o que falta.
```html
<ol class="cz-steps">
      <li class="done"><span class="dot">1</span><span class="lbl">Carrinho</span></li>
      <li class="current"><span class="dot">2</span><span class="lbl">Entrega</span></li>
      <li><span class="dot">3</span><span class="lbl">Pagamento</span></li>
      <li><span class="dot">4</span><span class="lbl">Revisão</span></li>
    </ol>
    <div class="ds-row" style="justify-content:space-between;margin-top:12px"><button class="cz-btn cz-btn--ghost" data-step-prev><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-left.svg)" aria-hidden="true"></span>Voltar</button><button class="cz-btn" data-step-next data-last-label="Confirmar pedido">Continuar</button>
```
```html
<ol class="cz-steps cz-steps--vertical">
      <li class="done"><span class="dot">1</span><span>Dados da loja<small>CNPJ e endereço confirmados</small></span></li>
      <li class="done"><span class="dot">2</span><span>Pagamentos<small>Pix e cartão ativos</small></span></li>
      <li class="current"><span class="dot">3</span><span>Frete<small>Escolha as transportadoras</small></span></li>
      <li><span class="dot">4</span><span>Primeiro produto<small>Leva cerca de 5 minutos</small></span></li>
    </ol>
```

<a id="navegacao-inferior"></a>
## Navegação › Navegação inferior

No app mobile, de três a cinco destinos principais ficam ao alcance do polegar. Quando um destino precisa de uma ação rápida em vez de uma tela nova, o botão expande um painel curto por cima da barra, sem sair de onde a pessoa está.
```html
<!-- Ações rápidas · Buscar · Notificações · Conta · Tema (troca de verdade) -->
<div class="demo-phone" style="height:auto">
      <div class="scr" style="min-height:280px"><p style="font:400 24px var(--font-display)">Pedidos</p><div class="cz-skel" style="height:64px"></div><div class="cz-skel" style="height:64px"></div></div>
      <div class="cz-bottom-menu-wrap">
        <div class="cz-bottom-menu" data-bottom-menu aria-label="Menu rápido">
          <div class="cz-bottom-menu-measure cz-bottom-menu-inner" data-bm-measure aria-hidden="true"></div>
          <div class="cz-bottom-menu-panel" data-bm-panel hidden>
            <div class="cz-bottom-menu-inner" data-bm-inner></div>
          </div>
          <div class="cz-bottom-menu-bar" data-bm-bar role="group">
            <button type="button" class="cz-bottom-menu-item" data-bm-key="quick" aria-haspopup="true" aria-expanded="false" aria-label="Ações rápidas"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button>
            <button type="button" class="cz-bottom-menu-item" data-bm-key="search" aria-haspopup="true" aria-expanded="false" aria-label="Buscar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span></button>
            <button type="button" class="cz-bottom-menu-item" data-bm-key="alerts" aria-haspopup="true" aria-expanded="false" aria-label="Notificações"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/bell.svg)" aria-hidden="true"></span></button>
            <button type="button" class="cz-bottom-menu-item" data-bm-key="account" aria-haspopup="true" aria-expanded="false" aria-label="Conta"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/user-circle.svg)" aria-hidden="true"></span></button>
            <button type="button" class="cz-bottom-menu-item" data-bm-key="theme" aria-haspopup="true" aria-expanded="false" aria-label="Tema"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/sun.svg)" aria-hidden="true"></span></button>
          </div>
        </div>
      </div>
    </div>
  
```
```html
<div class="demo-phone" style="height:auto">
      <div class="scr" style="min-height:200px"><p style="font:400 24px var(--font-display)">Pedidos</p><div class="cz-skel" style="height:64px"></div><div class="cz-skel" style="height:64px"></div></div>
      <nav class="cz-bottom-nav" data-bottom-nav aria-label="Principal">
        <button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/home.svg)" aria-hidden="true"></span></span>Início</button>
        <button aria-current="page"><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/shopping-bag.svg)" aria-hidden="true"></span></span>Pedidos<span class="dotn"></span></button>
        <button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/category.svg)" aria-hidden="true"></span></span>Catálogo</button>
        <button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span></span>Chat</button>
        <button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/user-circle.svg)" aria-hidden="true"></span></span>Conta</button>
      </nav>
    
```

<a id="menu"></a>
## Navegação › Menu

Lista de ações que abre a partir de um botão. Agrupe por afinidade, mostre atalhos quando existirem e deixe ações destrutivas por último, separadas.
```html
<div class="cz-pop">
      <button class="cz-btn cz-btn--secondary" data-menu-trigger aria-haspopup="menu" aria-expanded="false">Ações do pedido<span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
      <div class="cz-menu" role="menu" hidden>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span>Gerar etiqueta<kbd>E</kbd></button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/file-text.svg)" aria-hidden="true"></span>Emitir nota fiscal<kbd>N</kbd></button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/copy.svg)" aria-hidden="true"></span>Duplicar pedido</button>
        <div class="cz-menu-sep" role="separator"></div>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-back-up.svg)" aria-hidden="true"></span>Registrar devolução</button>
        <button class="cz-menu-item cz-menu-item--danger" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-x.svg)" aria-hidden="true"></span>Cancelar pedido</button>
      </div>
    </div>
    <div><p class="ds-label">Aberto</p>
      <div class="cz-menu static" role="menu" aria-label="Exemplo">
        <div class="cz-menu-title">Marina Prado</div>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/user-circle.svg)" aria-hidden="true"></span>Minha conta</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span>Trocar de loja</button>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/adjustments-horizontal.svg)" aria-hidden="true"></span>Preferências</button>
        <div class="cz-menu-sep" role="separator"></div>
        <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/logout.svg)" aria-hidden="true"></span>Sair</button>
      </div>
    
```

<a id="alertas"></a>
## Feedback › Alertas e banners

Alertas ficam no conteúdo, perto do que descrevem, e só saem quando o problema é resolvido ou a pessoa fecha. Banners avisam algo que vale para a conta inteira.
```html
<div class="cz-alert cz-alert--success" role="status"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span><div><strong>Ticket #CV-2048 criado</strong>Recebemos sua solicitação. Você pode acompanhar as atualizações na lista de tickets.</div><button class="close" aria-label="Fechar aviso" data-dismiss><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
    <div class="cz-alert cz-alert--warning" role="status"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/alert-triangle.svg)" aria-hidden="true"></span><div><strong>Você tem alterações pendentes</strong>Salve antes de sair para manter as edições feitas neste item.<div class="actions"><button class="cz-btn cz-btn--sm">Salvar agora</button><button class="cz-btn cz-btn--ghost cz-btn--sm">Descartar</button></div></div><span></span></div>
    <div class="cz-alert cz-alert--danger" role="alert"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-x.svg)" aria-hidden="true"></span><div><strong>Não foi possível anexar o arquivo</strong>Escolha um PDF, JPEG ou PNG de até 10 MB. O arquivo atual permanece fora da conversa.<div class="actions"><a class="cz-link" href="#upload">Escolher outro arquivo</a></div></div><button class="close" aria-label="Fechar aviso" data-dismiss><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
    <div class="cz-alert cz-alert--info" role="status"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/info-circle.svg)" aria-hidden="true"></span><div><strong>Nova integração disponível</strong>Conecte sua conta do Mercado Livre e sincronize o estoque automaticamente.</div><button class="close" aria-label="Fechar aviso" data-dismiss><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button>
```
```html
<div class="cz-alert cz-alert--compact cz-alert--success"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span><div><strong>Item salvo</strong>Alterações atualizadas.</div><span></span></div>
    <div class="cz-alert cz-alert--compact cz-alert--success"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span><div><strong>Ticket criado</strong>#CV-2048 está na lista.</div><span></span></div>
    <div class="cz-alert cz-alert--compact cz-alert--info"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span><div><strong>Novo chat</strong>Conversa pronta para começar.</div><span></span></div>
    <div class="cz-alert cz-alert--compact cz-alert--danger"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/file-text.svg)" aria-hidden="true"></span><div><strong>Arquivo inválido</strong>Envie PDF, JPEG ou PNG.</div><span></span></div>
    <div class="cz-alert cz-alert--compact cz-alert--warning"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/alert-triangle.svg)" aria-hidden="true"></span><div><strong>Não salvo</strong>Salve antes de sair.</div><span></span></div>
    <div class="cz-alert cz-alert--compact cz-alert--warning"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span><div><strong>Sem conexão</strong>Tente novamente em instantes.</div><span></span></div>
    <div class="cz-alert cz-alert--compact"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/lock.svg)" aria-hidden="true"></span><div><strong>Sem permissão</strong>Peça acesso ao responsável.</div><span></span></div>
    <div class="cz-alert cz-alert--compact cz-alert--danger"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trash.svg)" aria-hidden="true"></span><div><strong>Excluir arquivo</strong>Confirme digitando o nome.</div><button class="cz-btn cz-btn--danger cz-btn--sm" data-open="dlg-delete">Excluir</button>
```
```html
<div class="cz-banner" role="region" aria-label="Aviso da conta"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/sparkles.svg)" aria-hidden="true"></span><span>Seu teste do plano Pro termina em 5 dias. <a class="cz-link" href="#checkout">Escolher um plano</a></span><button class="close" aria-label="Fechar aviso" data-dismiss><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button>
```

<a id="toast"></a>
## Feedback › Toasts

Confirmam uma ação que acabou de acontecer e somem sozinhos em 5 segundos. Quando a ação pode ser revertida, ofereça “Desfazer” e mantenha o toast por mais tempo.
```html
<button class="cz-btn cz-btn--secondary" data-toast="success" data-title="Produto salvo" data-msg="As alterações já aparecem na loja."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span>Sucesso</button>
    <button class="cz-btn cz-btn--secondary" data-toast="info" data-title="Novo ticket" data-msg="#CV-2051 · Farmácia Brito abriu um chamado."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/info-circle.svg)" aria-hidden="true"></span>Informação</button>
    <button class="cz-btn cz-btn--secondary" data-toast="warning" data-title="Estoque baixo" data-msg="Restam 2 unidades do Vaso Terra."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/alert-triangle.svg)" aria-hidden="true"></span>Atenção</button>
    <button class="cz-btn cz-btn--secondary" data-toast="danger" data-title="Pagamento recusado" data-msg="O banco não autorizou. Peça outro cartão ao cliente."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-x.svg)" aria-hidden="true"></span>Erro</button>
    <button class="cz-btn cz-btn--secondary" data-toast="success" data-title="Pedido arquivado" data-msg="#CV-2048 saiu da lista." data-undo><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-back-up.svg)" aria-hidden="true"></span>Com desfazer</button>
```
```html
<!-- Ícone de estado · título no passado · detalhe opcional · uma ação -->
<div class="cz-toast cz-toast--success static"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span><div><strong>Pedido arquivado</strong><small>#CV-2048 saiu da lista.</small></div><button class="undo">Desfazer</button></div>
  
```

<a id="progresso"></a>
## Feedback › Progresso e carregamento

Mostre progresso determinado quando souber quanto falta; spinner para esperas curtas; skeleton quando a estrutura da tela já é conhecida.
```html
<div class="cz-field"><div class="cz-slider-head"><span class="cz-label">Importando catálogo</span><span class="cz-help num" data-prog-label>0%</span></div><div class="cz-progress cz-progress--brand" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-prog><i style="--v:0%"></i></div><span class="cz-help">Produtos de planilha-colecao-verao.csv</span></div>
    <div class="cz-field"><div class="cz-slider-head"><span class="cz-label">Armazenamento</span><span class="cz-help num">50% usado</span></div><div class="cz-progress" role="progressbar" aria-valuenow="50"><i style="--v:50%"></i></div></div>
    <div class="cz-field"><div class="cz-slider-head"><span class="cz-label">Armazenamento</span><span class="cz-help num">100% usado</span></div><div class="cz-progress cz-progress--danger" role="progressbar" aria-valuenow="100"><i style="--v:100%"></i></div><span class="cz-error">Exclua arquivos para liberar espaço.</span></div>
    <div class="cz-field"><span class="cz-label">Sincronizando estoque</span><div class="cz-progress cz-progress--indeterminate" role="progressbar" aria-label="Sincronizando"><i></i></div></div>
    <button class="cz-btn cz-btn--secondary cz-btn--sm" data-prog-run style="justify-self:start"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/refresh.svg)" aria-hidden="true"></span>Reiniciar importação</button>
```
```html
<div class="cz-ring" style="--v:25"><span>25%</span></div>
    <div class="cz-ring" style="--v:62"><span>62%</span></div>
    <div class="cz-ring" style="--v:100;--s:88px"><span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span></div>
    <span class="cz-spinner" role="status" aria-label="Carregando"></span>
    <span class="cz-spinner cz-spinner--sm" role="status" aria-label="Carregando"></span>
```
```html
<div class="cz-card" style="max-width:520px"><div class="cz-card-body" style="gap:14px" aria-busy="true" aria-label="Carregando produtos">
      <div style="display:flex;gap:12px;align-items:center"><div class="cz-skel" style="width:48px;height:48px;border-radius:8px"></div><div style="flex:1;display:grid;gap:8px"><div class="cz-skel" style="height:12px;width:60%"></div><div class="cz-skel" style="height:10px;width:35%"></div></div></div>
      <div style="display:flex;gap:12px;align-items:center"><div class="cz-skel" style="width:48px;height:48px;border-radius:8px"></div><div style="flex:1;display:grid;gap:8px"><div class="cz-skel" style="height:12px;width:70%"></div><div class="cz-skel" style="height:10px;width:30%"></div></div></div>
      <div class="cz-skel" style="height:120px;border-radius:8px"></div>
    </div>
```

<a id="vazio"></a>
## Feedback › Estados vazios e erro

Uma tela vazia é um convite para agir. Diga o que vai aparecer ali e ofereça o primeiro passo. No erro, diga o que aconteceu e como sair dele.
```html
<!-- Primeiro uso -->
<div class="cz-empty">
      <span class="cz-ill-icon"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/category-plus.svg)" aria-hidden="true"></span></span>
      <h4>Seu catálogo começa aqui</h4><p>Cadastre um produto ou importe uma planilha com todos de uma vez.</p>
      <div class="ds-row"><button class="cz-btn"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Adicionar produto</button><button class="cz-btn cz-btn--secondary">Importar planilha</button></div>
    </div>
```
```html
<!-- Busca sem resultado -->
<div class="cz-empty">
      <span class="cz-ill-icon cz-ill-icon--muted"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span></span>
      <h4>Nenhum pedido encontrado</h4><p>Nada corresponde a “Brito” com o status Em trânsito. Tente outro termo ou limpe os filtros.</p>
      <div class="ds-row"><button class="cz-btn cz-btn--secondary">Limpar filtros</button></div>
    </div>
```
```html
<!-- Erro recuperável -->
<div class="cz-empty">
      <span class="cz-ill-icon cz-ill-icon--danger"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/plug-connected-x.svg)" aria-hidden="true"></span></span>
      <h4>Não conseguimos falar com o Mercado Livre</h4><p>A integração respondeu com erro 503. Seus pedidos estão seguros; tentaremos de novo em 5 minutos.</p>
      <div class="ds-row"><button class="cz-btn"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/refresh.svg)" aria-hidden="true"></span>Tentar agora</button><a class="cz-link" href="#chat">Ver status das integrações</a></div>
    </div>
```
```html
<!-- Lista concluída -->
<div class="cz-empty">
      <span class="cz-ill-icon"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck-delivery.svg)" aria-hidden="true"></span></span>
      <h4>Tudo enviado por hoje</h4><p>Os 12 pedidos pagos já têm etiqueta. Os próximos aparecem aqui assim que forem aprovados.</p>
    </div>
```

<a id="badges"></a>
## Feedback › Badges e status

Badges resumem um estado em uma ou duas palavras. Status sempre combina cor e texto, nunca só a cor.
```html
<span class="cz-badge">Padrão</span><span class="cz-badge cz-badge--brand">Novo</span><span class="cz-badge cz-badge--dark">Pro</span><span class="cz-badge cz-badge--info">Beta</span><span class="cz-badge cz-badge--outline">Rascunho</span>
```
```html
<span class="cz-badge cz-badge--success"><span class="d"></span>Pago</span>
    <span class="cz-badge cz-badge--info"><span class="d"></span>Em trânsito</span>
    <span class="cz-badge cz-badge--warning"><span class="d"></span>Aguardando pagamento</span>
    <span class="cz-badge cz-badge--danger"><span class="d"></span>Cancelado</span>
    <span class="cz-badge"><span class="d"></span>Entregue</span>
    <span class="cz-badge cz-badge--success"><span class="d"></span>Ativo</span>
    <span class="cz-badge cz-badge--warning"><span class="d"></span>Baixo estoque</span>
    <span class="cz-badge cz-badge--danger"><span class="d"></span>Esgotado</span>
```
```html
<span class="cz-with-count"><button class="cz-icon-btn cz-icon-btn--secondary" aria-label="Notificações, 3 novas"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/bell.svg)" aria-hidden="true"></span></button><span class="cz-count-dot">3</span></span>
    <span class="cz-with-count"><button class="cz-icon-btn cz-icon-btn--secondary" aria-label="Carrinho, 12 itens"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span></button><span class="cz-count-dot">12</span></span>
    <span class="cz-with-count"><button class="cz-icon-btn cz-icon-btn--secondary" aria-label="Mensagens, mais de 99"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span></button><span class="cz-count-dot">99+</span></span>
```

<a id="tooltip"></a>
## Feedback › Tooltip e popover

O tooltip nomeia um controle e aparece no hover e no foco. O popover abre no clique e pode ter conteúdo e ações; fecha com Esc ou clicando fora.
```html
<span class="cz-tooltip"><button class="cz-icon-btn cz-icon-btn--secondary" aria-label="Duplicar produto"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/copy.svg)" aria-hidden="true"></span></button><span role="tooltip">Duplicar produto</span></span>
    <span class="cz-tooltip"><span class="cz-badge cz-badge--info" tabindex="0">Frete calculado</span><span role="tooltip">Pelo CEP 01310-100</span></span>
    <div class="cz-pop">
      <button class="cz-btn cz-btn--secondary" data-popover aria-expanded="false"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/help-circle.svg)" aria-hidden="true"></span>O que é o SKU?</button>
      <div class="cz-popover" hidden role="dialog" aria-label="Sobre o SKU">
        <h4>Código do produto</h4>
        <p>O SKU identifica cada variação no estoque. Use letras, números e hífens, como FRM-002-AZ.</p>
        <div class="ds-row"><a class="cz-link" href="#campos">Ver exemplos</a><button class="cz-btn cz-btn--sm" data-close-pop>Entendi</button></div>
      </div>
    
```

<a id="dialogo"></a>
## Sobreposições › Diálogo

Interrompe a tela para uma tarefa curta e focada. O foco entra no diálogo, fica preso nele e volta ao botão de origem ao fechar. Esc e o botão de fechar sempre funcionam.
```html
<button class="cz-btn" data-open="dlg-basic">Criar cupom</button>
    <button class="cz-btn cz-btn--secondary" data-open="dlg-large">Editar variação</button>
```
```html
<!-- Título em Tenor Sans · corpo · rodapé com a ação principal à direita -->
<div class="cz-dialog cz-dialog--static">
      <div class="cz-dialog-head"><h3>Criar cupom</h3><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Fechar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
      <div class="cz-dialog-body"><p>O cupom vale para toda a loja até a data de término.</p><div class="cz-field"><label for="an-cod">Código</label><input class="cz-input" id="an-cod" value="PRIMAVERA15"></div></div>
      <div class="cz-dialog-foot"><button class="cz-btn cz-btn--ghost">Cancelar</button><button class="cz-btn">Criar cupom</button></div>
    </div>
  
```
```html
<div class="cz-scrim">
  <div class="cz-dialog" role="dialog" aria-modal="true" aria-labelledby="titulo">
    <div class="cz-dialog-head"><h3 id="titulo">Criar cupom</h3><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Fechar">…</button></div>
    <div class="cz-dialog-body">…</div>
    <div class="cz-dialog-foot">
      <button class="cz-btn cz-btn--ghost">Cancelar</button>
      <button class="cz-btn">Criar cupom</button>
    </div>
  </div>
</div>
```

<a id="confirmacao"></a>
## Sobreposições › Confirmação destrutiva

Antes de algo que não tem volta, diga exatamente o que será perdido. Para exclusões grandes, peça que a pessoa digite o nome do item: o botão só libera quando confere.
```html
<button class="cz-btn cz-btn--danger" data-open="dlg-delete"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trash.svg)" aria-hidden="true"></span>Excluir catálogo</button>
    <button class="cz-btn cz-btn--secondary" data-open="dlg-leave">Sair sem salvar</button>
```
```html
<div class="cz-dialog cz-dialog--static">
      <div class="cz-dialog-head"><span class="cz-dialog-icon"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trash.svg)" aria-hidden="true"></span></span><h3>Excluir arquivo?</h3></div>
      <div class="cz-dialog-body"><p><b>catalogo-forma.pdf</b> será removido de 3 produtos e da conversa com o cliente. Essa ação não pode ser desfeita.</p></div>
      <div class="cz-dialog-foot"><button class="cz-btn cz-btn--ghost">Manter arquivo</button><button class="cz-btn cz-btn--danger-solid">Excluir arquivo</button></div>
    
```

<a id="drawer"></a>
## Sobreposições › Drawer

Painel que desliza da direita para detalhes, filtros ou edição rápida sem perder o contexto da lista por trás.
```html
<button class="cz-btn" data-open="drw-order"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/shopping-bag.svg)" aria-hidden="true"></span>Ver pedido #CV-2048</button>
    <button class="cz-btn cz-btn--secondary" data-open="drw-filter"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/filter.svg)" aria-hidden="true"></span>Filtros</button>
```
```html
<div class="cz-scrim cz-drawer-scrim">
  <aside class="cz-drawer" role="dialog" aria-modal="true" aria-labelledby="t">
    <div class="cz-drawer-head"><h3 id="t">Pedido #CV-2048</h3>…</div>
    <div class="cz-drawer-body">…</div>
    <div class="cz-drawer-foot">…ações…</div>
  </aside>
</div>
```

<a id="bottom-sheet"></a>
## Sobreposições › Folha inferior

No mobile, substitui menus e diálogos pequenos. Sobe da borda inferior, tem alça para arrastar e fica ao alcance do polegar.
```html
<div class="demo-phone">
      <div class="bar"><span>9:41</span><span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span></span></div>
      <div class="scr" style="position:relative;padding:0;display:flex;flex-direction:column;justify-content:flex-end;background:var(--scrim)">
        <div class="cz-sheet">
          <div class="grab"></div>
          <p style="font:600 16px var(--font-ui);margin-bottom:6px">Pedido #CV-2048</p>
          <p class="cz-help" style="margin-bottom:10px">Eriton Muniz · R$ 318,70</p>
          <button class="cz-menu-item"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span>Gerar etiqueta</button>
          <button class="cz-menu-item"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/file-text.svg)" aria-hidden="true"></span>Emitir nota fiscal</button>
          <button class="cz-menu-item"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span>Falar com o cliente</button>
          <button class="cz-menu-item cz-menu-item--danger"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-x.svg)" aria-hidden="true"></span>Cancelar pedido</button>
          <button class="cz-btn cz-btn--secondary cz-btn--block" style="margin-top:10px">Fechar</button>
        </div>
      </div>
    
```

<a id="cards"></a>
## Dados › Cards

Agrupam conteúdo sobre um mesmo assunto. O card padrão é plano com borda; a sombra fica para o card elevado que precisa se destacar, e o escuro para um único destaque por tela.
```html
<div class="ds-grid three" style="margin-top:24px">
    <article class="cz-card"><img class="cz-card-media" src="assets/img/img-loja.webp" alt="Duas pessoas conversando em uma loja de objetos"><div class="cz-card-body"><h4>Venda também na loja física</h4></div><div class="cz-card-foot"><a class="cz-link" href="#segmentos">Conhecer o omnichannel</a></div></article>
    <article class="cz-card"><div class="cz-card-body"><span class="cz-ill-icon cz-ill-icon--sm"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/settings-automation.svg)" aria-hidden="true"></span></span><h4>Automação de pedidos</h4></div><div class="cz-card-foot"><label class="cz-switch"><input type="checkbox" checked> Ativa</label></div></article>
    <article class="cz-card cz-card--raised"><div class="cz-card-body"><span class="cz-badge cz-badge--brand" style="justify-self:start">Recomendado</span><h4>Plano Pro</h4><p style="font:700 28px var(--font-ui);letter-spacing:-.01em;color:var(--text)" class="num">R$ 249<span class="cz-help" style="font-family:var(--font-ui)">/mês</span></p></div><div class="cz-card-foot"><button class="cz-btn cz-btn--block">Assinar o Pro</button></div></article>
    <article class="cz-card cz-card--interactive" tabindex="0"><div class="cz-card-body"><div class="ds-row" style="justify-content:space-between"><span class="cz-avatar cz-avatar--sq cz-avatar--brand"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-right.svg)" aria-hidden="true"></span></div><h4>Ateliê Forma</h4></div></article>
    <article class="cz-card cz-card--inset"><div class="cz-card-body"><h4>Dica</h4></div></article>
    <article class="cz-card cz-card--dark"><div class="cz-card-body"><span class="cz-help" style="color:#c9c4bd">Receita no período</span><p style="font:600 36px var(--font-ui);letter-spacing:-.01em;color:#fff" class="num">R$ 42.850</p></div></article>
  </div>
  <div class="ds-cap" style="border:var(--hairline) solid var(--line);border-radius:8px;margin-top:14px"><span>Mídia · Padrão · Elevado · Interativo · Rebaixado · Escuro</span></div>
```

<a id="tabela"></a>
## Dados › Tabela

A tabela de produtos do kit, completa: busca em paleta, filtros, ordenação por coluna, seleção e paginação. Ao selecionar produtos, uma barra flutuante reúne as ações em massa do catálogo. Tudo abaixo funciona com os dados de exemplo.
```html
<div class="cz-table-wrap" style="margin-top:24px" data-products-table>
    <div class="cz-table-tools">
      <button type="button" class="cz-cmd-trigger" data-t-find aria-label="Buscar produtos"><span class="lbl">Buscar produtos...</span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span></button><span class="cz-chip cz-chip--input" data-t-q-chip hidden><span data-t-q-text></span><button class="x" type="button" data-t-q-clear aria-label="Remover filtro de busca"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></span>
      <select class="cz-select" aria-label="Categoria" data-t-cat><option value="">Todas as categorias</option><option>Cerâmica</option><option>Iluminação</option><option>Papelaria</option><option>Embalagens</option><option>Têxteis</option></select>
      <select class="cz-select" aria-label="Status" data-t-status><option value="">Todos os status</option><option>Ativo</option><option>Baixo estoque</option><option>Esgotado</option></select>
      <div style="margin-left:auto" class="ds-row"><button class="cz-btn cz-btn--secondary" data-toast="success" data-title="Exportação iniciada" data-msg="Você recebe o CSV por e-mail em instantes."><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/download.svg)" aria-hidden="true"></span>Exportar CSV</button><button class="cz-btn"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Novo produto</button></div>
    </div>
    <div class="cz-action-bar" data-t-bulk role="region" aria-label="Ações para os produtos selecionados" hidden>
      <div class="cz-action-bar-count"><b data-t-bulk-count aria-live="polite">1 selecionado</b><button type="button" class="cz-action-bar-link" data-t-select-all hidden></button></div>
      <span class="cz-action-bar-sep" aria-hidden="true"></span>
      <button type="button" class="cz-action-bar-btn" data-bulk="price" title="Ajustar preço"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span><span>Ajustar preço</span></button>
      <button type="button" class="cz-action-bar-btn" data-bulk="publish" title="Publicar no marketplace"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span><span>Publicar no marketplace</span></button>
      <button type="button" class="cz-action-bar-btn" data-bulk="export" title="Exportar CSV"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/download.svg)" aria-hidden="true"></span><span>Exportar</span></button>
      <div class="cz-pop">
        <button type="button" class="cz-action-bar-btn" data-menu-trigger aria-haspopup="menu" aria-expanded="false" title="Mais ações"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/dots.svg)" aria-hidden="true"></span><span>Mais</span></button>
        <div class="cz-menu cz-menu--up" role="menu" hidden>
          <button class="cz-menu-item" role="menuitem" data-bulk="promo"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/percentage.svg)" aria-hidden="true"></span>Adicionar à promoção</button>
          <button class="cz-menu-item" role="menuitem" data-bulk="labels"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/barcode.svg)" aria-hidden="true"></span>Imprimir etiquetas</button>
          <button class="cz-menu-item" role="menuitem" data-bulk="pause"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/eye-off.svg)" aria-hidden="true"></span>Pausar vendas</button>
          <button class="cz-menu-item" role="menuitem" data-bulk="duplicate"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/copy.svg)" aria-hidden="true"></span>Duplicar</button>
        </div>
      </div>
      <button type="button" class="cz-action-bar-btn cz-action-bar-btn--danger" data-bulk="delete" title="Excluir"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trash.svg)" aria-hidden="true"></span><span>Excluir</span></button>
      <span class="cz-action-bar-sep" aria-hidden="true"></span>
      <button type="button" class="cz-action-bar-close" data-bulk="clear" aria-label="Limpar seleção"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button>
    </div>
    <div class="cz-table-scroll">
      <table class="cz-table">
        <thead><tr>
          <th style="width:40px;padding-right:0"><label class="cz-check cz-check--round"><input type="checkbox" aria-label="Selecionar todos da página" data-t-all></label></th>
          <th aria-sort="none" data-sort="sku"><button>SKU<span class="sort-ic"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrows-sort.svg)" aria-hidden="true"></span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up.svg)" aria-hidden="true"></span></span></button></th>
          <th aria-sort="none" data-sort="name"><button>Produto<span class="sort-ic"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrows-sort.svg)" aria-hidden="true"></span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up.svg)" aria-hidden="true"></span></span></button></th>
          <th class="r" aria-sort="none" data-sort="price"><button>Preço<span class="sort-ic"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrows-sort.svg)" aria-hidden="true"></span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up.svg)" aria-hidden="true"></span></span></button></th>
          <th class="r" aria-sort="none" data-sort="stock"><button>Estoque<span class="sort-ic"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrows-sort.svg)" aria-hidden="true"></span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up.svg)" aria-hidden="true"></span></span></button></th>
          <th>Status</th>
          <th aria-sort="none" data-sort="updated"><button>Atualizado<span class="sort-ic"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrows-sort.svg)" aria-hidden="true"></span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up.svg)" aria-hidden="true"></span></span></button></th>
          <th class="r" style="width:132px">Ações</th>
        </tr></thead>
        <tbody data-t-body></tbody>
      </table>
    </div>
    <div data-t-empty hidden><div class="cz-empty"><h4>Nenhum produto encontrado</h4><div class="ds-row"><button class="cz-btn cz-btn--secondary cz-btn--sm" data-t-clear>Limpar filtros</button></div></div></div>
    <div class="cz-table-foot"><span data-t-info></span><div class="cz-pagination" data-t-pages></div></div>
  </div>
  <!-- Barra de ações em massa -->
```
```html
<div class="cz-scrim" id="dlg-bulk-price" hidden>
  <div class="cz-dialog" role="dialog" aria-modal="true" aria-labelledby="dbp-t">
    <div class="cz-dialog-head"><h3 id="dbp-t">Ajustar preço</h3><button class="cz-icon-btn cz-icon-btn--sm" data-close aria-label="Fechar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>
    <form class="cz-dialog-body" data-bp-form>
      <p data-bp-desc></p>
      <div class="cz-segmented" data-bp-dir aria-label="Tipo de ajuste" style="justify-self:start"><button type="button" aria-pressed="true" data-v="-1">Reduzir</button><button type="button" aria-pressed="false" data-v="1">Aumentar</button></div>
      <div class="cz-field"><label for="bp-pct">Percentual</label><div class="cz-input-wrap" style="max-width:160px"><input class="cz-input num" id="bp-pct" type="number" min="1" max="90" step="1" value="10"><span class="cz-suffix">%</span></div></div>
      <p class="cz-help" data-bp-preview></p>
    </form>
    <div class="cz-dialog-foot"><button class="cz-btn cz-btn--ghost" data-close>Cancelar</button><button class="cz-btn" data-bp-apply>Aplicar novo preço</button></div>
  </div>
</div>
```

<a id="lista"></a>
## Dados › Lista

Linhas com elemento à esquerda, texto em duas linhas e ação à direita. Serve para arquivos, conectores, contas e qualquer coleção sem colunas comparáveis.
```html
<div class="ds-grid two" style="margin-top:24px">
    <div><p class="ds-label">Configurações de linha</p><ul class="cz-list">
      <li class="cz-list-item"><span class="cz-file" data-file="pdf" style="--s:32px"></span><div class="body"><b>catalogo-forma.pdf</b><small>Arquivo · atualizado hoje</small></div><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Baixar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/download.svg)" aria-hidden="true"></span></button></li>
      <li class="cz-list-item"><span class="lead"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/calendar.svg)" aria-hidden="true"></span></span><div class="body"><b>Google Agenda <span class="cz-badge cz-badge--info">Beta</span></b><small>Conector</small></div><label class="cz-switch"><input type="checkbox" checked aria-label="Conectado"></label></li>
      <li class="cz-list-item cz-list-item--link" tabindex="0"><span class="lead"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span></span><div class="body"><b>Ateliê Forma <span class="cz-badge cz-badge--dark">Pro</span></b><small>Objetos, ideias e curadoria para casa</small></div><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-right.svg)" aria-hidden="true"></span></li>
      <li class="cz-list-item"><span class="lead"><img src="assets/img/prod-lamp.webp" alt=""></span><div class="body"><b>Luminária Círculo</b><small>FRM-001 · 8 em estoque</small></div><b class="num">R$ 64,90</b></li>
    </ul></div>
    <div><p class="ds-label">Seletor de conta</p><ul class="cz-list" role="listbox" aria-label="Contas" data-single-select>
      <li class="cz-list-item cz-list-item--link" role="option" aria-selected="false" tabindex="0"><span class="cz-avatar cz-avatar--sky">SC</span><div class="body"><b>Sarah Chen</b><small>Plano Free · <span class="cz-link">Fazer upgrade</span></small></div></li>
      <li class="cz-list-item cz-list-item--link" role="option" aria-selected="true" tabindex="0"><span class="cz-avatar cz-avatar--sky">SC</span><div class="body"><b>Sarah Chen</b><small>Plano Pro</small></div><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></li>
      <li class="cz-list-item cz-list-item--link" role="option" aria-selected="false" tabindex="0"><span class="cz-avatar cz-avatar--sq cz-avatar--fig">AC</span><div class="body"><b>Acme Co.</b><small>Plano Team</small></div></li>
      <li class="cz-list-item cz-list-item--link" role="option" aria-selected="false" tabindex="0"><span class="cz-avatar cz-avatar--sq cz-avatar--cactus">AC</span><div class="body"><b>Acme Co.</b><small>Enterprise</small></div></li>
    </ul></div>
  </div>
```

<a id="metricas"></a>
## Dados › Métricas e gráficos

O número vem primeiro, em Inter com peso 600 e dígitos tabulares; a variação diz a direção com seta, cor e texto. Gráficos usam laranja para a série principal e carvão para a comparação.
```html
<!-- Cartão de métrica -->
  
  <div class="ds-grid two">
    <div class="cz-metric-card" data-metric-card data-unit="currency" data-period="30" data-view="line">
      <div class="cz-metric-region"><div class="cz-metric-fade"></div><svg role="img" aria-label="Receita diária, últimos 30 dias"></svg></div>
      <div class="cz-metric-head">
        <div class="cz-metric-titlewrap"><h4>Receita</h4>
          <div class="cz-metric-view" data-mc-view role="group" aria-label="Tipo de gráfico">
            <button type="button" data-mc-view="line" aria-pressed="true" aria-label="Linha"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trending-up.svg)" aria-hidden="true"></span></button>
            <button type="button" data-mc-view="bar" aria-pressed="false" aria-label="Barras"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chart-bar.svg)" aria-hidden="true"></span></button>
          </div>
        </div>
        <div class="cz-metric-aux">
          <span class="cz-metric-trend" data-mc-trend></span>
          <div class="cz-metric-period" data-mc-period role="group" aria-label="Período">
            <button type="button" data-mc-period="7" aria-pressed="false">7d</button>
            <button type="button" data-mc-period="30" aria-pressed="true">30d</button>
            <button type="button" data-mc-period="90" aria-pressed="false">90d</button>
          </div>
        </div>
      </div>
      <div class="cz-metric-total num" data-mc-total>—</div>
      <div class="cz-metric-spacer"></div>
      <div class="cz-metric-foot">
        <span class="delta num" data-mc-delta></span>
        <span class="cz-metric-stats num"><b data-mc-peak></b> pico<span class="sep">·</span><b data-mc-low></b> mínimo<span class="sep">·</span><b data-mc-avg></b> média</span>
      </div>
      <div class="cz-metric-tip"></div>
    </div>
    <div class="cz-metric-card" data-metric-card data-demo="pedidos" data-period="7" data-view="bar">
      <div class="cz-metric-region"><div class="cz-metric-fade"></div><svg role="img" aria-label="Pedidos por dia, últimos 7 dias"></svg></div>
      <div class="cz-metric-head">
        <div class="cz-metric-titlewrap"><h4>Pedidos</h4>
          <div class="cz-metric-view" data-mc-view role="group" aria-label="Tipo de gráfico">
            <button type="button" data-mc-view="line" aria-pressed="false" aria-label="Linha"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/trending-up.svg)" aria-hidden="true"></span></button>
            <button type="button" data-mc-view="bar" aria-pressed="true" aria-label="Barras"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chart-bar.svg)" aria-hidden="true"></span></button>
          </div>
        </div>
        <div class="cz-metric-aux">
          <span class="cz-metric-trend" data-mc-trend></span>
          <div class="cz-metric-period" data-mc-period role="group" aria-label="Período">
            <button type="button" data-mc-period="7" aria-pressed="true">7d</button>
            <button type="button" data-mc-period="30" aria-pressed="false">30d</button>
            <button type="button" data-mc-period="90" aria-pressed="false">90d</button>
          </div>
        </div>
      </div>
      <div class="cz-metric-total num" data-mc-total>—</div>
      <div class="cz-metric-spacer"></div>
      <div class="cz-metric-foot">
        <span class="delta num" data-mc-delta></span>
        <span class="cz-metric-stats num"><b data-mc-peak></b> pico<span class="sep">·</span><b data-mc-low></b> mínimo<span class="sep">·</span><b data-mc-avg></b> média</span>
      </div>
      <div class="cz-metric-tip"></div>
    </div>
  </div>
  <h3 class="ds-h3">Carregando</h3>
  <div class="cz-metric-card" data-loading style="max-width:380px" aria-busy="true">
    <div class="cz-metric-head"><div class="cz-skel" style="height:20px;width:90px"></div><div class="cz-skel" style="height:26px;width:80px"></div></div>
    <div class="cz-skel" style="height:44px;width:160px;margin:14px 22px 0;border-radius:6px"></div>
    <div class="cz-metric-spacer"></div>
    <div class="cz-metric-foot"><div class="cz-skel" style="height:14px;width:100px"></div><div class="cz-skel" style="height:14px;width:130px"></div></div>
  </div>
  

  <!-- Cartões compactos -->
  
  <div class="ds-grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))">
    <div class="cz-stat cz-stat--dark"><span class="lbl">Receita · 30 dias</span><span class="val">R$ 42.850</span><span class="delta up"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span>12,4% <span>vs. agosto</span></span><svg class="spark" data-spark="18,22,19,26,24,31,29,35,33,41" data-color="#ff5e2c" viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"></svg></div>
    <div class="cz-stat"><span class="lbl"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/shopping-bag.svg)" aria-hidden="true"></span>Pedidos</span><span class="val">248</span><span class="delta up"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span>8,1% <span>vs. agosto</span></span><svg class="spark" data-spark="12,14,11,16,15,18,17,19,22,21" viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"></svg></div>
    <div class="cz-stat"><span class="lbl"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/percentage.svg)" aria-hidden="true"></span>Conversão</span><span class="val">2,8%</span><span class="delta down"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-down.svg)" aria-hidden="true"></span>0,3 p.p. <span>vs. agosto</span></span><svg class="spark" data-spark="3.4,3.2,3.3,3.1,3.0,3.1,2.9,2.9,2.8,2.8" viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"></svg></div>
    <div class="cz-stat"><span class="lbl"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/credit-card-2.svg)" aria-hidden="true"></span>Ticket médio</span><span class="val">R$ 172,78</span><span class="delta up"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span>4,0% <span>vs. agosto</span></span><svg class="spark" data-spark="160,158,165,162,168,166,170,169,171,173" viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"></svg></div>
  </div>

  <!-- Vendas por canal -->
  <div class="ds-grid two">
    <div class="cz-card"><div class="cz-card-body" style="gap:14px"><h4>Receita por canal</h4>
      <div data-bars='[["Loja online",21400],["Mercado Livre",11200],["Shopee",6100],["Loja física",4150]]'></div>
    </div></div>
    <div class="cz-card"><div class="cz-card-body" style="gap:14px"><h4>Status dos pedidos</h4>
      <div style="display:flex;height:14px;border-radius:99px;overflow:hidden;gap:2px"><i style="flex:58;background:var(--chart-1)"></i><i style="flex:22;background:var(--chart-3)"></i><i style="flex:14;background:var(--chart-4)"></i><i style="flex:6;background:var(--chart-5)"></i></div>
      <div class="cz-legend" style="display:grid;gap:8px">
        <span><i style="background:var(--chart-1)"></i>Entregues · 144 <b class="num" style="margin-left:auto">58%</b></span>
        <span><i style="background:var(--chart-3)"></i>Em trânsito · 55 <b class="num" style="margin-left:auto">22%</b></span>
        <span><i style="background:var(--chart-4)"></i>A enviar · 35 <b class="num" style="margin-left:auto">14%</b></span>
        <span><i style="background:var(--chart-5)"></i>Devoluções · 14 <b class="num" style="margin-left:auto">6%</b></span>
      </div>
    </div></div>
  </div>
  <!-- Paleta de dados -->
  <div class="ds-row">
    <span class="cz-tag"><i style="width:12px;height:12px;border-radius:3px;background:#ff5e2c"></i>--chart-1 Laranja</span>
    <span class="cz-tag"><i style="width:12px;height:12px;border-radius:3px;background:var(--chart-2)"></i>--chart-2 Carvão</span>
    <span class="cz-tag"><i style="width:12px;height:12px;border-radius:3px;background:#8dbacb"></i>--chart-3 Sky</span>
    <span class="cz-tag"><i style="width:12px;height:12px;border-radius:3px;background:#7b9771"></i>--chart-4 Cactus</span>
    <span class="cz-tag"><i style="width:12px;height:12px;border-radius:3px;background:#b8a8c4"></i>--chart-5 Heather</span>
  </div>
```

<a id="avatar"></a>
## Dados › Avatar

Pessoas são redondas; lojas e empresas, quadradas com cantos suaves. Sem foto, use as iniciais sobre uma das secundárias da marca.
```html
<!-- 24 · 32 · 36 · 48 com status online · foto · loja · grupo -->
<span class="cz-avatar" style="--s:24px">MP</span>
    <span class="cz-avatar cz-avatar--sky" style="--s:32px">EM</span>
    <span class="cz-avatar cz-avatar--heather">SC</span>
    <span class="cz-avatar cz-avatar--brand" style="--s:48px">MP<span class="st"></span></span>
    <span class="cz-avatar" style="--s:64px"><img src="assets/img/img-retrato.webp" alt="Retrato de Marina Prado"></span>
    <span class="cz-avatar cz-avatar--sq cz-avatar--fig" style="--s:48px">AF</span>
    <span class="cz-avatar cz-avatar--sq cz-avatar--cactus" style="--s:48px"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span></span>
    <span class="cz-avatar-stack"><span class="cz-avatar cz-avatar--sky">MP</span><span class="cz-avatar cz-avatar--heather">EM</span><span class="cz-avatar">SC</span><span class="cz-avatar" style="background:var(--inset);color:var(--text-2)">+4</span></span>
  
```

<a id="acordeao"></a>
## Dados › Acordeão

Esconde detalhes que só parte das pessoas precisa, como perguntas frequentes e configurações avançadas. O título diz exatamente o que há dentro.
```html
<div class="cz-acc" style="margin-top:24px" data-accordion>
    <div class="cz-acc-item"><h4><button class="cz-acc-btn" aria-expanded="true" aria-controls="acc1">Quanto tempo leva para o Pix cair?<span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button></h4><div class="cz-acc-panel" id="acc1">A confirmação chega em até 10 segundos e o valor fica disponível para saque no mesmo dia útil.</div></div>
    <div class="cz-acc-item"><h4><button class="cz-acc-btn" aria-expanded="false" aria-controls="acc2">Posso vender no marketplace e na loja com o mesmo estoque?<span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button></h4><div class="cz-acc-panel" id="acc2" hidden>Sim. O estoque é único: cada venda, em qualquer canal, desconta a mesma quantidade em todos os outros.</div></div>
    <div class="cz-acc-item"><h4><button class="cz-acc-btn" aria-expanded="false" aria-controls="acc3">Como emito nota fiscal?<span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button></h4><div class="cz-acc-panel" id="acc3" hidden>Conecte seu certificado A1 em Configurações e ative a emissão automática. No plano Essencial, a emissão é manual, pedido a pedido.</div></div>
  </div>
```

<a id="timeline"></a>
## Dados › Linha do tempo

Histórico de eventos em ordem, do mais antigo ao mais recente: rastreio de pedidos, atividade de um ticket, alterações em um produto.
```html
<div class="ds-grid two" style="margin-top:24px">
    <div class="cz-card"><div class="cz-card-body"><h4 style="margin-bottom:12px">Rastreio · #CV-2048</h4>
      <ol class="cz-timeline">
        <li class="done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Pedido pago</b><small>22 set., 14:32 · Pix</small></div></li>
        <li class="done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Separado e embalado</b><small>22 set., 17:10 · Marina Prado</small></div></li>
        <li class="now"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span></span><div><b>Em trânsito</b><small>23 set., 08:02 · Centro de distribuição Barueri</small></div></li>
        <li class="next"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/home.svg)" aria-hidden="true"></span></span><div><b>Entrega prevista</b><small>24 set., até 18:00</small></div></li>
      </ol>
    </div></div>
    <div class="cz-card"><div class="cz-card-body"><h4 style="margin-bottom:12px">Atividade do produto</h4>
      <ol class="cz-timeline">
        <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/pencil.svg)" aria-hidden="true"></span></span><div><b>Preço alterado de R$ 199,90 para R$ 189,90</b><small>Hoje, 10:14 · Marina Prado</small></div></li>
        <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/photo.svg)" aria-hidden="true"></span></span><div><b>3 fotos adicionadas</b><small>Ontem, 16:40 · Eriton Muniz</small></div></li>
        <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span></span><div><b>Publicado no Mercado Livre</b><small>20 set., 09:00 · Automação</small></div></li>
      </ol>
    </div></div>
  </div>
```

<a id="arquivos"></a>
## Dados › Ícones de arquivo

Cartão de arquivo com dobra discreta, símbolo do tipo no centro e faixa com a extensão. O símbolo diz o que o arquivo é (imagem, planilha, vídeo) e a cor da faixa ajuda a achar o formato numa lista.
```html
<!-- 15 formatos, um símbolo por tipo: PDF, imagem, vetor, texto, planilha, apresentação, compactado, vídeo, áudio e código -->
<div class="ds-file-grid"><figure class="ds-file-card"><span class="cz-file" data-file="pdf"></span><figcaption><b>Documento PDF</b><small>.pdf</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="jpeg"></span><figcaption><b>Imagem JPEG</b><small>.jpeg</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="png"></span><figcaption><b>Imagem PNG</b><small>.png</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="webp"></span><figcaption><b>Imagem WebP</b><small>.webp</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="gif"></span><figcaption><b>Imagem animada</b><small>.gif</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="svg"></span><figcaption><b>Vetor SVG</b><small>.svg</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="docx"></span><figcaption><b>Documento de texto</b><small>.docx</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="txt"></span><figcaption><b>Texto simples</b><small>.txt</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="xlsx"></span><figcaption><b>Planilha</b><small>.xlsx</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="csv"></span><figcaption><b>Dados tabulares</b><small>.csv</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="pptx"></span><figcaption><b>Apresentação</b><small>.pptx</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="zip"></span><figcaption><b>Arquivo compactado</b><small>.zip</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="mp4"></span><figcaption><b>Vídeo</b><small>.mp4</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="mp3"></span><figcaption><b>Áudio</b><small>.mp3</small></figcaption></figure><figure class="ds-file-card"><span class="cz-file" data-file="xml"></span><figcaption><b>Nota fiscal XML</b><small>.xml</small></figcaption></figure></div>
```
```html
<!-- 32 · 64 · 88 · 104 px -->
<span class="cz-file" data-file="xlsx" style="--s:32px"></span><span class="cz-file" data-file="xlsx" style="--s:64px"></span><span class="cz-file" data-file="xlsx" style="--s:88px"></span><span class="cz-file" data-file="xlsx" style="--s:104px"></span>
  
```

<a id="divisores"></a>
## Dados › Divisores e atalhos

Divisores separam grupos quando o espaço sozinho não basta. Teclas de atalho aparecem em menus e na ajuda.
```html
<p>Endereço de cobrança</p><hr class="cz-divider"><p>Endereço de entrega</p>
    <div class="cz-divider-label">ou continue com</div>
    <div class="ds-row"><button class="cz-btn cz-btn--secondary"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span>Google</button><button class="cz-btn cz-btn--secondary"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/mail.svg)" aria-hidden="true"></span>Link por e-mail</button></div>
    <p class="cz-help">Abra a busca com <kbd class="cz-kbd">Ctrl</kbd> <kbd class="cz-kbd">K</kbd> e feche com <kbd class="cz-kbd">Esc</kbd>.</p>
```

<a id="produto"></a>
## Comércio › Card de produto

O card da vitrine: imagem quadrada sobre fundo Oat, nome, avaliação e preço com parcelamento. Selos ficam no canto da imagem, e o favorito sempre no mesmo lugar.
```html
<!-- Em promoção · Novo e favoritado · Esgotado -->
<article class="cz-product">
      <div class="cz-product-media"><img src="assets/img/prod-vase.webp" alt="Vaso de cerâmica em tom terra"><span class="cz-badge cz-badge--brand">-12%</span><button class="cz-icon-btn cz-icon-btn--sm cz-icon-btn--round fav" data-toggle aria-pressed="false" aria-label="Favoritar Vaso Terra"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/heart.svg)" aria-hidden="true"></span></button></div>
      <div><h4>Vaso Terra</h4><span class="meta">Cerâmica · 3 tamanhos</span></div>
      <span class="cz-rating"><span class="cz-stars" aria-hidden="true"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span></span>4,9 (128)</span>
      <div class="cz-price"><b>R$ 229,90</b><s>R$ 259,90</s><small>ou 3× de R$ 76,63 sem juros</small></div>
      <button class="cz-btn cz-btn--sm cz-btn--block" data-toast="success" data-title="Adicionado ao carrinho" data-msg="Vaso Terra · Grande"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>Adicionar</button>
    </article>
    <article class="cz-product">
      <div class="cz-product-media"><img src="assets/img/prod-lamp.webp" alt="Luminária circular de mesa"><span class="cz-badge cz-badge--dark">Novo</span><button class="cz-icon-btn cz-icon-btn--sm cz-icon-btn--round fav" data-toggle aria-pressed="true" aria-label="Favoritar Luminária Círculo"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/heart.svg)" aria-hidden="true"></span></button></div>
      <div><h4>Luminária Círculo</h4><span class="meta">Iluminação · Latão</span></div>
      <span class="cz-rating"><span class="cz-stars" aria-hidden="true"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i off" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span></span>4,2 (36)</span>
      <div class="cz-price"><b>R$ 64,90</b><small>no Pix · R$ 68,90 no cartão</small></div>
      <button class="cz-btn cz-btn--sm cz-btn--block" data-toast="success" data-title="Adicionado ao carrinho" data-msg="Luminária Círculo"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>Adicionar</button>
    </article>
    <article class="cz-product">
      <div class="cz-product-media"><img src="assets/img/prod-box.webp" alt="Caixa de papelão kraft" style="opacity:.55"><span class="cz-badge">Esgotado</span></div>
      <div><h4>Caixa Essencial</h4><span class="meta">Embalagens · Kit com 10</span></div>
      <span class="cz-rating"><span class="cz-stars" aria-hidden="true"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span></span>5,0 (12)</span>
      <div class="cz-price"><b>R$ 39,90</b></div>
      <button class="cz-btn cz-btn--secondary cz-btn--sm cz-btn--block" data-toast="info" data-title="Aviso ativado" data-msg="Você recebe um e-mail quando voltar ao estoque."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/bell.svg)" aria-hidden="true"></span>Avise-me</button>
    </article>
  
```
```html
<article class="cz-card" style="display:grid;grid-template-columns:120px 1fr;max-width:520px;width:100%">
      <img src="assets/img/prod-vase.webp" alt="" style="width:100%;height:100%;object-fit:cover;background:var(--cz-oat)">
      <div class="cz-card-body"><h4>Vaso Terra</h4><div class="cz-price"><b>R$ 229,90</b><s>R$ 259,90</s><span class="off">12% off</span></div><span class="cz-tag cz-tag--ship" style="justify-self:start"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span>Chega amanhã</span></div>
    </article>
```

<a id="variacoes"></a>
## Comércio › Variações e avaliação

Seletores de cor e tamanho para a página de produto, com a variação indisponível riscada mas visível. A avaliação por estrelas aceita teclado e diz a nota em texto.
```html
<div class="cz-product-media"><img src="assets/img/prod-vase.webp" alt="Vaso Terra"></div>
    <div style="display:grid;gap:18px">
      <div><p class="cz-help">Cerâmica · FRM-002</p><h3 style="font:400 32px var(--font-display)">Vaso Terra</h3><span class="cz-rating"><span class="cz-stars" aria-hidden="true"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span></span><a class="cz-link cz-link--quiet" href="#variacoes">4,9 de 5 · 128 avaliações</a></span></div>
      <div class="cz-price"><b style="font-size:24px">R$ 229,90</b><s>R$ 259,90</s><span class="off">12% off</span><small>ou 3× de R$ 76,63 sem juros · R$ 218,40 no Pix</small></div>
      <div class="cz-field"><span class="cz-label">Cor: <span data-swatch-name style="font-weight:400">Terracota</span></span>
        <div class="cz-swatch-pick" data-toggle-group data-swatch aria-label="Cor">
          <button aria-pressed="true" aria-label="Terracota" style="background:#c5785c"></button>
          <button aria-pressed="false" aria-label="Oat" style="background:#e9dec9"></button>
          <button aria-pressed="false" aria-label="Oliva" style="background:#858a58"></button>
          <button aria-pressed="false" aria-label="Carvão" style="background:#292524"></button>
        </div>
      </div>
      <div class="cz-field"><span class="cz-label">Tamanho</span>
        <div class="cz-size-pick" data-toggle-group aria-label="Tamanho">
          <button aria-pressed="false">P</button><button aria-pressed="true">M</button><button aria-pressed="false">G</button><button disabled aria-label="GG, indisponível">GG</button>
        </div>
      </div>
      <div class="ds-row"><div class="cz-qty cz-qty--lg" data-qty data-min="1" data-max="5"><button type="button" data-step="-1" aria-label="Diminuir"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/minus.svg)" aria-hidden="true"></span></button><input type="number" value="1" aria-label="Quantidade"><button type="button" data-step="1" aria-label="Aumentar"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button></div><button class="cz-btn cz-btn--lg" style="flex:1" data-toast="success" data-title="Adicionado ao carrinho" data-msg="Vaso Terra · M"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/cart.svg)" aria-hidden="true"></span>Adicionar ao carrinho</button></div>
      <div class="cz-field"><label for="cep-calc">Calcular frete</label><div class="cz-coupon"><input class="cz-input num" id="cep-calc" placeholder="00000-000" style="max-width:160px"><button class="cz-btn cz-btn--secondary" data-toast="info" data-title="Frete para 01310-100" data-msg="Expressa: amanhã, R$ 24,90 · Econômica: 5 dias, R$ 12,40">Calcular</button></div></div>
    
```
```html
<div class="cz-field"><span class="cz-label" id="rate-l">Sua nota para o Vaso Terra</span><div class="cz-stars-input" data-rating role="radiogroup" aria-labelledby="rate-l"></div><span class="cz-help" data-rating-label>Escolha de 1 a 5 estrelas</span></div>
    <div class="cz-field"><label for="rev">Conte como foi <span class="opt">(opcional)</span></label><textarea class="cz-textarea" id="rev" placeholder="A peça chegou bem embalada? O tamanho é o que você esperava?"></textarea>
```

<a id="carrinho"></a>
## Comércio › Carrinho e resumo

Linhas de carrinho com quantidade editável e um resumo que recalcula na hora. Experimente mudar as quantidades e aplicar o cupom CONVERTIZE10.
```html
<div>
      <h3 class="ds-h3">Seu carrinho · <span data-cart-count>3 itens</span></h3>
      <div data-cart-lines>
        <div class="cz-cart-line" data-price="229.90"><img src="assets/img/prod-vase.webp" alt=""><div><b>Vaso Terra</b><small>Terracota · M</small><div style="margin-top:10px" class="cz-qty cz-qty--sm" data-qty data-min="0" data-max="9"><button type="button" data-step="-1" aria-label="Diminuir"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/minus.svg)" aria-hidden="true"></span></button><input type="number" value="1" aria-label="Quantidade"><button type="button" data-step="1" aria-label="Aumentar"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button></div></div><div class="end"><b class="num" data-line-total>R$ 229,90</b><button class="cz-link cz-link--quiet" style="border:0;background:none;padding:0;font-size:13px" data-remove-line>Remover</button></div></div>
        <div class="cz-cart-line" data-price="64.90"><img src="assets/img/prod-lamp.webp" alt=""><div><b>Luminária Círculo</b><small>Latão</small><div style="margin-top:10px" class="cz-qty cz-qty--sm" data-qty data-min="0" data-max="9"><button type="button" data-step="-1" aria-label="Diminuir"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/minus.svg)" aria-hidden="true"></span></button><input type="number" value="1" aria-label="Quantidade"><button type="button" data-step="1" aria-label="Aumentar"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button></div></div><div class="end"><b class="num" data-line-total>R$ 64,90</b><button class="cz-link cz-link--quiet" style="border:0;background:none;padding:0;font-size:13px" data-remove-line>Remover</button></div></div>
        <div class="cz-cart-line" data-price="39.90"><img src="assets/img/prod-box.webp" alt=""><div><b>Caixa Essencial</b><small>Kit com 10</small><div style="margin-top:10px" class="cz-qty cz-qty--sm" data-qty data-min="0" data-max="9"><button type="button" data-step="-1" aria-label="Diminuir"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/minus.svg)" aria-hidden="true"></span></button><input type="number" value="1" aria-label="Quantidade"><button type="button" data-step="1" aria-label="Aumentar"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span></button></div></div><div class="end"><b class="num" data-line-total>R$ 39,90</b><button class="cz-link cz-link--quiet" style="border:0;background:none;padding:0;font-size:13px" data-remove-line>Remover</button></div></div>
      </div>
    </div>
    <aside class="cz-card"><div class="cz-card-body" style="gap:16px">
      <h4>Resumo do pedido</h4>
      <div class="cz-field"><label for="cupom">Cupom de desconto</label><div class="cz-coupon"><input class="cz-input" id="cupom" placeholder="Digite o código" data-coupon-input><button class="cz-btn cz-btn--secondary" data-coupon-apply>Aplicar</button></div><span class="cz-help" data-coupon-msg>Experimente CONVERTIZE10.</span></div>
      <div class="cz-summary">
        <div class="row"><span>Subtotal</span><b data-sum-sub>R$ 334,70</b></div>
        <div class="row disc" data-sum-disc-row hidden><span>Cupom CONVERTIZE10</span><b data-sum-disc>− R$ 0,00</b></div>
        <div class="row"><span>Frete</span><b data-sum-ship>Grátis</b></div>
        <div class="cz-progress cz-progress--success" aria-hidden="true"><i data-ship-bar style="--v:100%"></i></div>
        <span class="cz-help" data-ship-msg>Você ganhou frete grátis.</span>
        <div class="row total"><span>Total</span><b data-sum-total>R$ 334,70</b></div>
      </div>
      <a class="cz-btn cz-btn--lg cz-btn--block" href="#checkout"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/lock.svg)" aria-hidden="true"></span>Ir para o pagamento</a>
    </div></aside>
```

<a id="checkout"></a>
## Comércio › Checkout

Etapas, cartões de opção e resumo fixo compõem o checkout de uma página. A forma de pagamento escolhida revela só os campos que ela precisa.
```html
<div style="display:grid;gap:16px">
      <ol class="cz-steps" style="margin-bottom:8px"><li class="done"><span class="dot">1</span><span class="lbl">Carrinho</span></li><li class="done"><span class="dot">2</span><span class="lbl">Entrega</span></li><li class="current"><span class="dot">3</span><span class="lbl">Pagamento</span></li><li><span class="dot">4</span><span class="lbl">Confirmação</span></li></ol>
      <div class="cz-card"><div class="cz-card-body" style="gap:12px">
        <div class="ds-row" style="justify-content:space-between"><h4>Entrega</h4><button class="cz-btn cz-btn--ghost cz-btn--sm">Alterar</button></div>
        <p>Eriton Muniz · Rua Harmonia, 118, ap. 42 · São Paulo, SP · 05435-000</p>
        <span class="cz-tag cz-tag--ship" style="justify-self:start"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span>Expressa, chega amanhã</span>
      </div></div>
      <div class="cz-card"><div class="cz-card-body" style="gap:12px" data-pay>
        <h4>Pagamento</h4>
        <label class="cz-choice-card"><span class="cz-radio"><input type="radio" name="pay" value="pix" checked></span><span><b>Pix</b><br><small class="cz-help">Aprovação na hora · 5% de desconto</small></span><span class="price"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/qrcode.svg)" aria-hidden="true"></span></span></label>
        <label class="cz-choice-card"><span class="cz-radio"><input type="radio" name="pay" value="card"></span><span><b>Cartão de crédito</b><br><small class="cz-help">Até 3× sem juros</small></span><span class="price"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/credit-card-2.svg)" aria-hidden="true"></span></span></label>
        <label class="cz-choice-card"><span class="cz-radio"><input type="radio" name="pay" value="boleto"></span><span><b>Boleto</b><br><small class="cz-help">Compensação em até 2 dias úteis</small></span><span class="price"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/barcode.svg)" aria-hidden="true"></span></span></label>
        <div data-pay-panel="pix" class="cz-alert cz-alert--info"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/qrcode.svg)" aria-hidden="true"></span><div><strong>O QR Code aparece na próxima tela</strong>Ele vale por 30 minutos. O pedido é confirmado assim que o pagamento cair.</div><span></span></div>
        <div data-pay-panel="card" hidden style="display:grid;gap:12px">
          <div class="cz-field"><label for="cc-n">Número do cartão</label><div class="cz-input-wrap"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/credit-card-2.svg)" aria-hidden="true"></span><input class="cz-input num" id="cc-n" inputmode="numeric" placeholder="0000 0000 0000 0000"></div></div>
          <div class="ds-grid two" style="gap:12px"><div class="cz-field"><label for="cc-v">Validade</label><input class="cz-input num" id="cc-v" placeholder="MM/AA"></div><div class="cz-field"><label for="cc-c">CVV</label><input class="cz-input num" id="cc-c" placeholder="3 dígitos"></div></div>
          <div class="cz-field"><label for="cc-p">Parcelas</label><select class="cz-select" id="cc-p"><option>1× de R$ 358,60</option><option>2× de R$ 179,30 sem juros</option><option>3× de R$ 119,53 sem juros</option></select></div>
        </div>
        <div data-pay-panel="boleto" hidden class="cz-alert cz-alert--warning"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/clock.svg)" aria-hidden="true"></span><div><strong>O pedido é separado depois da compensação</strong>Isso leva até 2 dias úteis. Pix e cartão são aprovados na hora.</div><span></span></div>
      </div></div>
    </div>
    <aside class="cz-card" style="position:sticky;top:80px"><div class="cz-card-body" style="gap:14px">
      <h4>Resumo</h4>
      <div class="cz-list-item" style="padding:0;border:0"><span class="lead"><img src="assets/img/prod-vase.webp" alt=""></span><div class="body"><b>Vaso Terra</b><small>1 × R$ 229,90</small></div></div>
      <div class="cz-list-item" style="padding:0;border:0"><span class="lead"><img src="assets/img/prod-lamp.webp" alt=""></span><div class="body"><b>Luminária Círculo</b><small>1 × R$ 64,90</small></div></div>
      <div class="cz-list-item" style="padding:0;border:0"><span class="lead"><img src="assets/img/prod-box.webp" alt=""></span><div class="body"><b>Caixa Essencial</b><small>1 × R$ 39,90</small></div></div>
      <hr class="cz-divider">
      <div class="cz-summary"><div class="row"><span>Subtotal</span><b>R$ 334,70</b></div><div class="row"><span>Frete</span><b>R$ 23,90</b></div><div class="row total"><span>Total</span><b>R$ 358,60</b></div></div>
      <button class="cz-btn cz-btn--lg cz-btn--block" data-toast="success" data-title="Pedido confirmado" data-msg="#CV-2052 · enviamos os detalhes por e-mail."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/lock.svg)" aria-hidden="true"></span>Pagar R$ 358,60</button>
      <span class="cz-help" style="display:flex;gap:6px;align-items:center;justify-content:center"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/shield-check.svg)" aria-hidden="true"></span>Pagamento processado com criptografia</span>
    </div></aside>
```

<a id="pedido"></a>
## Comércio › Status do pedido

Tela de acompanhamento para quem comprou: o estado atual em destaque, a previsão em linguagem simples e o histórico logo abaixo.
```html
<div class="cz-card" style="width:min(560px,100%)"><div class="cz-card-body" style="gap:18px">
      <div class="ds-row" style="justify-content:space-between"><span class="cz-help">Pedido #CV-2048</span><span class="cz-badge cz-badge--info"><span class="d"></span>Em trânsito</span></div>
      <p style="font:400 30px/1.15 var(--font-display)">Chega amanhã, até as 18h</p>
      <ol class="cz-steps"><li class="done"><span class="dot"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><span class="lbl">Pago</span></li><li class="done"><span class="dot"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><span class="lbl">Separado</span></li><li class="current"><span class="dot"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span></span><span class="lbl">A caminho</span></li><li><span class="dot"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/home.svg)" aria-hidden="true"></span></span><span class="lbl">Entregue</span></li></ol>
      <hr class="cz-divider">
      <ol class="cz-timeline">
        <li class="now"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/truck.svg)" aria-hidden="true"></span></span><div><b>Saiu do centro de distribuição</b><small>Hoje, 08:02 · Barueri, SP</small></div></li>
        <li class="done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Entregue à transportadora</b><small>Ontem, 17:40</small></div></li>
        <li class="done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Pagamento aprovado</b><small>Ontem, 14:32 · Pix</small></div></li>
      </ol>
      <div class="ds-row"><button class="cz-btn cz-btn--secondary"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span>Falar com a loja</button><button class="cz-btn cz-btn--ghost"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-back-up.svg)" aria-hidden="true"></span>Solicitar troca</button></div>
    </div>
```

<a id="rastreamento"></a>
## Comércio › Rastreamento de pedido

Order tracking: as etapas do pedido em coluna, da compra à entrega. Etapas concluídas ganham o check; a data e a hora ficam logo abaixo do nome, e o que ainda não aconteceu aparece como pendente.
```html
<!-- Pedido #CV-2051, três etapas concluídas -->
<ol class="cz-track" aria-label="Rastreamento do pedido #CV-2051">
      <li class="is-done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Pedido realizado</b><time class="when" datetime="2026-09-20T14:23">20/09/2026 14:23</time><span class="vh">Concluído</span></div></li>
      <li class="is-done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Pedido confirmado</b><time class="when" datetime="2026-09-20T14:30">20/09/2026 14:30</time><span class="vh">Concluído</span></div></li>
      <li class="is-done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Pedido enviado</b><time class="when" datetime="2026-09-21T09:45">21/09/2026 09:45</time><span class="vh">Concluído</span></div></li>
      <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Saiu para entrega</b><time class="when" datetime="2026-09-22T08:15">22/09/2026 08:15</time><span class="vh">A fazer</span></div></li>
      <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Entregue</b><span class="when">Pendente</span><span class="vh">A fazer</span></div></li>
    </ol>
    
```
```html
<!-- Em inglês, com o conteúdo da referência -->
<ol class="cz-track" aria-label="Order tracking">
      <li class="is-done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Order Placed</b><time class="when" datetime="2024-03-20T14:23">2024-03-20 14:23</time><span class="vh">Done</span></div></li>
      <li class="is-done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Order Confirmed</b><time class="when" datetime="2024-03-20T14:30">2024-03-20 14:30</time><span class="vh">Done</span></div></li>
      <li class="is-done"><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Order Shipped</b><time class="when" datetime="2024-03-21T09:45">2024-03-21 09:45</time><span class="vh">Done</span></div></li>
      <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Out for Delivery</b><time class="when" datetime="2024-03-22T08:15">2024-03-22 08:15</time><span class="vh">Not done</span></div></li>
      <li><span class="dot"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span></span><div><b>Delivered</b><span class="when">Pending</span><span class="vh">Not done</span></div></li>
    </ol>
    
```

<a id="segmentos"></a>
## Comércio › Segmentos

Cartões de navegação para os segmentos da Convertize (B2C, B2B, Marketplace, Multiloja e Aplicativo), com os ícones do site. O cartão escolhido ganha o contorno laranja e atualiza a descrição.
```html
<div class="cz-seg" style="margin-top:24px" data-segments>
    <div><p style="color:#a8a29e;font-size:14px;margin-bottom:10px">Soluções Convertize</p><h4>Um comércio. Muitos jeitos de crescer.</h4></div>
    <div class="cz-seg-grid">
      <button class="cz-seg-card" aria-pressed="true" data-seg="E‑commerce B2C|Venda mais, em todos os canais.|Crie uma experiência de compra moderna e de alta performance, integrada à sua operação física com estoque unificado, Clique e Retire, Ship from Store, multidocas e preços sincronizados em tempo real."><img src="https://convertize.com.br/wp-content/uploads/2026/07/icon-b2c-1.svg" alt="" width="64" height="64" loading="lazy"><span><b>E‑commerce B2C</b><br><small>Venda mais, em todos os canais.</small></span></button>
      <button class="cz-seg-card" aria-pressed="false" data-seg="E‑commerce B2B|Regras comerciais do seu jeito.|Atenda clientes corporativos com tabelas de preços personalizadas, catálogos exclusivos, pedido mínimo, aprovação de pedidos, limite de crédito e representantes comerciais."><img src="https://convertize.com.br/wp-content/uploads/2026/07/icon-b2b-1.svg" alt="" width="64" height="64" loading="lazy"><span><b>E‑commerce B2B</b><br><small>Regras comerciais do seu jeito.</small></span></button>
      <button class="cz-seg-card" aria-pressed="false" data-seg="Marketplace|Expanda seu catálogo e aumente suas vendas.|Conecte sua loja aos principais marketplaces, como Mercado Livre e TikTok Shop, e gerencie produtos, pedidos e estoque de forma centralizada."><img src="https://convertize.com.br/wp-content/uploads/2026/07/icon-marketplace-1.svg" alt="" width="64" height="64" loading="lazy"><span><b>Marketplace</b><br><small>Expanda seu catálogo e aumente suas vendas.</small></span></button>
      <button class="cz-seg-card" aria-pressed="false" data-seg="Multiloja|Gerencie todas as suas lojas em um só lugar.|Administre lojas, centros de distribuição e unidades de negócio com catálogo, estoque, pedidos, preços e campanhas centralizados."><img src="https://convertize.com.br/wp-content/uploads/2026/07/icon-omni-1.svg" alt="" width="64" height="64" loading="lazy"><span><b>Multiloja</b><br><small>Gerencie todas as suas lojas em um só lugar.</small></span></button>
      <button class="cz-seg-card" aria-pressed="false" data-seg="Aplicativo|Sua marca na palma da mão dos clientes.|Aplicativo nativo para Android e iOS integrado ao e-commerce, com o mesmo catálogo, promoções, pedidos, login e programas de fidelidade."><img src="https://convertize.com.br/wp-content/uploads/2026/09/icon-app.svg" alt="" width="64" height="64" loading="lazy"><span><b>Aplicativo</b><br><small>Sua marca na palma da mão dos clientes.</small></span></button>
    </div>
    <div class="cz-seg-detail" aria-live="polite"><span style="color:#a8a29e;font-size:13px" data-seg-name>Modelo selecionado · E‑commerce B2C</span><b style="font-size:22px;font-weight:600" data-seg-title>Venda mais, em todos os canais.</b><p data-seg-desc>Crie uma experiência de compra moderna e de alta performance, integrada à sua operação física com estoque unificado, Clique e Retire, Ship from Store, multidocas e preços sincronizados em tempo real.</p><a class="cz-link" style="color:#ffb19a" href="#segmentos">Explorar solução <span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/arrow-up-right.svg)" aria-hidden="true"></span></a></div>
  </div>
```

<a id="chat"></a>
## Atendimento › Chat

Mensagens, anexos, chamadas de ferramenta e o composer com seus estados. As mensagens de quem atende ficam à direita, em laranja suave. Escreva uma mensagem abaixo para ver a resposta chegando.
```html
<div class="ds-grid two" style="margin-top:24px;align-items:start">
    <div class="cz-chat" data-chat>
      <div class="cz-chat-head"><span class="cz-avatar cz-avatar--heather">EM<span class="st"></span></span><div><b>Eriton Muniz</b><small>Farmácia Brito · online</small></div><div style="margin-left:auto" class="ds-row"><button class="cz-btn cz-btn--ghost cz-btn--sm">Transferir</button><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Mais opções"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/dots.svg)" aria-hidden="true"></span></button></div></div>
      <div class="cz-chat-body" data-chat-body>
        <span class="cz-msg-sys">Hoje</span>
        <div class="cz-msg cz-msg--them">Oi! Preciso de ajuda com a integração da loja. O estoque não está atualizando no Mercado Livre.<small>16:38</small></div>
        <div class="cz-attach"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/file-text.svg)" aria-hidden="true"></span><div><b>erro-sincronizacao.png</b><small>Imagem · 240 KB</small></div></div>
        <div class="cz-msg cz-msg--me">Claro, Eriton. Vou verificar o token da sua loja agora.<small>Marina · 16:39</small></div>
        <div class="cz-tool"><span class="cz-spinner cz-spinner--sm" data-tool-spin></span><span data-tool-text>Consultando integração Mercado Livre…</span></div>
      </div>
      <div class="cz-quick"><button class="cz-chip" data-quick>O token expirou</button><button class="cz-chip" data-quick>Pode reconectar?</button></div>
      <form class="cz-composer" data-composer>
        <button type="button" class="cz-icon-btn cz-icon-btn--sm" aria-label="Anexar arquivo"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/paperclip.svg)" aria-hidden="true"></span></button>
        <textarea rows="1" placeholder="Escreva uma resposta" aria-label="Mensagem"></textarea>
        <button type="submit" class="send" aria-label="Enviar" disabled><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/send.svg)" aria-hidden="true"></span></button>
      </form>
    </div>
    <div style="display:grid;gap:16px">
      <div><p class="ds-label">Composer · em repouso</p><div class="cz-composer" style="margin:0"><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Anexar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/paperclip.svg)" aria-hidden="true"></span></button><textarea rows="1" placeholder="Converse com a Convertize" aria-label="Exemplo em repouso"></textarea><button class="send" disabled aria-label="Enviar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/send.svg)" aria-hidden="true"></span></button></div></div>
      <div><p class="ds-label">Composer · respondendo</p><div class="cz-composer" style="margin:0"><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Anexar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/paperclip.svg)" aria-hidden="true"></span></button><textarea rows="1" aria-label="Exemplo respondendo" disabled placeholder="A Convertize está escrevendo…"></textarea><button class="send stop" aria-label="Parar resposta"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/player-stop.svg)" aria-hidden="true"></span></button></div></div>
      <div><p class="ds-label">Digitando</p><div class="cz-typing" aria-label="Digitando"><i></i><i></i><i></i></div></div>
      <div><p class="ds-label">Chamada de ferramenta concluída</p><div class="cz-tool"><span class="i ok" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span><span>Ateliê Forma · 3 produtos encontrados</span></div></div>
      <div><p class="ds-label">Controles de resposta</p><div class="ds-row" style="gap:2px"><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Copiar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/copy.svg)" aria-hidden="true"></span></button><button class="cz-icon-btn cz-icon-btn--sm" data-toggle aria-pressed="false" aria-label="Resposta útil"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/thumb-up.svg)" aria-hidden="true"></span></button><button class="cz-icon-btn cz-icon-btn--sm" data-toggle aria-pressed="false" aria-label="Resposta não ajudou"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/thumb-down.svg)" aria-hidden="true"></span></button><button class="cz-icon-btn cz-icon-btn--sm" aria-label="Tentar de novo"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/refresh.svg)" aria-hidden="true"></span></button></div></div>
      <div><p class="ds-label">Sugestões de início</p><div class="ds-row"><button class="cz-chip">Quais são os mais vendidos?</button><button class="cz-chip">Pedidos atrasados hoje</button></div></div>
    </div>
  </div>
```

<a id="ticket"></a>
## Atendimento › Ticket de atendimento

O padrão completo do kit: contexto do cliente à esquerda, conversa ao centro e ações de resolução no cabeçalho.
```html
<div class="demo-app" style="margin-top:24px">
    <aside class="cz-sidebar is-collapsed" data-sidebar>
      <div class="cz-sidebar-head">{{logo}}{{sym}}<button data-collapse aria-label="Expandir menu" aria-expanded="false"><svg class="i" aria-hidden="true"><use href="#i-sidebar"/></svg></button></div>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-home"/></svg><span class="lbl">Visão geral</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-bag"/></svg><span class="lbl">Pedidos</span></button>
      <button class="cz-side-item" aria-current="page"><svg class="i" aria-hidden="true"><use href="#i-headset"/></svg><span class="lbl">Atendimento</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-users"/></svg><span class="lbl">Clientes</span></button>
      <div class="cz-sidebar-spacer"></div><button class="cz-sidebar-foot" aria-label="Marina Prado, Suporte"><span class="cz-avatar cz-avatar--brand">MP</span><div>Marina Prado<small>Suporte</small></div><svg class="i" aria-hidden="true"><use href="#i-chev-down"/></svg></button>
    </aside>
    <main>
      <div class="cz-topbar"><div style="min-width:0"><div class="cz-help">Atendimento · #2026081100029</div><h3>Integração da loja</h3></div><div class="grow"></div><span class="cz-badge cz-badge--warning"><span class="d"></span>Aberto há 2 h</span><button class="cz-btn cz-btn--sm" data-toast="success" data-title="Ticket resolvido" data-msg="Eriton recebe uma pesquisa de satisfação."><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span>Resolver</button></div>
      <div class="content demo-ticket">
        <div style="display:grid;gap:14px;align-content:start;font-size:14px">
          <div><b>Farmácia Brito</b><div class="cz-help">Plano Platinum · cliente desde 2023</div></div>
          <div class="cz-field"><label for="tk-cat">Categoria</label><select class="cz-select" id="tk-cat"><option>Integração</option><option>Pagamentos</option><option>Frete</option></select></div>
          <div class="cz-field"><label for="tk-pri">Prioridade</label><select class="cz-select" id="tk-pri"><option>Alta</option><option>Média</option><option>Baixa</option></select></div>
          <div class="cz-field"><span class="cz-label">Responsável</span><span class="cz-chip" style="justify-self:start"><span class="cz-avatar cz-avatar--brand">MP</span>Marina Prado</span></div>
          <div class="ds-row"><span class="cz-tag">Chat</span><span class="cz-tag">Mercado Livre</span></div>
        </div>
        <div class="cz-chat" style="min-height:0">
          <div class="cz-chat-body">
            <div class="cz-msg cz-msg--them">Preciso de ajuda com a integração.<small>16:38</small></div>
            <div class="cz-msg cz-msg--me">Claro. Vou verificar o token da sua loja.<small>Marina · 16:39</small></div>
            <div class="cz-tool"><span class="i ok" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/circle-check.svg)" aria-hidden="true"></span><span>Token renovado · estoque sincronizado</span></div>
          </div>
          <div class="cz-composer"><textarea rows="1" placeholder="Escreva uma resposta" aria-label="Resposta"></textarea><button class="send" aria-label="Enviar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/send.svg)" aria-hidden="true"></span></button></div>
        </div>
      </div>
    </main>
  </div>
```

<a id="dashboard"></a>
## Padrões de tela › Painel da loja

A primeira tela do lojista: quanto vendeu, como está a conversão e o que precisa de ação agora. Troque o período e passe o mouse pelos gráficos; tudo aqui é montado com componentes do kit.
```html
<div class="dash" data-dash>
    <aside class="cz-sidebar" data-sidebar aria-label="Menu principal">
      <div class="cz-sidebar-head">{{logo}}{{sym}}<button data-collapse aria-label="Recolher menu" aria-expanded="true"><svg class="i" aria-hidden="true"><use href="#i-sidebar"/></svg></button></div>
      <button class="cz-side-item" aria-current="page"><svg class="i" aria-hidden="true"><use href="#i-home"/></svg><span class="lbl">Início</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-box"/></svg><span class="lbl">Catálogo</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-cart"/></svg><span class="lbl">Vendas</span><span class="cz-badge cz-badge--brand">11</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-card"/></svg><span class="lbl">Pagamentos</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-truck"/></svg><span class="lbl">Logística</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-users"/></svg><span class="lbl">Clientes</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-percent"/></svg><span class="lbl">Marketing</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-file"/></svg><span class="lbl">Conteúdo</span></button>
      <div class="cz-sidebar-spacer"></div>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-sliders"/></svg><span class="lbl">Configurações</span></button>
    </aside>

    <div class="dash-main">
      <header class="dash-top">
        <button class="cz-cmd-trigger dash-search" data-dash-search aria-label="Pesquisar no sistema"><span class="lbl">Pesquisar no sistema</span><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span></button>
        <div class="dash-top-actions">
          <button class="cz-btn cz-btn--tonal cz-btn--sm dash-hide-sm">Ver a loja<span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/external-link.svg)" aria-hidden="true"></span></button>
          <button class="cz-btn cz-btn--tonal cz-btn--sm dash-hide-sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span>Chat</button>
          <button class="cz-btn cz-btn--tonal cz-btn--sm dash-hide-sm"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/help-circle.svg)" aria-hidden="true"></span>Ajuda</button>
          <div class="cz-pop">
            <button class="dash-account" data-menu-trigger aria-haspopup="menu" aria-expanded="false"><span class="cz-avatar cz-avatar--brand" style="--s:30px">IO</span><span class="dash-hide-sm">Izaque</span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/chevron-down.svg)" aria-hidden="true"></span></button>
            <div class="cz-menu right" role="menu" hidden>
              <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/user-circle.svg)" aria-hidden="true"></span>Minha conta</button>
              <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/building-store.svg)" aria-hidden="true"></span>Trocar de loja</button>
              <div class="cz-menu-sep"></div>
              <button class="cz-menu-item" role="menuitem"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/logout.svg)" aria-hidden="true"></span>Sair</button>
            </div>
          </div>
        </div>
      </header>

      <div class="dash-body">
        <div class="dash-head">
          <div>
            <p class="dash-date" data-dash-date>Quinta, 24 de setembro, 14h02</p>
            <!-- Visão geral -->
          </div>
          <div class="dash-filters">
            <div class="cz-segmented" data-dash-period aria-label="Período">
              <button aria-pressed="true" data-p="hoje">Hoje</button><button aria-pressed="false" data-p="7">7 dias</button><button aria-pressed="false" data-p="30">30 dias</button>
            </div>
            <select class="cz-select dash-compare" data-dash-compare aria-label="Comparação">
              <option value="on">Comparar com ontem até 14h</option>
              <option value="off">Sem comparação</option>
            </select>
          </div>
        </div>

        <div class="cz-alert cz-alert--info"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/calendar.svg)" aria-hidden="true"></span><div><strong>Feriado de 12 de outubro</strong>No dia, o suporte responde só chamados urgentes. Pedidos e pagamentos seguem normais.</div><button class="close" aria-label="Fechar aviso" data-dismiss><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span></button></div>

        <div class="dash-kpis">
          <div class="cz-stat" data-kpi="receita"><span class="lbl">Receita</span><span class="val num"></span><span class="cz-delta"></span></div>
          <div class="cz-stat" data-kpi="pedidos"><span class="lbl">Pedidos</span><span class="val num"></span><span class="cz-delta"></span></div>
          <div class="cz-stat" data-kpi="ticket"><span class="lbl">Ticket médio</span><span class="val num"></span><span class="cz-delta"></span></div>
          <div class="cz-stat" data-kpi="sessoes"><span class="lbl">Sessões</span><span class="val num"></span><span class="cz-delta"></span></div>
          <div class="cz-stat" data-kpi="conv"><span class="lbl">Conversão</span><span class="val num"></span><span class="cz-delta"></span></div>
        </div>

        <div class="dash-grid">
          <div class="dash-col">
            <div class="dash-charts">
              <section class="dash-card">
                <div class="dash-card-head"><h3>Pedidos</h3><div class="dash-legend" data-legend="pedidos"></div></div>
                <div class="dash-chart" data-dash-chart="pedidos" tabindex="0"></div>
```

<a id="biblioteca"></a>
## Padrões de tela › Biblioteca de mídia

Uma tela densa em arquivos pede uma sidebar mais discreta: rail de 52px, só ícones, com divisória sutil por pseudo-elemento em vez de borda. Abas, busca, favoritos e alternância de visualização ficam numa barra compacta de 32px.
```html
<div class="demo-app" style="margin-top:24px;min-height:600px">
    <aside class="cz-sidebar is-collapsed" data-sidebar>
      <div class="cz-sidebar-head">{{logo}}{{sym}}<button aria-label="Expandir menu" data-collapse aria-expanded="false"><svg class="i" aria-hidden="true"><use href="#i-sidebar"/></svg></button></div>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-home"/></svg><span class="lbl">Início</span></button>
      <button class="cz-side-item" aria-current="page"><svg class="i" aria-hidden="true"><use href="#i-catalog"/></svg><span class="lbl">Biblioteca</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-bag"/></svg><span class="lbl">Pedidos</span><span class="cz-badge cz-badge--brand">12</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-users"/></svg><span class="lbl">Clientes</span></button>
      <button class="cz-side-item"><svg class="i" aria-hidden="true"><use href="#i-analytics"/></svg><span class="lbl">Relatórios</span></button>
      <div class="cz-sidebar-spacer"></div>
      <button class="cz-sidebar-foot" aria-label="Marina Prado, Ateliê Forma"><span class="cz-avatar cz-avatar--brand">MP</span><div>Marina Prado<small>Ateliê Forma · Pro</small></div><svg class="i" aria-hidden="true"><use href="#i-chev-down"/></svg></button>
    </aside>
    <main>
      <div class="content" style="gap:18px;padding-top:28px">
        <div class="ds-row" style="justify-content:space-between;align-items:flex-start">
          <!-- Biblioteca -->
          <button class="cz-lib-new" type="button"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/upload.svg)" aria-hidden="true"></span>Novo arquivo</button>
        </div>
        <div class="ds-row" style="gap:8px;flex-wrap:wrap">
          <div class="cz-lib-tabs" role="tablist" aria-label="Tipo de arquivo">
            <button class="cz-lib-tab" role="tab" aria-selected="true">Todos</button>
            <button class="cz-lib-tab" role="tab" aria-selected="false">Imagens</button>
            <button class="cz-lib-tab" role="tab" aria-selected="false">Vídeos</button>
            <button class="cz-lib-tab" role="tab" aria-selected="false">Banners</button>
          </div>
          <div class="grow"></div>
          <label class="cz-lib-search"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span><input type="search" placeholder="Buscar arquivo" aria-label="Buscar arquivo"></label>
          <button class="cz-lib-fav" type="button" aria-pressed="false" aria-label="Favoritos"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/star.svg)" aria-hidden="true"></span></button>
          <div class="cz-lib-view" role="group" aria-label="Visualização">
            <button type="button" aria-pressed="true" aria-label="Grade"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/layout-grid.svg)" aria-hidden="true"></span></button>
            <button type="button" aria-pressed="false" aria-label="Lista"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/list.svg)" aria-hidden="true"></span></button>
          </div>
        </div>
        <div class="cz-lib-empty">
          <span class="box"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/package.svg)" aria-hidden="true"></span></span>
          <h4>Nada na biblioteca ainda</h4>
          
        </div>
        <div>
          <p class="ds-label" style="margin-bottom:8px">Marcadores</p>
          <div class="cz-pill-group">
            <span class="cz-pill">{{sym}}Convertize</span>
            <span class="cz-pill"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span>Conteúdo</span>
          </div>
        </div>
      </div>
    </main>
  </div>
```

<a id="login"></a>
## Padrões de tela › Entrar

A tela de acesso usa a imagem escultórica da marca de um lado e um formulário curto do outro. Em telas pequenas, a imagem vira faixa no topo.
```html
<div class="demo-auth" style="margin-top:24px">
    <div class="art"><img src="assets/img/img-escultura.webp" alt=""><div style="position:relative;display:grid;gap:14px">{{logo-invertido}}</div></div>
    <form data-validate novalidate>
      <div style="display:grid;gap:6px"><h3>Entrar</h3><p class="cz-help">Novo por aqui? <a class="cz-link" href="#formulario">Crie sua loja grátis</a></p></div>
      <div class="cz-field"><label for="lg-email">E-mail</label><input class="cz-input cz-input--lg" id="lg-email" type="email" required autocomplete="email" data-msg="Use o e-mail cadastrado, como nome@loja.com.br."></div>
      <div class="cz-field"><div class="ds-row" style="justify-content:space-between"><label for="lg-pass" class="cz-label">Senha</label><a class="cz-link" style="font-size:13px" href="#login">Esqueci a senha</a></div><div class="cz-input-wrap"><input class="cz-input cz-input--lg" id="lg-pass" type="password" required autocomplete="current-password" data-msg="Digite sua senha."><button class="cz-clear" type="button" data-reveal="lg-pass" aria-label="Mostrar senha"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/eye.svg)" aria-hidden="true"></span></button></div></div>
      <label class="cz-check"><input type="checkbox" checked><span>Manter conectado neste computador</span></label>
      <button class="cz-btn cz-btn--lg cz-btn--block" type="submit">Entrar</button>
      <div class="cz-divider-label">ou</div>
      <button class="cz-btn cz-btn--secondary cz-btn--lg cz-btn--block" type="button"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/mail.svg)" aria-hidden="true"></span>Receber link de acesso por e-mail</button>
    </form>
  </div>
```

<a id="mobile"></a>
## Padrões de tela › App mobile

O app do vendedor usa os mesmos componentes em alvos maiores: barra superior simples, cards empilhados e navegação inferior.
```html
<div class="ds-row" style="margin-top:24px;gap:24px;align-items:flex-start;justify-content:center">
    <div class="demo-phone">
      <div class="bar"><span>9:41</span><span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span></span></div>
      <div class="cz-topbar" style="height:52px"><span style="font:400 22px var(--font-display);flex:1">Pedidos</span><button class="cz-icon-btn" aria-label="Buscar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/search.svg)" aria-hidden="true"></span></button><button class="cz-icon-btn" aria-label="Filtrar"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/filter.svg)" aria-hidden="true"></span></button></div>
      <div class="scr">
        <div class="cz-tabs cz-tabs--pill" role="tablist" aria-label="Status"><button class="cz-tab" role="tab" aria-selected="true">A enviar · 12</button><button class="cz-tab" role="tab" aria-selected="false">Enviados</button></div>
        <div class="cz-card"><div class="cz-card-body" style="gap:10px"><div class="ds-row" style="justify-content:space-between"><b class="num">#CV-2051</b><span class="cz-badge cz-badge--success"><span class="d"></span>Pago</span></div><div class="cz-list-item" style="padding:0;border:0"><span class="lead"><img src="assets/img/prod-vase.webp" alt=""></span><div class="body"><b>Vaso Terra</b><small>Ana Beatriz Lima · há 12 min</small></div></div><button class="cz-btn cz-btn--sm cz-btn--block"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span>Gerar etiqueta</button></div></div>
        <div class="cz-card"><div class="cz-card-body" style="gap:10px"><div class="ds-row" style="justify-content:space-between"><b class="num">#CV-2049</b><span class="cz-badge cz-badge--success"><span class="d"></span>Pago</span></div><div class="cz-list-item" style="padding:0;border:0"><span class="lead"><img src="assets/img/prod-lamp.webp" alt=""></span><div class="body"><b>Luminária Círculo</b><small>Rafael Souza · há 1 h</small></div></div><button class="cz-btn cz-btn--sm cz-btn--block"><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/tag.svg)" aria-hidden="true"></span>Gerar etiqueta</button></div></div>
      </div>
      <nav class="cz-bottom-nav" data-bottom-nav aria-label="Principal"><button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/home.svg)" aria-hidden="true"></span></span>Início</button><button aria-current="page"><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/shopping-bag.svg)" aria-hidden="true"></span></span>Pedidos</button><button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/category.svg)" aria-hidden="true"></span></span>Catálogo</button><button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/message-circle.svg)" aria-hidden="true"></span></span>Chat</button><button><span class="ind"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/user-circle.svg)" aria-hidden="true"></span></span>Conta</button></nav>
    </div>
    <div class="demo-phone" style="background:#1c1917;color:#f5f5f5">
      <div class="bar" style="background:#1c1917"><span>9:41</span><span><span class="i i-sm" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/world.svg)" aria-hidden="true"></span></span></div>
      <div class="scr" style="align-content:start;gap:18px">
        <div style="display:flex;align-items:center;gap:10px">{{sym}}<b>Ateliê Forma</b></div>
        <p style="font:700 28px/1.1 var(--font-ui);letter-spacing:-.01em">R$ 3.184</p>
        <p style="color:#c9c4bd;font-size:13px;margin-top:-12px">vendidos hoje · 18 pedidos</p>
        <svg class="spark" data-spark="4,6,5,9,8,12,11,15,14,18" data-color="#ff5e2c" viewBox="0 0 200 44" preserveAspectRatio="none" style="width:100%;height:60px" aria-hidden="true"></svg>
        <div class="cz-card" style="background:#292524;border-color:#3a3532;color:#f5f5f5"><div class="cz-card-body"><b>Estoque baixo</b><p style="color:#d6d3d1">Vaso Terra tem 2 unidades.</p></div></div>
        <button class="cz-fab" style="justify-self:end"><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/add.svg)" aria-hidden="true"></span>Novo pedido</button>
      </div>
    </div>
  </div>
```

<a id="ilustracoes"></a>
## Marca › Ilustrações e patterns

A iconografia da marca em carvão, laranja e branco, os patterns e o fundo de barras: o material para capas, apresentações, site e campanhas.
```html
<!-- 15 barras, pulso de 2 s -->
<div class="cz-bars" data-bars-bg="15" aria-hidden="true"></div>
      <span style="width:44px;height:44px;display:block">{{sym}}</span>
      <p style="font:400 30px/1.1 var(--font-display);max-width:14ch">Sua loja em todos os canais</p>
    
```
```html
<!-- 7 barras, versão suave, pulso de 3 s -->
<div class="cz-bars cz-bars--soft" data-bars-bg="7" aria-hidden="true" style="--bars-dur:3s"></div>
      <p style="font:400 30px/1.1 var(--font-display);max-width:14ch">Black Friday começa em 3 dias</p>
      <button class="cz-btn" style="background:#fff;color:#1c1917">Preparar campanha</button>
    
```

<a id="imagens"></a>
## Marca › Direção de imagens

Material, humana e clara. A fita laranja, o vidro translúcido, a pedra clara e a luz natural ligam as imagens abstratas, as cenas com pessoas e as apresentações da interface.
```html
<div class="ds-grid two" style="margin-top:24px">
    <figure class="cz-card" style="margin:0"><img class="cz-card-media" src="assets/img/img-escultura.webp" alt="Escultura de fita laranja atravessando painéis de vidro"><figcaption class="cz-card-body"><b>Escultura material</b></figcaption></figure>
    <figure class="cz-card" style="margin:0"><img class="cz-card-media" src="assets/img/img-pessoas.webp" alt="Duas empreendedoras preparando pedidos em um estúdio"><figcaption class="cz-card-body"><b>Pessoas em ação</b></figcaption></figure>
    <figure class="cz-card" style="margin:0"><img class="cz-card-media" src="assets/img/img-equipe.webp" alt="Equipe trabalhando em mesa de expedição"><figcaption class="cz-card-body"><b>Equipe</b></figcaption></figure>
    <figure class="cz-card" style="margin:0"><img class="cz-card-media" src="assets/img/bg-aurora.webp" alt="Fundo atmosférico em tons suaves"><figcaption class="cz-card-body"><b>Atmosfera sutil</b></figcaption></figure>
  </div>
  <!-- Regras de produção -->
  <div class="ds-guides">
    <div class="ds-guide do"><h3><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/check.svg)" aria-hidden="true"></span>Faça</h3><ul><li>Reserve uma área calma para título e botões.</li><li>Mestres horizontais em 16:9 ou 2:1, cards em 4:3.</li><li>Laranja em um único elemento de foco.</li><li>Use fotos autorizadas e capturas reais em peças sobre clientes e funcionalidades.</li></ul></div>
    <div class="ds-guide dont"><h3><span class="i" style="--icon:url(https://cdn.jsdelivr.net/gh/izaqueotaviano/icons@main/svg/x.svg)" aria-hidden="true"></span>Evite</h3><ul><li>Poses genéricas e clichês turísticos.</li><li>Imitação de obras e artistas.</li><li>Telas geradas com texto fictício.</li><li>Laranja cobrindo toda a imagem.</li></ul></div>
  </div>
  <!-- Prompt-base -->
```
