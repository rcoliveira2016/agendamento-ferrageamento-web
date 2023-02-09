import type {
  IUsuarioLogadoAuthService,
  ILoginRetornoAuthService,
} from "./types";
import { FirebaseError } from "firebase/app";
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
      console.log(resposta);
      if (!resposta.erro) return { sucesso: true };
      return {
        sucesso: false,
        mensagem: "usuário não encontrado inválida",
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        if (error.code === "auth/invalid-email") {
          return {
            sucesso: false,
            mensagem: "email inválido",
          };
        }
        if (error.code === "auth/invalid-password") {
          return {
            sucesso: false,
            mensagem: "senha inválida",
          };
        }
        if (error.code === "auth/user-not-found") {
          return {
            sucesso: false,
            mensagem: "usuário não encontrado inválida",
          };
        }
      }
    }
    return { sucesso: true };
  }

  async deslogar() {
    await useDeslogar();
    router.push("/login");
  }
}

export const AuthService = new AuthServiceClass();
