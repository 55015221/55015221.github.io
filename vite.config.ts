import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// 定义别名
const alias: Record<string, string> = {
  "@": resolve(__dirname, "src"),
  "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  return {
    root: process.cwd(),
    resolve: { alias },
    server: {
      open: true,
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    build: {
      outDir: "docs",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          // 兼容github pages 替换以_开头的文件，避免404
          sanitizeFileName(name) {
            const match = /^[a-z]:/i.exec(name);
            const driveLetter = match ? match[0] : "";
            // substr 是被淘汰語法，因此要改 slice
            return driveLetter + name.slice(driveLetter.length).replace(/[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g, "");
          },
        },
      },
    },
  };
});
