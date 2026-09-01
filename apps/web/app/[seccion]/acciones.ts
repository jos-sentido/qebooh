"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { almacen } from "@/lib/almacen";
import { cookieValida, nombreCookie } from "@/lib/auth";
import { esSeccion, type Seccion } from "@/lib/secciones";

export type Resultado = { ok: true } | { ok: false; error: string };

/**
 * Toda acción de administración vuelve a verificar la sesión aquí.
 *
 * El middleware ya cierra el índice, pero una Server Action es un endpoint
 * POST que se puede invocar directamente: si la única defensa viviera en el
 * middleware, bastaría con saltárselo. La comprobación se repite a propósito.
 */
async function autorizar(seccion: string): Promise<Seccion> {
  if (!esSeccion(seccion)) throw new Error("Sección desconocida");
  const galletas = await cookies();
  const cookie = galletas.get(nombreCookie(seccion))?.value;
  if (!(await cookieValida(seccion, cookie))) {
    throw new Error("Sesión no válida");
  }
  return seccion;
}

function refrescar(seccion: Seccion): void {
  // Se revalidan las dos formas de la ruta porque el mismo contenido se sirve
  // por subdominio y por prefijo.
  revalidatePath(`/${seccion}`);
  revalidatePath("/", "layout");
}

export async function archivar(
  seccion: string,
  slug: string,
  valor: boolean,
): Promise<Resultado> {
  try {
    const validada = await autorizar(seccion);
    await almacen().fijarArchivada(validada, slug, valor);
    refrescar(validada);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: mensaje(error) };
  }
}

export async function eliminar(
  seccion: string,
  slug: string,
  valor: boolean,
): Promise<Resultado> {
  try {
    const validada = await autorizar(seccion);
    await almacen().fijarEliminada(validada, slug, valor);
    refrescar(validada);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: mensaje(error) };
  }
}

export async function anotar(
  seccion: string,
  slug: string,
  autor: string,
  texto: string,
): Promise<Resultado> {
  try {
    const validada = await autorizar(seccion);
    const limpio = texto.trim();
    if (limpio.length === 0) {
      return { ok: false, error: "La nota está vacía." };
    }
    await almacen().anotar(validada, slug, {
      autor: autor.trim() || "Sin firmar",
      // Se corta para que una nota pegada por error no crezca sin límite.
      texto: limpio.slice(0, 2000),
    });
    refrescar(validada);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: mensaje(error) };
  }
}

export async function borrarNota(
  seccion: string,
  slug: string,
  id: string,
): Promise<Resultado> {
  try {
    const validada = await autorizar(seccion);
    await almacen().borrarNota(validada, slug, id);
    refrescar(validada);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: mensaje(error) };
  }
}

function mensaje(error: unknown): string {
  return error instanceof Error ? error.message : "Error inesperado";
}
