import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Boton,
  Contenedor,
  Encabezado,
  Etiqueta,
  ListaMarca,
  LlamadoFinal,
  Portada,
  Seccion,
  Tarjeta,
} from "@/components/bloques";
import {
  DiagramaConexion,
  NavSistemas,
  OtroSistema,
} from "@/components/sistemas";
import {
  HistorialVariaciones,
  MapaOcupacion,
  ObjetivosAsesores,
  PanelInteligencia,
} from "@/components/visuales";
import { SISTEMAS } from "@/lib/sistemas";

const S = SISTEMAS.inteligencia;

export const metadata: Metadata = {
  title: S.nombre,
  description:
    "QEB Inteligencia: inteligencia de negocio y planificación estratégica para OOH. Ventas contra presupuesto, embudo, variaciones, objetivos por asesor y ocupación, conectados en tiempo real a la operación.",
  alternates: { canonical: S.href },
};

const PREGUNTAS_NEGOCIO = [
  {
    t: "¿Cuánto vendimos de verdad?",
    d: "Venta neta por semana, catorcena y mes —ventas menos cancelaciones—, contra el presupuesto y contra el mismo periodo del año anterior.",
  },
  {
    t: "¿Dónde se nos cae la venta?",
    d: "Embudo de solicitud a propuesta a campaña, con la conversión de cada paso y los días que tarda cada transición.",
  },
  {
    t: "¿Quién vende y a quién?",
    d: "Ranking de asesores y de clientes por monto cerrado, número de campañas y ticket promedio.",
  },
];

const DETALLE: {
  etiqueta: string;
  titulo: string;
  texto: string;
  puntos: string[];
  visual: ReactNode;
}[] = [
  {
    etiqueta: "Objetivos",
    titulo: "La meta, repartida y a la vista.",
    texto:
      "Se captura la meta de cada mes y el total del año se calcula solo. Después se reparte entre asesores —por porcentaje o por monto— y por mes o catorcena. El avance se actualiza con cada campaña cerrada.",
    puntos: [
      "Meta mensual y anual en un solo lugar.",
      "Reparto por asesor que siempre cuadra con el total.",
      "Avance y brecha por asesor, en todas las vistas.",
    ],
    visual: <ObjetivosAsesores />,
  },
  {
    etiqueta: "Variaciones e impacto",
    titulo: "Cada cambio a una venta, explicado.",
    texto:
      "Cuando se editan caras o tarifas de una campaña ya vendida, queda registrado quién, cuándo y cuánto movió la inversión. Se acabó preguntar por qué la cifra de hoy no es la de ayer.",
    puntos: [
      "Historial de ediciones con antes y después.",
      "Alzas, bajas y variación neta por periodo.",
      "Filtros por asesor, cliente, plaza y tipo de cambio.",
    ],
    visual: <HistorialVariaciones />,
  },
  {
    etiqueta: "Ocupación estratégica",
    titulo: "Dónde se vende y dónde se queda vacío.",
    texto:
      "Ocupación por plaza, zona y tipo de mueble, con el ingreso que genera y las caras que se subutilizan. Es la base para planear precios, paquetes y qué inventario empujar.",
    puntos: [
      "Ocupación global: catorcenas vendidas sobre disponibles.",
      "Venta y ocupación por zona, plaza y mueble.",
      "Mapa de inventario por catorcena para detectar huecos.",
    ],
    visual: <MapaOcupacion />,
  },
];

export default function Inteligencia() {
  return (
    <>
      <Portada
        etiqueta={`${S.nombre} · Nuevo`}
        orbe={S.nombre}
        titulo={
          <>
            Deja de reportar.{" "}
            <span className="texto-degradado">Empieza a decidir.</span>
          </>
        }
        bajada="Inteligencia de negocio y planificación estratégica para OOH, conectada en tiempo real a la operación. Las cifras salen de lo que tu equipo ya registra: nadie arma un Excel a fin de mes."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Boton href="/contacto?interes=inteligencia">Agendar demo</Boton>
          <Boton href="#modulos" variante="borde">
            Ver módulos
          </Boton>
        </div>
      </Portada>

      <NavSistemas actual="inteligencia" />

      <Seccion>
        <Contenedor>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Encabezado
              etiqueta="Ventas"
              titulo="Una sola cifra de venta para todos."
              bajada="Sólo las campañas cerradas cuentan como venta. El pipeline se ve aparte, en el embudo. Así dirección, comercial y administración hablan del mismo número."
            />
            <div>
              <PanelInteligencia />
              <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-texto-tenue/70">
                Ilustración con datos de ejemplo
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {PREGUNTAS_NEGOCIO.map((p) => (
              <Tarjeta key={p.t} titulo={p.t}>
                {p.d}
              </Tarjeta>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      <Seccion id="modulos" tono="tinta">
        <Contenedor className="space-y-28 md:space-y-40">
          {DETALLE.map((m, i) => (
            <div
              key={m.etiqueta}
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <Etiqueta>{m.etiqueta}</Etiqueta>
                <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-5xl">
                  {m.titulo}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-texto-tenue">
                  {m.texto}
                </p>
                <div className="mt-8">
                  <ListaMarca items={m.puntos} />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                {m.visual}
              </div>
            </div>
          ))}
        </Contenedor>
      </Seccion>

      <Seccion id="conexion">
        <Contenedor>
          <Encabezado
            etiqueta="Conectado con QEB Operación"
            titulo="No es un reporte aparte. Es la misma operación."
            bajada="QEB Inteligencia no importa archivos: lee en tiempo real lo que pasa en QEB Operación. Y lo que aquí se planea regresa a quien vende y opera."
          />
          <div className="mt-14">
            <DiagramaConexion resaltar="inteligencia" />
          </div>
        </Contenedor>
      </Seccion>

      <Seccion tono="tinta">
        <Contenedor className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Encabezado
            etiqueta="Planificación estratégica"
            titulo="De mirar atrás a planear adelante."
          />
          <ListaMarca
            items={[
              "Metas que se revisan contra la venta real cada semana, no al cierre del año.",
              "Comparación contra el año anterior para leer la temporada.",
              "Ocupación por zona para decidir precios, paquetes y expansión.",
              "Filtros por semana, catorcena, mes, plaza, formato, mueble, cliente y asesor.",
            ]}
          />
        </Contenedor>
      </Seccion>

      <Seccion className="pb-0 md:pb-0">
        <Contenedor>
          <OtroSistema desde="inteligencia" />
        </Contenedor>
      </Seccion>

      <div className="pt-20 md:pt-28">
        <LlamadoFinal
          titulo="Tu negocio OOH, en tiempo real."
          bajada="Te mostramos QEB Inteligencia con un recorrido por indicadores como los de tu operación."
        />
      </div>
    </>
  );
}
