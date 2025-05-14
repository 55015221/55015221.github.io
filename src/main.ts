import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import { i18n } from "@/i18n";
import directives from "@/directive";
import { loadPlugins } from "@/plugins";

// 全局样式
import "@/assets/theme/index.scss";
import "@/assets/fonts/font-awesome.min.css";

const app = createApp(App);

// 挂载指令
app.use(directives);
/** 加载插件 */
loadPlugins(app);
// app.use(useVxeTable);
// app.use(ElementPlus);
app.use(store);
app.use(router);
app.use(i18n);
router.isReady().then(() => {
  app.mount("#app");
});
