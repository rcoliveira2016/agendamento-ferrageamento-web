import {
  useRetornoPadraoServiceSucesso,
  type RetornoPadraoService,
  useRetornoPadraoServiceErro,
} from "@/core/service/types/retorno-padrao-service";
import { useUpdateOrInsert } from "@/apis/supabase/store/write/write-store";
import { useDelete } from "@/apis/supabase/store/write/delete-store";
import {
  loadingBarRequestService,
  loadingRequestService,
} from "@/core/service/loading-request";
import type {
  IBuscaClienteViewModel,
  ICadastroAgendamentoApiViewModel,
  ICadastroAgendamentoSalvarViewModel,
  ICadastroAgendamentoViewModel,
  IClienteUltimosAgendamentoViewModel,
  IListagemAgendamentoParametros,
  IListagemAgendamentoViewModel,
} from "./types";
import {
  TABLE_AGENADAMENTO_COLUNA,
  TABLE_AGENDAMENTO,
  TABLE_CLIENTE,
  TABLE_CLIENTE_COLUNA,
  VIEW_CLIENTE_AGENADAMENTO,
  VIEW_CLIENTE_AGENADAMENTO_COLUNA,
} from "@/apis/supabase/store/constants/table";
import {
  useGetCustom,
  useMontarSelectSubconsulta,
  useSelectCustom,
} from "@/apis/supabase/store/read/selects-custom";
import { useFunctionReadSelect } from "@/apis/supabase/store/read/function-read";
import { date } from "quasar";
import { FORMAT_DATE_STRING } from "@/apis/supabase/store/constants";
import { useConvertDateSupabase } from "@/apis/supabase/store/ultis/convert-date";

class AgendamentoServiceClass {
  private readonly nomaTabela = TABLE_AGENDAMENTO;

  @loadingRequestService(300)
  public async salvar(
    dados: ICadastroAgendamentoSalvarViewModel
  ): Promise<RetornoPadraoService<ICadastroAgendamentoSalvarViewModel>> {
    const { data, erro, mensagem } = await useUpdateOrInsert(
      this.nomaTabela,
      dados
    );

    return erro
      ? useRetornoPadraoServiceErro(data, mensagem)
      : useRetornoPadraoServiceSucesso(data, "salvo com sucesso");
  }

  @loadingBarRequestService(300)
  public async buscarAgendametoCliente(
    idCliete: number
  ): Promise<RetornoPadraoService<ICadastroAgendamentoViewModel>> {
    const { dado, erro, mensagem } =
      await useGetCustom<ICadastroAgendamentoApiViewModel>(
        this.nomaTabela,
        idCliete,
        `*,\n${useMontarSelectSubconsulta(TABLE_CLIENTE, [
          TABLE_CLIENTE_COLUNA.nome,
          TABLE_CLIENTE_COLUNA.local,
        ])}`
      );

    const dadoMapeado: ICadastroAgendamentoViewModel = {
      ...dado,
      nomeCliente: dado.cliente.nome,
      localCliente: dado.cliente.local,
      dataAgendamento: date.extractDate(
        dado.dataAgendamento as any as string,
        FORMAT_DATE_STRING
      ),
    };

    return erro
      ? useRetornoPadraoServiceErro(dadoMapeado, mensagem)
      : useRetornoPadraoServiceSucesso(dadoMapeado);
  }

  @loadingBarRequestService(300)
  public async buscarCliente(
    idCliete: number
  ): Promise<RetornoPadraoService<IBuscaClienteViewModel>> {
    const { dado, erro, mensagem } = await useGetCustom<IBuscaClienteViewModel>(
      VIEW_CLIENTE_AGENADAMENTO,
      idCliete,
      `${VIEW_CLIENTE_AGENADAMENTO_COLUNA.nome},${VIEW_CLIENTE_AGENADAMENTO_COLUNA.local},${VIEW_CLIENTE_AGENADAMENTO_COLUNA.dataAgendamento}`
    );

    const dadosTrado = {
      ...dado,
      dataAgendamento: useConvertDateSupabase(dado.dataAgendamento as any),
    };
    return erro
      ? useRetornoPadraoServiceErro(dado, mensagem)
      : useRetornoPadraoServiceSucesso(dadosTrado);
  }

  @loadingRequestService(400)
  public async excluir(
    dados: ICadastroAgendamentoViewModel
  ): Promise<RetornoPadraoService<ICadastroAgendamentoViewModel>> {
    const { erro, mensagem } = await useDelete(this.nomaTabela, dados);

    return erro
      ? useRetornoPadraoServiceErro(dados, mensagem)
      : useRetornoPadraoServiceSucesso(dados);
  }

  @loadingBarRequestService(300)
  public async listagem(
    parametros: IListagemAgendamentoParametros
  ): Promise<RetornoPadraoService<IListagemAgendamentoViewModel[]>> {
    const { dado, erro, mensagem } =
      await useFunctionReadSelect<IListagemAgendamentoViewModel>(
        "agendamentos_listagem",
        {
          inicio: parametros.dataInicioSemana,
          final: parametros.dataFinalSemana,
        },
        (x) => {
          return {
            marcado: !!x.marcado,
            id: x.id,
            nomeCliente: x.nomeCliente,
            dataAgendamento:
              useConvertDateSupabase(x.dataAgendamento) ?? new Date(),
            quantidade: x.quantidadeCavalo,
            idCliente: x.idCliente,
          };
        }
      );
    return erro
      ? useRetornoPadraoServiceErro(dado, mensagem)
      : useRetornoPadraoServiceSucesso(dado);
  }

  @loadingRequestService(400)
  public async buscarUltimosAgendamentos(
    id: number
  ): Promise<RetornoPadraoService<IClienteUltimosAgendamentoViewModel[]>> {
    const { erro, mensagem, dado } =
      await useSelectCustom<IClienteUltimosAgendamentoViewModel>(
        this.nomaTabela,
        `${TABLE_AGENADAMENTO_COLUNA.IdCliente},${TABLE_AGENADAMENTO_COLUNA.dataAgendamento}`,
        {
          eq: { column: TABLE_AGENADAMENTO_COLUNA.IdCliente, value: id },
          orderBy: {
            column: TABLE_AGENADAMENTO_COLUNA.dataAgendamento,
            ascending: false,
          },
          range: { from: 0, to: 10 },
        }
      );
    const dados = dado.map((x) => ({
      ...x,
      data: useConvertDateSupabase(x.data as any)!,
    }));

    return erro
      ? useRetornoPadraoServiceErro(dados, mensagem)
      : useRetornoPadraoServiceSucesso(dados);
  }
}

export const AgendamentoService = new AgendamentoServiceClass();
