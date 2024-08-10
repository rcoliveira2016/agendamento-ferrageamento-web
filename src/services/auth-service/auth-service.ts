import type {
  IUsuarioLogadoAuthService,
  ILoginRetornoAuthService,
} from "./types";
import router from "@/router";
import {
  useUsuarioAtivoSessao,
  useLoginPorEmailSenha,
  useDeslogar,
} from "@/apis/supabase/auth";

class AuthServiceClass {
  async usuarioLogado(): Promise<IUsuarioLogadoAuthService | undefined> {
    const usuario = await useUsuarioAtivoSessao();
    if (!usuario) return undefined;
    return {
      email: usuario.email ?? "",
      id: usuario.id,
    };
  }

  async logar(email: string, senha: string): Promise<ILoginRetornoAuthService> {
    try {
      const resposta = await useLoginPorEmailSenha(email, senha);
      if (resposta.logadoComSucesso) return { sucesso: true };

      return {
        sucesso: !resposta.erro,
        mensagem: resposta.erro ? resposta.mensagem[0] : undefined,
      };
    } catch (error) {
      return {
        sucesso: false,
        mensagem: "erro inesperado",
      };
    }
  }

  async deslogar() {
    await useDeslogar();
    router.push("/login");
  }
}

export const AuthService = new AuthServiceClass();
