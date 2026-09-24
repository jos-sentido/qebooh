import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contenedor, Etiqueta, LlamadoFinal } from "@/components/bloques";
import { entrada, entradas, type Bloque } from "@/content/blog";
import { formatoFecha } from "@/lib/formato";
import { SITIO_URL } from "@/lib/sitio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return entradas().map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = entrada((await params).slug);
  if (!e) return {};
  return {
    title: e.titulo,
    description: e.resumen,
    alternates: { canonical: `/blog/${e.slug}` },
    openGraph: {
      type: "article",
      publishedTime: e.fecha,
      images: [e.imagen],
    },
  };
}

function Cuerpo({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case "parrafo":
      return <p>{bloque.texto}</p>;
    case "subtitulo":
      return <h2>{bloque.texto}</h2>;
    case "lista":
      return (
        <ul>
          {bloque.items.map((it, i) => (
            <li key={i}>
              {it.titulo ? <strong>{it.titulo}: </strong> : null}
              {it.texto}
            </li>
          ))}
        </ul>
      );
    default: {
      // Un tipo de bloque nuevo rompe el typecheck hasta que se implemente.
      const _exhaustivo: never = bloque;
      return _exhaustivo;
    }
  }
}

export default async function EntradaBlog({ params }: Props) {
  const e = entrada((await params).slug);
  if (!e) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: e.titulo,
    datePublished: e.fecha,
    description: e.resumen,
    image: `${SITIO_URL}${e.imagen}`,
    publisher: { "@type": "Organization", name: "QEB", url: SITIO_URL },
    mainEntityOfPage: `${SITIO_URL}/blog/${e.slug}`,
  };

  return (
    <>
      <article className="pt-12 pb-20 md:pt-20 md:pb-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Contenedor angosto>
          <Link href="/blog" className="text-sm text-texto-tenue hover:text-rosa">
            ← Blog
          </Link>
          <Etiqueta className="mt-10">{formatoFecha(e.fecha)}</Etiqueta>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            {e.titulo}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-texto-tenue">{e.resumen}</p>
        </Contenedor>
        <Contenedor className="mt-12 max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-linea">
            <Image src={e.imagen} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        </Contenedor>
        <Contenedor
          angosto
          className="mt-14 space-y-6 text-lg leading-[1.75] text-texto [&_h2]:pt-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-white [&_li]:pl-1 [&_li::marker]:text-rosa [&_strong]:font-semibold [&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6"
        >
          {e.cuerpo.map((b, i) => (
            <Cuerpo key={i} bloque={b} />
          ))}
        </Contenedor>
      </article>
      <LlamadoFinal />
    </>
  );
}
