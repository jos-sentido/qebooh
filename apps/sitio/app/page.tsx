import Image from "next/image";
import Link from "next/link";
import {
  Boton,
  Contenedor,
  Encabezado,
  Etiqueta,
  LlamadoFinal,
  Resplandor,
  Seccion,
} from "@/components/bloques";
import { Onda } from "@/components/onda";
import { Embudo, PanelDemo } from "@/components/visuales";
import { entradas } from "@/content/blog";
import { formatoFecha } from "@/lib/formato";

const DOLORES = [
  {
    antes: "Inventario repartido en hojas de cálculo",
    despues: "Una sola fuente de verdad, en vivo",
    texto:
      "Cada cara, con su código único, su plaza, su estatus y su ocupación por catorcena. Todo el equipo ve lo mismo al mismo tiempo.",
  },
  {
    antes: "Espacios vendidos dos veces",
    despues: "Conflictos detectados antes de venderse",
    texto:
      "QEB cruza cada propuesta contra el inventario reservado y avisa del empalme antes de que llegue al anunciante.",
  },
  {
    antes: "Artes que viajan por correo",
    despues: "Versiones bajo control",
    texto:
      "El Versionario registra qué creatividad va en cada cara, quién la aprobó y cuándo se instaló.",
  },
  {
    antes: "Catorcenas que no cuadran",
    despues: "Cierres sin fricción",
    texto:
      "La vigencia, la tarifa y la facturación se razonan en catorcenas, la unidad real del negocio OOH en México.",
  },
];

const MODULOS = [
  { t: "Inventario", d: "Alta masiva, bloqueos, disponibilidad por catorcena y mapa por plaza." },
  { t: "Solicitudes", d: "Cada necesidad del anunciante registrada, asignada y con estatus." },
  { t: "Propuestas", d: "Selección de inventario con tarifas, vigencias y versiones." },
  { t: "Campañas", d: "Reserva, órdenes de montaje, Versionario y testigos." },
  { t: "Reportes", d: "Ocupación, ventas cerradas y embudo comercial, sin armar Excel." },
  { t: "Integraciones", d: "Conexión vía API con tu ERP, facturación e instalación." },
];

const TERMINOS = [
  "Catorcenas",
  "Plazas",
  "Caras",
  "Flujo / Contraflujo",
  "Código único",
  "Parabuses",
  "Unipolares",
  "Puentes",
  "Boleros",
  "Mupis",
  "Digital",
  "Espectaculares",
];

