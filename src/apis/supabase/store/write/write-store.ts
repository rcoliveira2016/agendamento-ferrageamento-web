import { supabase } from "../../supabase-bootstrap";
import type { IDataRegistroId } from "../types";
import type {
  IRetornoInsert,
  IRetornoUpdate,
  IRetornoUpdateOrInsert,
} from "./types";

export const useUpdateOrInsert = async <T extends IDataRegistroId>(
  tabela: string,
  dados: T
): Promise<IRetornoUpdateOrInsert<T>> => {
  if (dados.id) {
    const data = await useUpdate(tabela, dados);
    return {
      data: dados,
      erro: data.erro,
      mensagem: data.mensagem,
    };
  }

  const data = await useInsert(tabela, dados);
  return {
    data: { ...dados, id: data.id },
    erro: data.erro,
    mensagem: data.mensagem,
  };
};

export const useUpdate = async <T extends IDataRegistroId>(
  tabela: string,
  dados: T
): Promise<IRetornoUpdate> => {
  const { error } = await supabase.from(tabela).upsert(dados);

  return {
    erro: !!error,
    mensagem: error ? [error.message] : [],
  };
};

export const useInsert = async <T extends IDataRegistroId>(
  tabela: string,
  dados: T
): Promise<IRetornoInsert> => {
  const dadosSemId = { ...dados, id: undefined };
  const { data, error } = await supabase
    .from(tabela)
    .insert(dadosSemId)
    .select("id")
    .single();

  return {
    id: data?.id,
    erro: !!error,
    mensagem: error ? [error.message] : [],
  };
};
