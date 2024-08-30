import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/apis/supabase/supabase-bootstrap";
import App from "./App.vue";
import router from "./router";
import { registrarQuasar } from "@/bootstrap/quasar";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
registrarQuasar(app);
app.mount("#app");
