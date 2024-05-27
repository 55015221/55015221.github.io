import {UserConfig, ConfigEnv, loadEnv, defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    // 加载环境变量
    const env = loadEnv(mode, process.cwd());
    return {
        root: process.cwd(),
        plugins: [vue()],
        build: {
            outDir: "docs",
        }
    }
})
