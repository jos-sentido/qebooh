import type { MetadataRoute } from "next";

/**
 * Nada de lo que se publica aquí es material de buscador: son propuestas,
 * reportes y herramientas que se comparten por enlace directo.
 *
 * Acompaña al `noindex` de cada página. Ninguno de los dos es control de
 * acceso: el índice de cada sección va detrás de clave, pero un enlace
 * individual lo abre cualquiera que lo tenga.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
