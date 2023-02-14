<template>
  <ALayoutPadrao titulo="Agendamento">
    <div class="container-listagem">
      <AListagemAgendamentoFiltroView />
      <AListagemAgendamentoRegistrosView />
    </div>
  </ALayoutPadrao>
</template>
<script lang="ts">
import ALayoutPadrao from "@/components/layout/padrao/ALayoutPadrao.vue";
import { defineComponent } from "vue";
import AListagemAgendamentoRegistrosView from "./AListagemAgendamentoRegistrosView.vue";
import AListagemAgendamentoFiltroView from "./AListagemAgendamentoFiltroView.vue";
export default defineComponent({
  name: "AListagemClienteView",
  computed: {},
  created() {},
  methods: {},
  components: {
    ALayoutPadrao,
    AListagemAgendamentoRegistrosView,
    AListagemAgendamentoFiltroView,
  },
});
</script>
<style scoped></style>
