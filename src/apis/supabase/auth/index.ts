import { supabase } from "@/apis/supabase/supabase-bootstrap";
import type { IRetornoLogar } from "./types";
import { AuthRetryableFetchError } from "@supabase/supabase-js";

export const useUsuarioAtivoSessao = async () => {
  return (await supabase.auth.getSession()).data.session?.user;
};

export const useLoginPorEmailSenha = async (
  email: string,
  senha: string
): Promise<IRetornoLogar> => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });
  console.log(error, data)
  if (error instanceof AuthRetryableFetchError) {
    return {
      logadoComSucesso: false,
      erro: true,
      mensagem: ["não conseguiu se concectar ao servidor"],
    };
  }

  return {
    logadoComSucesso: !!data?.user,
    erro: !!error,
    mensagem: error ? ["usuário não encontrado inválida"] : [],
  };
};

export const useDeslogar = () => {
  supabase.auth.signOut();
};
