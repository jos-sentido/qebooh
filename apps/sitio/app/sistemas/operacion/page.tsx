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
} from "@/components/bloques";
import {
  DiagramaConexion,
  NavSistemas,
  OtroSistema,
} from "@/components/sistemas";
import {
  Embudo,
  PanelDemo,
  TiraCatorcenas,
  Versionario,
} from "@/components/visuales";
import { SISTEMAS } from "@/lib/sistemas";

const S = SISTEMAS.operacion;

export const metadata: Metadata = {
  title: S.nombre,
  description:
    "QEB Operación, el sistema operativo OOH: inventario en vivo, solicitudes, propuestas, campañas, Versionario, catorcenas e integraciones vía API.",
  alternates: { canonical: S.href },
};

const DETALLE: {
  etiqueta: string;
  titulo: string;
  texto: string;
  puntos: string[];
  visual: ReactNode;
}[] = [
  {
    etiqueta: "Inventario",
    titulo: "Cada cara, en vivo y sin empalmes.",
    texto:
      "El inventario es el centro de QEB. Cada cara tiene un código único, su plaza, formato, dimensiones y sentido de circulación, y su ocupación se lee por catorcena.",
    puntos: [
      "Carga masiva desde tus archivos actuales, con normalización de códigos.",
      "Disponibilidad y ocupación por catorcena, plaza, mueble y tipo.",
      "Bloqueos y detección de conflictos antes de comprometer una cara.",
      "Mapa de inventario y filtros por nivel socioeconómico y puntos de interés.",
    ],
    visual: <TiraCatorcenas />,
  },
  {
    etiqueta: "Campañas y Versionario",
    titulo: "Qué arte va en cada cara, siempre claro.",
    texto:
      "Cuando una propuesta se cierra se vuelve campaña: se reserva el inventario y arranca la operación. El Versionario lleva el control de la creatividad cara por cara.",
    puntos: [
      "Órdenes de montaje generadas desde la campaña.",
      "Versiones de arte por cara, con estatus de aprobación e instalación.",
      "Vista por catorcena para planear cambios de versión.",
      "Envío de testigos y seguimiento posventa al anunciante.",
    ],
    visual: <Versionario />,
  },
  {
    etiqueta: "Dashboard operativo",
    titulo: "El estado de tu inventario, hoy.",
    texto:
      "Disponible, reservado, vendido y bloqueado, por catorcena, plaza y mueble. Lo que el equipo necesita para operar el día; el análisis de negocio vive en QEB Inteligencia, con los mismos datos.",
    puntos: [
      "Resumen de inventario por estatus en la catorcena vigente.",
      "Distribución por mueble, tipo, municipio y nivel socioeconómico.",
      "Mapa de inventario por plaza.",
      "Exportación a CSV en cada vista.",
    ],
    visual: <PanelDemo />,
  },
];

const PREGUNTAS = [
  {
    p: "¿Para quién es QEB?",
    r: "Para empresas que comercializan y operan inventario de publicidad exterior: parabuses, unipolares, puentes, boleros, mupis, pantallas digitales y espectaculares. QEB es la herramienta con la que esas empresas atienden a sus anunciantes.",
  },
  {
    p: "¿Tengo que cambiar mi forma de trabajar?",
    r: "No. La implementación incluye configurar QEB con tu nomenclatura, tus catálogos y tus reglas comerciales. La personalización es parte del servicio.",
  },
  {
    p: "¿Cómo migramos nuestro inventario actual?",
    r: "Con carga masiva desde tus archivos. Antes de cruzar datos normalizamos los códigos (espacios, mayúsculas) para que no aparezcan duplicados ni faltantes falsos.",
  },
  {
    p: "¿Por qué trabajan en catorcenas?",
    r: "Porque es la unidad real de vigencia y tarifa en la publicidad exterior en México. Razonar en meses o en días sueltos es lo que provoca descuadres en la facturación.",
  },
  {
    p: "¿Se integra con nuestro ERP?",
    r: "Sí. QEB se integra vía API con software externo del cliente —ERP, facturación, sistemas de instalación—. El alcance de cada integración se define en la implementación.",
  },
  {
    p: "¿Cómo empiezo?",
    r: "Agenda una demo. Te mostramos la plataforma sobre un caso parecido al tuyo y te proponemos un plan de implementación por etapas.",
  },
];

