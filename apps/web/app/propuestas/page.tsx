import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, Eyebrow, Section } from "@qebooh/ui";
import { listarPropuestas } from "@/content/propuestas";
import { ETIQUETA_ESTADO, formatearFecha } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Propuestas",
  // Índice interno: no debe aparecer en buscadores.
  robots: { index: false, follow: false },
};

export default function PropuestasPage() {
  const propuestas = listarPropuestas();

  return (
    <Section>
      <Container width="wide">
        <Eyebrow>Índice interno</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Propuestas</h1>
        <p className="mt-4 max-w-2xl text-ink-700">
          Cada propuesta vive en su propia URL para compartirla directo con el
          cliente. Esta página no se indexa en buscadores.
        </p>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {propuestas.map((propuesta) => (
            <li key={propuesta.slug}>
              <Link href={`/propuestas/${propuesta.slug}`} className="block">
                <Card interactive className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-500">
                      {propuesta.cliente}
                    </p>
                    <span className="rounded-full border border-ink-900/15 px-2.5 py-0.5 text-xs text-ink-500">
                      {ETIQUETA_ESTADO[propuesta.estado]}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight">
                    {propuesta.titulo}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {propuesta.resumen}
                  </p>
                  <p className="mt-6 text-xs text-ink-500">
                    {formatearFecha(propuesta.fecha)}
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
