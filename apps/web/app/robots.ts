import type { MetadataRoute } from "next";

/**
 * Las propuestas son material de cliente que se comparte por enlace directo.
 * El bloqueo en robots.txt acompaña al `noindex` de cada página; ninguno de los
 * dos es un control de acceso, así que nada confidencial debe vivir aquí sin
 * autenticación por delante.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/propuestas", "/propuestas/"],
    },
  };
}
