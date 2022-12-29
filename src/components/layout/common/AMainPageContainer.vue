<template>
  <q-page-container>
    <q-page :style-fn="myTweak" padding>
      <slot />
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AMainPageContainer",
  methods: {
    myTweak(offset: number) {
      return { height: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
  },
});
</script>
