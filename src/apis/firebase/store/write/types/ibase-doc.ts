export interface IBaseDoc {
  criadoEm: Date;
  _versao_: number;
}

export const useCriarItemBaseDoc = <T>(dado: T, versao = 1) => {
  return {
    ...dado,
    criadoEm: new Date(),
    _versao_: versao,
  } as IBaseDoc & T;
};
