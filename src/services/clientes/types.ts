export interface IListagemClienteViewModel {
  id: number;
  nome: string;
  local: string;
}

export interface IParametroListagemCliente {
  pagina: number;
  quantidade: number;
  filtros: string;
}

export interface ICadastroClienteViewModel {
  id: number;
  nome: string;
  local: string;
  frequencia: number;
}
