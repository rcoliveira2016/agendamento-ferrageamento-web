import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/apis/supabase/supabase-bootstrap";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { registrarQuasar } from "@/bootstrap/quasar";

const app = createApp(App);

app.use(createPinia());
app.use(router);
registrarQuasar(app);
app.mount("#app");
