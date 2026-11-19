import { cookies } from "next/headers";
import { cookieValida, nombreCookie } from "@/lib/auth";
import { aCsv, limpiar, prospectos } from "@/lib/prospectos";
import { esSeccion } from "@/lib/secciones";

/**
 * Registro de prospectos desde una presentación comercial.
 *
 * Sólo existe en `propuestas` y sólo con la sesión del índice: la presentación
 * se comparte por enlace con el cliente, así que el formulario y el guardado
 * no pueden depender de que el enlace sea secreto. La presentación pregunta
 * aquí al cargar; si responde 401, el botón ni siquiera aparece.
 *
 * GET              → lista (JSON)
 * GET ?formato=csv → lista para Excel
 * POST             → crea o actualiza (con `id`) un prospecto
 */

export const dynamic = "force-dynamic";

type Contexto = { params: Promise<{ seccion: string }> };

const SIN_CACHE = { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" };

async function autorizado(seccion: string): Promise<boolean> {
  if (seccion !== "propuestas" || !esSeccion(seccion)) return false;
  const galletas = await cookies();
  return cookieValida(seccion, galletas.get(nombreCookie(seccion))?.value);
}

function json(datos: unknown, status = 200): Response {
  return Response.json(datos, { status, headers: SIN_CACHE });
}

export async function GET(peticion: Request, { params }: Contexto) {
  const { seccion } = await params;
  if (!(await autorizado(seccion))) return json({ error: "Sin sesión" }, 401);

  try {
    const lista = await prospectos().listar();
    if (new URL(peticion.url).searchParams.get("formato") === "csv") {
      const fecha = new Date().toISOString().slice(0, 10);
      return new Response(aCsv(lista), {
        headers: {
          ...SIN_CACHE,
          "content-type": "text/csv; charset=utf-8",
          "content-disposition": `attachment; filename="prospectos-qeb-${fecha}.csv"`,
        },
      });
    }
    return json({ prospectos: lista });
  } catch (error) {
    console.error("[qeb] No se pudieron leer los prospectos:", error);
    return json({ error: "No se pudo leer el registro" }, 503);
  }
}

export async function POST(peticion: Request, { params }: Contexto) {
  const { seccion } = await params;
  if (!(await autorizado(seccion))) return json({ error: "Sin sesión" }, 401);

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await peticion.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Datos no válidos" }, 400);
  }
  const entrada = limpiar(cuerpo);
  if (!entrada) return json({ error: "Falta el nombre de la empresa" }, 400);
  const id = typeof cuerpo["id"] === "string" && /^[\w-]{1,64}$/.test(cuerpo["id"]) ? cuerpo["id"] : null;

  try {
    return json({ prospecto: await prospectos().guardar(id, entrada) });
  } catch (error) {
    console.error("[qeb] No se pudo guardar el prospecto:", error);
    return json({ error: "No se pudo guardar. Intenta de nuevo." }, 503);
  }
}
