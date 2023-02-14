<template>
  <q-list separator>
    <q-item :key="index" v-for="(item, index) in registros" clickable>
      <q-item-section avatar>
        <q-icon color="primary" name="fa fa-light fa-horse-head" />
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
import { useListagemAgendamentoStore } from "@/stores/agendamento/listagem/listagem-agendamento-store";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AListagemAgendamentoRegistrosView",
  computed: {
    ...mapState(useListagemAgendamentoStore, ["registros"]),
  },
  methods: {},
});
</script>
<style scoped></style>
