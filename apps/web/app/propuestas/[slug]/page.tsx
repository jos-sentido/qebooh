import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Container, Eyebrow, Section } from "@qebooh/ui";
import { BloquePropuesta } from "@/components/bloque-propuesta";
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
      <Section tone="ink" className="pt-20 md:pt-28">
        <Container width="wide">
          <Eyebrow>{propuesta.cliente}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight md:text-display">
            {propuesta.titulo}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-300">
            {propuesta.resumen}
          </p>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-paper/15 pt-8 text-sm">
            <div>
              <dt className="text-ink-500">Fecha</dt>
              <dd className="mt-1">{formatearFecha(propuesta.fecha)}</dd>
            </div>
            {propuesta.periodo ? (
              <div>
                <dt className="text-ink-500">Periodo</dt>
                <dd className="mt-1">{propuesta.periodo}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-ink-500">Estado</dt>
              <dd className="mt-1">{ETIQUETA_ESTADO[propuesta.estado]}</dd>
            </div>
            {propuesta.contacto ? (
              <div>
                <dt className="text-ink-500">Contacto</dt>
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
        <Section tone="ink">
          <Container>
            <h2 className="text-3xl font-bold tracking-tight">
              {propuesta.cierre.titulo}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
              {propuesta.cierre.texto}
            </p>
            {propuesta.cierre.accion ? (
              <ButtonLink
                href={propuesta.cierre.accion.href}
                size="lg"
                className="mt-10 bg-signal-500 text-ink-950 hover:bg-signal-400"
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
