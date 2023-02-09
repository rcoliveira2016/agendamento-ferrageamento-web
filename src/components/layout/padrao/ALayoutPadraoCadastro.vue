<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="arrow_back" @click="voltar" />

        <q-toolbar-title> {{ titulo }} </q-toolbar-title>
        <q-space />
        <slot name="botoes-direita" />
        <q-btn
          v-if="mostrarExcluir"
          dense
          flat
          round
          icon="delete"
          @click="excluir"
        />
      </q-toolbar>
    </q-header>

    <AMainPageContainer>
      <slot />
    </AMainPageContainer>
  </q-layout>
</template>

<script lang="ts">
import AMainPageContainer from "../common/AMainPageContainer.vue";

export default {
  props: {
    titulo: {
      type: String,
      default: "Agendamento",
    },
    mostrarAdd: {
      type: Boolean,
      default: false,
    },
    mostrarExcluir: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["excluir"],
  methods: {
    voltar() {
      this.$router.back();
    },
    excluir() {
      this.$emit("excluir");
    },
  },
  components: { AMainPageContainer },
};
</script>
