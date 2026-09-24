"use client";

import Link from "next/link";
import { useActionState } from "react";
import { cn } from "@qebooh/ui";
import { INTERESES } from "@/lib/contacto";
import { enviarContacto, type EstadoContacto } from "./acciones";

const INICIAL: EstadoContacto = { estado: "inicial" };

const CAMPO =
  "mt-2 block w-full rounded-xl border border-linea bg-negro px-4 py-3 text-white placeholder:text-texto-tenue/60 transition-colors focus:border-rosa focus:outline-none aria-[invalid=true]:border-estado-espera";

export function Formulario({ interesInicial }: { interesInicial?: string }) {
  const [estado, accion, enviando] = useActionState(enviarContacto, INICIAL);

  if (estado.estado === "enviado") {
    return (
      <div role="status" className="rounded-3xl border border-linea bg-tinta p-10">
        <p className="font-display text-3xl font-bold text-white">
          Recibimos tu mensaje.
        </p>
        <p className="mt-4 leading-relaxed text-texto-tenue">
          Te escribimos pronto para agendar la demo.
        </p>
      </div>
    );
  }

  const err = estado.estado === "error" ? estado.errores ?? {} : {};
  const val = estado.estado === "error" ? estado.valores ?? {} : {};
  const interes =
    val.interes ??
    (interesInicial && interesInicial in INTERESES ? interesInicial : "plataforma");

  return (
    <form
      action={accion}
      noValidate
      className="rounded-3xl border border-linea bg-tinta p-6 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="Nombre" nombre="nombre" error={err.nombre}>
          <input
            id="nombre"
            name="nombre"
            autoComplete="name"
            required
            defaultValue={val.nombre}
            aria-invalid={!!err.nombre}
            aria-describedby={err.nombre ? "nombre-error" : undefined}
            className={CAMPO}
          />
        </Campo>
        <Campo etiqueta="Empresa" nombre="empresa" error={err.empresa}>
          <input
            id="empresa"
            name="empresa"
            autoComplete="organization"
            required
            defaultValue={val.empresa}
            aria-invalid={!!err.empresa}
            aria-describedby={err.empresa ? "empresa-error" : undefined}
            className={CAMPO}
          />
        </Campo>
        <Campo etiqueta="Correo de trabajo" nombre="correo" error={err.correo}>
          <input
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            required
            defaultValue={val.correo}
            aria-invalid={!!err.correo}
            aria-describedby={err.correo ? "correo-error" : undefined}
            className={CAMPO}
          />
        </Campo>
        <Campo etiqueta="Teléfono" nombre="telefono" opcional>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            defaultValue={val.telefono}
            className={CAMPO}
          />
        </Campo>
        <Campo
          etiqueta="¿Qué te interesa?"
          nombre="interes"
          error={err.interes}
          className="sm:col-span-2"
        >
          <select
            id="interes"
            name="interes"
            defaultValue={interes}
            className={cn(CAMPO, "appearance-none")}
          >
            {Object.entries(INTERESES).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Campo>
        <Campo etiqueta="Cuéntanos de tu operación" nombre="mensaje" opcional className="sm:col-span-2">
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            defaultValue={val.mensaje}
            placeholder="Plazas, tipo de inventario, cuántas caras manejan, qué les duele hoy…"
            className={cn(CAMPO, "resize-y")}
          />
        </Campo>
      </div>

      {/* Trampa para bots: oculta a personas y lectores de pantalla. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Sitio web
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-texto-tenue">
        <input
          type="checkbox"
          name="privacidad"
          required
          className="mt-0.5 size-4 shrink-0 accent-[#87286b]"
        />
        <span>
          Acepto el{" "}
          <Link href="/privacidad" className="text-rosa underline underline-offset-2">
            aviso de privacidad
          </Link>
          .
        </span>
      </label>

      {estado.estado === "error" ? (
        <p role="alert" className="mt-6 rounded-xl border border-estado-espera/40 bg-estado-espera/10 px-4 py-3 text-sm text-texto">
          {estado.mensaje}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={enviando}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full degradado-marca px-8 text-sm font-semibold text-white transition hover:brightness-125 disabled:opacity-60 sm:w-auto"
      >
        {enviando ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}

function Campo({
  etiqueta,
  nombre,
  error,
  opcional,
  className,
  children,
}: {
  etiqueta: string;
  nombre: string;
  error?: string;
  opcional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={nombre} className="text-sm font-medium text-texto">
        {etiqueta}
        {opcional ? <span className="ml-1 text-texto-tenue">(opcional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${nombre}-error`} className="mt-1.5 text-xs text-estado-espera">
          {error}
        </p>
      ) : null}
    </div>
  );
}
