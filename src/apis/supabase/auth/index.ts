import { supabase } from "@/apis/supabase/supabase-bootstrap";
import type { IRetornoLogar } from "./types";

export const useUsuarioAtivoSessao = async () => {
  return (await supabase.auth.getSession()).data.session?.user;
};

export const useLoginPorEmailSenha = async (
  email: string,
  senha: string
): Promise<IRetornoLogar> => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });

  return {
    statusErro: error?.status,
    erro: !!error,
    mensagem: error ? [error?.message] : [],
  };
};

export const useDeslogar = () => {
  supabase.auth.signOut();
};
