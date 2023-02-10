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
} from "./types";
import {
  TABLE_AGENDAMENTO,
  TABLE_CLIENTE,
  TABLE_CLIENTE_COLUNA,
} from "@/apis/supabase/store/constants/table";
import {
  useGetCustom,
  useMontarSelectSubconsulta,
} from "@/apis/supabase/store/read/selects-custom";

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
        `*\n${useMontarSelectSubconsulta(TABLE_CLIENTE, [
          TABLE_CLIENTE_COLUNA.nome,
          TABLE_CLIENTE_COLUNA.local,
        ])}`
      );

    const dadoMapeado: ICadastroAgendamentoViewModel = {
      ...dado,
      nomeCliente: dado.cliente[0].nome,
      localCliente: dado.cliente[0].local,
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
      TABLE_CLIENTE,
      idCliete,
      `${TABLE_CLIENTE_COLUNA.nome},${TABLE_CLIENTE_COLUNA.local}`
    );

    return erro
      ? useRetornoPadraoServiceErro(dado, mensagem)
      : useRetornoPadraoServiceSucesso(dado);
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
}

export const AgendamentoService = new AgendamentoServiceClass();
