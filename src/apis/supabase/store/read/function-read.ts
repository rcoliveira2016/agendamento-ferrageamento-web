import { supabase } from "../../supabase-bootstrap";
import type { IRetornoGet } from "./types";

export const useFunctionReadSelect = async <T = Record<string, any>>(
  name: string,
  parametros: any,
  map: (data: any) => T
): Promise<IRetornoGet<T[]>> => {
  
  const { data, error } = await supabase.rpc(name, parametros);
  if (error)
    return {
      dado: [],
      erro: !!error,
      mensagem: error ? [error?.message] : [],
    };

  if (!Array.isArray(data))
    return {
      dado: [],
      erro: false,
      mensagem: [],
    };

  return {
    dado: data.map((x) => map(x)),
    erro: false,
    mensagem: [],
  };
};
