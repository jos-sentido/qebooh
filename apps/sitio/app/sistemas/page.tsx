import type { Metadata } from "next";
import {
  Boton,
  Contenedor,
  Encabezado,
  LlamadoFinal,
  Portada,
  Seccion,
  Tarjeta,
} from "@/components/bloques";
import { DiagramaConexion, NavSistemas } from "@/components/sistemas";

export const metadata: Metadata = {
  title: "Sistemas",
  description:
    "QEB es gestión de negocio OOH: QEB Operación para el día a día y QEB Inteligencia para el análisis y la planificación, conectados en tiempo real.",
  alternates: { canonical: "/sistemas" },
};

export default function Sistemas() {
  return (
    <>
      <Portada
        etiqueta="Gestión de negocio OOH"
        orbe="Sistemas QEB"
        titulo={
          <>
            Operar tu negocio y entenderlo,{" "}
            <span className="texto-degradado">en el mismo lugar.</span>
          </>
        }
        bajada="QEB ya no es sólo gestión de inventario. Son dos sistemas conectados: uno opera la venta y la calle; el otro convierte esa operación, en tiempo real, en decisiones de negocio."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Boton href="/sistemas/operacion">QEB Operación</Boton>
          <Boton href="/sistemas/inteligencia" variante="borde">
            QEB Inteligencia
          </Boton>
        </div>
      </Portada>

      <NavSistemas actual="general" />

      <Seccion>
        <Contenedor>
          <Encabezado
            etiqueta="Cómo se conectan"
            titulo="Dos sistemas, un solo dato."
            bajada="Lo que se registra al operar alimenta el análisis sin recapturar nada. Y lo que se decide al analizar regresa a quien vende."
          />
          <div className="mt-14">
            <DiagramaConexion />
          </div>
        </Contenedor>
      </Seccion>

      <Seccion tono="tinta">
        <Contenedor>
          <Encabezado etiqueta="Por qué conectados" titulo="Lo que cambia." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Tarjeta indice="01" titulo="Una sola verdad">
              Comercial, operación, administración y dirección leen las mismas
              cifras, porque salen del mismo registro.
            </Tarjeta>
            <Tarjeta indice="02" titulo="Al momento">
              La venta de hoy aparece hoy en el análisis. No hay que esperar al
              cierre para saber cómo va el mes.
            </Tarjeta>
            <Tarjeta indice="03" titulo="Venta es venta">
              Sólo las campañas cerradas cuentan como venta; solicitudes y
              propuestas se ven como lo que son: pipeline.
            </Tarjeta>
          </div>
        </Contenedor>
      </Seccion>

      <LlamadoFinal />
    </>
  );
}
