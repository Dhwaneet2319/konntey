import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // .claude/ holds local preview-runner tooling (see .claude/next-launch.cjs),
  // not shipped site code; it is excluded like the other local tooling dirs.
  globalIgnores([".next/**", "out/**", "build/**", ".tmp-node/**", ".claude/**", "next-env.d.ts"]),
]);
