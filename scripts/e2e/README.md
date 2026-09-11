# Pruebas de extremo a extremo

`pnpm typecheck && pnpm lint && pnpm build` no detecta nada de lo que más se
rompe en esta app: enrutamiento por subdominio, control de acceso, el panel y
la persistencia. Eso sólo se ve levantando la app y usándola, y para eso están
estos scripts.

Son deliberadamente simples —Playwright a pelo, sin framework de pruebas— para
que se puedan leer de arriba a abajo y modificar sin ceremonia.

| Script            | Qué cubre                                                        |
| ----------------- | ---------------------------------------------------------------- |
| `admin.mjs`       | 24 comprobaciones: acceso, buscador, archivar, bitácora, borrado suave, restaurar, aislamiento entre secciones |
| `documento.mjs`   | 13 comprobaciones: el dashboard servido a pantalla completa y su borrado suave |
| `persistencia.mjs`| Que el estado sobreviva a un reinicio del servidor (lo único que justifica tener base de datos) |

## Cómo correrlas

Una vez, para bajar el navegador:

```bash
pnpm install
npx playwright install chromium
```

Después, en tres terminales:

```bash
# 1. Emulador de Firestore
pnpm emulador

# 2. La app, contra el emulador
cd apps/web
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 \
FIREBASE_PROJECT_ID=qeb-ooh-e4d1f \
QEB_CLAVE_PROPUESTAS=clave-propuestas-prueba \
QEB_CLAVE_REPORTES=clave-reportes-prueba \
QEB_CLAVE_TOOL=clave-tool-prueba \
npx next build && npx next start -p 3000

# 3. Las pruebas
PUERTO=3000 pnpm e2e
```

Las claves de prueba están escritas dentro de los scripts; si las cambias en el
entorno, cámbialas también ahí.

## Dos cosas aprendidas a base de perder tiempo

1. **Arranca siempre con el emulador limpio.** El estado se acumula entre
   corridas y una suite que empieza sucia falla por razones que no son del
   código:

   ```bash
   curl -X DELETE "http://127.0.0.1:8080/emulator/v1/projects/qeb-ooh-e4d1f/databases/(default)/documents"
   ```

2. **Comprueba a qué puerto apuntas.** Un servidor viejo de una corrida
   anterior, sirviendo un build anterior, produce fallos que parecen bugs
   reales. `PUERTO` es explícito justamente por eso.

## `persistencia.mjs`

Va aparte porque necesita reiniciar el servidor a media prueba:

```bash
PUERTO=3000 node scripts/e2e/persistencia.mjs escribir
# matar el servidor y levantarlo otra vez
PUERTO=3000 node scripts/e2e/persistencia.mjs leer
```
