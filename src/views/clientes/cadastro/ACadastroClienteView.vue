<template>
  <ALayoutPadraoCadastro
    titulo="Cliente"
    @salvar="salvarValidar"
    @excluir="excluir"
    :mostrar-excluir="!heNovo"
  >
    <div class="fit">
      <q-form ref="form" class="tamanho-maximo-container-pagina margin-auto">
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.nome"
              label="Nome"
              icon-left="account_circle"
              is-required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.local"
              label="Local"
              icon-left="location_on"
              is-required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.frequencia"
              label="Frequência"
              icon-left="forward_5"
              is-required
              is-number
            />
          </div>
        </div>
      </q-form>
    </div>
    <ACadastroBasicoFloatingActionButton @salvar="salvarValidar" />
    <template v-slot:botoes-direita>
      <q-btn
        v-if="!heNovo"
        dense
        flat
        round
        icon="event_note"
        @click="novoAgendamento"
      />
    </template>
  </ALayoutPadraoCadastro>
</template>
<script lang="ts">
import ACadastroBasicoFloatingActionButton from "@/components/cadastros/floating-action-button/ACadastroBasicoFloatingActionButton.vue";
import AInputForm from "@/components/forms/campos/AInputForm.vue";
import ALayoutPadraoCadastro from "@/components/layout/padrao/ALayoutPadraoCadastro.vue";
import { useCadastroClientesStore } from "@/stores/clientes/cadastro/cadastro-clientes-store";
import { mapActions, mapState } from "pinia";
import type { QForm } from "quasar";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ACadastroClienteView",
  beforeRouteEnter(to) {
    const id: string | undefined = to.params?.id as string;
    useCadastroClientesStore().abrirTela(id);
  },
  setup() {
    return {
      form: ref<QForm>(),
    };
  },
  computed: {
    ...mapState(useCadastroClientesStore, ["registro", "heNovo"]),
  },
  methods: {
    ...mapActions(useCadastroClientesStore, ["salvar", "excluir"]),
    async salvarValidar() {
      if (await this.form?.validate()) {
        this.salvar();
      }
    },
    novoAgendamento() {
      //
    },
  },
  components: {
    ALayoutPadraoCadastro,
    AInputForm,
    ACadastroBasicoFloatingActionButton,
  },
});
</script>
