# Arquitectura

## Por qué monorepo

El repo tiene que sostener dos ritmos distintos: propuestas que se arman en
horas y se comparten una vez, y herramientas que viven meses y se mantienen. Un
monorepo permite que ambas compartan diseño y configuración, pero se desplieguen
por separado — cada app puede ser su propio proyecto de Vercel, con su propio
dominio, sin arrastrar a las demás.

- `apps/*` — cada carpeta es una aplicación desplegable de forma independiente.
- `packages/*` — código compartido, sin build propio: se consume como fuente y
  lo transpila la app que lo usa (`transpilePackages` en `next.config.ts`).

## Un proyecto, tres subdominios

`apps/web` sirve `propuestas.qeb.mx`, `reportes.qeb.mx` y `tool.qeb.mx` desde un
solo proyecto de Vercel. El middleware lee el hostname y reescribe la ruta al
prefijo de la sección: `propuestas.qeb.mx/algo` → `/propuestas/algo`.

Eso deja **dos formas de cada URL** y es la fuente de error más fácil de cometer
aquí:

| Forma            | Quién la ve                     | Ejemplo              |
| ---------------- | ------------------------------- | -------------------- |
| La del router    | El código de rutas de Next      | `/propuestas/algo`   |
| La del navegador | Quien abre `propuestas.qeb.mx`  | `/algo`              |

Todo lo que se mande al navegador —enlaces y redirecciones— tiene que usar la
segunda. El middleware publica ese prefijo en la cabecera `x-qeb-base` y
`lib/base.ts` lo lee; las páginas arman sus enlaces a partir de ahí, nunca
concatenando la sección a mano.

Por eso `typedRoutes` está desactivado: los tipos generados sólo conocen la
forma del router, así que validarían la forma equivocada justo en los enlaces
que dependen del host.

En local no hay subdominios y se navega por prefijo, que es exactamente la ruta
a la que reescribe producción. Añadir una sección es añadir una entrada en
`lib/secciones.ts` y su dominio en Vercel.

## Contenido en el repo, estado en base de datos

Dos capas que conviene no mezclar:

- **Contenido** — el texto de cada publicación, en `content/publicaciones/`.
  Versionado en git, con su historial y su revisión.
- **Estado administrable** — archivado, eliminado y bitácora, en Postgres. Es lo
  que cambia desde el índice, sin desplegar.

De ahí que **eliminar sea un borrado suave**: la publicación sale del índice y su
slug devuelve 404, pero el archivo sigue en el repo. Borrar de verdad desde una
pantalla web significaría perder trazabilidad, y la trazabilidad del desarrollo
es justo lo que respalda el producto.

`lib/almacen/` abstrae ese estado detrás de una interfaz con dos adaptadores:
Postgres en producción y memoria en desarrollo. La instancia se ancla a
`globalThis` y no a una variable de módulo, porque Next empaqueta las Server
Actions y las páginas por separado y el mismo módulo puede cargarse dos veces en
un proceso.

Las páginas del índice y de cada slug son `force-dynamic` y **no** exportan
`generateStaticParams`: exportarlo las prerenderiza al construir, y esa versión
congelada gana sobre `force-dynamic` — el índice se quedaría con el estado que
había en el build, y un enlace ya retirado seguiría abriendo.

## Acceso

Cada sección tiene su clave (`QEB_CLAVE_*`). La cookie es un HMAC de la sección
firmado con la propia clave, así que no hace falta un secreto aparte y rotar la
clave invalida las sesiones abiertas.

Protege el índice y las acciones de administración; los slugs quedan abiertos
por enlace, para poder compartir una propuesta sin dar credenciales. La
comprobación se hace dos veces a propósito: en el middleware y otra vez dentro
de cada Server Action, porque una acción es un endpoint POST que se puede
invocar sin pasar por el middleware.

Falla cerrado: sin clave configurada, nadie entra.

## Núcleo y personalización

QEB atiende a varios clientes y la personalización es parte del servicio (ver
[`../CLAUDE.md`](../CLAUDE.md) §1). Esa división es también la regla estructural
de este repo:

| Ruta                            | Capa            | Qué implica                                                     |
| ------------------------------- | --------------- | --------------------------------------------------------------- |
| `packages/ui`, `packages/config` | Núcleo          | Debe servir a cualquier cliente. Nada específico se cablea aquí. |
| `apps/*`                        | Según el caso   | Una app general vive igual que una de cliente; lo que cambia es qué puede asumir. |
| `apps/web/content/publicaciones/*` | Personalización | Cada archivo pertenece a un cliente o encargo concreto.       |

Dos consecuencias prácticas:

- **La nomenclatura de un cliente no sube al núcleo.** Términos como CUIC, APS o
  *tarifa efectiva* son de la personalización de IMU. En `packages/*` se usa el
  vocabulario del producto, o un nombre parametrizable.
- **Añadir un cliente no debería obligar a tocar `packages/*`.** Si lo obliga,
  el punto de extensión que falta está en el núcleo, y ahí es donde hay que
  resolverlo — no con una excepción en la capa de cliente.

## El sistema de diseño

