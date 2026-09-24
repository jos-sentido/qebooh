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
import { PanelWifi } from "@/components/visuales";

export const metadata: Metadata = {
  title: "WiFi Inteligente",
  description:
    "WiFi en puntos abiertos con analítica de visitantes: tráfico por zona, ratio de repetición, audiencias segmentadas y marketing de proximidad.",
  alternates: { canonical: "/wifi-inteligente" },
};

export default function Wifi() {
  return (
    <>
      <Portada
        etiqueta="WiFi Inteligente"
        titulo={
          <>
            Tu red WiFi,{" "}
            <span className="texto-degradado">convertida en audiencia.</span>
          </>
        }
        bajada="Navegación gratuita para tus visitantes y, para ti, información sobre el tráfico y el comportamiento de quienes visitan tu negocio, con publicidad relevante en el momento preciso."
      >
        <div className="mt-10">
          <Boton href="/contacto?interes=wifi">Solicitar información</Boton>
        </div>
      </Portada>

      <Seccion tono="tinta">
        <Contenedor className="grid items-center gap-14 lg:grid-cols-2">
          <div className="lg:order-2">
            <Encabezado
              etiqueta="Analítica WiFi"
              titulo="Entiende quién llega, cuándo y si regresa."
              bajada="El tablero de analítica muestra el tráfico por zonas, el ratio de repetición de tus visitantes y el flujo de movimientos dentro del lugar."
            />
            <div className="mt-8">
              <ListaMarca
                items={[
                  "Tráfico de visitantes por zona y por hora.",
                  "Visitantes nuevos contra recurrentes.",
                  "Flujo de movimientos para segmentar audiencias.",
                ]}
              />
            </div>
          </div>
          <div className="lg:order-1">
            <PanelWifi />
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-texto-tenue/70">
              Ilustración con datos de ejemplo
            </p>
          </div>
        </Contenedor>
      </Seccion>

      <Seccion>
        <Contenedor>
          <Encabezado
            etiqueta="Qué puedes hacer"
            titulo="Del dato a la venta."
            bajada="Segmenta a tus visitantes por comportamiento y comunícate con cada grupo en el momento adecuado."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Tarjeta indice="01" titulo="Audiencias personalizadas">
              Crea audiencias según comportamiento y preferencias para que cada
              mensaje llegue a quien le interesa.
            </Tarjeta>
            <Tarjeta indice="02" titulo="Gestión dinámica">
              Administra y programa contenido publicitario en tiempo real desde
              un solo panel.
            </Tarjeta>
            <Tarjeta indice="03" titulo="Marketing de proximidad">
              Envía ofertas en tiempo real a quien está en tu espacio, justo
              cuando puede actuar.
            </Tarjeta>
          </div>
        </Contenedor>
      </Seccion>

      <div className="pt-4">
        <LlamadoFinal
          titulo="Haz que tu WiFi trabaje para tu negocio."
          bajada="Te contamos cómo se implementa en tus puntos y qué información vas a tener desde el primer día."
        />
      </div>
    </>
  );
}
