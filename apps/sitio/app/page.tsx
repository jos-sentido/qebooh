import Image from "next/image";
import Link from "next/link";
import {
  Boton,
  Contenedor,
  Encabezado,
  Etiqueta,
  ListaMarca,
  LlamadoFinal,
  Resplandor,
  Seccion,
} from "@/components/bloques";
import {
  BarraTitulo,
  IconoCirculo,
  LineaTopografica,
  type TipoIcono,
} from "@/components/graficos";
import { Onda } from "@/components/onda";
import { PanelDemo, PanelInteligencia } from "@/components/visuales";
import { entradas } from "@/content/blog";
import { formatoFecha } from "@/lib/formato";
import { LISTA_SISTEMAS, SISTEMAS } from "@/lib/sistemas";

/**
 * Una semana cualquiera en una empresa OOH. Cada escena es un dolor real
 * contado sin tecnicismos y termina en el sistema que lo resuelve. Sólo
 * QEB Operación e Inteligencia: Geo Behavior y WiFi son soluciones por
 * proyecto, fuera del foco comercial, y viven sólo en el menú.
 */
const ESCENAS = [
  {
    icono: "inventario" as TipoIcono,
    cuando: "Lunes · 9:12",
    quien: "Comercial",
    frase: "“¿Esa ubicación está libre la próxima catorcena?”",
    historia:
      "Nadie lo sabe con certeza. Alguien abre un Excel, otro pregunta por WhatsApp. A veces el mismo espacio termina vendido dos veces.",
    solucion: "Inventario en vivo",
    href: SISTEMAS.operacion.href,
    sistema: SISTEMAS.operacion.nombre,
  },
  {
    icono: "propuesta" as TipoIcono,
    cuando: "Martes · 17:40",
    quien: "Comercial",
    frase: "“El cliente pidió la propuesta ayer.”",
    historia:
      "Armarla toma días de copiar, pegar y confirmar disponibilidad. Mientras tanto, el anunciante se enfría o se va con otro.",
    solucion: "Propuestas con inventario real",
    href: SISTEMAS.operacion.href,
    sistema: SISTEMAS.operacion.nombre,
  },
  {
    icono: "campana" as TipoIcono,
    cuando: "Miércoles · 11:05",
    quien: "Operación",
    frase: "“¿Qué arte va en esta cara?”",
    historia:
      "La versión correcta está en algún hilo de correo. En la calle termina la equivocada y hay que volver a instalar.",
    solucion: "Versionario de artes",
    href: SISTEMAS.operacion.href,
    sistema: SISTEMAS.operacion.nombre,
  },
  {
    icono: "analisis" as TipoIcono,
    cuando: "Jueves · 19:30",
    quien: "Administración",
    frase: "“Los números no cuadran.”",
    historia:
      "Cada área tiene su propia cifra de ventas. El cierre se vuelve una discusión sobre quién tiene el archivo bueno.",
    solucion: "Una sola cifra de venta",
    href: SISTEMAS.inteligencia.href,
    sistema: SISTEMAS.inteligencia.nombre,
  },
  {
    icono: "objetivo" as TipoIcono,
    cuando: "Viernes · 10:00",
    quien: "Dirección",
    frase: "“¿Vamos a llegar a la meta?”",
    historia:
      "La respuesta llega al cierre de mes, cuando ya no hay tiempo de corregir. Nadie sabe qué asesor va atrasado hasta que es tarde.",
    solucion: "Objetivos y avance al momento",
    href: SISTEMAS.inteligencia.href,
    sistema: SISTEMAS.inteligencia.nombre,
  },
  {
    icono: "ubicacion" as TipoIcono,
    cuando: "Fin de mes",
    quien: "Dirección",
    frase: "“¿Por qué esa zona siempre está vacía?”",
    historia:
      "Hay espacios que casi no se venden y nadie lo ve a tiempo. Es dinero que se queda en la mesa, catorcena tras catorcena.",
    solucion: "Ocupación estratégica",
    href: SISTEMAS.inteligencia.href,
    sistema: SISTEMAS.inteligencia.nombre,
  },
];

