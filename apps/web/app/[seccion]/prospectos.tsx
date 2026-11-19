import type { Prospecto } from "@/lib/prospectos";

/**
 * Prospectos registrados desde las presentaciones, al pie del índice de
 * propuestas. Sólo lectura: se llenan y se editan desde la presentación, en la
 * junta. La descarga sale de la misma API, con la misma sesión.
 */
export function Prospectos({ lista, base }: { lista: Prospecto[]; base: string }) {
  const fecha = (iso: string) =>
    new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="mt-16 border-t border-borde pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-titulo">Prospectos</h2>
          <p className="mt-2 max-w-2xl text-sm text-texto-tenue">
            Registrados desde la lámina de licencias de una presentación, con
            &ldquo;Registrar prospecto&rdquo;. Ese botón sólo aparece en un
            navegador con la sesión de este índice.
          </p>
        </div>
        {lista.length > 0 && (
          <a
            href={`${base}/api/prospectos?formato=csv`}
            className="rounded-full border border-borde bg-superficie px-4 py-2.5 text-sm hover:border-marca-500"
          >
            Descargar para Excel
          </a>
        )}
      </div>

      {lista.length === 0 ? (
        <p className="mt-6 text-sm text-texto-tenue">Todavía no hay prospectos registrados.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-card border border-borde">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-superficie text-xs uppercase tracking-wider text-texto-tenue">
              <tr>
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Operación</th>
                <th className="px-4 py-3 font-medium">Licencia</th>
                <th className="px-4 py-3 font-medium">Afinidad</th>
                <th className="px-4 py-3 font-medium">Asesor</th>
                <th className="px-4 py-3 font-medium">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((p) => (
                <tr key={p.id} className="border-t border-borde align-top">
                  <td className="px-4 py-3">
                    <span className="font-semibold">{p.empresa}</span>
                    {p.plazas && <span className="mt-1 block text-xs text-texto-tenue">{p.plazas}</span>}
                  </td>
                  <td className="px-4 py-3">
                    {p.contacto || "—"}
                    {p.cargo && <span className="block text-xs text-texto-tenue">{p.cargo}</span>}
                    {(p.correo || p.telefono) && (
                      <span className="block text-xs text-texto-tenue">
                        {[p.correo, p.telefono].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-texto-tenue">
                    {p.inventario && <span className="block">{p.inventario} caras</span>}
                    {p.usuarios && <span className="block">{p.usuarios} usuarios</span>}
                    {(p.formatos.length > 0 || p.otrosFormatos) && (
                      <span className="block">{[...p.formatos, p.otrosFormatos].filter(Boolean).join(", ")}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{p.licencia}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {p.diagnostico && p.diagnostico.marcados.length > 0 ? (
                      <>
                        {p.diagnostico.afinidad}%
                        <span className="block text-xs text-texto-tenue">{p.diagnostico.areas.join(", ")}</span>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">{p.asesor || "—"}</td>
                  <td className="px-4 py-3 text-xs text-texto-tenue">{fecha(p.actualizado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
