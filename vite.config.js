import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  server: {
    host: true
  },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        player: resolve(__dirname, "src/player_page/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        packs: resolve(__dirname, "src/packs/index.html"),
        collection: resolve(__dirname, "src/collection/index.html"),
        buycards: resolve(__dirname, "src/buycards/index.html"),
        buypage: resolve(__dirname, "src/buy_page/index.html"),
        sellcards: resolve(__dirname, "src/sellcards/index.html"),
        tradecards: resolve(__dirname, "src/tradecards/index.html"),
      },
    },
  },
});
