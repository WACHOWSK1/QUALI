# Editar pelo Antigravity

Abra a pasta raiz do projeto. Trabalhe em `public`, que é a fonte publicada. `dist` é uma cópia gerada e será substituída por `npm run build`.

## Textos e identidade

Edite `public/index.html`. As seções têm IDs estáveis: `produto`, `pesquisa`, `experiencia`, `missao`, `magias`, `final`, `avaliacao`, `acervo` e `guia`. Preserve-os para manter a navegação.

As cores estão no início de `public/styles.css`, em `:root`: `--yellow`, `--ink`, `--paper`, `--muted` e `--purple`. O amarelo e o preto são o eixo institucional; o violeta aparece nas artes e nos momentos associados ao jogo. As marcas originais foram mantidas.

A fonte Manrope está hospedada junto com os arquivos. Não é preciso Google Fonts ou outra conexão externa para carregar a interface.

## Conteúdo estruturado

`public/content.js` define `window.TORNEIO_CONTENT` como um objeto. Não transforme o arquivo em módulo sem ajustar o carregamento, pois a organização atual também permite abrir o HTML diretamente no computador.

- `phases`: as três fases e seus textos.
- `spells`: as nove magias, custos e notas de versão.
- `images`: itens da galeria, título, categoria, imagem reduzida e imagem ampliada.
- `descriptors`: snapshot dos 41 descritores.
- `descriptorSource`: data, base de cálculo e URLs da seleção.

Para adicionar uma imagem, coloque uma versão otimizada em `assets/images` e acrescente um objeto em `images`, preservando as chaves. Categorias aceitas: `missions`, `spells` e `identity`. Atualize também os números dos filtros em `index.html` e a lista estática em `acervo.html`. As novas miniaturas precisam de uma descrição acessível.

Mantenha uma versão de aproximadamente 700–1100 pixels para exibição e outra de maior resolução para ampliação. Não envie os PSDs ao diretório público. Prefira nomes sem espaços e sem acentos nos arquivos, mas mantenha a escrita correta nos títulos apresentados.

## Atualizar os descritores

Os dados do site são uma fotografia do diagnóstico público consultado em 29.10.2026, sem chamadas à plataforma durante a visita. Uma atualização precisa preservar consistência entre três locais:

1. `content.js`, em `descriptors` e `descriptorSource`;
2. `dados/descritores-selecionados.json`;
3. `dados/descritores-selecionados.csv`.

Revise também os totais do HTML e da síntese. O código do descritor sozinho não é identificador único: LP D6 e Matemática D6 são diferentes. A seleção usa `<60%`, com faixa crítica `<40%`; classifique antes de arredondar.

## Inserir os manuais completos

Quando a versão que será disponibilizada estiver definida, crie `public/materiais/`, adicione os PDFs otimizados e inclua links no acervo. Indique título, formato e tamanho do arquivo. Atualize o aviso atual de que os manuais não integram os anexos desta apresentação. A disponibilização do DOCX integral é uma decisão editorial separada.

## Regras e estado da pesquisa

Consolide as divergências documentadas antes de modificar cartas ou textos. Atualize conjuntamente o corpo da página, as tabelas, a síntese e eventuais transcrições. Não transforme etapas previstas em resultados realizados sem acrescentar as fontes correspondentes.

A demonstração da Missão 01 não é o sistema de pontuação: ela explora a equação dos rolos e a distinção entre fato e opinião. As demais funcionalidades de gerenciamento permanecem no site existente, acessado por link.

## Movimento e acessibilidade

O botão de pausa guarda somente a preferência local de animação. Não há cookies de análise ou envio de respostas. `prefers-reduced-motion` reduz o movimento automaticamente. Preserve os rótulos dos botões, o foco visível, a navegação das abas com setas e o fechamento dos diálogos com Escape.

Os efeitos não são necessários para ler o conteúdo. Os detalhes das três missões também estão em texto selecionável em `missoes-texto.html`. Não substitua textos por imagens.

## Pedido inicial sugerido para o Antigravity

> Este é um site acadêmico estático para o plano gratuito do Netlify. Preserve HTML, CSS e JavaScript sem dependências, os arquivos locais e a pasta de publicação public. Leia README.md e docs/CONTEUDO-E-FONTES.md. Faça a alteração solicitada, preservando acessibilidade, dispositivos móveis, modo de movimento reduzido e distinção entre produto produzido e avaliação prevista. Execute npm run check e confira visualmente o resultado antes de concluir.
