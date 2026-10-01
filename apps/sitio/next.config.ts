import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @qebooh/ui se consume como código fuente (TS/JSX sin compilar).
  transpilePackages: ["@qebooh/ui"],

  // URLs del sitio anterior (WordPress). Se redirigen de forma permanente para
  // no perder enlaces externos ni posicionamiento al cambiar el DNS.
  async redirects() {
    return [
      { source: "/inicio", destination: "/", permanent: true },
      { source: "/software", destination: "/sistemas/operacion", permanent: true },
      // La primera versión del sitio nuevo tenía una sola página "Plataforma";
      // ahora son sistemas con página propia.
      { source: "/plataforma", destination: "/sistemas", permanent: true },
      { source: "/politicas-de-privacidad", destination: "/privacidad", permanent: true },
      { source: "/propuesta-imu", destination: "/", permanent: true },
      // Las entradas del blog vivían bajo /AAAA/MM/DD/slug.
      {
        source: "/:anio(\\d{4})/:mes(\\d{2})/:dia(\\d{2})/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      { source: "/feed", destination: "/blog", permanent: true },
      // qeb.mx ahora lo sirve Vercel, pero el correo sigue en A2 Hosting.
      // Quien entraba al webmail o al cPanel por el dominio raíz llega a
      // sus subdominios, que siguen apuntando al hosting.
      { source: "/webmail", destination: "https://webmail.qeb.mx", permanent: false },
      { source: "/webmail/:ruta*", destination: "https://webmail.qeb.mx", permanent: false },
      { source: "/cpanel", destination: "https://cpanel.qeb.mx", permanent: false },
    ];
  },
};

export default nextConfig;
