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

export const useSelectCustom = async <T>(
  tabela: string,
  select: string,
  option?: {
    orderBy?: { column: string; ascending?: boolean };
    range?: { from: number; to: number };
    eq: { column: string; value: any };
  }
): Promise<IRetornoGet<T[]>> => {
  const query = supabase.from(tabela).select(select);
  if (option?.eq) {
    query.eq(option?.eq.column, option?.eq.value);
  }

  if (option?.orderBy?.column) {
    query.order(option.orderBy.column, { ascending: option.orderBy.ascending });
  }

  if (option?.range) {
    query.range(option?.range.from, option?.range.to);
  }

  const { data, error } = await query;

  return {
    dado: data as [],
    erro: !!error,
    mensagem: error ? [error?.message] : [],
  };
};
