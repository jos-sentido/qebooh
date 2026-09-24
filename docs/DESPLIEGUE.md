# Despliegue

Un solo proyecto de Vercel sirve los tres subdominios de `qeb.mx`. El
middleware lee el hostname y reescribe la ruta a la sección que corresponde.

| Subdominio            | Sección      | Qué se publica                        |
| --------------------- | ------------ | ------------------------------------- |
| `propuestas.qeb.mx`   | `propuestas` | Propuestas comerciales a cliente      |
| `reportes.qeb.mx`     | `reportes`   | Reportes y entregables de avance      |
| `tool.qeb.mx`         | `tool`       | Herramientas internas y comerciales   |

En cada subdominio, la raíz es el índice administrable de esa sección y todo lo
demás es un slug: `propuestas.qeb.mx/imu-implementacion`.

---

## 1. Proyecto de Vercel

- **Root Directory**: `apps/web`
- **Framework Preset**: Next.js

El resto se detecta solo; Vercel entiende pnpm workspaces y Turborepo.

## 2. Los tres dominios

En **Settings → Domains** del proyecto, añadir los tres:

```
propuestas.qeb.mx
reportes.qeb.mx
tool.qeb.mx
```

Vercel indica, para cada uno, el registro DNS exacto que hay que crear donde
esté alojada la zona de `qeb.mx`. Para subdominios suele ser un `CNAME` a
`cname.vercel-dns.com`, pero **usar siempre el valor que muestre el panel** —
es lo que Vercel verifica y puede cambiar.

No hay que marcar ninguno como dominio principal ni configurar redirecciones
entre ellos: son tres entradas independientes al mismo despliegue.

> `qeb.mx` a secas y `www.qeb.mx` son del sitio público, que es **otro**
> proyecto de Vercel (ver §8). No añadirlos a este.

## 3. Variables de entorno

En **Settings → Environment Variables**. Ver `apps/web/.env.example` para la
lista con sus explicaciones.

| Variable                | Para qué                                   | ¿Obligatoria?                        |
| ----------------------- | ------------------------------------------ | ------------------------------------ |
| `QEB_CLAVE_PROPUESTAS`  | Clave del índice de propuestas             | Sí, o la sección queda cerrada       |
| `QEB_CLAVE_REPORTES`    | Clave del índice de reportes               | Sí, o la sección queda cerrada       |
| `QEB_CLAVE_TOOL`        | Clave del índice de herramientas           | Sí, o la sección queda cerrada       |
| `FIREBASE_SERVICE_ACCOUNT` | Estado administrable (archivado, bitácora) | No, pero sin ella no persiste     |

Cada sección tiene su propia clave: entrar a propuestas no da acceso a reportes.

**Al rotar una clave se cierran las sesiones de esa sección.** Es
intencional — la cookie se firma con la clave, así que cambiarla invalida lo
emitido antes. Es el comportamiento que se espera de una contraseña compartida
cuando alguien deja de necesitar acceso.

## 4. Base de datos (Firestore)

El contenido de las publicaciones vive en el repo. Lo que necesita base de
datos es sólo el estado que se maneja desde el índice: **archivado, eliminado y
bitácora**.

Sin `FIREBASE_SERVICE_ACCOUNT` la app funciona igual y el índice avisa en
pantalla de que ese estado no se está guardando. Es un modo válido para probar,
no para operar.

Proyecto: `qeb-ooh-e4d1f`.

### Crear la cuenta de servicio

1. En la consola de Firebase: **Configuración del proyecto → Cuentas de
   servicio → Generar nueva clave privada**. Descarga un JSON.
2. Codifícalo para pegarlo sin pelearte con los saltos de línea:
   ```bash
   base64 -w0 qeb-ooh-e4d1f-firebase-adminsdk-xxxxx.json
   ```
3. Pega el resultado en Vercel como `FIREBASE_SERVICE_ACCOUNT` y vuelve a
   desplegar.

El JSON también se acepta tal cual, sin base64; la app detecta cuál de los dos
le llegó.

**Ese archivo es una credencial con acceso total al proyecto.** No va al repo
(el `.gitignore` ya cubre los nombres habituales), no va en un chat y no va en
un correo. Si se filtra, se revoca desde la misma pantalla y se genera otra.

### Reglas de seguridad: cerrar todo

La app usa el **SDK de administración** desde el servidor, y ese SDK no pasa por
las reglas de seguridad. Eso significa que las reglas pueden —y deben— negar
todo: nadie debe poder leer esta base desde un navegador.

Si creaste la base en **modo de prueba**, quedó abierta a lectura y escritura
para cualquiera durante 30 días. Conviene cerrarla ahora:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

La app sigue funcionando con esas reglas, porque entra por el SDK de
administración.

### Estructura

Se crea sola al primer uso; no hay migración.

```
publicacion_estado/{seccion}/publicaciones/{slug}
  archivada:   boolean
  eliminada:   boolean
  bitacora:    array<{ id, fecha, autor, texto }>
  actualizado: timestamp
```

Con la sección en la ruta, listar una sección es leer una colección — sin
consultas ni índices compuestos que mantener. Los campos que nunca se han
tocado no existen en el documento; la app los lee como `false`.

### Probar en local sin credenciales

