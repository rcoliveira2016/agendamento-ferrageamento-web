export interface IClienteCadastroView {
  id: number;
  nome: string;
  local: string;
  frequencia: number;
  dataAgendamentoAtual?: Date;
  dataAgendamentoProxima?: Date;
  observacoes?: string;
}
