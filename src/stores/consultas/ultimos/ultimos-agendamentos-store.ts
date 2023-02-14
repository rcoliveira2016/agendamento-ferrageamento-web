import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useValidarRetornoPadraoService } from "@/core/service/validar-retorno-padrao-service";
import { UltimosAgendamentosService } from "@/services/consultas/ultimas-agendamentos/ultimas-agendamentos-service";
import type { IClienteUltimosAgendamentoState } from "./types";
const estadoConsultaEmpty = () => ({
  registro: [] as IClienteUltimosAgendamentoState[],
});
export const useUltimosAgendamentosStore = defineStore(
  "UltimosAgendamentosStore",
  {
    state() {
      return { ...estadoConsultaEmpty() };
    },
    actions: {
      async buscarDados(id: number) {
        const response =
          await UltimosAgendamentosService.buscarUltimosAgendamentos(id);
        if (!useValidarRetornoPadraoService(response)) return;

        this.registro = response.data;
      },
    },
  }
);
