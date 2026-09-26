import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 82, 90],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 200, 256, 384],
  },
};

export default nextConfig;
