import {
  useDeslogar,
  useLoginPorEmailSenha,
  useUsuarioAtivo,
} from "@/apis/firebase/firebase-auth";
import type {
  IUsuarioLogadoAuthService,
  ILoginRetornoAuthService,
} from "./types";
import { FirebaseError } from "firebase/app";
import router from "@/router";

class AuthServiceClass {
  async usuarioLogado(): Promise<IUsuarioLogadoAuthService | undefined> {
    const usuario = await useUsuarioAtivo();
    if (!usuario) return undefined;
    return {
      email: usuario.email ?? "",
      id: usuario.uid,
    };
  }

  async logar(email: string, senha: string): Promise<ILoginRetornoAuthService> {
    try {
      await useLoginPorEmailSenha(email, senha);
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
