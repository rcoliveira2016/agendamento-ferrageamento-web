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
    config: {
      brand: {
        primary: "#1976d2",
        secondary: "#26A69A",
        accent: "#9C27B0",

        dark: "#212121",
        "dark-page": "#303030",

        positive: "#21BA45",
        negative: "#C10015",
        info: "#31CCEC",
        warning: "#F2C037",
      },
    },
  });
};
