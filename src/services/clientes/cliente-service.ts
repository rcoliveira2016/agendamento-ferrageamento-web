import { useQueryPaginada } from "@/apis/supabase/store/read/pagination-store";
import type {
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
import { useDelete } from "@/apis/supabase/store/write/delete-store";
import {
  loadingBarRequestService,
  loadingRequestService,
} from "@/core/service/loading-request";
import {
  TABLE_AGENDAMENTO,
  TABLE_CLIENTE,
  TABLE_CLIENTE_COLUNA,
} from "@/apis/supabase/store/constants/table";
import {
  useMontarSelectSubconsulta,
  useSelectCustom,
} from "@/apis/supabase/store/read/selects-custom";
import { useConvertDateSupabase } from "@/apis/supabase/store/ultis/convert-date";

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
    dados: ICadastroClienteViewModel
  ): Promise<RetornoPadraoService<ICadastroClienteViewModel>> {
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
    const { dado, erro, mensagem } = await useGet<ICadastroClienteViewModel>(
      this.nomaTabela,
      id
    );

    return erro
      ? useRetornoPadraoServiceErro(dado, mensagem)
      : useRetornoPadraoServiceSucesso(dado);
  }

  @loadingRequestService(400)
  public async excluir(
    dados: ICadastroClienteViewModel
  ): Promise<RetornoPadraoService<ICadastroClienteViewModel>> {
    const { erro, mensagem } = await useDelete(this.nomaTabela, dados);

    return erro
      ? useRetornoPadraoServiceErro(dados, mensagem)
      : useRetornoPadraoServiceSucesso(dados);
  }
}

export const ClienteService = new ClienteServiceClass();
