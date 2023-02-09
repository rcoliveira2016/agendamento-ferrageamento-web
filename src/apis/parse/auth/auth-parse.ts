import * as Parse from "parse";
console.log("asdasd");

export const useUsuarioAtivo = async () => {
  return Parse.User.currentAsync();
};

export const useLoginPorLoginSenha = async (login: string, senha: string) => {
  await Parse.User.logIn(login, senha);
};

export const useDeslogar = () => {
  Parse.User.logOut();
};
