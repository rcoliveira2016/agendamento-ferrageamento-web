export interface IListagemClienteCavalo {
  id: string;
  cliente: string;
  cavalo: string;
}

export interface IParametroListagemClienteCavalo {
  ultimoItem: IListagemClienteCavalo | 0;
  quantidade: number;
  filtros: string;
}
