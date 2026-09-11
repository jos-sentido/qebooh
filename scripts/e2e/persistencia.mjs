import { chromium } from 'playwright';
const B = `http://127.0.0.1:${process.env.PUERTO}`;
const accion = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await (await b.newContext()).newPage();
await p.goto(`${B}/reportes`); await p.waitForURL('**/acceso');
await p.fill('input[name="clave"]', 'clave-reportes-prueba');
await p.click('button[type="submit"]');
await p.waitForURL(u => u.pathname === '/reportes');

if (accion === 'escribir') {
  const fila = 'li:has(h2:has-text("Avance trimestral"))';
  await p.click(`${fila} button:has-text("Bitácora")`);
  await p.fill('input[aria-label="Autor de la nota"]', 'Jos');
  await p.fill('input[aria-label="Nota de bitácora"]', 'Nota antes del reinicio');
  await p.click(`${fila} button:has-text("Anotar")`);
  await p.waitForTimeout(2500);
  await p.click(`${fila} button:has-text("Archivar")`);
  await p.waitForTimeout(2500);
  console.log('escrito: nota + archivado');
} else {
  await p.click('button:has-text("Archivadas")');
  await p.waitForTimeout(1200);
  const fila = 'li:has(h2:has-text("Avance trimestral"))';
  const visible = await p.locator(fila).count() > 0;
  console.log(`${visible ? 'PASA ' : 'FALLA'}  el archivado sobrevive al reinicio`);
  if (visible) {
    await p.click(`${fila} button:has-text("Bitácora")`);
    await p.waitForTimeout(1200);
    const txt = await p.locator('body').innerText();
    console.log(`${txt.includes('Nota antes del reinicio') ? 'PASA ' : 'FALLA'}  la bitácora sobrevive al reinicio`);
    console.log(`${txt.includes('Jos ·') ? 'PASA ' : 'FALLA'}  conserva autor y fecha`);
  }
}
await b.close();
