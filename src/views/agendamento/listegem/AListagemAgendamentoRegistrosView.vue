<template>
  <q-list separator>
    <q-item v-if="!registros.length">
      <q-item-section avatar>
        <strong>Sem agendamentos</strong>
      </q-item-section>
    </q-item>
    <q-item
      :key="index"
      v-for="(item, index) in registros"
      clickable
      @click="abrirAgendamento(item)"
    >
      <q-item-section avatar>
        <q-icon :color="corIcone(item)" name="fa fa-light fa-horse-head" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.nomeCliente }}</q-item-label>
        <q-item-label caption>{{
          item.dataAgendamento.toLocaleDateString()
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { NAME_ROUTE_AGENDAMENTO_CADASTRO } from "@/router/constants";
import { useListagemAgendamentoStore } from "@/stores/agendamento/listagem/listagem-agendamento-store";
import type { IListagemAgendamentoStoreState } from "@/stores/agendamento/listagem/type";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AListagemAgendamentoRegistrosView",
  computed: {
    ...mapState(useListagemAgendamentoStore, ["registros"]),
  },
  methods: {
    corIcone(item: IListagemAgendamentoStoreState) {
      return item.marcado ? "primary" : "blue-grey-3";
    },
    abrirAgendamento(item: IListagemAgendamentoStoreState) {
      this.$router.push({
        name: NAME_ROUTE_AGENDAMENTO_CADASTRO,
        params: {
          id: item.id == 0 ? undefined : item.id,
        },
        query: {
          idCliente: item.idCliente,
          dataAgendamento: !item.id
            ? item.dataAgendamento.toISOString()
            : undefined,
        },
      });
    },
  },
});
</script>
<style scoped></style>
