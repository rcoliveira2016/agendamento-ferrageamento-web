<template>
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    overlay
    behavior="mobile"
    elevated
  >
    <q-scroll-area class="fit">
      <div class="relative-position bg-secondary">
        <div class="q-pa-md bg-transparent">
          <q-avatar size="70px" class="q-mb-sm">
            <img src="@/assets/img/avatar.jpg" />
          </q-avatar>
          <div class="text-weight-bold text-subtitle1">Luiz</div>
          <div class="text-subtitle2 text-caption">@luis_ferrador</div>
        </div>
      </div>
      <q-separator />
      <q-list>
        <AMenuDrawerPrincipalItem
          texto="Cliente"
          icon="account_circle"
          @click="abrirCliente"
        />
        <q-separator />
        <AMenuDrawerPrincipalItem
          icon="transit_enterexit"
          texto="Sair"
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
import { NAME_ROUTE_CLIENTE_LISTAGEM } from "@/router/constants";
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
const abrirCliente = () => router.push({ name: NAME_ROUTE_CLIENTE_LISTAGEM });
const deslogar = () => AuthService.deslogar();
</script>
