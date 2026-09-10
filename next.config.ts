import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // If you ever serve the site on a host that proxies Next.js (instead of
  // static export), remove `output: "export"` and `trailingSlash`. To use
  // optimized remote images, add a remotePatterns entry for your CDN host.
};

export default nextConfig;