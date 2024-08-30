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
  registro: ICadastroClienteRegistroViewModel;
  dadosAuxiliares: {
    dataAgendamentoAtual?: Date;
    dataAgendamentoProxima?: Date;
    observacoes?: string;
  };
}

export interface ICadastroClienteRegistroViewModel {
  id: number;
  nome: string;
  local: string;
  frequencia: number;
}

export interface ICadastroClienteInputModel {
  id: number;
  nome: string;
  local: string;
  frequencia: number;
}
