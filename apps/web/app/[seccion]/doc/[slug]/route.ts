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
  const estado = await almacen().leer(seccion, slug);
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
