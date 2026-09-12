import { readFile } from "node:fs/promises";
import path from "node:path";
import { obtenerPublicacion } from "@/content/publicaciones";
import { almacen } from "@/lib/almacen";
import { esSeccion } from "@/lib/secciones";

/**
 * Sirve un documento HTML autocontenido tal cual, a pantalla completa.
 *
 * Va en una ruta aparte porque un documento trae su propio `<html>` y no puede
 * renderizarse dentro del layout de la app; `[slug]` redirige aquí, así que la
 * URL corta sigue siendo la que se comparte.
 *
 * Los archivos viven en `content/documentos/` y no en `public/` a propósito:
 * así pasan por la comprobación de borrado suave. Un archivo en `public/`
 * seguiría accesible por su ruta directa después de retirar la publicación.
 */

const DIRECTORIO = path.join(process.cwd(), "content", "documentos");

/**
 * Página que se sirve cuando no se pudo comprobar el estado del documento.
 *
 * Autocontenida a propósito: un documento va fuera del layout de la app, así
 * que su página de error tampoco puede depender de él. Repite la identidad de
 * QEB a mano (fondo, barra morada, título lavanda) — ver CLAUDE.md §6. El texto
 * coincide con `app/[seccion]/error.tsx` para que la experiencia sea la misma.
 */
const HTML_NO_DISPONIBLE = `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>No disponible · QEB</title>
<style>
  :root { color-scheme: dark }
  * { box-sizing: border-box }
  body {
    margin: 0; min-height: 100dvh; display: flex; flex-direction: column;
    background: #0e0e1a; color: #e6e6f2;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .barra { height: 4px; background: #7b2fbe }
  main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem }
  .card { max-width: 34rem }
  .eyebrow {
    margin: 0; font: 500 .75rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: .2em; text-transform: uppercase; color: #8d3fd0;
  }
  h1 { margin: .75rem 0 0; font-size: 2rem; line-height: 1.1; letter-spacing: -.02em; color: #c9a0ff }
  p { margin: 1rem 0 0; color: #9a9ab5; line-height: 1.6 }
  .acciones { margin-top: 2rem; display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap }
  button {
    cursor: pointer; border: 0; border-radius: .5rem; background: #7b2fbe; color: #fff;
    font: 500 .875rem/1 inherit; padding: .75rem 1.25rem; transition: background .15s;
  }
  button:hover { background: #8d3fd0 }
  a { color: #e6e6f2; font-size: .875rem; text-decoration: underline; text-underline-offset: 4px }
</style>
</head>
<body>
  <div class="barra"></div>
  <main>
    <div class="card">
      <p class="eyebrow">No disponible</p>
      <h1>Esto no cargó por el momento</h1>
      <p>Tuvimos un problema temporal para preparar este documento. No es un enlace roto: vuelve a intentarlo en unos segundos.</p>
      <div class="acciones">
        <button onclick="location.reload()">Reintentar</button>
        <a href="/">Volver al inicio</a>
      </div>
    </div>
  </main>
</body>
</html>`;

export const dynamic = "force-dynamic";

export async function GET(
  _peticion: Request,
  { params }: { params: Promise<{ seccion: string; slug: string }> },
) {
  const { seccion, slug } = await params;
  if (!esSeccion(seccion)) return new Response("No encontrado", { status: 404 });

  const publicacion = obtenerPublicacion(seccion, slug);
  if (!publicacion || publicacion.contenido.tipo !== "documento") {
    return new Response("No encontrado", { status: 404 });
  }

  // Retirada desde el índice: el enlace compartido deja de abrir, igual que
  // cualquier otra publicación.
  //
  // Si el estado no se puede leer (la base no responde, por ejemplo) se falla
  // cerrado: no se sirve el documento, porque no revivir un enlace retirado
  // pesa más que mostrarlo. Pero se devuelve una página decente en vez de un
  // 500 en blanco. El detalle del error va a los logs, no a la pantalla. Como
  // esto es un route handler y no una página, no lo cubre `error.tsx`.
  let estado;
  try {
    estado = await almacen().leer(seccion, slug);
  } catch (error) {
    console.error("[qeb] No se pudo leer el estado de la publicación:", error);
    return new Response(HTML_NO_DISPONIBLE, {
      status: 503,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "retry-after": "30",
        "x-robots-tag": "noindex, nofollow",
      },
    });
  }
  if (estado.eliminada) return new Response("No encontrado", { status: 404 });

  // `archivo` viene del registro de publicaciones, no de la URL, pero se
  // resuelve y se comprueba de todos modos: un `..` por descuido al añadir una
  // publicación no debe poder leer fuera de la carpeta de documentos.
  const ruta = path.resolve(DIRECTORIO, publicacion.contenido.archivo);
  if (!ruta.startsWith(DIRECTORIO + path.sep)) {
    return new Response("No encontrado", { status: 404 });
  }

  let html: string;
  try {
    html = await readFile(ruta, "utf8");
  } catch {
    return new Response("No encontrado", { status: 404 });
  }

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Sin caché: el estado de borrado se comprueba en cada visita, así que
      // una copia cacheada seguiría sirviendo algo ya retirado.
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
