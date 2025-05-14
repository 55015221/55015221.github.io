import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function viteComponents() {
  return Components({
    resolvers: [
      // 自动导入 Element Plus 组件
      ElementPlusResolver(),

      IconsResolver(),
    ],
    deep: true,
    dts: "src/types/components.d.ts",
    dirs: ["src/components"],
    include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/, /\.ts$/],
  });
}
