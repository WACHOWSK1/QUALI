# Conteúdo, fontes e decisões editoriais

## Fontes consultadas

- `DISSERTAÇÃO(5).docx`, versão fornecida pelo autor em 29.10.2026.
- Três PNGs de missões do nível III, quatro PNGs de magias, emblema, matriz PSD e marcas institucionais fornecidos pelo autor.
- Diagnóstico público: https://saeb.netlify.app/ . Base agregada: https://saeb.netlify.app/data/saeb-2023-9ef.json . Consulta em 29.10.2026.
- Gerenciador: https://torneiodasguildas.netlify.app/ . Conteúdo público consultado em 29.10.2026.
- Matrizes do Inep: URLs preservadas em `public/dados/descritores-selecionados.json`, campo `descriptionSources`.

As referências P abaixo correspondem aos índices dos parágrafos do DOCX, contados a partir de zero por python-docx; T corresponde ao índice da tabela. Servem à manutenção e não são números de página da dissertação.

## Identificação acadêmica

Autor: Bruno Oliveira Soares. Orientador na folha de rosto: Prof. Dr. Giulio Domenico Bordin. PPGFCET / UTFPR, Mestrado Profissional em Ensino de Ciências e Matemática, Curitiba.

Título da dissertação: **Gamificação como Estratégia Instrucional: a interdisciplinaridade entre Matemática e Língua Portuguesa no contexto das matrizes do SAEB**.

O site sintetiza a versão enviada. Não altera o DOCX nem substitui a revisão acadêmica do autor e do orientador.

## Informações adotadas

| Informação | Base |
|---|---|
| Pergunta e objetivos | P296–306 |
| Público final: 9º ano; avaliação com professores | P736, P791 |
| 90 cartas, 30 conjuntos, três níveis | P839, tabela 6 |
| 60 cartas de integração, 30 de aproximação interdisciplinar | P753, P839, tabela 6 |
| Cartas autônomas em A5 paisagem | P836–839 |
| Retirada de três cartas, manter pelo menos uma | P847 |
| Pontos 100/150/200, erro −50 | P848 |
| Uma mana por 100 pontos; gestão docente | P862 |
| Nove magias | Tabela 7 |
| Eventos na segunda fase | P874, tabela 8 |
| Uso sem internet; apoio digital opcional | P879 |
| Final com criação, devolutiva e revisão | P889–905, tabelas 10 e 11 |
| Oficina prevista para janeiro/2027, 14 docentes | P790–792 |
| Duração de quatro horas | Tabela 12 |
| Fontes de dados | Tabela 13 |
| Protótipo produzido, testagem prevista | P884 |
| Pesquisa de desenvolvimento, avaliação formativa, análise temática reflexiva | P784, P786, P770, P921 |

## Divergências de origem e tratamento

1. **Distribuição das cartas.** P512 ainda menciona 45/45; a seção detalhada, P753, P839 e tabela 6 convergem em 60/30. O site adota 60/30.
2. **Fogo de Dragão.** O PNG informa perda de 50 pontos; a tabela 7 informa 100 pontos. O site mantém a imagem como recebida e explicita as duas versões. O autor deve definir a regra final e atualizar tanto carta quanto manuscrito.
3. **Ilusão Arcana.** O PNG diz descartar desafios e comprar “um novo”; a tabela prevê retirar três novas cartas. A diferença está identificada na galeria e na tabela das magias.
4. **Participantes e tempos.** Há trechos gerais com 12–15 participantes e grupo focal de 60 min. O detalhamento organiza 14 docentes e grupo focal de 30 min em uma oficina de 4h; esta é a versão usada.
5. **Tempo verbal da oficina.** Um trecho usa passado, mas o planejamento, a indicação de testagem pendente e as seções de resultados não preenchidas mostram etapa futura. O site a apresenta como prevista.
6. **Códigos de descritores.** O texto do manuscrito contém atribuições trocadas em exemplos: LP D14 corresponde a fato/opinião, não a efeitos de pontuação; Matemática D36 corresponde a resolver problema com tabelas/gráficos, enquanto a associação entre listas/tabelas e gráficos é D37. O site utiliza as descrições das matrizes.
7. **Manual(2).png.** É o emblema, não o manual completo. Não há botão anunciando um download de manual inexistente.
8. **Mercado digital.** O gerenciador existente apresenta o mercado de power-ups como “em breve”. O site não o anuncia como funcional.

## Snapshot dos descritores

Os percentuais foram reproduzidos a partir da base agregada publicada no diagnóstico do pesquisador: `100 × soma(PESO_TOTAL_ACERTOS) / soma(PESO_TOTAL_RESPOSTAS)`, agrupando componente e descritor. A seleção abaixo de 60% reproduz os totais do manuscrito: 41, sendo 29 de Matemática e 12 de Língua Portuguesa; 11 críticos e 30 atenção.

Essa verificação não é uma auditoria dos microdados individuais. O número de 2.083.218 estudantes elegíveis é informado pelo manuscrito, não recalculado no site. O hash da base agregada e a descrição das fontes estão preservados no JSON.

As faixas são operacionais da pesquisa. Os percentuais são relativos às oportunidades de resposta aos itens, não a uma estimativa direta de domínio individual. O site não apresenta esses dados como efeitos do jogo.

## Demonstração e transcrições

A demonstração da Missão 01 foi elaborada para o site a partir do exemplar enviado; não foi recebida como um gabarito oficial. Conferência: 0,9 × (900 + 300x) = 3.780; x = 11. Com x = 10, há 3.510 m úteis, 90 m a menos para a via e 270 m a menos para a via com reserva. “É um excesso” é uma opinião; “Além disso” indica adição.

A missão mobiliza Matemática e LP, mas o site não inventa uma correspondência oficial entre cada questão e um código selecionado. Por exemplo, porcentagem pode participar do problema mesmo que Matemática D28 não esteja entre os 41 descritores prioritários.

`missoes-texto.html` transcreve os três exemplares, preservando enunciados e valores. Os nomes utilizados no acervo são títulos descritivos extraídos dos cenários; nas artes as cartas aparecem como 01, 02 e 03.

## Arquivos que não foram expostos

O DOCX integral contém material de trabalho e não foi copiado para o site. Também não foram incluídos os originais pesados das imagens ou as camadas do PSD. O acervo traz versões WebP para consulta, preservando a composição visual. Não foram inventados conteúdos para completar os manuais, as demais 87 missões ou as ilustrações das cinco magias não fornecidas.

Antes da apresentação, o autor pode consolidar as divergências de versão e acrescentar novos anexos seguindo `EDICAO.md`.
