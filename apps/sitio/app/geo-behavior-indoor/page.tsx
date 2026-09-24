import type { Metadata } from "next";
import {
  Boton,
  Contenedor,
  Encabezado,
  ListaMarca,
  LlamadoFinal,
  Portada,
  Seccion,
  Tarjeta,
} from "@/components/bloques";
import { MapaAfluencia } from "@/components/visuales";

export const metadata: Metadata = {
  title: "Geo Behavior Indoor",
  description:
    "Métricas de afluencia y movilidad en espacios cerrados: conteo de personas, zonas de alto y bajo flujo, tiempos de estancia y frecuencia de visita.",
  alternates: { canonical: "/geo-behavior-indoor" },
};

const CAPACIDADES = [
  {
    t: "Conteo de personas",
    d: "Medición de afluencia mediante la detección de smartphones en el espacio, con datos al momento sobre cuántas personas entran y circulan.",
  },
  {
    t: "Conductas de movilidad",
    d: "Cómo se mueven los visitantes dentro del lugar: recorridos, puntos de paso y zonas que se evitan.",
  },
  {
    t: "Tiempos de estancia",
    d: "Cuánto tiempo pasan las personas en el sitio y en cada zona específica.",
  },
  {
    t: "Estadísticas de visita",
    d: "Frecuencia de visitas por periodo para planear campañas con base en el comportamiento real.",
  },
];

export default function GeoBehavior() {
  return (
    <>
      <Portada
        etiqueta="Geo Behavior Indoor"
        titulo={
          <>
            Lo que pasa dentro de tus espacios,{" "}
            <span className="texto-degradado">medido.</span>
          </>
        }
        bajada="Métricas de afluencia y movilidad en espacios cerrados —centros comerciales, aeropuertos, estaciones, tiendas— para valorar mejor cada ubicación y cada campaña."
      >
        <div className="mt-10">
          <Boton href="/contacto?interes=geo-behavior">Solicitar información</Boton>
        </div>
      </Portada>

      <Seccion tono="tinta">
        <Contenedor className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Encabezado
              etiqueta="Optimización de espacios"
              titulo="Alto, medio y bajo flujo, zona por zona."
              bajada="Identifica dónde se concentra la gente para ubicar la publicidad donde realmente se ve y justificar su valor ante el anunciante."
            />
            <div className="mt-8">
              <ListaMarca
                items={[
                  "Ubicaciones con mayor exposición dentro del inmueble.",
                  "Horarios y días de mayor afluencia.",
                  "Argumentos con datos para tarifas y paquetes.",
                ]}
              />
            </div>
          </div>
          <div>
            <MapaAfluencia />
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-texto-tenue/70">
              Ilustración con datos de ejemplo
            </p>
          </div>
        </Contenedor>
      </Seccion>

      <Seccion>
        <Contenedor>
          <Encabezado
            etiqueta="Qué mide"
            titulo="Cuatro lecturas del comportamiento."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {CAPACIDADES.map((c, i) => (
              <Tarjeta key={c.t} indice={String(i + 1).padStart(2, "0")} titulo={c.t}>
                {c.d}
              </Tarjeta>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      <Seccion tono="tinta">
        <Contenedor>
          <Encabezado
            centrado
            etiqueta="Para quién"
            titulo="Para quien vende y para quien opera el espacio."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
            <Tarjeta titulo="Comercializadoras OOH">
              Datos de audiencia para respaldar la tarifa de cada ubicación
              indoor.
            </Tarjeta>
            <Tarjeta titulo="Administradores de inmuebles">
              Entender el uso real del espacio para redistribuir zonas y locales.
            </Tarjeta>
            <Tarjeta titulo="Marcas y anunciantes">
              Planear campañas según la frecuencia y los tiempos de visita.
            </Tarjeta>
          </div>
        </Contenedor>
      </Seccion>

      <div className="pt-20 md:pt-28">
        <LlamadoFinal
          titulo="Conoce el flujo real de tus espacios."
          bajada="Cuéntanos qué inmueble quieres medir y te explicamos cómo se instala y qué información obtienes."
        />
      </div>
    </>
  );
}
