import { App, Directive } from "vue";

import watermark from "./watermark";
import auth from "./auth";
import debounce from "./debounce";

const directivesList: { [key: string]: Directive } = {
  watermark,
  debounce,
};

const directives = {
  install: function (app: App<Element>) {
    auth(app);
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key]);
    });
  },
};
export default directives;
