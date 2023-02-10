import { supabase } from "../../supabase-bootstrap";
import type { IRetornoGet } from "./types";
export const useMontarSelectSubconsulta = (
  tabele: string,
  colunas: string[]
) => {
  const juncaoColuna = colunas.join(",\n");
  return `${tabele}(
    ${juncaoColuna}
  )`;
};

export const useGetCustom = async <T>(
  tabela: string,
  id: number,
  select: string
): Promise<IRetornoGet<T>> => {
  const { data, error } = await supabase
    .from(tabela)
    .select(select)
    .eq("id", id)
    .single<T>();

  return {
    dado: data!,
    erro: !!error,
    mensagem: error ? [error?.message] : [],
  };
};
