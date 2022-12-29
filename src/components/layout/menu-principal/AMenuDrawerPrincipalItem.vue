<template>
  <q-item clickable @click="clickEvento" v-ripple>
    <q-item-section avatar>
      <q-icon :name="props.icon" />
    </q-item-section>
    <q-item-section> {{ props.texto }} </q-item-section>
  </q-item>
</template>
<script lang="ts" setup>
const props = defineProps({
  texto: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["click"]);
const clickEvento = () => {
  emits("click");
};
</script>
