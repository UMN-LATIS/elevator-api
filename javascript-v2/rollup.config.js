import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: "dist/index.js",
  output: [
    {
      file: "dist/index.mjs",
      format: "esm",
    },
    {
      file: "dist/index.min.mjs",
      format: "esm",
      plugins: [terser()],
    },
    {
      file: "dist/index.umd.min.js",
      format: "umd",
      name: "elevator-api",
    },
    {
      file: "dist/index.umd.min.js",
      format: "umd",
      name: "elevator-api",
      plugins: [terser()],
    },
  ],
  plugins: [nodeResolve(), commonjs()],
};