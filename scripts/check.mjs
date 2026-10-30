import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../public');
const errors = [];
const files = fs.readdirSync(root,{recursive:true}).map(name => path.join(root,name)).filter(file => fs.statSync(file).isFile());
let localLinks = 0;
function checkLink(reference, origin) {
  if (!reference || /^(?:https?:|data:|mailto:|tel:)/i.test(reference)) return;
  const [pathname,anchor] = reference.split('#');
  const cleanPath = decodeURIComponent((pathname || '').split('?')[0]);
  let target = cleanPath ? path.resolve(cleanPath.startsWith('/') ? root : path.dirname(origin),cleanPath.replace(/^\//,'')) : origin;
  if (target === root) target = path.join(root,'index.html');
  localLinks++;
  if (!fs.existsSync(target)) { errors.push(`Arquivo ausente: ${reference} em ${path.basename(origin)}`); return; }
  if (anchor && path.extname(target) === '.html') {
    const ids = [...fs.readFileSync(target,'utf8').matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    if (!ids.includes(anchor)) errors.push(`Âncora ausente: ${reference}`);
  }
}
for (const file of files) {
  if (/\.js$/.test(file)) {
    try { execFileSync(process.execPath,['--check',file],{stdio:'pipe'}); } catch (e) { errors.push(`JavaScript inválido: ${file}\n${e.stderr}`); }
  }
  if (/\.html$/.test(file)) {
    const text = fs.readFileSync(file,'utf8');
    if (!/<html\b[^>]*lang="pt-BR"/.test(text)) errors.push(`Idioma ausente: ${file}`);
    const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    if (new Set(ids).size !== ids.length) errors.push(`ID duplicado: ${file}`);
    for (const match of text.matchAll(/\b(?:src|href)="([^"]*)"/g)) checkLink(match[1],file);
  }
  if (/\.css$/.test(file)) {
    for (const match of fs.readFileSync(file,'utf8').matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) checkLink(match[1],file);
  }
}
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),context);
const data = context.window.TORNEIO_CONTENT;
for (const item of data.images) { checkLink(item.src,path.join(root,'index.html')); checkLink(item.full,path.join(root,'index.html')); }
const json = JSON.parse(fs.readFileSync(path.join(root,'dados/descritores-selecionados.json'),'utf8'));
if (JSON.stringify(data.descriptors) !== JSON.stringify(json.descriptors)) errors.push('Descritores divergentes entre content.js e JSON.');
if (data.descriptors.length !== 41) errors.push('O snapshot deve conter 41 descritores.');
if (data.descriptors.filter(item => item.component === 'Matemática').length !== 29) errors.push('O snapshot deve conter 29 descritores de Matemática.');
if (data.descriptors.filter(item => item.range === 'critico').length !== 11) errors.push('O snapshot deve conter 11 descritores críticos.');
if (new Set(data.descriptors.map(item => `${item.component}:${item.code}`)).size !== data.descriptors.length) errors.push('Descritor duplicado no mesmo componente.');
for (const item of data.descriptors) {
  if (!(item.percent >= 0 && item.percent < 60)) errors.push(`Percentual fora do recorte: ${item.code}`);
  if (item.range !== (item.percent < 40 ? 'critico' : 'atencao')) errors.push(`Faixa incorreta: ${item.code}`);
}
if (data.phases.length !== 3 || data.spells.length !== 9) errors.push('Quantidade inesperada de fases ou magias.');
const bytes = files.reduce((sum,file) => sum + fs.statSync(file).size,0);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verificação concluída: ${files.length} arquivos, ${localLinks} referências locais, 41 descritores consistentes, 3 fases e 9 magias.`);
console.log(`Pasta pública: ${(bytes/1024/1024).toFixed(2)} MiB. Confira também a interface no navegador.`);
