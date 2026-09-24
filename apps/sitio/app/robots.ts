import type { MetadataRoute } from "next";
import { INDEXAR, SITIO_URL } from "@/lib/sitio";

// El sitio público se indexa sólo en producción (ver INDEXAR en lib/sitio).
export default function robots(): MetadataRoute.Robots {
  if (!INDEXAR) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITIO_URL}/sitemap.xml`,
  };
}
