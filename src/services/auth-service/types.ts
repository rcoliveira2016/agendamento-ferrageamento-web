export interface IUsuarioLogadoAuthService {
  email: string;
  id: string;
}

export interface ILoginRetornoAuthService {
  sucesso: boolean;
  mensagem?: string;
}
