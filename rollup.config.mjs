import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const plugins = (minify, dev = false) => [
  resolve(dev ? { exportConditions: ["development"] } : {}),
  typescript({ tsconfig: "./tsconfig.json", include: ["src/**/*.ts", "demo/**/*.ts"] }),
  minify && terser({ format: { comments: false } }),
];

const card = {
  input: "src/yad-card.ts",
  output: { file: "dist/yad.js", format: "es", inlineDynamicImports: true },
  plugins: plugins(true),
};

// Local browser preview with a mocked `hass` object (not shipped).
const demo = {
  input: "demo/demo.ts",
  output: { file: "demo/build/demo.js", format: "es", inlineDynamicImports: true },
  plugins: plugins(false, true),
};

export default process.env.DEMO ? [card, demo] : [card];
