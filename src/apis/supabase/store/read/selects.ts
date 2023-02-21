import { supabase } from "../../supabase-bootstrap";
import type { IRetornoGet } from "./types";

export const useGet = async <T = Record<string, any>>(
  tabela: string,
  id: number
): Promise<IRetornoGet<T>> => {
  const { data, error } = await supabase
    .from(tabela)
    .select()
    .eq("id", id)
    .single();

  return {
    dado: data,
    erro: !!error,
    mensagem: error ? [error?.message] : [],
  };
};
