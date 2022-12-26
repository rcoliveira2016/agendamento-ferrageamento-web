import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/pt-BR";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/dist/quasar.css";
import type { App } from "vue";

export const registrarQuasar = (app: App<Element>) => {
  app.use(Quasar, {
    plugins: { Notify }, // import Quasar plugins and add here
    lang: quasarLang,
  });
};
