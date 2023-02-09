<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> {{ titulo }} </q-toolbar-title>
        <q-space />
        <slot name="direita-toolbar" />
      </q-toolbar>
    </q-header>

    <AMenuDrawerPrincipal v-model="leftDrawerOpen" />

    <AMainPageContainer>
      <slot />
    </AMainPageContainer>
  </q-layout>
</template>

<script lang="ts">
import { ref } from "vue";
import AMenuDrawerPrincipal from "../menu-principal/AMenuDrawerPrincipal.vue";
import AMainPageContainer from "../common/AMainPageContainer.vue";

export default {
  props: {
    titulo: {
      type: String,
      default: "Agendamento",
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  components: { AMenuDrawerPrincipal, AMainPageContainer },
};
</script>