export default function Operacion() {
  return (
    <>
      <Portada
        etiqueta={`${S.nombre} · ${S.categoria}`}
        orbe={S.nombre}
        titulo={
          <>
            Tu operación OOH,{" "}
            <span className="texto-degradado">de punta a punta.</span>
          </>
        }
        bajada="Comercial, tráfico y administración sobre el mismo inventario. QEB Operación reemplaza las hojas de cálculo y los correos con un flujo que deja rastro en cada paso."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Boton href="/contacto">Agendar demo</Boton>
          <Boton href="#modulos" variante="borde">
            Ver módulos
          </Boton>
        </div>
      </Portada>

      <NavSistemas actual="operacion" />

      <Seccion>
        <Contenedor>
          <Encabezado
            etiqueta="El flujo central"
            titulo="Solicitud → Propuesta → Campaña."
            bajada="Tres etapas, un mismo registro. Cada propuesta sabe de qué solicitud viene y cada campaña de qué propuesta, con todas sus versiones."
          />
          <div className="mt-16">
            <Embudo />
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
            etiqueta="Conectado con QEB Inteligencia"
            titulo="Lo que operas, se vuelve análisis."
            bajada="Cada movimiento en QEB Operación alimenta a QEB Inteligencia en tiempo real. Y lo que ahí se decide —metas, zonas por empujar— regresa a la operación."
          />
          <div className="mt-14">
            <DiagramaConexion resaltar="operacion" />
          </div>
        </Contenedor>
      </Seccion>

      <Seccion tono="tinta">
        <Contenedor className="grid gap-14 lg:grid-cols-2">
          <Encabezado
            etiqueta="Implementación"
            titulo="Un producto propio que se adapta a ti."
            bajada="QEB tiene un núcleo común —flujo comercial, modelo de inventario, tarifas, vigencias y reportería— y una capa que se configura para cada cliente."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Núcleo",
                d: "Lo que comparte cualquier operación OOH. Evoluciona con cada versión y lo reciben todos los clientes.",
              },
              {
                t: "Tu configuración",
                d: "Catálogos, nomenclatura, reglas de negocio, reportes a medida e integraciones propias.",
              },
              {
                t: "Por etapas",
                d: "Arrancamos con inventario y flujo comercial, y sumamos operación, reportes e integraciones.",
              },
              {
                t: "Acompañamiento",
                d: "Soporte directo del equipo que construye la plataforma, no de un intermediario.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-linea bg-negro p-7">
                <h3 className="text-xl font-semibold text-white">{c.t}</h3>
                <p className="mt-2 leading-relaxed text-texto-tenue">{c.d}</p>
              </div>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      <Seccion id="integraciones">
        <Contenedor>
          <Encabezado
            centrado
            etiqueta="Integraciones"
            titulo="Se conecta con lo que ya usas."
            bajada="QEB Operación se integra vía API con el software de tu empresa. Así la venta cerrada llega a administración sin recaptura."
          />
          <ul className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["ERP", "Facturación", "Instalación y montaje", "Tus reportes"].map((t) => (
              <li
                key={t}
                className="flex h-24 items-center justify-center rounded-2xl border border-linea bg-tinta text-center font-display text-lg font-semibold text-white"
              >
                {t}
              </li>
            ))}
          </ul>
        </Contenedor>
      </Seccion>

      <Seccion id="preguntas" tono="tinta">
        <Contenedor angosto>
          <Encabezado etiqueta="Preguntas frecuentes" titulo="Lo que nos preguntan." />
          <div className="mt-12 divide-y divide-linea border-y border-linea">
            {PREGUNTAS.map((q) => (
              <details key={q.p} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {q.p}
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-linea text-rosa transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-texto-tenue">
                  {q.r}
                </p>
              </details>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      <Seccion className="pb-0 md:pb-0">
        <Contenedor>
          <OtroSistema desde="operacion" />
        </Contenedor>
      </Seccion>

      <div className="pt-20 md:pt-28">
        <LlamadoFinal />
      </div>
    </>
  );
}
