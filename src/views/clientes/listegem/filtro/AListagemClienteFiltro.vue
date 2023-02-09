<template>
  <div class="row" style="">
    <div class="col">
      <AInputForm
        v-model="estadoListagem.filtros"
        icon-left="search"
        @update:model-value="pesquisaTexto"
        :debounce="600"
      />
    </div>
  </div>
</template>
<script lang="ts">
import AInputForm from "@/components/forms/campos/AInputForm.vue";
import { useListagemClientesStore } from "@/stores/clientes/listagem/listagem-clientes-store";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AListagemClienteItem",
  computed: {
    ...mapState(useListagemClientesStore, ["estadoListagem"]),
  },
  methods: {
    ...mapActions(useListagemClientesStore, ["pesquisaTexto"]),
  },
  components: { AInputForm },
});
</script>
