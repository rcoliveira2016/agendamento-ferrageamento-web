import { useQueryPaginadaMap } from "@/apis/firebase/store/read/firebase-pagination-store";
import type {
  IListagemClienteCavalo,
  IParametroListagemClienteCavalo,
} from "./types";
import { useRetornoPadraoServiceSucesso } from "@/core/service/types/retorno-padrao-service";

class ClienteCavaloServiceClass {
  public async listagem(parametros: IParametroListagemClienteCavalo) {
    const data = await useQueryPaginadaMap<IListagemClienteCavalo>(
      "cliente-cavalo",
      parametros.quantidade,
      parametros.ultimoItem,
      "cavalo",
      (doc) => {
        return {
          cavalo: doc.data()["cavalo"],
          cliente: doc.data()["cliente"],
          id: doc.id,
        };
      }
    );

    return useRetornoPadraoServiceSucesso(data.dados);
  }
}

export const ClienteCavaloService = new ClienteCavaloServiceClass();
