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

> `qeb.mx` a secas es la plataforma y **no** se toca desde aquí. Sólo se añaden
> los tres subdominios.

## 3. Variables de entorno

En **Settings → Environment Variables**. Ver `apps/web/.env.example` para la
lista con sus explicaciones.

| Variable                | Para qué                                   | ¿Obligatoria?                        |
| ----------------------- | ------------------------------------------ | ------------------------------------ |
| `QEB_CLAVE_PROPUESTAS`  | Clave del índice de propuestas             | Sí, o la sección queda cerrada       |
| `QEB_CLAVE_REPORTES`    | Clave del índice de reportes               | Sí, o la sección queda cerrada       |
| `QEB_CLAVE_TOOL`        | Clave del índice de herramientas           | Sí, o la sección queda cerrada       |
| `POSTGRES_URL`          | Estado administrable (archivado, bitácora) | No, pero sin ella no persiste        |

Cada sección tiene su propia clave: entrar a propuestas no da acceso a reportes.

**Al rotar una clave se cierran las sesiones de esa sección.** Es
intencional — la cookie se firma con la clave, así que cambiarla invalida lo
emitido antes. Es el comportamiento que se espera de una contraseña compartida
cuando alguien deja de necesitar acceso.

## 4. Base de datos

El contenido de las publicaciones vive en el repo. Lo que necesita base de
datos es sólo el estado que se maneja desde el índice: **archivado, eliminado y
bitácora**.

Sin `POSTGRES_URL` la app funciona igual y el índice avisa en pantalla de que
ese estado no se está guardando. Es un modo válido para probar, no para operar.

Sirve cualquier Postgres con cadena de conexión estándar (Neon, Supabase,
Postgres administrado). Pasos:

1. Provisionar la base y copiar la cadena de conexión.
2. **Usar la cadena del pooler**, no la del puerto directo. Cada instancia
   serverless abre su propio pool; sin pooler se agotan las conexiones — es el
   mismo problema de agotamiento que ya se conoce en la plataforma.
3. Cargarla como `POSTGRES_URL` y volver a desplegar.

La tabla se crea sola en el primer uso; no hay migración manual. Para
referencia, es esta:

```sql
create table if not exists publicacion_estado (
  seccion     text        not null,
  slug        text        not null,
  archivada   boolean     not null default false,
  eliminada   boolean     not null default false,
  bitacora    jsonb       not null default '[]'::jsonb,
  actualizado timestamptz not null default now(),
  primary key (seccion, slug)
);
```

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
a un redespliegue, la base de datos está bien conectada. Si el índice muestra el
aviso de "sin base de datos", falta `POSTGRES_URL`.

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

Sin `POSTGRES_URL`, el estado se guarda en memoria del proceso: sirve para
probar el flujo completo, pero se pierde al reiniciar.
