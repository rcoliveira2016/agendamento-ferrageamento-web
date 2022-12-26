<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { useQuasar } from "quasar";

useQuasar().dark.set(true);
</script>
