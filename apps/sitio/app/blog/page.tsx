import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Contenedor, Portada, Seccion } from "@/components/bloques";
import { entradas } from "@/content/blog";
import { formatoFecha } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre gestión de inventario, ventas y operación en la publicidad exterior (OOH).",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const [principal, ...resto] = entradas();
  return (
    <>
      <Portada
        etiqueta="Blog"
        titulo="Ideas sobre la operación OOH."
        bajada="Inventario, ventas y tecnología aplicada a la publicidad exterior."
      />
      <Seccion className="pt-0 md:pt-0">
        <Contenedor>
          {principal ? (
            <Link
              href={`/blog/${principal.slug}`}
              className="group grid items-center gap-8 rounded-3xl border border-linea bg-tinta p-4 transition-colors hover:border-magenta-marca md:grid-cols-2 md:p-6"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={principal.imagen}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-2 md:p-6">
                <p className="font-mono text-xs text-texto-tenue">
                  {formatoFecha(principal.fecha)}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-white group-hover:text-rosa md:text-4xl">
                  {principal.titulo}
                </h2>
                <p className="mt-4 leading-relaxed text-texto-tenue">
                  {principal.resumen}
                </p>
              </div>
            </Link>
          ) : null}

          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {resto.map((e) => (
              <li key={e.slug}>
                <Link href={`/blog/${e.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-linea">
                    <Image
                      src={e.imagen}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 font-mono text-xs text-texto-tenue">
                    {formatoFecha(e.fecha)}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold leading-snug text-white group-hover:text-rosa">
                    {e.titulo}
                  </h2>
                  <p className="mt-3 leading-relaxed text-texto-tenue">{e.resumen}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Contenedor>
      </Seccion>
    </>
  );
}
