import { defineStore } from "pinia";
import type { ICadastroAgendamentoStoreState } from "./type";
import { useValidarRetornoPadraoService } from "@/core/service/validar-retorno-padrao-service";
import { AgendamentoService } from "@/services/agendamentos/agendamentos-service";
import router from "@/router";

const estadoCadastroEmpty = () => ({
  heNovo: true,
  registro: {
    dataAgendamento: new Date(),
    id: 0,
    idCliente: 0,
    nomeCliente: "",
    observacoes: "",
    quantidadeCavalo: 1,
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
        const response = await AgendamentoService.excluir(this.registro);
        if (!useValidarRetornoPadraoService(response)) return;

        this.heNovo = estadoCadastroEmpty().heNovo;
        this.registro = estadoCadastroEmpty().registro;
      },
      async salvar() {
        const resposta = await AgendamentoService.salvar({
          dataAgendamento: this.registro.dataAgendamento,
          id: this.registro.id,
          idCliente: this.registro.idCliente,
          observacoes: this.registro.observacoes,
          quantidadeCavalo: this.registro.quantidadeCavalo,
        });

        if (!useValidarRetornoPadraoService(resposta)) return;

        this.heNovo = false;
        this.registro = { ...this.registro, id: resposta.data.id };
      },
      async abrirTela(idCliente: undefined | string, id?: string) {
        const idNumero = id ? parseInt(id) : 0;
        this.heNovo = !idNumero;

        if (this.heNovo && idCliente) {
          this.setarRegistroNovo(parseInt(idCliente));
        } else if (idNumero) {
          this.setarRegistroExistente(idNumero);
        }
      },
      async setarRegistroNovo(idCliente: number) {
        const registroPadrao = estadoCadastroEmpty().registro;
        const response = await AgendamentoService.buscarCliente(idCliente);
        if (!useValidarRetornoPadraoService(response)) return;

        this.registro = {
          ...registroPadrao,
          idCliente: idCliente,
          nomeCliente: response.data.nome,
          localCliente: response.data.local,
          dataAgendamento:
            response.data.dataAgendamento ?? registroPadrao.dataAgendamento,
        };

        const dataQuery = router.currentRoute.value.query["dataAgendamento"];
        if (typeof dataQuery === "string")
          this.registro.dataAgendamento = new Date(dataQuery);
      },
      async setarRegistroExistente(id: number) {
        const response = await AgendamentoService.buscarAgendametoCliente(id);
        if (!useValidarRetornoPadraoService(response)) return;

        this.registro = response.data;
      },
    },
  }
);
