import {
  onAuthStateChanged,
  type User,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-bootstrap";

export const useUsuarioAtivo = () => {
  return new Promise<User | null>((resolve, reject) => {
    const unsuscribe = onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      (e) => reject(e)
    );
    unsuscribe();
  });
};

export const useLoginPorEmailSenha = (email: string, senha: string) => {
  return signInWithEmailAndPassword(auth, email, senha);
};

export const useDeslogar = () => {
  signOut(auth);
};
