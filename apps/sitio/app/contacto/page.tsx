import type { Metadata } from "next";
import { Contenedor, Etiqueta, ListaMarca, Resplandor } from "@/components/bloques";
import { CORREO_CONTACTO } from "@/lib/sitio";
import { Formulario } from "./formulario";

export const metadata: Metadata = {
  title: "Agendar demo",
  description:
    "Agenda una demo de QEB. Te mostramos la plataforma sobre un caso parecido a tu operación OOH.",
  alternates: { canonical: "/contacto" },
};

export default async function Contacto({
  searchParams,
}: {
  searchParams: Promise<{ interes?: string }>;
}) {
  const { interes } = await searchParams;
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Resplandor />
      <Contenedor className="relative grid gap-14 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <Etiqueta>Contacto</Etiqueta>
          <h1 className="mt-5 text-5xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl">
            Agenda una <span className="texto-degradado">demo.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-texto-tenue">
            Cuéntanos de tu operación y te mostramos QEB sobre un caso parecido
            al tuyo.
          </p>
          <div className="mt-10">
            <ListaMarca
              items={[
                "Recorrido guiado por la plataforma.",
                "Revisamos tu inventario, tus plazas y tu flujo comercial.",
                "Te proponemos un plan de implementación por etapas.",
              ]}
            />
          </div>
          <div className="mt-12 border-t border-linea pt-8">
            <p className="text-sm text-texto-tenue">¿Prefieres escribirnos?</p>
            <a
              href={`mailto:${CORREO_CONTACTO}`}
              className="mt-1 inline-block font-display text-2xl font-semibold text-white hover:text-rosa"
            >
              {CORREO_CONTACTO}
            </a>
          </div>
        </div>
        <Formulario interesInicial={interes} />
      </Contenedor>
    </section>
  );
}
