"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Button, Card } from "@qebooh/ui";
import type { EntradaBitacora } from "@/lib/almacen";
import type { EstadoEditorial } from "@/content/tipos";
import { ETIQUETA_ESTADO, formatearFecha, formatearMomento } from "@/lib/formato";
import { anotar, archivar, borrarNota, eliminar } from "./acciones";

export type Fila = {
  slug: string;
  titulo: string;
  resumen: string;
  cliente: string | null;
  fecha: string;
  estado: EstadoEditorial;
  etiquetas: string[];
  /** Las publicaciones tipo enlace redirigen; no tienen página propia. */
  esEnlace: boolean;
  archivada: boolean;
  eliminada: boolean;
  bitacora: EntradaBitacora[];
};

type Vista = "activas" | "archivadas" | "eliminadas";

const VISTAS: { valor: Vista; etiqueta: string }[] = [
  { valor: "activas", etiqueta: "Activas" },
  { valor: "archivadas", etiqueta: "Archivadas" },
  { valor: "eliminadas", etiqueta: "Eliminadas" },
];

const CLAVE_AUTOR = "qeb:autor-bitacora";

function normalizar(texto: string): string {
  // Sin acentos y en minúsculas: buscar "propuesta" debe encontrar "Propuestá".
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Panel({
  seccion,
  base,
  filas,
  persistente,
}: {
  seccion: string;
  base: string;
  filas: Fila[];
  persistente: boolean;
}) {
  const [vista, setVista] = useState<Vista>("activas");
  const [busqueda, setBusqueda] = useState("");
  const [cliente, setCliente] = useState<string>("");
  const [etiqueta, setEtiqueta] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [pendiente, iniciar] = useTransition();

  const clientes = useMemo(
    () =>
      [
        ...new Set(
          filas
            .map((fila) => fila.cliente)
            .filter((valor): valor is string => valor !== null),
        ),
      ].sort(),
    [filas],
  );

  const etiquetas = useMemo(
    () => [...new Set(filas.flatMap((fila) => fila.etiquetas))].sort(),
    [filas],
  );

  const visibles = useMemo(() => {
    const termino = normalizar(busqueda.trim());
    return filas.filter((fila) => {
      const enVista =
        vista === "eliminadas"
          ? fila.eliminada
          : vista === "archivadas"
            ? fila.archivada && !fila.eliminada
            : !fila.archivada && !fila.eliminada;
      if (!enVista) return false;
      if (cliente && fila.cliente !== cliente) return false;
      if (etiqueta && !fila.etiquetas.includes(etiqueta)) return false;
      if (!termino) return true;
      const heno = normalizar(
        [fila.titulo, fila.resumen, fila.slug, fila.cliente ?? "", ...fila.etiquetas].join(" "),
      );
      return heno.includes(termino);
    });
  }, [filas, vista, busqueda, cliente, etiqueta]);

  const conteos = useMemo(
    () => ({
      activas: filas.filter((f) => !f.archivada && !f.eliminada).length,
      archivadas: filas.filter((f) => f.archivada && !f.eliminada).length,
      eliminadas: filas.filter((f) => f.eliminada).length,
    }),
    [filas],
  );

  function ejecutar(accion: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    iniciar(async () => {
      const resultado = await accion();
      if (!resultado.ok) setError(resultado.error ?? "No se pudo completar.");
    });
  }

  return (
    <div className={pendiente ? "opacity-70 transition-opacity" : undefined}>
      {!persistente ? (
        <p className="mb-6 rounded-card border border-ambar/40 bg-ambar/10 p-4 text-sm">
          <strong className="font-semibold">Sin base de datos.</strong> Archivar,
          eliminar y las notas funcionan, pero se pierden al reiniciar o
          desplegar. Configura <code className="font-mono">POSTGRES_URL</code>{" "}
          para que persistan (ver <code className="font-mono">docs/DESPLIEGUE.md</code>).
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="mb-6 rounded-card border border-magenta/40 bg-magenta/10 p-4 text-sm"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        {VISTAS.map((opcion) => (
          <button
            key={opcion.valor}
            type="button"
            onClick={() => setVista(opcion.valor)}
            aria-pressed={vista === opcion.valor}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              vista === opcion.valor
                ? "border-marca-500 bg-marca-500 text-white"
                : "border-borde text-texto-tenue hover:border-marca-500 hover:text-texto"
            }`}
          >
            {opcion.etiqueta}
            <span className="ml-2 tabular-nums opacity-70">
              {conteos[opcion.valor]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <input
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="Buscar por título, cliente, slug o etiqueta"
          aria-label="Buscar publicaciones"
          className="min-w-64 flex-1 rounded-full border border-borde bg-superficie px-5 py-2.5 text-sm outline-none placeholder:text-texto-tenue focus-visible:border-marca-500"
        />
        {clientes.length > 0 ? (
          <select
            value={cliente}
            onChange={(evento) => setCliente(evento.target.value)}
            aria-label="Filtrar por cliente"
            className="rounded-full border border-borde bg-superficie px-4 py-2.5 text-sm outline-none focus-visible:border-marca-500"
          >
            <option value="">Todos los clientes</option>
            {clientes.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        ) : null}
        {etiquetas.length > 0 ? (
          <select
            value={etiqueta}
            onChange={(evento) => setEtiqueta(evento.target.value)}
            aria-label="Filtrar por etiqueta"
            className="rounded-full border border-borde bg-superficie px-4 py-2.5 text-sm outline-none focus-visible:border-marca-500"
          >
            <option value="">Todas las etiquetas</option>
            {etiquetas.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      <p className="mt-6 text-sm text-texto-tenue" aria-live="polite">
        {visibles.length} de {conteos[vista]}
        {busqueda || cliente || etiqueta ? " (con filtros)" : ""}
      </p>

      <ul className="mt-4 space-y-3">
        {visibles.map((fila) => (
          <li key={fila.slug}>
            <TarjetaPublicacion
              fila={fila}
              seccion={seccion}
              base={base}
              ejecutar={ejecutar}
            />
          </li>
        ))}
      </ul>

      {visibles.length === 0 ? (
        <Card className="mt-4 text-center text-sm text-texto-tenue">
          {conteos[vista] === 0
            ? "Todavía no hay nada aquí."
            : "Ninguna publicación coincide con los filtros."}
        </Card>
      ) : null}
    </div>
  );
}

function TarjetaPublicacion({
  fila,
  seccion,
  base,
  ejecutar,
}: {
  fila: Fila;
  seccion: string;
  base: string;
  ejecutar: (accion: () => Promise<{ ok: boolean; error?: string }>) => void;
}) {
  const [abierta, setAbierta] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const url = `${base}/${fila.slug}`;

  return (
    <Card className={fila.eliminada ? "opacity-60" : undefined}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {fila.cliente ? (
              <span className="font-mono uppercase tracking-[0.15em] text-texto-tenue">
                {fila.cliente}
              </span>
            ) : null}
            <span className="rounded-full border border-borde px-2.5 py-0.5 text-texto-tenue">
              {ETIQUETA_ESTADO[fila.estado]}
            </span>
            {fila.archivada && !fila.eliminada ? (
              <span className="rounded-full border border-ambar/50 px-2.5 py-0.5 text-ambar">
                Archivada
              </span>
            ) : null}
            {fila.eliminada ? (
              <span className="rounded-full border border-magenta/50 px-2.5 py-0.5 text-magenta">
                Eliminada
              </span>
            ) : null}
          </div>

          <h2 className="mt-2 text-lg font-semibold tracking-tight">
            <a href={url} className="underline-offset-4 hover:underline">
              {fila.titulo}
            </a>
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-texto-tenue">
            {fila.resumen}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-texto-tenue">
            <span className="font-mono">/{fila.slug}</span>
            <span>{formatearFecha(fila.fecha)}</span>
            {fila.esEnlace ? <span>Redirige a un destino externo</span> : null}
            {fila.etiquetas.map((nombre) => (
              <span key={nombre} className="font-mono">
                #{nombre}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAbierta((valor) => !valor)}
            aria-expanded={abierta}
          >
            Bitácora
            {fila.bitacora.length > 0 ? (
              <span className="tabular-nums">({fila.bitacora.length})</span>
            ) : null}
          </Button>

          {!fila.eliminada ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                ejecutar(() => archivar(seccion, fila.slug, !fila.archivada))
              }
            >
              {fila.archivada ? "Desarchivar" : "Archivar"}
            </Button>
          ) : null}

          {fila.eliminada ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => ejecutar(() => eliminar(seccion, fila.slug, false))}
            >
              Restaurar
            </Button>
          ) : confirmando ? (
            <>
              <Button
                size="sm"
                className="bg-magenta text-fondo hover:bg-magenta"
                onClick={() => {
                  setConfirmando(false);
                  ejecutar(() => eliminar(seccion, fila.slug, true));
                }}
              >
                Confirmar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmando(false)}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmando(true)}
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>

      {abierta ? (
        <Bitacora
          fila={fila}
          seccion={seccion}
          ejecutar={ejecutar}
        />
      ) : null}
    </Card>
  );
}

function Bitacora({
  fila,
  seccion,
  ejecutar,
}: {
  fila: Fila;
  seccion: string;
  ejecutar: (accion: () => Promise<{ ok: boolean; error?: string }>) => void;
}) {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");

  // El autor se recuerda en el navegador: no hay sistema de usuarios y volver a
  // teclear el nombre en cada nota hace que la gente deje de firmarlas.
  //
  // El efecto corre después del primer render, así que sólo rellena el campo si
  // sigue vacío: si alguien empezó a escribir antes, recuperar el valor
  // guardado le borraría lo tecleado.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_AUTOR);
      if (guardado) setAutor((actual) => (actual === "" ? guardado : actual));
    } catch {
      // Modo privado o cookies bloqueadas: se sigue pudiendo escribir el nombre.
    }
  }, []);

  function guardarAutor(valor: string) {
    setAutor(valor);
    try {
      window.localStorage.setItem(CLAVE_AUTOR, valor);
    } catch {
      // Igual que arriba: no poder recordarlo no impide anotar.
    }
  }

  return (
    <div className="mt-6 border-t border-borde pt-5">
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          if (texto.trim().length === 0) return;
          const contenido = texto;
          setTexto("");
          ejecutar(() => anotar(seccion, fila.slug, autor, contenido));
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-wrap gap-2">
          <input
            value={autor}
            onChange={(evento) => guardarAutor(evento.target.value)}
            placeholder="Tu nombre"
            aria-label="Autor de la nota"
            className="w-40 rounded-full border border-borde bg-fondo px-4 py-2 text-sm outline-none placeholder:text-texto-tenue focus-visible:border-marca-500"
          />
          <input
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="Qué pasó: se envió, el cliente pidió un ajuste, se cerró…"
            aria-label="Nota de bitácora"
            className="min-w-56 flex-1 rounded-full border border-borde bg-fondo px-4 py-2 text-sm outline-none placeholder:text-texto-tenue focus-visible:border-marca-500"
          />
          <Button type="submit" size="sm" disabled={texto.trim().length === 0}>
            Anotar
          </Button>
        </div>
      </form>

      {fila.bitacora.length === 0 ? (
        <p className="mt-4 text-sm text-texto-tenue">
          Sin notas. La bitácora deja constancia de qué se movió y cuándo.
        </p>
      ) : (
        <ol className="mt-4 space-y-3">
          {fila.bitacora.map((entrada) => (
            <li
              key={entrada.id}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <div className="min-w-0">
                <p className="leading-relaxed">{entrada.texto}</p>
                <p className="mt-1 text-xs text-texto-tenue">
                  {entrada.autor} · {formatearMomento(entrada.fecha)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  ejecutar(() => borrarNota(seccion, fila.slug, entrada.id))
                }
                className="shrink-0 text-xs text-texto-tenue underline-offset-4 hover:text-texto hover:underline"
              >
                Borrar
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
