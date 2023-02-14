<template>
  <q-input
    v-model="value"
    :label="label"
    :rules="regras"
    :mask="DATE_MASK_PT_BR"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <ADataPicker v-model="value" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { date, type ValidationRule } from "quasar";
import ADataPicker from "../../data-picker/ADataPicker.vue";
import { isRequiredRule } from "@/core/quasar/validation-rule/is-required";
import { isFormatDatePtBr } from "@/core/quasar/validation-rule/is-format-date-pt-br";
import { DATE_FORMAT_PT_BR, DATE_MASK_PT_BR } from "../../constanst";
export default {
  name: "AInputDataPicker",
  props: {
    modelValue: Date,
    label: String,
    isRequired: Boolean,
  },
  data: () => ({ DATE_MASK_PT_BR }),
  computed: {
    regras(): ValidationRule[] | undefined {
      const regras: ValidationRule[] = [isFormatDatePtBr];
      if (this.isRequired) {
        regras.push(isRequiredRule);
      }
      return regras;
    },
    value: {
      get(): string {
        return date.formatDate(this.modelValue, DATE_FORMAT_PT_BR);
      },
      set(valor: string) {
        this.$emit(
          "update:modelValue",
          date.extractDate(valor, DATE_FORMAT_PT_BR)
        );
      },
    },
  },
  components: { ADataPicker },
};
</script>
