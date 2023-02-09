<template>
  <q-item
    :key="index"
    v-for="(item, index) in dados"
    clickable
    @click="abrirCliente(item)"
  >
    <q-item-section avatar>
      <q-icon color="primary" name="fa fa-solid fa-user-large" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.nome }}</q-item-label>
      <q-item-label caption>{{ item.local }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
import { NAME_ROUTE_CLIENTE_CADASTRO } from "@/router/constants";
import type { IListagemClienteStoreState } from "@/stores/clientes/listagem/types";
import { defineComponent, type PropType } from "vue";
export default defineComponent({
  name: "AListagemClienteItem",
  props: {
    dados: Array as PropType<IListagemClienteStoreState[]>,
  },
  methods: {
    abrirCliente(item: IListagemClienteStoreState) {
      console.log(item);
      this.$router.push({
        name: NAME_ROUTE_CLIENTE_CADASTRO,
        params: {
          id: item.id,
        },
      });
    },
  },
});
</script>
