import { useQueryPaginada } from "@/apis/supabase/store/read/pagination-store";
import type {
  ICadastroClienteInputModel,
  ICadastroClienteRegistroViewModel,
  ICadastroClienteViewModel,
  IListagemClienteViewModel,
  IParametroListagemCliente,
} from "./types";
import {
  useRetornoPadraoServiceSucesso,
  type RetornoPadraoService,
  useRetornoPadraoServiceErro,
} from "@/core/service/types/retorno-padrao-service";
import { useUpdateOrInsert } from "@/apis/supabase/store/write/write-store";
import { useGet } from "@/apis/supabase/store/read/selects";
import {
  loadingBarRequestService,
  loadingRequestService,
} from "@/core/service/loading-request";
import {
  FUNCTION_EXCLUIR_CLIENTE,
  TABLE_CLIENTE,
  VIEW_CLIENTE_CADASTRO,
} from "@/apis/supabase/store/constants/table";
import { useConvertDateSupabase } from "@/apis/supabase/store/ultis/convert-date";
import type { IClienteCadastroView } from "@/apis/firebase/store/models/view/cliente";
import { useFunctionWrite } from "@/apis/supabase/store/write/function-write";

class ClienteServiceClass {
  private readonly nomaTabela = TABLE_CLIENTE;

  @loadingBarRequestService()
  public async listagem(parametros: IParametroListagemCliente) {
    const data = await useQueryPaginada<IListagemClienteViewModel>(
      this.nomaTabela,
      parametros.pagina,
      parametros.quantidade,
      parametros.filtros,
      "nome"
    );
    return data.erro
      ? useRetornoPadraoServiceErro(data, data.mensagem)
      : useRetornoPadraoServiceSucesso(data);
  }

  @loadingRequestService(300)
  public async salvar(
    dados: ICadastroClienteInputModel
  ): Promise<RetornoPadraoService<ICadastroClienteRegistroViewModel>> {
    const { data, erro, mensagem } = await useUpdateOrInsert(
      this.nomaTabela,
      dados
    );
    return erro
      ? useRetornoPadraoServiceErro(data, mensagem)
      : useRetornoPadraoServiceSucesso(data, "salvo com sucesso");
  }

  @loadingBarRequestService(300)
  public async buscarCliente(
    id: number
  ): Promise<RetornoPadraoService<ICadastroClienteViewModel>> {
    const { dado, erro, mensagem } = await useGet<IClienteCadastroView>(
      VIEW_CLIENTE_CADASTRO,
      id
    );

    const dados: ICadastroClienteViewModel = {
      registro: {
        frequencia: dado.frequencia,
        id: dado.id,
        local: dado.local,
        nome: dado.nome,
      },
      dadosAuxiliares: {
        dataAgendamentoAtual: useConvertDateSupabase(
          dado.dataAgendamentoAtual as any
        ),
        dataAgendamentoProxima: useConvertDateSupabase(
          dado.dataAgendamentoProxima as any
        ),
        observacoes: dado.observacoes,
      },
    };

    if (erro) return useRetornoPadraoServiceErro(dados, mensagem);
    return useRetornoPadraoServiceSucesso(dados);
  }

  @loadingRequestService(400)
  public async excluir(
    dados: ICadastroClienteInputModel
  ): Promise<RetornoPadraoService<ICadastroClienteRegistroViewModel>> {
    const { erro, mensagem } = await useFunctionWrite(
      FUNCTION_EXCLUIR_CLIENTE,
      { p_cliente_id: dados.id }
    );

    return erro
      ? useRetornoPadraoServiceErro(dados, mensagem)
      : useRetornoPadraoServiceSucesso(dados);
  }
}

export const ClienteService = new ClienteServiceClass();
