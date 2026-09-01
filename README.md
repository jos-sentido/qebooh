# QEB — espacio de trabajo

Monorepo de trabajo de QEB. Publica en tres subdominios de `qeb.mx`, todos
desde el mismo proyecto de Vercel y con el mismo sistema de diseño:

| Subdominio          | Qué se publica                      |
| ------------------- | ----------------------------------- |
| `propuestas.qeb.mx` | Propuestas comerciales a cliente    |
| `reportes.qeb.mx`   | Reportes y entregables de avance    |
| `tool.qeb.mx`       | Herramientas internas y comerciales |

En cada subdominio la raíz es un **índice administrable** —buscador, filtros,
archivar, eliminar y bitácora— y todo lo demás es un slug que se comparte
directo: `propuestas.qeb.mx/imu-implementacion`.

> **Este repo no es la plataforma QEB.** La plataforma es un producto aparte,
> con su propio stack y sus propios repos, desplegada en `qeb.mx`. Aquí no se
> desarrolla producto. El contexto de negocio, el glosario y las reglas están en
> [`CLAUDE.md`](CLAUDE.md).

## QEB atiende a varios clientes

QEB le vende su plataforma a empresas que operan inventario OOH; esas empresas,
a su vez, le venden espacios a sus anunciantes. Adaptar la plataforma a cada
cliente es parte del servicio, así que todo el trabajo se divide en dos capas — y
esa división también organiza este repo:

| Capa                | En este repo                                        | Regla                                                  |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| **Núcleo**          | `packages/*`                                        | Debe servir a cualquier cliente. Nada específico entra. |
| **Personalización** | `apps/web/content/publicaciones/*`, apps por cliente | Aislado por cliente.                                   |

Ante cualquier requerimiento, la pregunta por defecto es: *¿esto es núcleo o es
de un cliente?* Si añadir un cliente obliga a tocar `packages/*`, falta un punto
de configuración en el núcleo.

## Estructura

```
apps/
  web/            Las tres secciones + sistema de publicaciones
packages/
  ui/             Sistema de diseño: tokens y componentes compartidos
  config/         Configuraciones base de TypeScript
```

## Requisitos

- Node.js 20 o superior (probado en 22)
- pnpm 10 (`corepack enable` lo activa con la versión que fija este repo)

## Arrancar

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # y poner claves de prueba
pnpm dev                                        # http://localhost:3000
```

En local no hay subdominios: se navega por prefijo (`/propuestas`), que es
exactamente la ruta a la que reescribe producción.

Otros comandos, todos desde la raíz:

```bash
pnpm build        # build de producción de todo el monorepo
pnpm typecheck    # TypeScript en todos los paquetes
pnpm lint         # ESLint
```

## Publicar algo

1. Copiar una plantilla de `apps/web/content/publicaciones/`:
   - `propuesta-implementacion.ts` — propuesta comercial
   - `reporte-avance.ts` — reporte de avance
   - `tool-conciliador.ts` — herramienta que vive fuera (redirige a su destino)
2. Cambiar `slug`, `seccion` y el contenido.
3. Registrarlo en `apps/web/content/publicaciones/index.ts`.

Queda publicado en `<seccion>.qeb.mx/<slug>` y aparece en el índice.

Usa el glosario de [`CLAUDE.md`](CLAUDE.md) al redactar: *cara*, *plaza*,
*catorcena*, *Código Único*, *Solicitud / Propuesta / Campaña*. Los términos
propios de un cliente (CUIC, APS, tarifa efectiva) sólo van en publicaciones de
ese cliente, nunca en plantillas generales.

## Administrar

El índice de cada sección permite buscar, filtrar por cliente y etiqueta,
archivar, eliminar y llevar bitácora por publicación.

**Eliminar es un borrado suave.** La publicación desaparece del índice y su
enlace pasa a devolver 404, pero el archivo sigue versionado en el repo. Es
deliberado: el historial de desarrollo es lo que respalda el producto, así que
nada se pierde — se retira de circulación. Para borrar de verdad, se borra el
archivo y se registra en git.

El estado administrable vive en base de datos, no en el repo. Sin
`POSTGRES_URL` la app funciona pero ese estado no persiste, y el índice lo avisa
en pantalla.

## Acceso

Cada índice pide una clave propia; entrar a propuestas no da acceso a reportes.
**Los enlaces individuales quedan abiertos**, para poder mandarle una propuesta
a un cliente sin darle credenciales.

`noindex` y `robots.txt` mantienen todo fuera de los buscadores, pero **eso no
es control de acceso**: cualquiera con el enlace lo abre. Si una publicación
lleva tarifas, márgenes o información que no puede circular, necesita
autenticación propia antes de compartirse.

## Despliegue

Los tres subdominios, las variables de entorno y la base de datos están en
[`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md). La arquitectura, en
[`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).
