import Link from "next/link";
import { CORREO_CONTACTO } from "@/lib/sitio";
import { LogoQeb } from "./logo";
import { Onda } from "./onda";

const COLUMNAS = [
  {
    titulo: "Sistemas",
    enlaces: [
      { href: "/sistemas", texto: "Visión general" },
      { href: "/sistemas/operacion", texto: "QEB Operación" },
      { href: "/sistemas/inteligencia", texto: "QEB Inteligencia" },
      { href: "/sistemas/operacion#preguntas", texto: "Preguntas frecuentes" },
    ],
  },
  {
    titulo: "Audiencias",
    enlaces: [
      { href: "/geo-behavior-indoor", texto: "Geo Behavior Indoor" },
      { href: "/wifi-inteligente", texto: "WiFi Inteligente" },
    ],
  },
  {
    titulo: "Empresa",
    enlaces: [
      { href: "/nosotros", texto: "Nosotros" },
      { href: "/blog", texto: "Blog" },
      { href: "/contacto", texto: "Contacto" },
      { href: "/privacidad", texto: "Aviso de privacidad" },
    ],
  },
];

export function Pie() {
  return (
    <footer className="relative overflow-hidden border-t border-linea bg-negro">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-10">
        <div>
          <LogoQeb className="h-10" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-texto-tenue">
            Gestión de negocio para la publicidad exterior. Software mexicano
            para empresas que comercializan y operan inventario OOH.
          </p>
          <a
            href={`mailto:${CORREO_CONTACTO}`}
            className="mt-6 inline-block text-sm font-semibold text-rosa hover:text-white"
          >
            {CORREO_CONTACTO}
          </a>
        </div>
        {COLUMNAS.map((c) => (
          <div key={c.titulo}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-texto-tenue">
              {c.titulo}
            </p>
            <ul className="mt-5 space-y-3">
              {c.enlaces.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-sm text-texto transition-colors hover:text-rosa"
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-linea">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-texto-tenue md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} QEB. Hecho en México.</p>
          <p className="font-display text-sm font-semibold tracking-wide text-texto">
            OOHperación en orden.
          </p>
        </div>
      </div>
      <Onda
        className="pointer-events-none absolute -right-10 bottom-10 hidden h-40 w-[34rem] opacity-15 md:block"
        pulsos={[10, 18, 30, 42, 26, 14, 8]}
      />
    </footer>
  );
}
