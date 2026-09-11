# Continuar aquí

> **Para Claude Code en la sesión local.** Este archivo describe un estado
> transitorio: **bórralo cuando los tres pendientes estén cerrados**, y quita el
> puntero de `CLAUDE.md` §0. Lo permanente vive en `CLAUDE.md`,
> `docs/ARQUITECTURA.md` y `docs/DESPLIEGUE.md`.

Estado verificado el **11 de septiembre de 2026** contra producción, con la API
de Vercel y los logs de ejecución. No es lo que se supone que pasa: es lo que se
comprobó.

---

## Dónde estamos

La app está **desplegada y sana**. Lo que falta es configuración de servicios
externos, no código.

| Cosa | Estado |
| --- | --- |
| Build en Vercel | ✅ Ready — `qebooh.vercel.app` |
| Root Directory / Framework | ✅ `apps/web` / Next.js |
| Enrutamiento y `noindex` | ✅ verificado en producción |
| `FIREBASE_SERVICE_ACCOUNT` | ✅ puesta y **válida** |
| Base de datos Firestore | ❌ **no existe** |
| `QEB_CLAVE_PROPUESTAS/REPORTES/TOOL` | ❌ **no están** |
| Dominios `*.qeb.mx` | ❌ sin conectar |

### Evidencia de lo que falta

Firestore, en los logs de ejecución de Vercel al visitar un slug:

```
7 PERMISSION_DENIED: Cloud Firestore API has not been used in project
qeb-ooh-e4d1f before or it is disabled.   reason: SERVICE_DISABLED
```

Que la credencial sea válida se deduce de ese mismo error: el SDK se autenticó
y llegó hasta la API de Google. Una credencial mal pegada daría un error de
autenticación, no de servicio deshabilitado.

Las claves, en el HTML que sirve `qebooh.vercel.app/propuestas` hoy:

> *"Esta sección no tiene clave configurada, así que nadie puede entrar."*

Eso es el fallo cerrado funcionando como debe, no un bug.

**Consecuencia visible:** `qebooh.vercel.app/reportes/reportes-ventas-prototipo`
responde **500**. Cada slug consulta Firestore para saber si fue retirado; si la
base no responde, la página falla. Es deliberado —un enlace eliminado no debe
revivir porque la base esté caída— pero hoy se traduce en un 500 en blanco.

---

## Qué hacer, en orden

### Paso 0 — Jos autentica los CLI (interactivo, una sola vez)

Esto **no** lo puede hacer Claude: abre un navegador.

```bash
pnpm install
npx firebase login
npx vercel login
npx vercel link        # elegir el proyecto "qebooh" del equipo "sentido"
```

A partir de aquí Claude sí puede ejecutar los pasos 1 a 4.

### Paso 1 — Crear la base de Firestore

Crearla habilita la API de paso, así que resuelve el 500.

```bash
# Ver qué ubicaciones hay antes de elegir: NO se puede cambiar después.
npx firebase firestore:locations

# Crear (sustituir <ubicación> por una cercana a México)
npx firebase firestore:databases:create "(default)" --location <ubicación>
```

Si esos subcomandos no existen en la versión instalada de `firebase-tools`,
crearla desde la consola: **Compilación → Firestore Database → Crear base de
datos**, en modo **producción**.

### Paso 2 — Desplegar las reglas

Ya están escritas y versionadas en `firestore.rules` (niegan todo, que es lo
correcto: la app entra por el SDK de administración, que no pasa por reglas).

```bash
pnpm reglas
```

Después de esto **nadie** puede leer Firestore desde un navegador, y la app
sigue funcionando. Si la base se creó en modo de prueba, esto es lo que cierra
esa ventana de 30 días.

### Paso 3 — Las tres claves en Vercel

Las inventa Jos; **distintas entre sí**, para que entrar a una sección no abra
las otras.

```bash
npx vercel env add QEB_CLAVE_PROPUESTAS production
npx vercel env add QEB_CLAVE_REPORTES  production
npx vercel env add QEB_CLAVE_TOOL      production
```

Repetir con `preview` y `development` si se quieren usar esos entornos.

### Paso 4 — Desplegar y verificar

```bash
npx vercel --prod
```

Y comprobar **en producción**, no asumir:

```bash
# El dashboard debe responder 200 y servir ~683 KB de HTML
curl -s -o /dev/null -w '%{http_code} %{size_download}\n' \
  https://qebooh.vercel.app/reportes/doc/reportes-ventas-prototipo

# El índice debe pedir clave (307 a /acceso), no mostrar el aviso ámbar
curl -sI https://qebooh.vercel.app/propuestas | grep -i location
```

Después, entrar al índice con la clave, **archivar algo y volver a desplegar**:
si sigue archivado, Firestore quedó bien conectado. Si aparece el aviso ámbar de
"Sin base de datos", la credencial no se leyó — el error sale en los logs de la
función en Vercel.

---

## Lo que queda después

- **Los tres subdominios.** `propuestas.qeb.mx`, `reportes.qeb.mx`,
  `tool.qeb.mx` → `docs/DESPLIEGUE.md` §2. Requiere tocar el DNS de `qeb.mx`.
  Mientras tanto todo funciona por prefijo en `qebooh.vercel.app/<seccion>`.
- **Página de error decente** cuando Firestore no responde. Hoy es un 500 en
  blanco. Jos ya dijo que sí le interesa, pero no se hizo.
- **Favicon.** Producción registra 404 de `/favicon.ico`.
- **Registro tipado de clientes.** Hoy `cliente` es texto libre en cada
  publicación; con el filtro por cliente ya en el índice, "IMU" e "Imu" se
  separarían en dos filtros. Propuesto, no aprobado.

---

## Cómo verificar cambios en esta app

`pnpm typecheck && pnpm lint && pnpm build` **no basta** y lo dice `CLAUDE.md`
§5: no detecta nada de enrutamiento, acceso, panel ni persistencia. Para eso
están las suites en `scripts/e2e/` (37 comprobaciones) — instrucciones en
`scripts/e2e/README.md`.

Dos trampas que ya costaron tiempo en la sesión anterior, documentadas ahí
mismo: **el emulador acumula estado entre corridas**, y **es fácil apuntar las
pruebas a un servidor viejo** sirviendo un build viejo. Los dos producen fallos
que parecen bugs del código y no lo son.

---

## Datos de referencia

| | |
| --- | --- |
| Proyecto Vercel | `qebooh` · `prj_Ij51tiH15iXjiJr3ccQYteKqpyhF` |
| Equipo Vercel | `sentido` · `team_JYdWr7WxfAPUsFKDEw8bckI4` |
| Dominio actual | `qebooh.vercel.app` |
| Proyecto Firebase | `qeb-ooh-e4d1f` (plan Spark — suficiente) |
| Rama de trabajo | `claude/conectar-proyecto-repo-5g3iwp` (y `main`) |

**La cuenta de servicio de Firebase no va en el repo ni en un chat.** Vive en
las variables de entorno de Vercel. El `.gitignore` ya cubre sus nombres
habituales.
