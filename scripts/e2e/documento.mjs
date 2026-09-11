import { chromium } from 'playwright';
const B = `http://127.0.0.1:${process.env.PUERTO}`;
const S = 'reportes-ventas-prototipo';
let fallos = 0;
const check = (c, m) => { if (!c) fallos++; console.log(`${c ? 'PASA ' : 'FALLA'}  ${m}`); };
const ver = async (loc, ms=8000) => { try { await loc.first().waitFor({state:'visible',timeout:ms}); return true; } catch { return false; } };
const oculto = async (loc, ms=8000) => { try { await loc.first().waitFor({state:'hidden',timeout:ms}); return true; } catch { return false; } };

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));

// La URL corta redirige y el dashboard renderiza
await p.goto(`${B}/reportes/${S}`);
await p.waitForTimeout(4000);
check(p.url().endsWith(`/reportes/doc/${S}`), 'la URL corta redirige al documento');
check(errs.length === 0, `el dashboard carga sin errores JS${errs.length ? ': '+errs[0] : ''}`);
const txt = await p.locator('body').innerText();
check(!txt.includes('Cargando dashboard'), 'el dashboard termina de montar');
check(txt.includes('Reportes de Ventas'), 'muestra su título');
check(txt.includes('Embudo'), 'muestra las pestañas del reporte');
check(txt.includes('Prototipo · datos demostrativos'), 'conserva el aviso de prototipo');
await p.screenshot({ path: 'scripts/e2e/capturas/documento.png' });

// Interacción real: cambiar de pestaña
await p.click('text=Objetivos');
await p.waitForTimeout(1500);
check((await p.locator('body').innerText()).includes('Objetivos'), 'las pestañas responden');

// Aparece en el índice, y el borrado suave lo alcanza
await p.goto(`${B}/reportes`);
await p.waitForURL('**/acceso');
await p.fill('input[name="clave"]', 'clave-reportes-prueba');
await p.click('button[type="submit"]');
await p.waitForURL(u => u.pathname === '/reportes');
const tarjeta = p.locator('h2:has-text("Reportes de Ventas — prototipo")');
check(await ver(tarjeta), 'aparece en el índice de reportes');
check(await ver(p.locator('text=Documento a pantalla completa')), 'el índice lo marca como documento');

await p.click('li:has(h2:has-text("Reportes de Ventas")) button:has-text("Eliminar")');
await p.click('li:has(h2:has-text("Reportes de Ventas")) button:has-text("Confirmar")');
check(await oculto(tarjeta), 'se puede eliminar desde el índice');

let r = await ctx.request.get(`${B}/reportes/${S}`, { maxRedirects: 0 });
check(r.status() === 404, 'eliminado: la URL corta devuelve 404');
r = await ctx.request.get(`${B}/reportes/doc/${S}`);
check(r.status() === 404, 'eliminado: la ruta del documento también devuelve 404');

await p.click('button:has-text("Eliminadas")');
await p.click('li:has(h2:has-text("Reportes de Ventas")) button:has-text("Restaurar")');
await oculto(tarjeta);
r = await ctx.request.get(`${B}/reportes/doc/${S}`);
check(r.status() === 200, 'restaurado: el documento vuelve a servirse');

await b.close();
console.log(fallos === 0 ? '\nTODO PASA' : `\n${fallos} FALLO(S)`);
process.exit(fallos === 0 ? 0 : 1);
