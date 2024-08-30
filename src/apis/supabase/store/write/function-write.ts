import { supabase } from "../../supabase-bootstrap";
import type { IRetornoDelete } from "./types";

export const useFunctionWrite = async (
  name: string,
  parametros: any
): Promise<IRetornoDelete> => {
  const { error } = await supabase.rpc(name, parametros);

  return {
    erro: !!error,
    mensagem: error ? [error.message] : [],
  };
};
