import { defineConfig } from 'rollup'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import run from "@rollup/plugin-run";
import copy from 'rollup-plugin-copy'

const dev = process.env.NODE_ENV !== "production";

export default defineConfig({
  input: "src/index.js",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    resolve(),
    commonjs(),
    copy({
      targets: [
        { src: "./src/index.d.ts", dest: "./dist" }
      ]
    }),
    dev && run()
  ]
})

