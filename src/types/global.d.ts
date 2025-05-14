/// <reference types="vite/client" />

// 申明外部 npm 插件模块
declare module "js-cookie";
declare module "qs";
declare module "sortablejs";

// 声明一个模块，防止引入文件时报错
declare module "*.json";
declare module "*.png";
declare module "*.jpg";
declare module "*.scss";
declare module "*.ts";
declare module "*.js";

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明 ref
declare type RefType<T = any> = T | null;

/* Vite Env */
declare interface ViteEnv {
  readonly VITE_NODE_ENV: "development" | "production" | "test";
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_STORAGE_URL: string;
}
