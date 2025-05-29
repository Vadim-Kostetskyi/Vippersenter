import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      modules: path.resolve(__dirname, "src/modules"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      styles: path.resolve(__dirname, "src/styles"),
      helpers: path.resolve(__dirname, "src/helpers"),
      utils: path.resolve(__dirname, "src/utils"),
      "swiper/css": "swiper/swiper.min.css",
    },
  },
});
