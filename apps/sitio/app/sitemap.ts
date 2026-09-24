import type { MetadataRoute } from "next";
import { entradas } from "@/content/blog";
import { SITIO_URL } from "@/lib/sitio";

const PAGINAS = [
  "",
  "/plataforma",
  "/geo-behavior-indoor",
  "/wifi-inteligente",
  "/nosotros",
  "/contacto",
  "/blog",
  "/privacidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGINAS.map((p) => ({
      url: `${SITIO_URL}${p}`,
      priority: p === "" ? 1 : p === "/plataforma" ? 0.9 : 0.6,
    })),
    ...entradas().map((e) => ({
      url: `${SITIO_URL}/blog/${e.slug}`,
      lastModified: e.fecha,
      priority: 0.5,
    })),
  ];
}
