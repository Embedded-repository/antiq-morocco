import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.blob.core.windows.net" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1",
    NEXT_PUBLIC_APP_NAME: "Antiq Morocco",
  },
};

export default nextConfig;
