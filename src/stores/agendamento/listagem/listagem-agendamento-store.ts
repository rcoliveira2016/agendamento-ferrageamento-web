import { defineStore } from "pinia";
import type { IListagemAgendamentoStoreState } from "./type";
import { useValidarRetornoPadraoService } from "@/core/service/validar-retorno-padrao-service";
import { AgendamentoService } from "@/services/agendamentos/agendamentos-service";
import { startEndDateWeek } from "@/core/date/date-start-end-week";
const estadoListagemEmpty = () => {
  const { end, start } = startEndDateWeek(new Date());
  return {
    registros: [] as IListagemAgendamentoStoreState[],
    estadoListagem: {
      dataInicioSemana: start,
      dataFinalSemana: end,
    },
  };
};
export const useListagemAgendamentoStore = defineStore(
  "useListagemAgendamentoStore",
  {
    state() {
      return { ...estadoListagemEmpty() };
    },
    actions: {
      setarDatasSemana(dataSelecionada: Date) {
        const { end, start } = startEndDateWeek(dataSelecionada);
        this.estadoListagem.dataFinalSemana = end;
        this.estadoListagem.dataInicioSemana = start;
      },
      async buscarRegistro() {
        if (
          !this.estadoListagem.dataFinalSemana ||
          !this.estadoListagem.dataInicioSemana
        )
          return;

        const response = await AgendamentoService.listagem({
          dataFinalSemana: this.estadoListagem.dataFinalSemana,
          dataInicioSemana: this.estadoListagem.dataInicioSemana,
        });

        if (!useValidarRetornoPadraoService(response)) return [];
        console.log(response.data);
        this.registros = response.data;
      },
    },
  }
);
