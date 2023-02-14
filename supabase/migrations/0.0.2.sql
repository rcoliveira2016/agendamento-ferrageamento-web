ALTER TABLE agendamento
RENAME COLUMN dataAgendamento TO "dataAgendamento";
ALTER TABLE agendamento
RENAME COLUMN idCliente TO "idCliente";
ALTER TABLE agendamento
RENAME COLUMN quantidadeCavalo TO "quantidadeCavalo";


CREATE OR REPLACE FUNCTION public.agendamentos_listagem(inicio date, final date)
  RETURNS TABLE (marcado int4
               , id   int4
               , "idCliente" int4
               , "dataAgendamento" date
               , "quantidadeCavalo" int4
               , "nomeCliente" varchar(400))
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    Select 
    1 as marcado, 
    agendamento.id AS id, 
    agendamento."idCliente", 
    agendamento."dataAgendamento", 
    agendamento."quantidadeCavalo", 
    COALESCE((Select cliente.nome from cliente where cliente.id = agendamento."idCliente" LIMIT 1), 'Usuario Excluido') as "nomeCliente"
  from agendamento where agendamento."dataAgendamento" between inicio and final
  union
  Select
    0 as marcado,
    0 as id,
    cliente.id as idCliente,
    (max(agendamento."dataAgendamento")+cliente.frequencia) as "dataAgendamento",
    agendamento."quantidadeCavalo" as "quantidadeCavalo",
    cliente.nome as "nomeCliente"
  from 
    cliente, agendamento
  where
    cliente.id = agendamento."idCliente"
    and agendamento."dataAgendamento" = (select max(ag."dataAgendamento") from agendamento ag where ag."idCliente" = cliente.id)
    and (agendamento."dataAgendamento" + cliente.frequencia) between inicio and final
  group by cliente.id, agendamento."quantidadeCavalo", cliente.frequencia;
END
$func$;

ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Choose which roles can execute functions
GRANT EXECUTE ON FUNCTION agendamentos_listagem TO authenticated;
GRANT EXECUTE ON FUNCTION agendamentos_listagem TO service_role;

