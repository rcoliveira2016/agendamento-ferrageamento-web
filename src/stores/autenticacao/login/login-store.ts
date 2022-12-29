import { useNotifyError } from "@/core/notifications/notifications";
import router from "@/router";
import { AuthService } from "@/services/auth-service/auth-service";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", {
  state() {
    return {
      email: "",
      senha: "",
    };
  },
  actions: {
    async logar() {
      const retorno = await AuthService.logar(this.email, this.senha);
      console.log(retorno);
      if (retorno.sucesso) {
        router.push("/");
      } else if (retorno.mensagem) {
        useNotifyError(retorno.mensagem);
      }
    },
  },
});
