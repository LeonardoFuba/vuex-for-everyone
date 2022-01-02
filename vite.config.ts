import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // port: 80,
    // https: options,
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@@": path.resolve(__dirname, "src", "assets"),
    },
    //remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
    /*     extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ] */
  },
});
