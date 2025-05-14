import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import { resolve } from "path";
import createVitePlugins from "./vite/plugins";

// 定义别名
const alias: Record<string, string> = {
  "@": resolve(__dirname, "src"),
  "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  console.log("env", env);

  return {
    base: "./",
    root: process.cwd(),
    optimizeDeps: { exclude: ["vue-demi"] },
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      host: "0.0.0.0",
      open: true,
      hmr: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/api/, ""),
        },
        "/go-api": {
          target: env.VITE_GO_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/go-api/, ""),
        },
      },
    },
    plugins: createVitePlugins(),
    resolve: { alias },
    css: {
      // CSS 预处理器 加载mixin
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or 'modern'
          silenceDeprecations: ["legacy-js-api"],
          additionalData: `@use "@/assets/theme/mixins/index.scss" as *;`,
        },
      },
    },
    define: {
      __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    build: {
      outDir: "dist",
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        // 优化分包
        output: {
          // manualChunks: {
          //     "vue": ['vue', 'element-plus', 'vue-router', 'axios']
          // }
          manualChunks: (id: any) => {
            if (id.includes("vue") || id.includes("pinia") || id.includes("vue-router") || id.includes("axios")) {
              return "vue";
            }
            if (id.includes("element-plus") || id.includes("@element-plus/icons-vue")) {
              return "element-plus";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
