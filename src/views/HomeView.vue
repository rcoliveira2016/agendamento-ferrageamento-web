<template>
  <ALayoutPadrao>
    <p class="text-h6">Agendamento</p>
    <p class="text-body2">
      {{ new Date().toLocaleString() }}
    </p>
  </ALayoutPadrao>
</template>
<script setup lang="ts">
import ALayoutPadrao from "@/components/layout/padrao/ALayoutPadrao.vue";
</script>
