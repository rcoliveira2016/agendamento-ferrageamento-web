import { Quasar, Notify, LoadingBar, Dialog } from "quasar";
import quasarLang from "quasar/lang/pt-BR";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/dist/quasar.css";
import type { App } from "vue";

export const registrarQuasar = (app: App<Element>) => {
  app.use(Quasar, {
    plugins: { Notify, LoadingBar, Dialog }, // import Quasar plugins and add here
    lang: quasarLang,
    config: {
      brand: {
        primary: "#D33F49",
        secondary: "#73596C",
        accent: "#29513D",

        dark: "#212121",
        "dark-page": "#262730",

        positive: "#21BA45",
        negative: "#C10015",
        info: "#31CCEC",
        warning: "#F2C037",
      },
    },
  });
};
