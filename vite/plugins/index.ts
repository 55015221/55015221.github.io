import vue from "@vitejs/plugin-vue";
import { PluginOption } from "vite";

import viteAutoImport from "./auto-import";
import viteComponents from "./components";
import createIcons from "./icons";
import createMock from "./mock";
import viteCompression from "./compression";
import viteDevtools from "./devtools";

export default function createVitePlugins() {
  return <(PluginOption | PluginOption[])[]>[
    vue(),

    // viteDevtools(env),

    viteAutoImport(),
    viteComponents(),
    viteCompression(),
    createIcons(),
    createMock()
  ];
}
