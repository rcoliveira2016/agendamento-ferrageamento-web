<template>
  <ALayoutPadraoCadastro titulo="Cliente Consulta">
    <div class="q-my-lg full-width text-center" v-if="!registro.length">
      <strong>Sem dados</strong>
    </div>
    <q-card class="q-my-md" v-for="(item, index) in registro" :key="index">
      <q-card-section>
        <strong>Data agendamento: </strong> {{ item.data.toLocaleDateString() }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="q-mb-sm"><strong>Observações:</strong></div>
        <div>
          {{ item.observacoes }}
        </div>
      </q-card-section>
    </q-card>
  </ALayoutPadraoCadastro>
</template>
<script lang="ts">
import ALayoutPadraoCadastro from "@/components/layout/padrao/ALayoutPadraoCadastro.vue";
import { useUltimosAgendamentosStore } from "@/stores/consultas/ultimos/ultimos-agendamentos-store";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ACadastroAgendamentoView",
  beforeRouteEnter(to) {
    const id: string = to.params?.id as string;
    useUltimosAgendamentosStore().buscarDados(parseInt(id));
  },
  computed: { ...mapState(useUltimosAgendamentosStore, ["registro"]) },
  methods: {},
  components: { ALayoutPadraoCadastro },
});
</script>
