import { supabase } from "@/apis/supabase/supabase-bootstrap";

export const useUsuarioAtivoSessao = async () => {
  return (await supabase.auth.getSession()).data.session?.user;
};

export const useLoginPorEmailSenha = async (email: string, senha: string) => {
  await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });
};

export const useDeslogar = () => {
  supabase.auth.signOut();
};

(window as any).registrar = function () {
  supabase.auth.signUp({
    email: "ro@gmail.com",
    password: "1234567",
  });
};
