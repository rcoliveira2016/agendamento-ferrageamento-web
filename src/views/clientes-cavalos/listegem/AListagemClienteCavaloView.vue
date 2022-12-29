<template>
  <ALayoutPadrao titulo="Cliente Cavalo" @add="novo" mostrar-add>
    <div class="fit">
      <q-infinite-scroll class="fit" @load="carregarMaisDados" :offset="50">
        <q-list separator>
          <q-item :key="index" v-for="(item, index) in dados" dense>
            <q-item-section>
              <q-item-label> #{{ index }} - {{ item.cliente }} </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </ALayoutPadrao>
</template>
<script lang="ts">
import ALayoutPadrao from "@/components/layout/padrao/ALayoutPadrao.vue";
import { useListagemClientesCavalosStore } from "@/stores/clientes-cavalos/listagem/listagem-clientes-cavalos-store";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AListagemClienteCavaloView",
  computed: {
    ...mapState(useListagemClientesCavalosStore, ["dados"]),
  },
  created() {
    this.iniciarTela();
  },
  methods: {
    ...mapActions(useListagemClientesCavalosStore, [
      "carregarMaisDados",
      "iniciarTela",
    ]),
    novo() {
      this.$router.push({ name: "clientes-cavalos-cadastros" });
    },
  },
  components: { ALayoutPadrao },
});
</script>