`packages/ui` define los tokens en `src/styles.css` usando el bloque `@theme` de
Tailwind v4. Cambiar un color ahí lo cambia en todo el repo.

Los tokens vienen de la identidad visual de QEB:

| Token                          | Uso                                                     |
| ------------------------------ | ------------------------------------------------------- |
| `fondo`                        | Lienzo base (`#0e0e1a`)                                 |
| `superficie`, `superficie-alta` | Bandas y tarjetas elevadas                             |
| `marca-500`, `marca-700`       | Morado de marca — barra, botones, banda de cifras       |
| `titulo`                       | Color de títulos (`#c9a0ff`)                            |
| `texto`, `texto-tenue`         | Cuerpo y texto secundario                               |
| `ambar`, `cian`, `magenta`     | Acentos — uno a la vez, con moderación                  |
| `text-display`                 | Escala de titular para heros de propuesta               |

Los derivados (`marca-400`, `superficie-alta`, `borde`, `texto`, `texto-tenue`)
no están en la guía de marca: se calcularon a partir de ella para cubrir hover,
elevación, bordes y jerarquía de texto manteniendo contraste AA. Van marcados
como derivados en el CSS — al recibir la guía completa, se sustituyen.

Para que Tailwind vea las clases usadas dentro de `packages/ui`, el
`globals.css` de cada app necesita una línea `@source` apuntando a
`packages/ui/src`. Tailwind ignora `node_modules` por defecto, y el paquete
entra por ahí como symlink del workspace; sin esa línea las clases del paquete
no llegan al CSS final.

## Modelo de contenido

Una publicación es un objeto que cumple el tipo `Publicacion`
(`apps/web/content/tipos.ts`), no una página escrita a mano. La plantilla de
`[seccion]/[slug]` la recorre y la renderiza.

Cada publicación tiene metadatos (sección, cliente, fecha, estado, etiquetas,
periodo, contacto) y un `contenido`, que es de uno de dos tipos:

- `bloques` — la página se arma con los bloques de abajo.
- `enlace` — la publicación vive fuera (otra app, un dashboard, un archivo) y el
  slug redirige. La URL corta de qeb.mx queda como la que se comparte: si el
  destino cambia, se cambia en un sitio y el enlace repartido sigue sirviendo.

Los cuatro tipos de bloque:

| Tipo        | Para qué sirve                                           |
| ----------- | -------------------------------------------------------- |
| `texto`     | Narrativa: el reto, el enfoque, el alcance               |
| `lista`     | Fases, entregables, módulos                              |
| `cifras`    | Alcance del proyecto — se renderiza sobre la banda morada |
| `inversion` | Desglose de costos con total y nota de vigencia          |

`components/bloques.tsx` es un `switch` exhaustivo sobre esos tipos: al
añadir uno nuevo en `tipos.ts`, TypeScript falla en ese archivo hasta que se
maneje. Es a propósito — evita que un bloque nuevo se renderice como vacío.

Sobre el contenido: **una propuesta de QEB es una propuesta de plataforma**
(implementación, personalización, integración), no un plan de medios. El plan de
medios es lo que el cliente arma usando QEB. El ejemplo en
`propuesta-implementacion.ts` está escrito con ese encuadre.

Toda cifra que salga de un cruce de datos debería llevar `nota` con su fuente o
metodología. Es lo primero que pregunta el cliente, y evita el patrón de dos
pantallas que no cuadran porque cada una midió distinto.

### Añadir un tipo de bloque

1. Añadir la variante a la unión `Bloque` en `content/tipos.ts`.
2. `pnpm typecheck` señala el `switch` incompleto.
3. Implementar el `case` en `components/bloques.tsx`.

## Añadir una app nueva

```bash
mkdir -p apps/mi-app
```

En su `package.json`:

- nombre `@qebooh/mi-app`
- `"@qebooh/ui": "workspace:*"` en dependencias
- scripts `dev`, `build`, `start`, `lint`, `typecheck`, `clean`

En su `tsconfig.json`, extender `@qebooh/config/tsconfig/nextjs.json`. En su
`next.config.ts`, incluir `transpilePackages: ["@qebooh/ui"]`. En su
`globals.css`, importar Tailwind, luego `@qebooh/ui/styles.css`, y añadir el
`@source` hacia `packages/ui/src`.

`pnpm install` en la raíz la engancha al workspace. Turbo la recoge sola: las
tareas se definen una vez en `turbo.json`.

Cada app corre en su propio puerto en desarrollo (`apps/web` usa el 3000); al
crear una nueva conviene fijarle otro para poder levantarlas en paralelo.

Si la app es de un cliente concreto, decirlo en su README y mantener su
nomenclatura dentro de la app — no promoverla a `packages/ui`.

## Despliegue

`apps/web` es un proyecto de Vercel con los tres subdominios apuntando a él. Una
app futura que necesite despliegue propio sería otro proyecto sobre el mismo
repo, con su Root Directory.

Los pasos concretos —dominios, DNS, variables y base de datos— están en
[`DESPLIEGUE.md`](DESPLIEGUE.md).
