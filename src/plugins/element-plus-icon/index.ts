import { type App } from "vue";
// 导入全局图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export function loadElementPlusIcon(app: App) {
  /** 注册所有图标 Element Plus Icon */
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
