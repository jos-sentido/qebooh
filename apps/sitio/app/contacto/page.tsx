import type { Metadata } from "next";
import { Contenedor, Etiqueta, Resplandor } from "@/components/bloques";
import { BarraTitulo, Cruces, IconoCirculo } from "@/components/graficos";
import { AGENDA_URL, CORREO_CONTACTO } from "@/lib/sitio";
import { Formulario } from "./formulario";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una demo de QEB en el horario que te acomode, o escríbenos para pedir información.",
  alternates: { canonical: "/contacto" },
};

/**
 * Dos caminos: la demo se agenda directo en el calendario (GHL) y el
 * formulario queda para pedir información. No mezclar: el formulario ya no
 * es la vía para agendar.
 */
export default async function Contacto({
  searchParams,
}: {
  searchParams: Promise<{ interes?: string }>;
}) {
  const { interes } = await searchParams;
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <Resplandor />
      <Contenedor className="relative">
        <Etiqueta>Contacto</Etiqueta>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[0.98] text-white md:text-6xl">
          Hablemos de tu <span className="texto-degradado">operación.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-texto-tenue md:text-xl">
          Si quieres ver QEB funcionando, agenda una demo. Si tienes una
          pregunta, escríbenos y te respondemos.
        </p>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Camino 1: la demo, directo a la agenda. */}
          <div className="relative overflow-hidden rounded-[2rem] vidrio-iridiscente p-8 md:p-10 lg:sticky lg:top-28">
            <Cruces className="absolute inset-0 h-full w-full opacity-30" paso={96} />
            <div className="relative">
              <BarraTitulo>Agenda una demo</BarraTitulo>
              <h2 className="mt-6 text-3xl font-extrabold leading-[1.02] text-white md:text-4xl">
                Te mostramos QEB en 1 llamada.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                Elige el día y la hora que te acomoden. La confirmación te
                llega por correo.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Recorrido guiado por QEB Operación y QEB Inteligencia.",
                  "Revisamos tu inventario, tus plazas y tu flujo comercial.",
                  "Te proponemos un plan de implementación por etapas.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-base leading-relaxed text-white">
                    <span aria-hidden className="mt-2.5 h-1.5 w-4 shrink-0 bg-white" />
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex h-14 items-center gap-3 whitespace-nowrap rounded-full bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-grafito transition hover:bg-white/90 sm:px-8 sm:text-sm sm:tracking-[0.14em]"
              >
                Ver horarios disponibles
              </a>
              <p className="mt-3 text-xs text-white/75">Se abre en una pestaña nueva.</p>
            </div>
          </div>

          {/* Camino 2: pedir información. */}
          <div className="rounded-[2rem] border border-linea bg-tinta p-6 md:p-10">
            <div className="flex items-center gap-4">
              <IconoCirculo tipo="propuesta" />
              <div>
                <h2 className="text-2xl font-extrabold leading-tight text-white md:text-3xl">
                  Pide información
                </h2>
                <p className="mt-1 text-texto-tenue">
                  Precios, alcance, integraciones o cualquier duda.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Formulario interesInicial={interes} />
            </div>
            <p className="mt-8 border-t border-linea pt-6 text-sm text-texto-tenue">
              ¿Prefieres el correo?{" "}
              <a href={`mailto:${CORREO_CONTACTO}`} className="font-semibold text-rosa hover:text-white">
                {CORREO_CONTACTO}
              </a>
            </p>
          </div>
        </div>

      </Contenedor>
    </section>
  );
}
