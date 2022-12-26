import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { AuthService } from "@/services/common/auth-service/auth-service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/autenticacao/login/ALoginView.vue"),
      meta: {
        publico: true,
      },
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (to.meta["publico"]) {
    next();
  } else {
    const user = await AuthService.usuarioLogado();
    console.log(user);
    if (user) {
      next();
    } else {
      next({ name: "login" });
    }
  }
});
export default router;