export default function Inicio() {
  const blog = entradas().slice(0, 3);

  return (
    <>
      {/* Portada */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <Resplandor className="-top-60 opacity-50" />
        <Contenedor className="relative">
          <div className="max-w-4xl">
            <Etiqueta>Software de gestión OOH</Etiqueta>
            <h1 className="mt-6 text-[clamp(2.9rem,8vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-white">
              El sistema operativo de tu{" "}
              <span className="texto-degradado">publicidad exterior.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-texto-tenue md:text-xl">
              QEB conecta solicitud, propuesta y campaña en una sola plataforma:
              inventario en vivo, conflictos detectados antes de venderse y
              catorcenas que cuadran.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Boton href="/contacto">Agendar demo</Boton>
              <Boton href="/plataforma" variante="borde">
                Conocer la plataforma
              </Boton>
            </div>
          </div>

          <div className="relative mt-16 md:mt-24">
            {/* La onda asoma por detrás del panel: sólo se ven los pulsos
                hacia arriba, la línea base queda justo en el borde. */}
            <Onda
              animada
              className="absolute -top-14 right-10 hidden h-28 w-[26rem] md:block"
            />
            <PanelDemo className="relative z-10" />
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-texto-tenue/70">
              Ilustración con datos de ejemplo
            </p>
          </div>
        </Contenedor>
      </section>

      {/* Del caos al control */}
      <Seccion>
        <Contenedor>
          <Encabezado
            etiqueta="Del caos al control"
            titulo="La operación OOH no cabe en un Excel."
            bajada="Comercial, tráfico y administración trabajan sobre el mismo inventario. Cuando cada área tiene su propia versión, aparecen los empalmes, los descuadres y los cierres lentos."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-linea bg-linea md:grid-cols-2">
            {DOLORES.map((d) => (
              <div key={d.antes} className="bg-negro p-8 md:p-10">
                <p className="text-sm text-texto-tenue line-through decoration-magenta-marca/70">
                  {d.antes}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  {d.despues}
                </h3>
                <p className="mt-4 leading-relaxed text-texto-tenue">{d.texto}</p>
              </div>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      {/* Flujo */}
      <Seccion tono="tinta">
        <Contenedor>
          <Encabezado
            etiqueta="Un solo flujo"
            titulo={
              <>
                De la solicitud <span className="texto-degradado">a la campaña.</span>
              </>
            }
            bajada="Cada venta recorre el mismo camino y deja rastro. Sólo las campañas cerradas cuentan como venta; lo demás es pipeline, y se ve como tal."
          />
          <div className="mt-16">
            <Embudo />
          </div>
        </Contenedor>
      </Seccion>

      {/* Módulos */}
      <Seccion>
        <Contenedor>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Encabezado
              etiqueta="Plataforma"
              titulo="Todo en un solo lugar."
              bajada="Módulos que comparten el mismo inventario y los mismos datos, del primer contacto a la evidencia de instalación."
            />
            <Boton href="/plataforma" variante="borde" className="shrink-0">
              Ver todos los módulos
            </Boton>
          </div>
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULOS.map((m, i) => (
              <li
                key={m.t}
                className="group rounded-3xl border border-linea bg-tinta p-7 transition-colors hover:border-magenta-marca"
              >
                <span className="font-mono text-xs text-texto-tenue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-2xl font-semibold text-white">{m.t}</h3>
                <p className="mt-2 leading-relaxed text-texto-tenue">{m.d}</p>
              </li>
            ))}
          </ul>
        </Contenedor>
      </Seccion>

      {/* Hecho para OOH en México */}
      <Seccion tono="tinta" className="overflow-hidden">
        <Contenedor className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Encabezado
              etiqueta="Hecho en México, para OOH"
              titulo="Habla el idioma de tu operación."
              bajada="QEB no es un CRM adaptado. Nació en la operación de publicidad exterior y se configura con tu nomenclatura, tus catálogos y tus reglas comerciales."
            />
            <p className="mt-6 leading-relaxed text-texto-tenue">
              La personalización es parte del servicio: implementamos QEB sobre
              tu forma de trabajar, no al revés.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5" aria-label="Conceptos que QEB maneja de origen">
            {TERMINOS.map((t, i) => (
              <li
                key={t}
                className={
                  i % 5 === 0
                    ? "rounded-full degradado-marca px-5 py-2.5 font-display text-lg font-semibold text-white"
                    : "rounded-full border border-linea px-5 py-2.5 font-display text-lg font-medium text-texto"
                }
              >
                {t}
              </li>
            ))}
          </ul>
        </Contenedor>
      </Seccion>

      {/* Soluciones complementarias */}
      <Seccion>
        <Contenedor>
          <Encabezado
            etiqueta="Más allá del inventario"
            titulo="Datos de audiencia para vender mejor."
            bajada="Dos soluciones que complementan la plataforma con información de comportamiento real de las personas."
          />
          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            {[
              {
                href: "/geo-behavior-indoor",
                titulo: "Geo Behavior Indoor",
                texto:
                  "Conteo de personas, zonas de alto y bajo flujo, tiempos de estancia y frecuencia de visita en espacios cerrados.",
                pulsos: [8, 16, 26, 16, 8],
              },
              {
                href: "/wifi-inteligente",
                titulo: "WiFi Inteligente",
                texto:
                  "Tu red WiFi como fuente de analítica: tráfico por zona, visitantes recurrentes, audiencias y ofertas en tiempo real.",
                pulsos: [12, 20, 12, 24, 14],
              },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative overflow-hidden rounded-3xl border border-linea bg-tinta p-8 transition-colors hover:border-magenta-marca md:p-12"
              >
                <Onda
                  className="absolute -right-4 top-8 h-20 w-64 opacity-60 transition-opacity group-hover:opacity-100"
                  pulsos={s.pulsos}
                  cola={30}
                />
                <h3 className="mt-20 text-3xl font-bold text-white md:text-4xl">
                  {s.titulo}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-texto-tenue">
                  {s.texto}
                </p>
                <p className="mt-8 text-sm font-semibold text-rosa">
                  Conocer más <span aria-hidden>→</span>
                </p>
              </Link>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      {/* Blog */}
      <Seccion tono="tinta">
        <Contenedor>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Encabezado etiqueta="Blog" titulo="Ideas sobre la operación OOH." />
            <Boton href="/blog" variante="borde" className="shrink-0">
              Ir al blog
            </Boton>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {blog.map((e) => (
              <li key={e.slug}>
                <Link href={`/blog/${e.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-linea">
                    <Image
                      src={e.imagen}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 font-mono text-xs text-texto-tenue">
                    {formatoFecha(e.fecha)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-white group-hover:text-rosa">
                    {e.titulo}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </Contenedor>
      </Seccion>

      <div className="pt-20 md:pt-28">
        <LlamadoFinal />
      </div>
    </>
  );
}
