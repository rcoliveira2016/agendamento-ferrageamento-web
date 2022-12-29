export interface RetornoPadraoService<T> {
  data: T;
  status: enumRetornoPadraoServiceStatus;
  mensagens?: string[];
}

export enum enumRetornoPadraoServiceStatus {
  ERRO = 1,
  SUCESSO = 2,
}

export const useRetornoPadraoServiceSucesso = <T>(
  data: T
): RetornoPadraoService<T> => {
  return {
    data,
    status: enumRetornoPadraoServiceStatus.SUCESSO,
  };
};
