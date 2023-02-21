drop view if exists clientes_cadastro;
create
or replace VIEW public.clientes_cadastro AS (
  select
    cliente.id,
    cliente.frequencia,
    cliente.local,
    cliente.nome,
    max(agendamento."dataAgendamento") "dataAgendamentoAtual",
    max(agendamento."dataAgendamento"+cliente.frequencia) "dataAgendamentoProxima"
  from
    cliente
    left join agendamento on agendamento."idCliente" = cliente.id
  group by cliente.id,
    cliente.frequencia,
    cliente.local,
    cliente.nome
);
