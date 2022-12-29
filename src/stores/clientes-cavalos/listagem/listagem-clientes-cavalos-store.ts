import { defineStore } from "pinia";
import type { IListagemClientesCavalosStoreState } from "./types";
import { ClienteCavaloService } from "@/services/clientes-cavalos/cliente-cavalo-service";
const estadoListagemEmpty = {
  filtros: "",
  ultimoItem: 0 as IListagemClientesCavalosStoreState | 0,
  quantidade: 35,
  carregouTodos: false,
  estaCarregando: false,
};
export const useListagemClientesCavalosStore = defineStore(
  "listagemClientesCavalosStore",
  {
    state() {
      return {
        dados: [] as IListagemClientesCavalosStoreState[],
        estadoListagem: { ...estadoListagemEmpty },
      };
    },
    actions: {
      async iniciarTela() {
        this.estadoListagem = { ...estadoListagemEmpty };
      },
      async buscarDados() {
        this.estadoListagem.estaCarregando = true;
        const { data } = await ClienteCavaloService.listagem({
          filtros: this.estadoListagem.filtros,
          ultimoItem: this.estadoListagem.ultimoItem,
          quantidade: this.estadoListagem.quantidade,
        });
        this.estadoListagem.ultimoItem = data[data.length - 1];
        this.estadoListagem.estaCarregando = false;
        return data;
      },
      async carregarMaisDados(index: number, done: () => void) {
        if (
          this.estadoListagem.carregouTodos ||
          this.estadoListagem.estaCarregando
        ) {
          done();
          return;
        }

        const dadosNovos = await this.buscarDados();
        this.estadoListagem.carregouTodos = !dadosNovos.length;

        this.dados = [...this.dados, ...dadosNovos];
        done();
      },
    },
  }
);
