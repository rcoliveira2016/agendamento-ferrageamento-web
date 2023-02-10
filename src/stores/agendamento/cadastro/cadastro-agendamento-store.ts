import { defineStore } from "pinia";
import type { ICadastroAgendamentoStoreState } from "./type";
import { useValidarRetornoPadraoService } from "@/core/service/validar-retorno-padrao-service";
import { AgendamentoService } from "@/services/agendamentos/agendamentos-service";
const estadoCadastroEmpty = () => ({
  heNovo: true,
  registro: {
    dataAgendamento: new Date(),
    id: 0,
    idCliente: 0,
    nomeCliente: "",
    observacoes: "",
    quantidadeCavalo: 0,
    localCliente: "",
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
      async abrirTela(idCliente: undefined | string, id?: string) {
        const idNumero = id ? parseInt(id) : 0;
        this.heNovo = !idNumero;

        if (this.heNovo && idCliente) {
          const registroPadrao = estadoCadastroEmpty().registro;
          const response = await AgendamentoService.buscarCliente(
            parseInt(idCliente)
          );
          if (!useValidarRetornoPadraoService(response)) return;
          this.registro = {
            ...registroPadrao,
            idCliente: parseInt(idCliente),
            nomeCliente: response.data.nome,
            localCliente: response.data.local,
          };
        } else if (idNumero) {
          const response = await AgendamentoService.buscarAgendametoCliente(
            idNumero
          );
          if (!useValidarRetornoPadraoService(response)) return;
        }
      },
    },
  }
);
