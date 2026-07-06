import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/alchemy-rpc": {
        target: "https://base-mainnet.g.alchemy.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/alchemy-rpc/, ""),
      },
      "/alchemy-nft": {
        target: "https://base-mainnet.g.alchemy.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/alchemy-nft/, ""),
      },
    },
  },
});