import type { Metadata } from "next";
import { Contenedor, Etiqueta } from "@/components/bloques";
import { CORREO_CONTACTO } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  alternates: { canonical: "/privacidad" },
};

// Texto migrado sin cambios de fondo desde qeb.mx/politicas-de-privacidad
// (vigente desde abril de 2024). Cualquier modificación la valida legal.
const SECCIONES: { t: string; p?: string; li?: string[] }[] = [
  {
    t: "1. Introducción",
    p: "QEB («QEB», «nosotros», «nuestro») se compromete a proteger la privacidad de los usuarios («usuario», «usted») de nuestro software de gestión OOH. Este Aviso de Privacidad establece nuestras políticas y procedimientos sobre la recolección, uso y divulgación de su información personal al utilizar nuestro sitio web y servicios asociados.",
  },
  {
    t: "2. Información que recolectamos",
    p: "Podemos recolectar información personal que usted nos proporciona directamente, información técnica y de uso generada por su uso de nuestros servicios, y la información recolectada por cookies y tecnologías similares.",
  },
  {
    t: "3. Cómo utilizamos su información",
    p: "Usamos la información recolectada para:",
    li: [
      "Operar, mantener y mejorar nuestro software y servicios.",
      "Procesar transacciones y enviar comunicaciones relacionadas con su uso de QEB.",
      "Responder a consultas de servicio al cliente y soporte técnico.",
      "Enviar comunicaciones de marketing, en conformidad con sus preferencias.",
    ],
  },
  {
    t: "4. Compartir y divulgar su información",
    p: "No vendemos su información personal. Podemos compartirla con terceros en las siguientes circunstancias:",
    li: [
      "Con proveedores de servicios que trabajan en nuestro nombre.",
      "Para cumplir con requisitos legales o proteger los derechos y la seguridad de QEB y sus usuarios.",
      "En relación con una transacción corporativa, como una fusión o venta de activos.",
    ],
  },
  {
    t: "5. Seguridad de su información",
    p: "Implementamos medidas de seguridad razonables para proteger su información contra la pérdida, el uso indebido y el acceso no autorizado, la divulgación, la alteración y la destrucción.",
  },
  {
    t: "6. Sus derechos",
    p: "Usted tiene derecho a:",
    li: [
      "Acceder, corregir o eliminar su información personal.",
      "Restringir u objetar el procesamiento de su información.",
      "Solicitar la portabilidad de su información.",
      "Retirar su consentimiento en cualquier momento.",
    ],
  },
  {
    t: "7. Cambios al aviso de privacidad",
    p: "Podemos actualizar este Aviso de Privacidad ocasionalmente. Si realizamos cambios significativos, lo notificaremos a través de nuestro sitio web o por otros medios.",
  },
];

export default function Privacidad() {
  return (
    <section className="py-16 md:py-24">
      <Contenedor angosto>
        <Etiqueta>Legal</Etiqueta>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Aviso de privacidad
        </h1>
        <p className="mt-4 text-texto-tenue">Fecha de efectividad: abril de 2024.</p>
        <div className="mt-12 space-y-10 leading-relaxed text-texto">
          {SECCIONES.map((s) => (
            <div key={s.t}>
              <h2 className="text-2xl font-semibold text-white">{s.t}</h2>
              {s.p ? <p className="mt-3">{s.p}</p> : null}
              {s.li ? (
                <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-rosa">
                  {s.li.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <div>
            <h2 className="text-2xl font-semibold text-white">8. Contacto</h2>
            <p className="mt-3">
              Si tiene preguntas o inquietudes sobre este Aviso de Privacidad,
              contáctenos en{" "}
              <a href={`mailto:${CORREO_CONTACTO}`} className="text-rosa underline underline-offset-2">
                {CORREO_CONTACTO}
              </a>
              .
            </p>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
