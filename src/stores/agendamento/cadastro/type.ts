export interface ICadastroAgendamentoStoreState {
  id: number;
  idCliente: number;
  nomeCliente: string;
  localCliente: string;
  observacoes: string;
  dataAgendamento: Date;
  quantidadeCavalo: number;
}
