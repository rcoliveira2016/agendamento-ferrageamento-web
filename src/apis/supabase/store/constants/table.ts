export const TABLE_CLIENTE = "cliente";
export const TABLE_CLIENTE_COLUNA = Object.freeze({
  id: "id",
  nome: "nome",
  local: "local",
});
export const VIEW_CLIENTE_CADASTRO = "clientes_cadastro";
export const TABLE_AGENDAMENTO = "agendamento";
export const TABLE_AGENADAMENTO_COLUNA = Object.freeze({
  observacoes: "observacoes",
  IdCliente: "idCliente",
  dataAgendamento: "dataAgendamento",
});
export const VIEW_CLIENTE_AGENADAMENTO = "clientes_agendamento";
export const VIEW_CLIENTE_AGENADAMENTO_COLUNA = Object.freeze({
  nome: "nome",
  local: "local",
  dataAgendamento: "dataAgendamento",
});
export const FUNCTION_EXCLUIR_CLIENTE = "excluir_cliente";
