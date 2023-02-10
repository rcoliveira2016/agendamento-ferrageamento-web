import { defineStore } from "pinia";
import type { IListagemClienteStoreState } from "./types";
import { ClienteService } from "@/services/clientes/cliente-service";
import { useValidarRetornoPadraoService } from "@/core/service/validar-retorno-padrao-service";
const estadoListagemEmpty = {
  filtros: "",
  pagina: 0,
  quantidade: 20,
  carregouTodos: false,
  estaCarregando: false,
};
export const useListagemClientesStore = defineStore("listagemClientesStore", {
  state() {
    return {
      dados: [] as IListagemClienteStoreState[],
      estadoListagem: { ...estadoListagemEmpty },
    };
  },
  actions: {
    async inicar() {
      if (this.dados.length || this.estadoListagem.carregouTodos) return;
      await this.buscarSetarDados();
    },
    async recarregarDadosTela() {
      this.estadoListagem = { ...estadoListagemEmpty };
      this.dados = [];
      await this.buscarSetarDados();
    },
    async pesquisaTexto() {
      this.estadoListagem.carregouTodos = false;
      this.estadoListagem.pagina = 0;
      this.dados = [];
      await this.buscarSetarDados();
    },
    async buscarDados() {
      if (this.estadoListagem.carregouTodos) return [];

      this.estadoListagem.estaCarregando = true;
      const response = await ClienteService.listagem({
        filtros: this.estadoListagem.filtros,
        pagina: this.estadoListagem.pagina,
        quantidade: this.estadoListagem.quantidade,
      });

      if (!useValidarRetornoPadraoService(response)) return [];

      this.estadoListagem.estaCarregando = false;
      this.estadoListagem.carregouTodos = response.data.terminouRegistro;

      return response.data.dados;
    },
    async buscarSetarDados() {
      const dadosNovos = await this.buscarDados();
      this.estadoListagem.pagina++;

      this.dados = [...this.dados, ...dadosNovos];
    },
    async carregarMaisDados(_: number, done: (stop?: boolean) => void) {
      if (
        this.estadoListagem.carregouTodos ||
        this.estadoListagem.estaCarregando
      ) {
        done();
        return;
      }

      await this.buscarSetarDados();
      done();
    },
  },
});
