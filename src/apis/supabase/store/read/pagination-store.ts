import { supabase } from "../../supabase-bootstrap";
import type { IRetornoQueryPaginada } from "./types";

export const useQueryPaginada = async <T>(
  tabela: string,
  pagina: number,
  quantidade: number,
  filtros?: string,
  nameFilter?: string
): Promise<IRetornoQueryPaginada<T>> => {
  const iniciar = pagina * quantidade;
  const parar = iniciar + quantidade;

  let query = supabase.from(tabela).select("*", { count: "exact" });

  if (filtros && nameFilter) {
    query = query.ilike(nameFilter, `%${filtros}%`);
  }

  const { data, count, error } = await query.range(iniciar, parar);

  const valores = (data ?? []) as T[];
  console.log(count! <= parar, { parar, count }, valores);
  return {
    dados: valores,
    terminouRegistro: count! <= iniciar + quantidade,
    erro: !!error,
    mensagem: error ? [error?.message] : [],
  };
};
