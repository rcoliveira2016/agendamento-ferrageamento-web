drop view if exists clientes_cadastro;
create
or replace VIEW public.clientes_cadastro AS (
  WITH AgendamentosFinal AS (
    SELECT 
        id,
        "idCliente",
        "dataAgendamento",
        "observacoes",
        ROW_NUMBER() OVER (PARTITION BY "idCliente" ORDER BY "dataAgendamento" DESC) AS rn
    FROM 
        agendamento
)


select
    cliente.id,
    cliente.frequencia,
    cliente.local,
    cliente.nome,
    AgendamentosFinal."dataAgendamento" "dataAgendamentoAtual",
    AgendamentosFinal."dataAgendamento"+cliente.frequencia "dataAgendamentoProxima",
    "observacoes"
  from
    cliente
    left join AgendamentosFinal on AgendamentosFinal."idCliente" = cliente.id AND 
    AgendamentosFinal.rn = 1
);

CREATE OR REPLACE FUNCTION excluir_cliente(p_cliente_id integer)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
    -- Exclui todos os agendamentos relacionados ao cliente
    DELETE FROM agendamento
    WHERE "idCliente" = p_cliente_id;

    -- Exclui o cliente
    DELETE FROM cliente
    WHERE id = p_cliente_id;
END;
$function$;

