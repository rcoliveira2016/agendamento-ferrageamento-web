import type {
  TABLE_CLIENTE,
  TABLE_CLIENTE_COLUNA,
} from "@/apis/supabase/store/constants/table";

export interface ICadastroAgendamentoViewModel {
  id: number;
  idCliente: number;
  nomeCliente: string;
  localCliente: string;
  observacoes: string;
  dataAgendamento: Date;
  quantidadeCavalo: number;
}

export interface ICadastroAgendamentoApiViewModel {
  id: number;
  idCliente: number;
  observacoes: string;
  dataAgendamento: Date;
  quantidadeCavalo: number;
  [TABLE_CLIENTE]: {
    [TABLE_CLIENTE_COLUNA.nome]: string;
    [TABLE_CLIENTE_COLUNA.local]: string;
  };
}

export interface ICadastroAgendamentoSalvarViewModel {
  id: number;
  idCliente: number;
  observacoes: string;
  dataAgendamento: Date;
  quantidadeCavalo: number;
}

export interface IBuscaClienteViewModel {
  [TABLE_CLIENTE_COLUNA.nome]: string;
  [TABLE_CLIENTE_COLUNA.local]: string;
}

export interface IListagemAgendamentoParametros {
  dataInicioSemana: Date;
  dataFinalSemana: Date;
}

export interface IListagemAgendamentoViewModel {
  id: number;
  nomeCliente: string;
  dataAgendamento: Date;
  quantidade: number;
}
