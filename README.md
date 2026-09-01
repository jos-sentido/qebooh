# QEB — espacio de trabajo

Monorepo de trabajo de QEB. Aquí viven dos cosas que comparten el mismo sistema
de diseño:

- **Landings de propuesta** — una URL por cliente para presentar trabajo y
  cotizaciones.
- **Web apps** — herramientas internas de QEB y herramientas comerciales o para
  clientes.

La idea del monorepo es que una propuesta nueva cueste un archivo, y una app
nueva cueste una carpeta — sin volver a resolver tipografía, colores,
componentes ni configuración de build cada vez.

> **Este repo no es la plataforma QEB.** La plataforma es un producto aparte,
> con su propio stack y sus propios repos, desplegada en `qeb.mx`. Aquí no se
> desarrolla producto. El contexto de negocio, el glosario y las reglas están en
> [`CLAUDE.md`](CLAUDE.md).

## QEB atiende a varios clientes

QEB le vende su plataforma a empresas que operan inventario OOH; esas empresas,
a su vez, le venden espacios a sus anunciantes. Adaptar la plataforma a cada
cliente es parte del servicio, así que todo el trabajo se divide en dos capas — y
esa división también organiza este repo:

| Capa                        | En este repo                          | Regla                                                  |
| --------------------------- | ------------------------------------- | ------------------------------------------------------ |
| **Núcleo**                  | `packages/*`                          | Debe servir a cualquier cliente. Nada específico entra. |
| **Personalización**         | `apps/web/content/propuestas/*`, apps por cliente | Aislado por cliente.                        |

Ante cualquier requerimiento, la pregunta por defecto es: *¿esto es núcleo o es
de un cliente?* Si añadir un cliente obliga a tocar `packages/*`, falta un punto
de configuración en el núcleo.

## Estructura

```
apps/
  web/            Sitio principal + landings de propuesta
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
pnpm dev          # http://localhost:3000
```

Otros comandos, todos desde la raíz:

```bash
pnpm build        # build de producción de todo el monorepo
pnpm typecheck    # TypeScript en todos los paquetes
pnpm lint         # ESLint
```

## Añadir una propuesta

1. Copiar `apps/web/content/propuestas/ejemplo-implementacion.ts` con un nombre
   nuevo.
2. Cambiar el `slug` y el contenido.
3. Registrarlo en `apps/web/content/propuestas/index.ts`.

Queda publicada en `/propuestas/<slug>`. Los detalles del modelo de contenido
están en [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

Usa el glosario de [`CLAUDE.md`](CLAUDE.md) al redactar: *cara*, *plaza*,
*catorcena*, *Código Único*, *Solicitud / Propuesta / Campaña*. Los términos
propios de un cliente (CUIC, APS, tarifa efectiva) sólo van en propuestas de ese
cliente, nunca en plantillas generales.

## Sobre la privacidad de las propuestas

Las páginas de propuesta llevan `noindex` y están bloqueadas en `robots.txt`,
así que no aparecen en buscadores. **Eso no es control de acceso**: cualquiera
con el enlace puede abrirlas. Si una propuesta lleva tarifas, márgenes o
información que no puede circular, hay que ponerle autenticación por delante
antes de compartirla.

## Despliegue

Pensado para Vercel. Al importar el repo:

- **Root Directory**: `apps/web`
- **Framework Preset**: Next.js
- El resto se detecta solo (Vercel entiende pnpm workspaces y turbo).

Para desplegar una app distinta del monorepo, crear otro proyecto de Vercel
sobre el mismo repo apuntando su Root Directory a la carpeta correspondiente.
