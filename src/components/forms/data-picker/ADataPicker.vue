<template>
  <q-date v-model="value" minimal today-btn :mask="DATE_FORMAT_PT_BR">
    <div class="row items-center justify-end q-gutter-sm">
      <q-btn label="sair" color="primary" flat v-close-popup />
      <q-btn label="ok" color="primary" flat v-close-popup />
    </div>
  </q-date>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DATE_FORMAT_PT_BR } from "../constanst";
export default defineComponent({
  name: "ADataPicker",
  emits: ["update:modelValue"],
  props: {
    modelValue: [String],
  },
  data: () => ({ DATE_FORMAT_PT_BR }),
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(valor: string) {
        this.$emit("update:modelValue", valor);
      },
    },
  },
});
</script>
