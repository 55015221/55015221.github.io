import autoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";

export default function viteAutoImport() {
  return autoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等,无需页面单独导入
    imports: ["vue", "vue-router", "pinia", "vue-i18n"],
    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    resolvers: [ElementPlusResolver(), IconsResolver({})],
    vueTemplate: true,
    // dts: false, // 配置文件位置 (false:关闭自动生成)
    dts: "src/types/auto-imports.d.ts",
  });
}
