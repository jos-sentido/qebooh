"use server";

import { headers } from "next/headers";
import { INTERESES } from "@/lib/contacto";
import { CORREO_CONTACTO } from "@/lib/sitio";

export type EstadoContacto =
  | { estado: "inicial" }
  | { estado: "enviado" }
  | {
      estado: "error";
      mensaje: string;
      errores?: Partial<Record<Campo, string>>;
      valores?: Partial<Record<Campo, string>>;
    };

type Campo = "nombre" | "empresa" | "correo" | "telefono" | "interes" | "mensaje";

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texto(fd: FormData, campo: string, max: number): string {
  const v = fd.get(campo);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Envía la solicitud de demo por correo con la API de Resend.
 *
 * Se usa `fetch` directo en lugar del SDK para no sumar una dependencia por
 * una sola llamada. El correo sale del remitente verificado y lleva
 * `reply_to` con el correo de quien escribió, así se responde directo.
 */
export async function enviarContacto(
  _previo: EstadoContacto,
  fd: FormData,
): Promise<EstadoContacto> {
  // Trampa para bots: campo oculto que una persona nunca llena. Se responde
  // como si hubiera salido bien para no darle pistas.
  if (texto(fd, "sitio_web", 200)) return { estado: "enviado" };

  const valores = {
    nombre: texto(fd, "nombre", 120),
    empresa: texto(fd, "empresa", 160),
    correo: texto(fd, "correo", 200),
    telefono: texto(fd, "telefono", 40),
    interes: texto(fd, "interes", 40),
    mensaje: texto(fd, "mensaje", 4000),
  };
  const acepta = fd.get("privacidad") === "on";

  const errores: Partial<Record<Campo, string>> = {};
  if (!valores.nombre) errores.nombre = "Escribe tu nombre.";
  if (!valores.empresa) errores.empresa = "Escribe el nombre de tu empresa.";
  if (!CORREO_VALIDO.test(valores.correo))
    errores.correo = "Revisa tu correo; parece incompleto.";
  if (!(valores.interes in INTERESES)) errores.interes = "Elige un tema.";

  if (Object.keys(errores).length > 0 || !acepta) {
    return {
      estado: "error",
      mensaje: !acepta && Object.keys(errores).length === 0
        ? "Para enviar necesitamos que aceptes el aviso de privacidad."
        : "Revisa los campos marcados.",
      errores,
      valores,
    };
  }

  const clave = process.env.RESEND_API_KEY;
  const destino = (process.env.CONTACTO_DESTINO ?? CORREO_CONTACTO)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const remitente = process.env.CONTACTO_REMITENTE ?? "QEB <sitio@qeb.mx>";

  if (!clave) {
    console.error("[contacto] Falta RESEND_API_KEY; el mensaje no se envió.");
    return {
      estado: "error",
      mensaje: `No pudimos enviar tu mensaje. Escríbenos a ${CORREO_CONTACTO} y te respondemos.`,
      valores,
    };
  }

  const tema = INTERESES[valores.interes as keyof typeof INTERESES];
  const origen = (await headers()).get("referer") ?? "qeb.mx";
  const filas: [string, string][] = [
    ["Nombre", valores.nombre],
    ["Empresa", valores.empresa],
    ["Correo", valores.correo],
    ["Teléfono", valores.telefono || "—"],
    ["Interés", tema],
    ["Página", origen],
  ];

  const html = `
    <h2 style="font-family:sans-serif">Nueva solicitud desde qeb.mx</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${filas
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escapar(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapar(valores.mensaje || "(sin mensaje)")}</p>`;

  const textoPlano = `${filas.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${valores.mensaje || "(sin mensaje)"}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: destino,
        reply_to: valores.correo,
        subject: `Demo · ${valores.empresa} (${tema})`,
        html,
        text: textoPlano,
      }),
    });
    if (!r.ok) {
      console.error("[contacto] Resend respondió", r.status, await r.text());
      throw new Error(`Resend ${r.status}`);
    }
  } catch (e) {
    console.error("[contacto] Error al enviar", e);
    return {
      estado: "error",
      mensaje: `No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos a ${CORREO_CONTACTO}.`,
      valores,
    };
  }

  return { estado: "enviado" };
}
