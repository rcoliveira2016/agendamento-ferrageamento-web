<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="">
      <div class="window-height flex justify-center items-center">
        <q-card
          style="max-height: 280px"
          square
          bordered
          class="q-pa-lg shadow-1"
        >
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input v-model="email" type="email" label="email" />
              <q-input v-model="senha" type="password" label="senha" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              @click="logar"
              unelevated
              size="lg"
              class="full-width"
              label="Entrar"
              color="primary"
              no-caps
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapWritableState, mapActions } from "pinia";
import { useLoginStore } from "@/stores/autenticacao/login/login-store";
export default defineComponent({
  name: "ALoginView",
  computed: {
    ...mapWritableState(useLoginStore, ["email", "senha"]),
  },
  methods: {
    ...mapActions(useLoginStore, ["logar"]),
  },
});
</script>
