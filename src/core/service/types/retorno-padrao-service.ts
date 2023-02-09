export interface RetornoPadraoService<T = undefined> {
  data: T;
  status: enumRetornoPadraoServiceStatus;
  mensagens?: string[];
}

export enum enumRetornoPadraoServiceStatus {
  ERRO = 1,
  SUCESSO = 2,
}

export const useRetornoPadraoServiceSucesso = <T = undefined>(
  data: T,
  message?: string
): RetornoPadraoService<T> => {
  return {
    data,
    status: enumRetornoPadraoServiceStatus.SUCESSO,
    mensagens: message ? [message] : undefined,
  };
};

export const useRetornoPadraoServiceErro = <T = undefined>(
  data: T,
  mensagens?: string[]
): RetornoPadraoService<T> => {
  return {
    data,
    status: enumRetornoPadraoServiceStatus.ERRO,
    mensagens,
  };
};
