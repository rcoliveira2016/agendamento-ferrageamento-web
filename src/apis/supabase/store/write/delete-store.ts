import { supabase } from "../../supabase-bootstrap";
import type { IDataRegistroId } from "../types";
import type { IRetornoDelete } from "./types";

export const useDelete = async <T extends IDataRegistroId>(
  tabela: string,
  dados: T
): Promise<IRetornoDelete> => {
  const { error } = await supabase.from(tabela).delete().eq("id", dados.id);

  return {
    erro: !!error,
    mensagem: error ? [error.message] : ["Excluido com sucesso"],
  };
};
