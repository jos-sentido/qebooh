"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@qebooh/ui";
import { MENU, type EnlaceMenu } from "@/lib/sitio";
import { LogoQeb } from "./logo";

export function Encabezado() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [grupo, setGrupo] = useState<string | null>(null);
  const [desplazado, setDesplazado] = useState(false);
  const nav = useRef<HTMLElement>(null);

  // Cerrar menús al navegar.
  useEffect(() => {
    setAbierto(false);
    setGrupo(null);
  }, [ruta]);

  useEffect(() => {
    const alDesplazar = () => setDesplazado(window.scrollY > 8);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  // Cerrar el desplegable con Escape o al hacer clic fuera.
  useEffect(() => {
    if (!grupo) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setGrupo(null);
    const alClic = (e: MouseEvent) => {
      if (nav.current && !nav.current.contains(e.target as Node)) setGrupo(null);
    };
    document.addEventListener("keydown", alTeclear);
    document.addEventListener("mousedown", alClic);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("mousedown", alClic);
    };
  }, [grupo]);

  const activo = (href: string) =>
    ruta === href || ruta.startsWith(`${href}/`);
  const grupoActivo = (enlaces: EnlaceMenu[]) =>
    enlaces.some((e) => activo(e.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        desplazado || abierto || grupo
          ? "border-b border-linea bg-negro/90 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" aria-label="QEB — inicio" className="shrink-0">
          <LogoQeb prioridad />
        </Link>

        <nav ref={nav} aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MENU.map((e) =>
              e.tipo === "enlace" ? (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    aria-current={activo(e.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      activo(e.href) ? "text-white" : "text-texto-tenue hover:text-white",
                    )}
                  >
                    {e.texto}
                  </Link>
                </li>
              ) : (
                <li
                  key={e.texto}
                  className="relative"
                  onMouseEnter={() => setGrupo(e.texto)}
                  onMouseLeave={() => setGrupo(null)}
                >
                  <button
                    type="button"
                    aria-expanded={grupo === e.texto}
                    aria-controls={`menu-${e.texto}`}
                    onClick={() => setGrupo((g) => (g === e.texto ? null : e.texto))}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      grupoActivo(e.enlaces) || grupo === e.texto
                        ? "text-white"
                        : "text-texto-tenue hover:text-white",
                    )}
                  >
                    {e.texto}
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden
                      className={cn("size-3 transition-transform", grupo === e.texto && "rotate-180")}
                    >
                      <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    id={`menu-${e.texto}`}
                    hidden={grupo !== e.texto}
                    className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                  >
                    <ul className="rounded-2xl border border-linea bg-tinta p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                      {e.enlaces.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={ruta === l.href ? "page" : undefined}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-tinta-alta"
                          >
                            <span className="block font-display text-base font-semibold text-white">
                              {l.texto}
                            </span>
                            {l.detalle ? (
                              <span className="mt-0.5 block text-xs leading-relaxed text-texto-tenue">
                                {l.detalle}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ),
            )}
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
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-linea lg:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
          {MENU.map((e) =>
            e.tipo === "enlace" ? (
              <li key={e.href}>
                <Link
                  href={e.href}
                  aria-current={activo(e.href) ? "page" : undefined}
                  className="block border-b border-linea/60 py-4 font-display text-xl font-semibold text-white"
                >
                  {e.texto}
                </Link>
              </li>
            ) : (
              <li key={e.texto} className="border-b border-linea/60 py-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-texto-tenue">
                  {e.texto}
                </p>
                <ul className="mt-2">
                  {e.enlaces.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={ruta === l.href ? "page" : undefined}
                        className="block py-2.5"
                      >
                        <span className="block font-display text-xl font-semibold text-white">
                          {l.texto}
                        </span>
                        {l.detalle ? (
                          <span className="block text-xs text-texto-tenue">{l.detalle}</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
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
