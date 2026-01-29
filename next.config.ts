import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pixelstalk.net",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "toppng.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mlapxffieyehdpvuzsyw.supabase.co",
      },
      {
        protocol: "https",
        hostname: "mlapxffieyehdpvuzsyw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
