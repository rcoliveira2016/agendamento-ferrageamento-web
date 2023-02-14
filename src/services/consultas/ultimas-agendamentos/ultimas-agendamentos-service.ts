import {
  useRetornoPadraoServiceSucesso,
  type RetornoPadraoService,
  useRetornoPadraoServiceErro,
} from "@/core/service/types/retorno-padrao-service";
import { loadingRequestService } from "@/core/service/loading-request";
import type { IClienteUltimosAgendamentoViewModel } from "./types";
import {
  TABLE_AGENADAMENTO_COLUNA,
  TABLE_AGENDAMENTO,
} from "@/apis/supabase/store/constants/table";
import { useSelectCustom } from "@/apis/supabase/store/read/selects-custom";
import { useConvertDateSupabase } from "@/apis/supabase/store/ultis/convert-date";

class UltimosAgendamentosClass {
  private readonly nomaTabela = TABLE_AGENDAMENTO;

  @loadingRequestService(400)
  public async buscarUltimosAgendamentos(
    id: number
  ): Promise<RetornoPadraoService<IClienteUltimosAgendamentoViewModel[]>> {
    const { erro, mensagem, dado } = await useSelectCustom<any>(
      this.nomaTabela,
      `${TABLE_AGENADAMENTO_COLUNA.observacoes},${TABLE_AGENADAMENTO_COLUNA.dataAgendamento}`,
      {
        eq: { column: TABLE_AGENADAMENTO_COLUNA.IdCliente, value: id },
        orderBy: {
          column: TABLE_AGENADAMENTO_COLUNA.dataAgendamento,
          ascending: false,
        },
        range: { from: 0, to: 10 },
      }
    );
    const dados: IClienteUltimosAgendamentoViewModel[] = dado.map((x) => ({
      observacoes: x[TABLE_AGENADAMENTO_COLUNA.observacoes],
      data: useConvertDateSupabase(
        x[TABLE_AGENADAMENTO_COLUNA.dataAgendamento]
      )!,
    }));

    return erro
      ? useRetornoPadraoServiceErro(dados, mensagem)
      : useRetornoPadraoServiceSucesso(dados);
  }
}

export const UltimosAgendamentosService = new UltimosAgendamentosClass();
