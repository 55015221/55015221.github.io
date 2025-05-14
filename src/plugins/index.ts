import { type App } from "vue";
import { loadElementPlus } from "./element-plus";
import { loadElementPlusIcon } from "./element-plus-icon";
import { loadVxeTable } from "./vxe-table";

export const loadPlugins = (app: App) => {
  loadElementPlus(app);
  loadElementPlusIcon(app);
  loadVxeTable(app);
};
