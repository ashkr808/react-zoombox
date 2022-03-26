import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "lib/cjs/index.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
    {
      file: "lib/esm/index.js",
      format: "esm",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    sass({ insert: true }),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ["react", "react-dom"],
};
