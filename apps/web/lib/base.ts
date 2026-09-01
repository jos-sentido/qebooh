import { headers } from "next/headers";
import { CABECERA_BASE, type Seccion } from "./secciones";

/**
 * Prefijo con el que la sección arma sus enlaces, tal como los ve el navegador.
 *
 * En `propuestas.qeb.mx` es cadena vacía (los enlaces son `/mi-slug`); en el
 * dominio principal y en local es `/propuestas`. Lo publica el middleware en
 * una cabecera; el valor por defecto cubre el caso en que la petición no pasó
 * por él.
 */
export async function baseDeSeccion(seccion: Seccion): Promise<string> {
  const cabeceras = await headers();
  return cabeceras.get(CABECERA_BASE) ?? `/${seccion}`;
}