export default function Inicio() {
  const blog = entradas().slice(0, 3);

  return (
    <>
      {/* Portada */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <Resplandor className="-top-60 opacity-50" />
        <LineaTopografica className="absolute inset-x-0 top-0 h-[42rem] w-full opacity-50" />
        <Contenedor className="relative">
          <div className="max-w-5xl">
            <Etiqueta>Gestión de negocio OOH</Etiqueta>
            <h1 className="mt-7 text-[clamp(2rem,4.6vw,3.9rem)] font-extrabold leading-[1] text-white">
              Todo tu negocio de publicidad exterior,{" "}
              <span className="texto-degradado">en un solo lugar.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-texto-tenue md:text-xl">
              QEB une la operación del día a día con la inteligencia para
              decidir: vende sin empalmes, opera sin correos y sabe al momento
              cómo va tu negocio.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Boton href="/contacto">Agendar demo</Boton>
              <Boton href="/sistemas" variante="borde">
                Conocer los sistemas
              </Boton>
            </div>
          </div>

          <div className="relative mt-16 md:mt-24 lg:pb-40">
            <Onda
              animada
              className="absolute -top-14 right-10 hidden h-28 w-[26rem] md:block"
            />
            <PanelDemo className="relative z-10 lg:w-[78%]" />
            <PanelInteligencia className="relative z-20 mt-4 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[58%]" />
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-texto-tenue/70 lg:absolute lg:-bottom-7 lg:right-0">
              Ilustración con datos de ejemplo
            </p>
          </div>
        </Contenedor>
      </section>

      {/* Historia: una semana en una empresa OOH */}
      <Seccion className="md:pt-40">
        <Contenedor className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Etiqueta>Si trabajas en OOH, esto te suena</Etiqueta>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] text-white md:text-5xl">
              Una semana cualquiera.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-texto-tenue">
              La publicidad exterior se vende rápido y se opera en la calle. Pero
              detrás, casi siempre, hay hojas de cálculo, correos y la memoria
              de alguien. Así se ve una semana normal.
            </p>
            <Onda
              variante="tubo"
              grosor={10}
              className="mt-12 hidden h-44 w-80 lg:block"
              pulsos={[20, 32, 44, 32, 20]}
              cola={30}
            />
          </div>

          <ol className="space-y-5 md:space-y-6">
            {ESCENAS.map((e) => (
              <li key={e.cuando}>
                <article className="grid overflow-hidden rounded-3xl md:grid-cols-[1fr_1.05fr]">
                  {/* Panel oscuro: la escena. */}
                  <div className="relative flex flex-col justify-between gap-6 bg-grafito p-6 md:p-8">
                    <span
                      aria-hidden
                      className="absolute inset-y-0 right-0 hidden w-1.5 bg-gradient-to-b from-violeta via-violeta-claro to-magenta-vivo md:block"
                    />
                    <div className="flex items-center gap-3">
                      <IconoCirculo tipo={e.icono} tamano="sm" />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-texto-tenue">
                        {e.cuando}
                        <br />
                        <span className="text-rosa">{e.quien}</span>
                      </p>
                    </div>
                    <h3 className="text-2xl font-extrabold leading-tight text-white md:text-[1.7rem]">
                      {e.frase}
                    </h3>
                  </div>
                  {/* Panel claro: qué pasa y qué lo resuelve. */}
                  <div className="flex flex-col justify-between gap-6 bg-niebla p-6 md:p-8">
                    <p className="text-lg leading-relaxed text-grafito/80">{e.historia}</p>
                    <Link href={e.href} className="group block">
                      <BarraTitulo como="span">{e.sistema}</BarraTitulo>
                      <span className="mt-2 flex items-center justify-between gap-3">
                        <span className="font-display text-lg font-extrabold uppercase leading-tight text-grafito">
                          {e.solucion}
                        </span>
                        <span
                          aria-hidden
                          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-grafito text-white transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Contenedor>
      </Seccion>

      {/* Giro: dos sistemas */}
      <Seccion tono="tinta">
        <Contenedor>
          <Encabezado
            centrado
            etiqueta="Así se ve con QEB"
            titulo={
              <>
                Dos sistemas.{" "}
                <span className="texto-degradado">Un solo negocio.</span>
              </>
            }
            bajada="Uno opera la venta y la calle. El otro convierte esa operación, en tiempo real, en decisiones. Están conectados: lo que pasa en uno, se ve en el otro."
          />
          <div className="relative mt-16 grid gap-4 lg:grid-cols-2">
            <span
              aria-hidden
              className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-linea bg-negro px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-rosa lg:flex"
            >
              ⇄ Tiempo real
            </span>
            {LISTA_SISTEMAS.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="group relative overflow-hidden rounded-3xl border border-linea bg-negro p-8 transition-colors hover:border-violeta md:p-12"
              >
                <div className="flex items-center gap-4">
                  <IconoCirculo tipo={s.id === "operacion" ? "panel" : "analisis"} />
                  <BarraTitulo como="span">{s.categoria}</BarraTitulo>
                </div>
                <h3 className="mt-6 text-3xl font-extrabold uppercase text-white md:text-4xl">
                  {s.nombre}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-texto-tenue">{s.lema}</p>
                <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
                  {s.capacidades.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-texto">
                      <span aria-hidden className="h-1 w-3 degradado-marca" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-10 text-sm font-semibold text-white">
                  Conocer {s.nombre} <span aria-hidden className="text-rosa">→</span>
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/sistemas" className="text-sm font-semibold text-rosa hover:text-white">
              Ver cómo se conectan <span aria-hidden>→</span>
            </Link>
          </p>
        </Contenedor>
      </Seccion>

      {/* Nuevo: QEB Inteligencia */}
      <Seccion className="overflow-hidden">
        <Contenedor className="grid items-center gap-14 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <BarraTitulo>Nuevo sistema</BarraTitulo>
            <h2 className="mt-6 text-4xl font-extrabold leading-[1.02] text-white md:text-5xl">
              {SISTEMAS.inteligencia.nombre}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-texto-tenue md:text-xl">
              Inteligencia de negocio y planificación estratégica, alimentada en
              tiempo real por tu operación. Sin reportes armados a mano.
            </p>
            <div className="mt-8">
              <ListaMarca
                items={[
                  "Ventas reales contra presupuesto y contra el año anterior.",
                  "Metas por asesor con su avance, al momento.",
                  "Dónde se cae la venta y cuánto tarda en cerrarse.",
                  "Qué zonas y espacios rinden, y cuáles se quedan vacíos.",
                ]}
              />
            </div>
            <Boton href={SISTEMAS.inteligencia.href} className="mt-10">
              Conocer {SISTEMAS.inteligencia.nombre}
            </Boton>
          </div>
          <div className="relative">
            <Resplandor className="top-0 opacity-30" />
            <PanelInteligencia className="relative" />
          </div>
        </Contenedor>
      </Seccion>

      {/* Hecho para OOH: banda clara, como los paneles blancos de las presentaciones. */}
      <section className="relative overflow-hidden bg-niebla py-20 text-grafito md:py-28">
        <Onda
          variante="tubo"
          grosor={11}
          className="pointer-events-none absolute -bottom-24 -left-20 h-[30rem] w-[34rem] opacity-80"
          pulsos={[20, 34, 46, 34, 20]}
          cola={40}
        />
        <Contenedor className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <BarraTitulo>Hecho en México, para OOH</BarraTitulo>
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.02] md:text-5xl">
              Habla el idioma de{" "}
              <span className="texto-degradado-claro">tu negocio.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-grafito/75">
              QEB no es un software genérico adaptado. Nació en la publicidad
              exterior y se configura con tu forma de trabajar: tus plazas, tus
              formatos, tus reglas comerciales.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5" aria-label="Conceptos que QEB maneja de origen">
            {[
              "Catorcenas",
              "Plazas",
              "Caras",
              "Flujo / Contraflujo",
              "Parabuses",
              "Unipolares",
              "Puentes",
              "Mupis",
              "Pantallas digitales",
              "Espectaculares",
            ].map((t, i) => (
              <li
                key={t}
                className={
                  i % 4 === 0
                    ? "degradado-marca px-5 py-2.5 font-display text-base font-extrabold uppercase text-white"
                    : "border border-grafito/15 bg-white px-5 py-2.5 font-display text-base font-bold uppercase text-grafito"
                }
              >
                {t}
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      {/* Blog */}
      <Seccion tono="tinta">
        <Contenedor>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Encabezado etiqueta="Blog" titulo="Ideas sobre el negocio OOH." />
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
                  <p className="mt-5 font-mono text-xs text-texto-tenue">{formatoFecha(e.fecha)}</p>
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
