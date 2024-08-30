export interface ICadastroClientesStoreState {
  id: number;
  nome: string;
  local: string;
  frequencia: number;
}
export interface ICadastroClientesDadosAuxiliaresStoreState {
  dataAgendamentoAtual?: Date;
  dataAgendamentoProxima?: Date;
  observacoes?: string;
}
