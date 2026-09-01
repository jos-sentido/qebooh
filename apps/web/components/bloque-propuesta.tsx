import { Card, Container, Eyebrow, Section, Stat } from "@qebooh/ui";
import type { Bloque } from "@/content/tipos";

/**
 * Renderiza un bloque de propuesta. El switch es exhaustivo: al añadir un tipo
 * nuevo en `content/tipos.ts`, TypeScript falla aquí hasta que se maneje.
 */
export function BloquePropuesta({
  bloque,
  indice,
}: {
  bloque: Bloque;
  indice: number;
}) {
  // Alternar el fondo da ritmo visual sin que haya que decidirlo por bloque.
  const tone = indice % 2 === 1 ? "dim" : "paper";

  switch (bloque.tipo) {
    case "texto":
      return (
        <Section tone={tone}>
          <Container>
            <h2 className="text-3xl font-bold tracking-tight">
              {bloque.titulo}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
              {bloque.cuerpo.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
          </Container>
        </Section>
      );

    case "lista":
      return (
        <Section tone={tone}>
          <Container width="wide">
            <h2 className="text-3xl font-bold tracking-tight">
              {bloque.titulo}
            </h2>
            {bloque.intro ? (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
                {bloque.intro}
              </p>
            ) : null}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {bloque.items.map((item) => (
                <Card key={item.titulo} className="h-full">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {item.descripcion}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      );

    case "cifras":
      return (
        <Section tone="ink">
          <Container width="wide">
            <Eyebrow>{bloque.titulo}</Eyebrow>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {bloque.cifras.map((cifra) => (
                <Stat
                  key={cifra.etiqueta}
                  value={cifra.valor}
                  label={cifra.etiqueta}
                  {...(cifra.nota ? { note: cifra.nota } : {})}
                />
              ))}
            </div>
          </Container>
        </Section>
      );

    case "inversion":
      return (
        <Section tone={tone}>
          <Container>
            <h2 className="text-3xl font-bold tracking-tight">
              {bloque.titulo}
            </h2>
            <dl className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {bloque.conceptos.map((concepto) => (
                <div
                  key={concepto.concepto}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <div>
                    <dt className="font-medium">{concepto.concepto}</dt>
                    <dd className="mt-1 text-sm text-ink-500">
                      {concepto.detalle}
                    </dd>
                  </div>
                  <dd className="shrink-0 font-mono text-sm tabular-nums">
                    {concepto.monto}
                  </dd>
                </div>
              ))}
              {bloque.total ? (
                <div className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-lg font-bold">Total</dt>
                  <dd className="shrink-0 font-mono text-lg font-bold tabular-nums">
                    {bloque.total}
                  </dd>
                </div>
              ) : null}
            </dl>
            {bloque.nota ? (
              <p className="mt-6 text-sm text-ink-500">{bloque.nota}</p>
            ) : null}
          </Container>
        </Section>
      );
  }
}
