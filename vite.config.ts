import {UserConfig, ConfigEnv, loadEnv, defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// 定义别名
const alias: Record<string, string> = {
    "@": resolve(__dirname, "src"),
    "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
};

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    // 加载环境变量
    const env = loadEnv(mode, process.cwd());
    return {
        root: process.cwd(),
        resolve: { alias },
        plugins: [vue()],
        build: {
            outDir: "docs",
        }
    }
})
