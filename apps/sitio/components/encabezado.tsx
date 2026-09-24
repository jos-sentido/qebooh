"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@qebooh/ui";
import { MENU } from "@/lib/sitio";
import { LogoQeb } from "./logo";

export function Encabezado() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);

  // Cerrar el menú móvil al navegar.
  useEffect(() => setAbierto(false), [ruta]);

  useEffect(() => {
    const alDesplazar = () => setDesplazado(window.scrollY > 8);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  const activo = (href: string) =>
    ruta === href || ruta.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        desplazado || abierto
          ? "border-b border-linea bg-negro/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" aria-label="QEB — inicio" className="shrink-0">
          <LogoQeb prioridad />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MENU.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  aria-current={activo(e.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activo(e.href)
                      ? "text-white"
                      : "text-texto-tenue hover:text-white",
                  )}
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contacto"
            className="hidden h-10 items-center rounded-full degradado-marca px-5 text-sm font-semibold text-white transition hover:brightness-125 sm:inline-flex"
          >
            Agendar demo
          </Link>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="inline-flex size-10 items-center justify-center rounded-full border border-linea text-white lg:hidden"
          >
            <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              {abierto ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        aria-label="Principal"
        hidden={!abierto}
        className="border-t border-linea lg:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
          {MENU.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={activo(e.href) ? "page" : undefined}
                className="flex items-baseline justify-between gap-4 border-b border-linea/60 py-4 font-display text-xl font-semibold text-white"
              >
                {e.texto}
                {e.detalle ? (
                  <span className="text-right font-sans text-xs font-normal text-texto-tenue">
                    {e.detalle}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Link
              href="/contacto"
              className="flex h-12 items-center justify-center rounded-full degradado-marca font-semibold text-white"
            >
              Agendar demo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
