<template>
  <ALayoutPadrao titulo="Cliente">
    <div class="container-listagem">
      <AListagemClienteFiltro />
      <q-infinite-scroll
        :offset="50"
        :debounce="400"
        :disable="estadoListagem.carregouTodos"
        @load="carregarMaisDados"
      >
        <q-list separator>
          <AListagemClienteItem :dados="dados" />
        </q-list>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <template v-slot:direita-toolbar>
      <q-btn dense flat round icon="add" @click="novo" />
      <q-btn dense flat round icon="refresh" @click="recarregarDadosTela" />
    </template>
  </ALayoutPadrao>
</template>
<script lang="ts">
import ALayoutPadrao from "@/components/layout/padrao/ALayoutPadrao.vue";
import { useListagemClientesStore } from "@/stores/clientes/listagem/listagem-clientes-store";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import AListagemClienteItem from "./AListagemClienteItem.vue";
import { NAME_ROUTE_CLIENTE_CADASTRO } from "@/router/constants";
import AListagemClienteFiltro from "./filtro/AListagemClienteFiltro.vue";
export default defineComponent({
  name: "AListagemClienteView",
  computed: {
    ...mapState(useListagemClientesStore, ["dados", "estadoListagem"]),
  },
  created() {
    this.inicar();
  },
  methods: {
    ...mapActions(useListagemClientesStore, [
      "carregarMaisDados",
      "recarregarDadosTela",
      "inicar",
    ]),
    novo() {
      this.$router.push({ name: NAME_ROUTE_CLIENTE_CADASTRO });
    },
  },
  components: {
    ALayoutPadrao,
    AListagemClienteItem,
    AListagemClienteFiltro,
  },
});
</script>
<style scoped>
.container-listagem {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
