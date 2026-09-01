import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Container, Eyebrow, Section } from "@qebooh/ui";
import { BloquePropuesta, tonoAlterno } from "@/components/bloque-propuesta";
import { listarPropuestas, obtenerPropuesta } from "@/content/propuestas";
import { ETIQUETA_ESTADO, formatearFecha } from "@/lib/formato";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listarPropuestas().map((propuesta) => ({ slug: propuesta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const propuesta = obtenerPropuesta(slug);

  if (!propuesta) return { title: "Propuesta no encontrada" };

  return {
    title: `${propuesta.titulo} — ${propuesta.cliente}`,
    description: propuesta.resumen,
    // Material de cliente: se comparte por enlace, no se indexa.
    robots: { index: false, follow: false },
  };
}

export default async function PropuestaPage({ params }: Props) {
  const { slug } = await params;
  const propuesta = obtenerPropuesta(slug);

  if (!propuesta) notFound();

  return (
    <>
      <Section className="pt-20 md:pt-28">
        <Container width="wide">
          <Eyebrow>{propuesta.cliente}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-titulo md:text-display">
            {propuesta.titulo}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-texto-tenue">
            {propuesta.resumen}
          </p>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-borde pt-8 text-sm">
            <div>
              <dt className="text-texto-tenue">Fecha</dt>
              <dd className="mt-1">{formatearFecha(propuesta.fecha)}</dd>
            </div>
            {propuesta.periodo ? (
              <div>
                <dt className="text-texto-tenue">Periodo</dt>
                <dd className="mt-1">{propuesta.periodo}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-texto-tenue">Estado</dt>
              <dd className="mt-1">{ETIQUETA_ESTADO[propuesta.estado]}</dd>
            </div>
            {propuesta.contacto ? (
              <div>
                <dt className="text-texto-tenue">Contacto</dt>
                <dd className="mt-1">
                  {propuesta.contacto.email ? (
                    <a
                      href={`mailto:${propuesta.contacto.email}`}
                      className="underline underline-offset-4"
                    >
                      {propuesta.contacto.nombre}
                    </a>
                  ) : (
                    propuesta.contacto.nombre
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        </Container>
      </Section>

      {propuesta.bloques.map((bloque, indice) => (
        <BloquePropuesta
          key={`${bloque.tipo}-${bloque.titulo}`}
          bloque={bloque}
          indice={indice}
        />
      ))}

      {propuesta.cierre ? (
        <Section tone={tonoAlterno(propuesta.bloques.length + 1)}>
          <Container>
            <h2 className="text-3xl font-bold tracking-tight text-titulo">
              {propuesta.cierre.titulo}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-texto-tenue">
              {propuesta.cierre.texto}
            </p>
            {propuesta.cierre.accion ? (
              <ButtonLink
                href={propuesta.cierre.accion.href}
                size="lg"
                className="mt-10"
              >
                {propuesta.cierre.accion.etiqueta}
              </ButtonLink>
            ) : null}
          </Container>
        </Section>
      ) : null}
    </>
  );
}
