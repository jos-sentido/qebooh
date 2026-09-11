import { chromium } from 'playwright';
const B = `http://127.0.0.1:${process.env.PUERTO ?? '3000'}`;
const S = `${B}/propuestas`;
let fallos = 0;
const check = (c, m) => { if (!c) fallos++; console.log(`${c ? 'PASA ' : 'FALLA'}  ${m}`); };
const ver = async (loc, ms = 8000) => {
  try { await loc.first().waitFor({ state: 'visible', timeout: ms }); return true; }
  catch { return false; }
};
const oculto = async (loc, ms = 8000) => {
  try { await loc.first().waitFor({ state: 'hidden', timeout: ms }); return true; }
  catch { return false; }
};

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 } });
const p = await ctx.newPage();
const titulo = p.locator('h2:has-text("Implementación de QEB")');

await p.goto(S);
await p.waitForURL('**/propuestas/acceso');
check(true, 'índice sin sesión redirige a /acceso');

await p.fill('input[name="clave"]', 'incorrecta');
await p.click('button[type="submit"]');
await p.waitForURL('**/acceso?error=1');
check(await ver(p.locator('text=Clave incorrecta')), 'clave incorrecta se rechaza');

await p.fill('input[name="clave"]', 'clave-propuestas-prueba');
await p.click('button[type="submit"]');
await p.waitForURL((u) => u.pathname === '/propuestas');
check(true, 'clave correcta entra al índice');
check(await ver(titulo), 'la publicación aparece en el índice');

await p.fill('input[type="search"]', 'zzzz');
check(await ver(p.locator('text=Ninguna publicación coincide')), 'buscador sin resultados');
await p.fill('input[type="search"]', 'implementación');
check(await ver(titulo), 'buscador encuentra con acento');
await p.fill('input[type="search"]', 'implementacion');
check(await ver(titulo), 'buscador encuentra sin acento');
await p.fill('input[type="search"]', '');
await ver(titulo);

await p.click('button:has-text("Bitácora")');
check(await ver(p.locator('input[aria-label="Nota de bitácora"]')), 'la bitácora se abre');
await p.fill('input[aria-label="Autor de la nota"]', 'Jos');
await p.fill('input[aria-label="Nota de bitácora"]', 'Enviada a revisión interna');
await p.click('button:has-text("Anotar")');
check(await ver(p.locator('text=Enviada a revisión interna')), 'la nota de bitácora se guarda');
check(await ver(p.locator('text=Jos ·')), 'la nota queda firmada y fechada');

await p.click('button:has-text("Archivar")');
check(await oculto(titulo), 'al archivar sale de Activas');
await p.click('button:has-text("Archivadas")');
check(await ver(titulo), 'aparece en Archivadas');
check(await ver(p.locator('span:has-text("Archivada")')), 'se marca como archivada');

let r = await ctx.request.get(`${S}/ejemplo-implementacion`);
check(r.status() === 200, 'archivada sigue accesible por enlace (200)');

await p.click('button:has-text("Desarchivar")');
check(await oculto(titulo), 'al desarchivar sale de Archivadas');
await p.click('button:has-text("Activas")');
check(await ver(titulo), 'vuelve a Activas');

await p.click('button:has-text("Eliminar")');
check(await ver(p.locator('button:has-text("Confirmar")')), 'eliminar pide confirmación');
await p.click('button:has-text("Confirmar")');
check(await oculto(titulo), 'al eliminar sale de Activas');
await p.click('button:has-text("Eliminadas")');
check(await ver(titulo), 'aparece en Eliminadas');

r = await ctx.request.get(`${S}/ejemplo-implementacion`);
check(r.status() === 404, 'eliminada devuelve 404 en su enlace');

await p.click('button:has-text("Bitácora")');
check(await ver(p.locator('text=Enviada a revisión interna')), 'la bitácora sobrevive al borrado');

await p.click('button:has-text("Restaurar")');
check(await oculto(titulo), 'al restaurar sale de Eliminadas');
r = await ctx.request.get(`${S}/ejemplo-implementacion`);
check(r.status() === 200, 'restaurada vuelve a abrir (200)');

// Aislamiento entre secciones: la sesión de propuestas no abre reportes.
r = await ctx.request.get(`${B}/reportes`, { maxRedirects: 0 });
check(r.status() === 307, 'la sesión de una sección no abre el índice de otra');

await p.click('button:has-text("Activas")');
await ver(titulo);
await p.screenshot({ path: 'scripts/e2e/capturas/panel.png', fullPage: true });
await b.close();
console.log(fallos === 0 ? '\nTODO PASA' : `\n${fallos} FALLO(S)`);
process.exit(fallos === 0 ? 0 : 1);
