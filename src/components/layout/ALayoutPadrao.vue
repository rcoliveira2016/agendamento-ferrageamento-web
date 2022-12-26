<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Title </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      elevated
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fa fa-sharp fa-solid fa-horse" />
            </q-item-section>
            <q-item-section> Cliente Cavalo </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="deslogar" v-ripple>
            <q-item-section avatar>
              <q-icon name="fa fa-solid fa-right-from-bracket" />
            </q-item-section>
            <q-item-section> Deslogar </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { AuthService } from "@/services/common/auth-service/auth-service";
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const deslogar = () => {
      AuthService.deslogar();
    };
    return {
      leftDrawerOpen,
      deslogar,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
