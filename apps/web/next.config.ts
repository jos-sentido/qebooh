import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @qebooh/ui se consume como código fuente (TS/JSX sin compilar), así que
  // Next tiene que transpilarlo junto con la app.
  transpilePackages: ["@qebooh/ui"],

  // `typedRoutes` queda desactivado a propósito. Con el enrutamiento por
  // subdominio hay dos formas de cada URL: la del router (`/propuestas/algo`) y
  // la que ve el navegador (`/algo`). Los tipos generados sólo conocen la
  // primera, así que validarían la forma equivocada justo en los enlaces y
  // redirecciones que dependen del host — daría confianza falsa, no seguridad.
};

export default nextConfig;
