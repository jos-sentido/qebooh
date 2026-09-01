import { Card, Container, Eyebrow, Section, Stat } from "@qebooh/ui";
import type { Bloque } from "@/content/tipos";

/**
 * Tono de fondo según la posición vertical de la sección en la página, contando
 * el hero como posición 0. Alternar da ritmo visual sin decidirlo sección por
 * sección, y evita que dos bandas del mismo tono queden pegadas: seguidas se
 * leen como una sola con un hueco raro en medio.
 *
 * Los bloques empiezan en la posición 1 (`indice + 1`) y el cierre va en
 * `bloques.length + 1`.
 */
export function tonoAlterno(posicion: number): "fondo" | "superficie" {
  return posicion % 2 === 1 ? "superficie" : "fondo";
}

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
  const tone = tonoAlterno(indice + 1);

  switch (bloque.tipo) {
    case "texto":
      return (
        <Section tone={tone}>
          <Container>
            <h2 className="text-3xl font-bold tracking-tight text-titulo">
              {bloque.titulo}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed">
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
            <h2 className="text-3xl font-bold tracking-tight text-titulo">
              {bloque.titulo}
            </h2>
            {bloque.intro ? (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-tenue">
                {bloque.intro}
              </p>
            ) : null}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {bloque.items.map((item) => (
                <Card
                  key={item.titulo}
                  className={tone === "superficie" ? "h-full bg-fondo" : "h-full"}
                >
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-texto-tenue">
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
        <Section tone="marca">
          <Container width="wide">
            <Eyebrow className="text-white/70">{bloque.titulo}</Eyebrow>
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
            <h2 className="text-3xl font-bold tracking-tight text-titulo">
              {bloque.titulo}
            </h2>
            <dl className="mt-10 divide-y divide-borde border-y border-borde">
              {bloque.conceptos.map((concepto) => (
                <div
                  key={concepto.concepto}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <div>
                    <dt className="font-medium">{concepto.concepto}</dt>
                    <dd className="mt-1 text-sm text-texto-tenue">
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
              <p className="mt-6 text-sm text-texto-tenue">{bloque.nota}</p>
            ) : null}
          </Container>
        </Section>
      );
  }
}
