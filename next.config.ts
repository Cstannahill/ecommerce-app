import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow <Image> to load from files.stripe.com
    domains: ["files.stripe.com"],
  },
};

export default nextConfig;
