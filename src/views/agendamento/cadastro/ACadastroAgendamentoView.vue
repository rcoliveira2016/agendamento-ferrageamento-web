<template>
  <ALayoutPadraoCadastro
    titulo="Agendamento"
    @salvar="salvarValidar"
    @excluir="excluir"
    :mostrar-excluir="!heNovo"
  >
    <div class="fit">
      <q-form ref="form" class="tamanho-maximo-container-pagina margin-auto">
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.nomeCliente"
              label="Nome cliente"
              icon-left="account_circle"
              is-required
              disable
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.localCliente"
              label="local ferrageamento"
              icon-left="location_on"
              disable
              is-required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AInputDataPicker
              v-model="registro.dataAgendamento"
              label="Data agendamento"
              icon-left="calendar_month"
              is-required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.quantidadeCavalo"
              label="Quantidade"
              icon-left="fa fa-light fa-horse-head"
              is-number
              is-required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AInputForm
              v-model="registro.observacoes"
              label="Observacoes"
              icon-left="article"
              is-textarea
              is-required
              rows="3"
            />
          </div>
        </div>
      </q-form>
    </div>
    <ACadastroBasicoFloatingActionButton @salvar="salvarValidar" />
  </ALayoutPadraoCadastro>
</template>
<script lang="ts">
import ACadastroBasicoFloatingActionButton from "@/components/cadastros/floating-action-button/ACadastroBasicoFloatingActionButton.vue";
import AInputForm from "@/components/forms/campos/AInputForm.vue";
import AInputDataPicker from "@/components/forms/campos/date/AInputDataPicker.vue";
import ALayoutPadraoCadastro from "@/components/layout/padrao/ALayoutPadraoCadastro.vue";
import { useCadastroAgendamentoStore } from "@/stores/agendamento/cadastro/cadastro-agendamento-store";
import { mapActions, mapState } from "pinia";
import type { QForm } from "quasar";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ACadastroAgendamentoView",
  beforeRouteEnter(to) {
    const id: string | undefined = to.params?.id as string;
    const idCliente: string | undefined = to.params?.idCliente as string;
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
    AInputForm,
    AInputDataPicker,
  },
});
</script>