El emulador evita tener que bajar una cuenta de servicio para desarrollar:

```bash
npx firebase-tools emulators:start --only firestore --project qeb-ooh-e4d1f
```

Y en `apps/web/.env.local`:

```
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
FIREBASE_PROJECT_ID=qeb-ooh-e4d1f
```

Con esas dos variables el SDK se conecta al emulador y no pide credenciales. No
definirlas en Vercel.


## 5. Qué está protegido y qué no

Esto conviene tenerlo claro antes de compartir nada:

| Recurso                              | Acceso                                          |
| ------------------------------------ | ----------------------------------------------- |
| Índice de una sección (la raíz)      | Clave de esa sección                            |
| Acciones de administración           | Clave de esa sección, revalidada en el servidor |
| Una publicación por su enlace        | **Abierta**: cualquiera con el enlace la abre   |
| Buscadores                           | Bloqueado (`noindex` + `robots.txt`)            |

Los slugs quedan abiertos a propósito, para poder mandarle una propuesta a un
cliente sin darle credenciales. **`noindex` no es control de acceso.** Si una
publicación lleva tarifas, márgenes o algo que no puede circular, necesita
autenticación propia antes de compartirse.

## 6. Comprobación tras desplegar

```bash
# El índice debe redirigir a /acceso
curl -sI https://propuestas.qeb.mx/ | grep -i location

# Un slug publicado debe responder 200 sin clave
curl -s -o /dev/null -w '%{http_code}\n' https://propuestas.qeb.mx/<slug>

# Nada debe ser indexable
curl -s https://propuestas.qeb.mx/robots.txt
```

Después, entrar al índice con la clave y archivar algo: si el cambio sobrevive
a un redespliegue, Firestore está bien conectado. Si el índice muestra el aviso
de "sin base de datos", falta `FIREBASE_SERVICE_ACCOUNT` o el JSON no se pudo
leer — los errores de credenciales aparecen en los logs de la función en Vercel.

## 7. Desarrollo local

En local no hay subdominios: se navega por prefijo de ruta, que es exactamente
la ruta a la que reescribe producción.

```bash
cp apps/web/.env.example apps/web/.env.local   # y poner claves de prueba
pnpm dev
```

- `localhost:3000/` — hub con las tres secciones
- `localhost:3000/propuestas` — índice (pide clave)
- `localhost:3000/propuestas/<slug>` — publicación

Sin credenciales ni emulador, el estado se guarda en memoria del proceso: sirve
para probar el flujo completo, pero se pierde al reiniciar.

## 8. Sitio público `qeb.mx` (`apps/sitio`)

Proyecto de Vercel **aparte** del de las secciones (`qeb-sitio`), en el
mismo repo y con la misma rama de producción.

- **Root Directory**: `apps/sitio`
- **Framework Preset**: Next.js
- **Revisión**: mientras se hace el desarrollo inicial, el sitio se publica
  como herramienta en `tool.qeb.mx/sitio-qeb` (publicación de tipo `enlace`
  en `apps/web/content/publicaciones/tool-sitio-qeb.ts`) que redirige a
  `qeb-sitio.vercel.app`. Sin indexar. La protección de despliegue del
  proyecto está desactivada para que el enlace se pueda compartir.
- **Dominios finales** (cuando se apruebe): `qeb.mx` y `www.qeb.mx`, con
  `NEXT_PUBLIC_SITIO_URL=https://qeb.mx` y `NEXT_PUBLIC_INDEXAR=true`.

### Variables de entorno

| Variable                | Para qué                                          |
| ----------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITIO_URL` | URL canónica; metadatos y sitemap                  |
| `NEXT_PUBLIC_INDEXAR`   | `true` sólo en qeb.mx; si no, `noindex` y robots cerrado |
| `RESEND_API_KEY`        | Envío del formulario de demo por correo (Resend)  |
| `CONTACTO_REMITENTE`    | Remitente verificado, p. ej. `QEB <sitio@qeb.mx>` |
| `CONTACTO_DESTINO`      | Destinatarios, separados por coma                  |

Sin `RESEND_API_KEY` el sitio funciona, pero el formulario responde con un
error amable que invita a escribir a `contacto@qeb.mx`. Para enviar desde
`@qeb.mx`, el dominio debe estar verificado en Resend (registros SPF/DKIM que
indica su panel, en la zona DNS de `qeb.mx`).

### Cambio desde el WordPress anterior

Hoy `qeb.mx` apunta a un WordPress. El corte es sólo DNS:

1. Desplegar el proyecto y revisarlo en su URL `*.vercel.app`.
2. Añadir `qeb.mx` y `www.qeb.mx` en Domains y crear los registros que indique
   Vercel (para el apex suele ser un `A`; usar siempre el valor del panel).
3. **Antes de cambiar el DNS**, confirmar que ningún otro servicio depende del
   hosting actual: correo (`MX`), subdominios o la plataforma. Sólo se cambian
   los registros de `qeb.mx` y `www`.

Las URLs del WordPress (`/software`, `/politicas-de-privacidad`, las entradas
del blog en `/AAAA/MM/DD/slug`) redirigen con 301 desde `next.config.ts`.

### Local

```bash
pnpm --filter @qebooh/sitio dev   # http://localhost:3001
```
