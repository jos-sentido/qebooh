import { Pool } from "pg";
import type { Seccion } from "../secciones";
import {
  ESTADO_INICIAL,
  nuevaEntrada,
  type Almacen,
  type EntradaBitacora,
  type EstadoPublicacion,
} from "./tipos";

/**
 * Almacén en Postgres. Es el adaptador de producción.
 *
 * Funciona con cualquier proveedor que dé una cadena de conexión estándar
 * (Neon, Supabase, Postgres administrado). En serverless conviene apuntar al
 * pooler del proveedor, no al puerto directo: cada instancia abre su propio
 * pool y sin pooler se agotan las conexiones — es el mismo problema que ya se
 * conoce en la plataforma.
 *
 * El esquema se crea solo en el primer uso (ver `SQL_ESQUEMA`), así que no hace
 * falta una migración manual para arrancar.
 */

const SQL_ESQUEMA = `
  create table if not exists publicacion_estado (
    seccion     text        not null,
    slug        text        not null,
    archivada   boolean     not null default false,
    eliminada   boolean     not null default false,
    bitacora    jsonb       not null default '[]'::jsonb,
    actualizado timestamptz not null default now(),
    primary key (seccion, slug)
  );
`;

type Fila = {
  slug: string;
  archivada: boolean;
  eliminada: boolean;
  bitacora: EntradaBitacora[];
};

function aEstado(fila: Fila): EstadoPublicacion {
  return {
    archivada: fila.archivada,
    eliminada: fila.eliminada,
    // jsonb llega ya deserializado; el `?? []` cubre una fila escrita a mano.
    bitacora: Array.isArray(fila.bitacora) ? fila.bitacora : [],
  };
}

export class AlmacenPostgres implements Almacen {
  readonly nombre = "postgres";

  private pool: Pool;
  private esquemaListo: Promise<void> | null = null;

  constructor(cadenaConexion: string) {
    this.pool = new Pool({
      connectionString: cadenaConexion,
      // Los Postgres administrados suelen presentar un certificado que no
      // encadena a una CA pública. La conexión sigue cifrada.
      ssl: cadenaConexion.includes("sslmode=disable")
        ? false
        : { rejectUnauthorized: false },
      max: 3,
    });
  }

  /** Crea el esquema una sola vez por instancia, aunque haya llamadas en paralelo. */
  private async listo(): Promise<void> {
    this.esquemaListo ??= this.pool.query(SQL_ESQUEMA).then(() => undefined);
    return this.esquemaListo;
  }

  async leerSeccion(seccion: Seccion): Promise<Map<string, EstadoPublicacion>> {
    await this.listo();
    const { rows } = await this.pool.query<Fila>(
      `select slug, archivada, eliminada, bitacora
         from publicacion_estado
        where seccion = $1`,
      [seccion],
    );
    return new Map(rows.map((fila) => [fila.slug, aEstado(fila)]));
  }

  async leer(seccion: Seccion, slug: string): Promise<EstadoPublicacion> {
    await this.listo();
    const { rows } = await this.pool.query<Fila>(
      `select slug, archivada, eliminada, bitacora
         from publicacion_estado
        where seccion = $1 and slug = $2`,
      [seccion, slug],
    );
    const fila = rows[0];
    return fila ? aEstado(fila) : ESTADO_INICIAL;
  }

  private async fijarBandera(
    columna: "archivada" | "eliminada",
    seccion: Seccion,
    slug: string,
    valor: boolean,
  ): Promise<void> {
    await this.listo();
    // El nombre de columna no viene del exterior: es un literal de este módulo.
    await this.pool.query(
      `insert into publicacion_estado (seccion, slug, ${columna})
            values ($1, $2, $3)
       on conflict (seccion, slug)
       do update set ${columna} = excluded.${columna}, actualizado = now()`,
      [seccion, slug, valor],
    );
  }

  fijarArchivada(seccion: Seccion, slug: string, valor: boolean): Promise<void> {
    return this.fijarBandera("archivada", seccion, slug, valor);
  }

  fijarEliminada(seccion: Seccion, slug: string, valor: boolean): Promise<void> {
    return this.fijarBandera("eliminada", seccion, slug, valor);
  }

  async anotar(
    seccion: Seccion,
    slug: string,
    entrada: Omit<EntradaBitacora, "id" | "fecha">,
  ): Promise<void> {
    await this.listo();
    const nueva = nuevaEntrada(entrada);
    // Se antepone en SQL en vez de leer-modificar-escribir: dos notas
    // simultáneas se conservan las dos.
    await this.pool.query(
      `insert into publicacion_estado (seccion, slug, bitacora)
            values ($1, $2, $3::jsonb)
       on conflict (seccion, slug)
       do update set bitacora = $3::jsonb || publicacion_estado.bitacora,
                     actualizado = now()`,
      [seccion, slug, JSON.stringify([nueva])],
    );
  }

  async borrarNota(seccion: Seccion, slug: string, id: string): Promise<void> {
    await this.listo();
    await this.pool.query(
      `update publicacion_estado
          set bitacora = coalesce(
                (select jsonb_agg(entrada)
                   from jsonb_array_elements(bitacora) as entrada
                  where entrada->>'id' <> $3),
                '[]'::jsonb
              ),
              actualizado = now()
        where seccion = $1 and slug = $2`,
      [seccion, slug, id],
    );
  }
}
