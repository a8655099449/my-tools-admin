import { defineConfig, UserConfigExport, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

// visualizer是 打包大小分析工具，执行build命令后，会在根目录生成 stats.html文件，可以打开分析项目文件大小
import visualizer from "rollup-plugin-visualizer";

import { viteMockServe } from "vite-plugin-mock";

export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [
    react(),
    visualizer(),
    viteMockServe({
      mockPath: "/src/mock",
      localEnabled: command === "serve",
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: 9996,
    proxy: {
      "/baidu_token": {
        target: "https://openapi.baidu.com/oauth/2.0/token",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baidu_token/, ""),
      },
    },
  },
});
