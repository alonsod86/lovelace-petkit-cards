import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: browserslistToEsbuild(),
    minify: "terser",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "petkit-cards.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      onwarn(warning, warn) {
        if (
          warning.code === "CIRCULAR_DEPENDENCY" &&
          warning.ids?.some((id) => id.includes("node_modules/culori"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
