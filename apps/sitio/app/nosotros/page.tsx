import type { Metadata } from "next";
import {
  Contenedor,
  Encabezado,
  LlamadoFinal,
  Portada,
  Seccion,
  Tarjeta,
} from "@/components/bloques";
import { Onda } from "@/components/onda";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "QEB es una empresa mexicana que sistematiza la operación de la publicidad exterior con software propio.",
  alternates: { canonical: "/nosotros" },
};

export default function Nosotros() {
  return (
    <>
      <Portada
        etiqueta="Nosotros"
        titulo={
          <>
            Sistematizamos la{" "}
            <span className="texto-degradado">publicidad exterior.</span>
          </>
        }
        bajada="QEB es una empresa mexicana que desarrolla software para empresas OOH. Convertimos procesos manuales en un sistema que registra la operación en tiempo real y la vuelve información útil para vender mejor."
      />

      <Seccion tono="tinta">
        <Contenedor className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative flex h-full min-h-64 items-center justify-center overflow-hidden rounded-3xl border border-linea bg-negro p-10">
            <Onda animada className="h-40 w-full max-w-md" />
          </div>
          <div>
            <Encabezado
              etiqueta="Qué hacemos"
              titulo="De la solicitud del cliente a la campaña en la calle."
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-texto-tenue">
              <p>
                Ayudamos a las empresas OOH a simplificar sus procesos: ordenar
                su inventario, controlar el flujo comercial y tener información
                al momento sobre el comportamiento de sus campañas.
              </p>
              <p>
                QEB es producto propio. Lo construimos y lo operamos nosotros,
                y lo adaptamos a la forma de trabajar de cada cliente. Por eso
                la implementación y el acompañamiento son parte del servicio,
                no un extra.
              </p>
            </div>
          </div>
        </Contenedor>
      </Seccion>

      <Seccion>
        <Contenedor>
          <Encabezado etiqueta="Cómo trabajamos" titulo="Tres principios." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Tarjeta indice="01" titulo="Entender la operación">
              Hablamos de catorcenas, caras y plazas porque así funciona el
              negocio. Primero entendemos tu operación; después configuramos.
            </Tarjeta>
            <Tarjeta indice="02" titulo="Datos que cuadran">
              Una sola fuente de verdad para comercial, operación y
              administración. Si dos vistas no coinciden, se revisa hasta
              encontrar por qué.
            </Tarjeta>
            <Tarjeta indice="03" titulo="Mejora continua">
              La plataforma evoluciona con cada versión. Lo que sirve a todos
              entra al producto; lo tuyo se queda en tu configuración.
            </Tarjeta>
          </div>
        </Contenedor>
      </Seccion>

      <LlamadoFinal />
    </>
  );
}
