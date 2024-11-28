import {createApp} from "vue";
import router from "@/router";
import errorHandler from "@/utils/error.ts";
import App from "./App.vue";
import "bootstrap";
import "@/style.css";
import "virtual:svg-icons-register";

const app = createApp(App);
app.config.errorHandler = errorHandler;
app.use(router);
app.mount("#app");
