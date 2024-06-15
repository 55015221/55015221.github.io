import { createApp } from "vue";
import router from "@/router";
import ArcoVue from "@arco-design/web-vue";
import errorHandler from "@/utils/error.ts";
import App from "./App.vue";
import "@/style.css";
import "@arco-design/web-vue/dist/arco.css";

import "virtual:svg-icons-register";

const app = createApp(App);
app.config.errorHandler = errorHandler;
app.use(ArcoVue);
app.use(router);
app.mount("#app");
