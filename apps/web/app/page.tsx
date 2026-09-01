import Link from "next/link";
import { Card, Container, Eyebrow, Section } from "@qebooh/ui";
import { listarPropuestas } from "@/content/propuestas";

export default function Home() {
  const propuestas = listarPropuestas();

  return (
    <>
      <Section tone="ink" className="pt-24 md:pt-32">
        <Container width="wide">
          <Eyebrow>Publicidad exterior</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight md:text-display">
            Espacio físico, resultado medible.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-300">
            Este es el espacio de trabajo de QEB OOH: desde aquí publicamos las
            propuestas que ven nuestros clientes y las herramientas que usamos
            para armarlas.
          </p>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Propuestas</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Trabajo en curso
              </h2>
            </div>
            <Link
              href="/propuestas"
              className="shrink-0 text-sm font-medium text-ink-700 underline-offset-4 hover:text-ink-900 hover:underline"
            >
              Ver todas
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {propuestas.slice(0, 6).map((propuesta) => (
              <Link
                key={propuesta.slug}
                href={`/propuestas/${propuesta.slug}`}
                className="block"
              >
                <Card interactive className="h-full">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-500">
                    {propuesta.cliente}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {propuesta.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {propuesta.resumen}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
