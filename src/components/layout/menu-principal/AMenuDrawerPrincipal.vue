<template>
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    overlay
    behavior="mobile"
    elevated
  >
    <q-scroll-area class="fit">
      <q-list>
        <AMenuDrawerPrincipalItem
          texto="Cliente Cavalo"
          icon="fa fa-sharp fa-solid fa-horse"
          @click="abrirCavalosCliente"
        />
        <q-separator />
        <AMenuDrawerPrincipalItem
          icon="fa fa-solid fa-right-from-bracket"
          texto="Deslogar"
          @click="deslogar"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import AMenuDrawerPrincipalItem from "./AMenuDrawerPrincipalItem.vue";
import { AuthService } from "@/services/auth-service/auth-service";
import router from "@/router";
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);
const leftDrawerOpen = computed<boolean>({
  get(): boolean {
    return props.modelValue;
  },
  set(value: boolean) {
    emits("update:modelValue", value);
  },
});
const abrirCavalosCliente = () =>
  router.push({ name: "clientes-cavalos-listagem" });
const deslogar = () => AuthService.deslogar();
</script>
