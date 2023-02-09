<template>
  <ALayoutPadraoCadastro
    titulo="Agendamento"
    @salvar="salvarValidar"
    @excluir="excluir"
    :mostrar-excluir="!heNovo"
  >
    <div class="fit">
      <q-form ref="form" class="tamanho-maximo-container-pagina margin-auto">
      </q-form>
    </div>
    <ACadastroBasicoFloatingActionButton @salvar="salvarValidar" />
  </ALayoutPadraoCadastro>
</template>
<script lang="ts">
import ACadastroBasicoFloatingActionButton from "@/components/cadastros/floating-action-button/ACadastroBasicoFloatingActionButton.vue";
import ALayoutPadraoCadastro from "@/components/layout/padrao/ALayoutPadraoCadastro.vue";
import { useCadastroAgendamentoStore } from "@/stores/agendamento/cadastro/cadastro-agendamento-store";
import { mapActions, mapState } from "pinia";
import type { QForm } from "quasar";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ACadastroAgendamentoView",
  beforeRouteEnter(to) {
    const id: string | undefined = to.params?.id as string;
    const idCliente: string | undefined = to.params?.id as string;
    useCadastroAgendamentoStore().abrirTela(idCliente, id);
  },
  setup() {
    return {
      //
      form: ref<QForm>(),
    };
  },
  computed: {
    ...mapState(useCadastroAgendamentoStore, ["registro", "heNovo"]),
  },
  methods: {
    ...mapActions(useCadastroAgendamentoStore, ["salvar", "excluir"]),
    async salvarValidar() {
      if (await this.form?.validate()) {
        this.salvar();
      }
    },
  },
  components: {
    ACadastroBasicoFloatingActionButton,
    ALayoutPadraoCadastro,
  },
});
</script>
