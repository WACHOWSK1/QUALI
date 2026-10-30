# Verificações da entrega

Revisão realizada em 30.10.2026.

## Conteúdo

- Dissertação atual lida e comparada com os materiais visuais fornecidos.
- Quantidades de cartas, fases, pontuação, final e planejamento da oficina conferidos.
- Snapshot do diagnóstico reproduziu 41 descritores: 29 de Matemática, 12 de LP, 11 críticos e 30 atenção.
- Distinção explícita entre diagnóstico, produto produzido, avaliação prevista e resultados ainda não disponíveis.
- Divergências entre cartas e manuscrito identificadas, sem alterar as artes originais.
- Demonstração matemática conferida: 10 rolos → 3.510 m; 11 rolos → 3.780 m; diferença inicial de 270 m.

## Interface

- Prévia executada com o servidor local do projeto.
- Composição da página inicial e da missão inspecionada visualmente no navegador.
- Versões estreitas inspecionadas em quadro responsivo de 390 e 320 pixels. Medidas do documento confirmaram ausência de rolagem horizontal nessas larguras e em 768 pixels.
- Menu móvel: abertura, navegação e fechamento após escolher uma seção.
- Fases: seleção da segunda e da terceira fase, com atualização dos textos.
- Missão: alteração do controle de rolos, cálculo e retorno da pergunta de fato/opinião.
- Descritores: total de 41; filtro LP com 12; busca D21 com 56,82%; filtro Matemática crítico com 11.
- Acervo: filtro de magias com quatro resultados; abertura de Fogo de Dragão; avanço para Escudo Protetor; zoom; fechamento com Escape.
- Movimento: botão de pausa e exibição permanente do conteúdo quando o movimento é desativado. Há também CSS para `prefers-reduced-motion`.
- Síntese: página e botão de impressão conferidos na interface. A paginação final depende do navegador e de suas opções de impressão.

## Código e arquivos

`npm run check` verifica sintaxe JavaScript, referências de arquivos, âncoras, IDs duplicados e consistência do JSON de descritores com o conteúdo da página. `npm run build` gera uma cópia estática em `dist`.

O projeto usa somente recursos nativos do navegador e módulos nativos do Node para desenvolvimento. Não há APIs obrigatórias, instalação de dependências, credenciais ou variáveis de ambiente de produção.

## Limites da verificação

O site não foi publicado em uma conta Netlify nesta entrega. A conta, suas cotas, a integração com o repositório e o domínio precisam ser configurados pelo proprietário. Os dois sites externos foram consultados, mas não são controlados por este projeto.

Os testes de largura em iframe exercitam o layout responsivo no navegador disponível; não substituem uma homologação em todos os dispositivos físicos. Não foi realizada uma auditoria formal de conformidade de acessibilidade.
