import { type App } from "vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";

export function loadElementPlus(app: App) {
  /** Element Plus 组件完整引入 */
  app.use(ElementPlus);
}
