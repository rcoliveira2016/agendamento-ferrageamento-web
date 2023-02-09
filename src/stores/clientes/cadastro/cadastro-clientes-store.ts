import { defineStore } from "pinia";
import type { ICadastroClientesStoreState } from "./types";
import { ClienteService } from "@/services/clientes/cliente-service";
import { useValidarRetornoPadraoService } from "@/core/service/validar-retorno-padrao-service";
const estadoCadastroEmpty = () => ({
  heNovo: true,
  registro: {
    frequencia: 0,
    id: 0,
    local: "",
    nome: "",
  } as ICadastroClientesStoreState,
});
export const useCadastroClientesStore = defineStore("cadastroClientesStore", {
  state() {
    return { ...estadoCadastroEmpty() };
  },
  actions: {
    async excluir() {
      const response = await ClienteService.excluir(this.registro);
      if (!useValidarRetornoPadraoService(response)) return;

      this.heNovo = estadoCadastroEmpty().heNovo;
      this.registro = estadoCadastroEmpty().registro;
    },
    async salvar() {
      const response = await ClienteService.salvar(this.registro);
      if (!useValidarRetornoPadraoService(response)) return;

      this.heNovo = false;
      this.registro = response.data;
    },
    async abrirTela(id?: string) {
      this.heNovo = !id;
      if (this.heNovo) this.registro = estadoCadastroEmpty().registro;
      else if (id) {
        const response = await ClienteService.buscarCliente(parseInt(id));
        if (!useValidarRetornoPadraoService(response)) return;
        this.registro = response.data;
      }
    },
  },
});
