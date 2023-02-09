import { defineStore } from "pinia";
import type { ICadastroAgendamentoStoreState } from "./type";
const estadoCadastroEmpty = () => ({
  heNovo: true,
  registro: {
    dataAgendamento: new Date(),
    id: 0,
    idCliente: 0,
    nomeCliente: "",
    observacoes: "",
    quantidadeCavalo: 0,
  } as ICadastroAgendamentoStoreState,
});
export const useCadastroAgendamentoStore = defineStore(
  "useCadastroAgendamentoStore",
  {
    state() {
      return { ...estadoCadastroEmpty() };
    },
    actions: {
      async excluir() {
        //
      },
      async salvar() {
        //
      },
      async abrirTela(id?: string, idCliente?: string) {
        //
      },
    },
  }
);
