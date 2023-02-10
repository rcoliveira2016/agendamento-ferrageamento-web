<template>
  <q-input
    v-model="value"
    :label="label"
    :rules="regras"
    :lazy-rules="!!regras?.length"
    :type="typeInput"
    :debounce="debounce"
    :disable="disable"
  >
    <template v-if="!!iconLeft" v-slot:prepend>
      <q-icon :name="iconLeft" />
    </template>
    <template v-if="!!iconRight" v-slot:append>
      <q-icon :name="iconRight" />
    </template>
  </q-input>
</template>
<script lang="ts">
import type { ValidationRule } from "quasar";
import { defineComponent } from "vue";
import { isRequiredRule } from "@/core/quasar/validation-rule/is-required";
export default defineComponent({
  name: "AInputForm",
  emits: ["update:modelValue"],
  props: {
    modelValue: [String, Number],
    iconLeft: String,
    iconRight: String,
    label: String,
    isRequired: Boolean,
    isNumber: Boolean,
    isTextarea: Boolean,
    debounce: Number,
    disable: Boolean,
  },
  computed: {
    typeInput(): "text" | "number" | "textarea" | undefined {
      if (this.isNumber) return "number";
      if (this.isTextarea) return "textarea";
      return undefined;
    },
    regras(): ValidationRule[] | undefined {
      if (this.isRequired) {
        return [isRequiredRule];
      }
      return undefined;
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(valor: string | number) {
        this.$emit("update:modelValue", valor);
      },
    },
  },
});
</script>
