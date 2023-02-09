<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="save" color="primary" @click="emits('salvar')" />
  </q-page-sticky>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
const emits = defineEmits(["salvar"]);
</script>
