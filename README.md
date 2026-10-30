# Torneio das Guildas dos Magos — apresentação para qualificação

Site estático do produto educacional de **Bruno Oliveira Soares**, PPGFCET / UTFPR. Preparado para GitHub, edição local no Antigravity e publicação no Netlify Free.

## Comece aqui

1. Extraia o ZIP.
2. Abra a pasta `torneio-qualificacao` no Antigravity.
3. Para conferir rapidamente, abra `public/index.html` no navegador.
4. Para desenvolver com um servidor local, instale Node.js 20 ou superior e execute, no terminal da pasta:

```bash
npm run dev
```

Abra `http://localhost:5173`. Não é necessário executar `npm install`: o projeto não tem dependências de pacotes. Depois de salvar uma alteração, atualize a página no navegador.

## Publicação no Netlify

### Pelo GitHub

1. Crie um repositório e envie **o conteúdo desta pasta**, preservando sua estrutura. `netlify.toml` deve ficar na raiz do repositório.
2. No Netlify, crie um projeto importando esse repositório.
3. Escolha a configuração de site estático, sem framework.
4. Deixe **Build command** vazio; defina **Publish directory** como **`public`**. Não há variáveis de ambiente obrigatórias.
5. Publique. As alterações enviadas para a branch de produção poderão gerar novos deploys.

O arquivo `netlify.toml` já define `public` como pasta de publicação e configura cabeçalhos de cache. Não use a raiz inteira como pasta pública, pois ela contém documentação de manutenção.

### Arrastando a pasta, sem GitHub

No fluxo de publicação manual do Netlify, envie a pasta **`public`**. Ela já contém o site pronto. Não envie o ZIP fechado nem a pasta principal inteira. Os cabeçalhos para esse modo estão em `public/_headers`.

Também existe `npm run build`, que copia o conteúdo de `public` para `dist`; a etapa é opcional. O site não depende dela.

## O que está incluído

- Apresentação acadêmica em português, com identidade amarela, preta e neutra inspirada nos materiais institucionais fornecidos.
- Animações de entrada, cartas flutuantes, transições de fases e indicadores de leitura; controle de pausa e respeito a movimento reduzido.
- Síntese do produto, dados de origem, três fases, regras, mana, nove magias, final construcionista e avaliação prevista.
- Consulta local dos 41 descritores selecionados, com filtros e exportação CSV.
- Demonstração comentada da missão dos Faróis Gêmeos.
- Acervo de três cartas de missão, quatro cartas de magia, emblema e prévia da matriz gráfica; zoom, navegação e download.
- Transcrição das três missões e síntese própria para impressão/PDF pelo navegador.
- Links para o diagnóstico SAEB e o gerenciador já existentes.

## Onde editar

| Arquivo | Finalidade |
|---|---|
| `public/index.html` | Textos principais, estrutura das seções, identidade e links |
| `public/styles.css` | Cores, tipografia, responsividade e animações |
| `public/content.js` | Fases, nove magias, acervo e snapshot dos descritores |
| `public/app.js` | Interações, filtros, galeria e demonstração |
| `public/assets/images/` | Imagens WebP locais, leves e ampliadas |
| `public/dados/` | Snapshot dos descritores em JSON e CSV |
| `public/missoes-texto.html` | Transcrição acessível das três cartas |
| `public/sintese.html` | Resumo para leitura e impressão |
| `public/documentos.css` | Estilo das páginas de leitura e impressão |
| `docs/EDICAO.md` | Guia para alterar e expandir o site |
| `docs/CONTEUDO-E-FONTES.md` | Fontes utilizadas e decisões editoriais |
| `docs/VALIDACAO.md` | Verificações realizadas e limites |

## Plano gratuito e consumo

O site não exige servidor, banco de dados, Functions, Edge Functions, serviços de IA, formulários hospedados ou assinaturas de bibliotecas. As interações rodam no navegador. A fonte está incluída localmente; as imagens estão em WebP, com carregamento sob demanda para o acervo.

**Isso não torna o tráfego ou os deploys ilimitados.** A conta continua sujeita às cotas do plano Netlify contratado. Existem contas legadas e contas com cobrança por créditos; confira a situação em *Usage & billing*. Prefira validar alterações localmente e agrupar mudanças antes de publicar em produção. Consulte a documentação oficial atual:

- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- https://docs.netlify.com/build/configure-builds/file-based-configuration/

As cartas de alta resolução só são solicitadas ao abrir a galeria ou baixar o arquivo. Não foram incluídos vídeos automáticos, PDFs pesados, o DOCX integral ou o PSD editável de aproximadamente 247 MiB. O PSD original fornecido pelo autor permanece sendo a fonte para edição de suas camadas.

## Verificar antes de publicar uma alteração

```bash
npm run check
npm run build
```

O primeiro comando confere JavaScript, arquivos internos, âncoras, estrutura básica e consistência do recorte de descritores. Ele não substitui a conferência visual e pedagógica. Depois, teste as fases, a galeria, os filtros, a demonstração e a impressão.

## Estado acadêmico preservado

Esta versão segue a dissertação enviada: **90 cartas = 30 conjuntos × 3 níveis; 60 na primeira fase e 30 na segunda**. A oficina está **prevista para janeiro de 2027**, com 14 docentes. O site não apresenta avaliação concluída nem eficácia demonstrada.

Há divergências no material de origem, especialmente **Fogo de Dragão (−50 na carta, −100 na tabela do manuscrito)** e Ilusão Arcana. Elas estão identificadas no site e detalhadas em `docs/CONTEUDO-E-FONTES.md`. Os manuais e as 90 cartas completas não foram anexados; somente os exemplares recebidos são disponibilizados para download.

## Uso e créditos

O conteúdo acadêmico, as marcas e os materiais visuais foram fornecidos pelo autor para esta apresentação. A fonte Manrope é distribuída sob SIL Open Font License; o texto da licença acompanha `public/assets/fonts/OFL.txt`. A presença das marcas institucionais identifica o vínculo acadêmico e não representa homologação do produto.

Este pacote contém os arquivos locais. Ele não cria repositório, não publica na sua conta e não altera os dois sites existentes.
