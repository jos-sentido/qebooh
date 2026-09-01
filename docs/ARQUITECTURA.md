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

## El sistema de diseño

`packages/ui` define los tokens en `src/styles.css` usando el bloque `@theme` de
Tailwind v4. Cambiar un color ahí lo cambia en todo el repo.

Los tokens principales:

| Token             | Uso                                              |
| ----------------- | ------------------------------------------------ |
| `ink-*`           | Textos y superficies oscuras                     |
| `paper`, `paper-dim` | Fondos claros                                 |
| `signal-*`        | Acento único — usarlo poco para que siga siendo acento |
| `text-display`    | Escala de titular para heros de propuesta        |

Para que Tailwind vea las clases usadas dentro de `packages/ui`, el
`globals.css` de cada app necesita una línea `@source` apuntando a
`packages/ui/src`. Tailwind ignora `node_modules` por defecto, y el paquete
entra por ahí como symlink del workspace; sin esa línea las clases del paquete
no llegan al CSS final.

## Modelo de contenido de las propuestas

Una propuesta es un objeto que cumple el tipo `Propuesta`
(`apps/web/content/tipos.ts`), no una página escrita a mano. La plantilla de
`/propuestas/[slug]` la recorre y la renderiza.

Cada propuesta tiene metadatos (cliente, fecha, estado, periodo, contacto) y una
lista de `bloques`. Hay cuatro tipos:

| Tipo        | Para qué sirve                                          |
| ----------- | ------------------------------------------------------- |
| `texto`     | Narrativa: el reto, el enfoque, el alcance              |
| `lista`     | Fases, entregables, componentes de la campaña           |
| `cifras`    | Alcance, impactos, duración — se renderiza sobre fondo oscuro |
| `inversion` | Desglose de costos con total y nota de vigencia         |

`components/bloque-propuesta.tsx` es un `switch` exhaustivo sobre esos tipos: al
añadir uno nuevo en `tipos.ts`, TypeScript falla en ese archivo hasta que se
maneje. Es a propósito — evita que un bloque nuevo se renderice como vacío.

### Añadir un tipo de bloque

1. Añadir la variante a la unión `Bloque` en `content/tipos.ts`.
2. `pnpm typecheck` señala el `switch` incompleto.
3. Implementar el `case` en `components/bloque-propuesta.tsx`.

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

## Despliegue

Un proyecto de Vercel por app, todos apuntando a este repo con Root Directory
distinto. Vercel solo reconstruye la app cuyo directorio cambió si se activa
"Skip build if no changes" con el filtro de turbo.
