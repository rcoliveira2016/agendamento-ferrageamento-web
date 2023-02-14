<template>
  <q-card
    v-ripple
    tabindex="0"
    class="q-pa-md q-mb-md cursor-pointer q-hoverable"
    @click="showPopup"
  >
    <div class="text-weight-bolder">semana:</div>
    <div>
      {{ estadoListagem.dataInicioSemana?.toLocaleDateString() }} á
      {{ estadoListagem.dataFinalSemana?.toLocaleDateString() }}
    </div>
    <q-popup-proxy
      cover
      transition-show="scale"
      @before-hide="showFechar"
      transition-hide="scale"
    >
      <ADataPicker v-model="dataAtual" />
    </q-popup-proxy>
  </q-card>
</template>
<script lang="ts">
import { DATE_FORMAT_PT_BR } from "@/components/forms/constanst";
import ADataPicker from "@/components/forms/data-picker/ADataPicker.vue";
import { useListagemAgendamentoStore } from "@/stores/agendamento/listagem/listagem-agendamento-store";
import { mapActions, mapState } from "pinia";
import { date } from "quasar";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AListagemAgendamentoFiltroView",
  computed: {
    ...mapState(useListagemAgendamentoStore, ["estadoListagem"]),
  },
  data() {
    return {
      showPopUp: false,
      dataAtual: "",
    };
  },
  methods: {
    ...mapActions(useListagemAgendamentoStore, [
      "setarDatasSemana",
      "buscarRegistro",
    ]),
    showPopup() {
      this.showPopUp = true;
    },
    showFechar() {
      const dataSelecionada = date.extractDate(
        this.dataAtual,
        DATE_FORMAT_PT_BR
      );
      this.setarDatasSemana(dataSelecionada);
      this.buscarRegistro();
    },
  },
  components: { ADataPicker },
});
</script>
<style scoped></style>
