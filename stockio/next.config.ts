import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001', // A porta do seu Back-end NestJS
        pathname: '/uploads/**', // Permite qualquer caminho dentro de /uploads
      },
      // Se tiver outras imagens externas (como de um CDN), adicione aqui
    ],
  },
};

export default nextConfig;