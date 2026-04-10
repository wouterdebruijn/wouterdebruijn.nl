import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible"

const nextConfig: NextConfig = withPlausibleProxy({
  src: "https://plausible.hedium.nl/js/pa-B64xtJLQYjrEE-9kuNsIm.js",
})({
  transpilePackages: ["next-mdx-remote"],
  output: "standalone",
});

export default nextConfig;
