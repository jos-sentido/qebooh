import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @qebooh/ui se consume como código fuente (TS/JSX sin compilar), así que
  // Next tiene que transpilarlo junto con la app.
  transpilePackages: ["@qebooh/ui"],
  typedRoutes: true,
};

export default nextConfig;
