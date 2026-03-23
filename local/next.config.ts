import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Next can try to infer a "workspace root" when multiple lockfiles exist.
// On some machines that may pick a parent directory unintentionally.
// We set Turbopack's root explicitly to keep builds deterministic.
const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: configDir,
  },
};

export default nextConfig;
