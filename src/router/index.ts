import { createRouter, createWebHistory } from "vue-router";
import { AuthService } from "@/services/auth-service/auth-service";
import {
  NAME_ROUTE_AGENDAMENTO_CADASTRO,
  NAME_ROUTE_CLIENTE_CADASTRO,
  NAME_ROUTE_CLIENTE_LISTAGEM,
} from "./constants";

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
    {
      path: "/clientes/listagem",
      name: NAME_ROUTE_CLIENTE_LISTAGEM,
      component: () =>
        import("../views/clientes/listegem/AListagemClienteView.vue"),
    },
    {
      path: "/clientes/cadastro/:id?",
      name: NAME_ROUTE_CLIENTE_CADASTRO,
      component: () =>
        import("../views/clientes/cadastro/ACadastroClienteView.vue"),
    },
    {
      path: "/agendamento/cadastro/:idCliente/:id?",
      name: NAME_ROUTE_AGENDAMENTO_CADASTRO,
      component: () =>
        import("../views/agendamento/cadastro/ACadastroAgendamentoView.vue"),
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
