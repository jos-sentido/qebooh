import { Card, Container, Eyebrow, Section } from "@qebooh/ui";
import { CONFIG, SECCIONES } from "@/lib/secciones";

/**
 * Hub del dominio principal. En cada subdominio esta página no se ve: ahí la
 * raíz es el índice de la sección, y el middleware la reescribe.
 *
 * Sirve sobre todo en local y en previews de Vercel, donde no hay subdominios
 * y se navega por prefijo de ruta.
 */
export default function Hub() {
  return (
    <Section className="pt-24 md:pt-32">
      <Container width="wide">
        <Eyebrow>Publicidad exterior</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-titulo md:text-display">
          Espacio de trabajo de QEB.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-texto-tenue">
          Cada sección se publica en su propio subdominio y tiene su índice
          protegido con clave.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {SECCIONES.map((seccion) => {
            const config = CONFIG[seccion];
            return (
              <a key={seccion} href={`/${seccion}`} className="block">
                <Card interactive className="h-full">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-cian">
                    {config.host}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight">
                    {config.nombre}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-texto-tenue">
                    {config.descripcion}
                  </p>
                </Card>
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
