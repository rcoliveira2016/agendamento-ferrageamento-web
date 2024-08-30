<template>
  <ALayoutPadraoCadastro
    titulo="Cliente"
    @salvar="salvarValidar"
    @excluir="confirmarExclusao"
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

        <q-card v-if="!!dadosAuxiliares?.dataAgendamentoAtual" class="q-my-md">
          <q-btn
            class="q-ma-sm"
            dense
            flat
            round
            icon="share"
            @click="compartilhar"
          />
          <q-separator />
          <q-card-section>
            <strong>Data agendamento atual: </strong>
            {{ dadosAuxiliares?.dataAgendamentoAtual?.toLocaleDateString() }}
          </q-card-section>
          <q-card-section>
            <strong>Data agendamento proxima: </strong>
            {{ dadosAuxiliares?.dataAgendamentoProxima?.toLocaleDateString() }}
          </q-card-section>
        </q-card>
      </q-form>
    </div>
    <ACadastroBasicoFloatingActionButton @salvar="salvarValidar" />
    <template v-slot:botoes-direita>
      <q-btn
        v-if="!heNovo"
        dense
        flat
        round
        icon="analytics"
        @click="consultaUltimosAgendamento"
      />
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
import {
  NAME_ROUTE_AGENDAMENTO_CADASTRO,
  NAME_ROUTE_ULTIMOS_AGENDAMENTO,
} from "@/router/constants";
import { useCadastroClientesStore } from "@/stores/clientes/cadastro/cadastro-clientes-store";
import { mapActions, mapState } from "pinia";
import type { QForm } from "quasar";
import { defineComponent, ref } from "vue";
import { useCampartilharAgendamento } from "@/helper/shered/campartilhar-agendamento";
import { useConfirmDialog } from "@/core/dialog/confirmar-dialog";

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
    ...mapState(useCadastroClientesStore, [
      "registro",
      "heNovo",
      "dadosAuxiliares",
    ]),
  },
  methods: {
    ...mapActions(useCadastroClientesStore, ["salvar", "excluir"]),
    async salvarValidar() {
      if (await this.form?.validate()) {
        this.salvar();
      }
    },
    novoAgendamento() {
      if (this.registro.id)
        this.$router.push({
          name: NAME_ROUTE_AGENDAMENTO_CADASTRO,
          params: {
            id: undefined,
          },
          query: {
            idCliente: this.registro.id,
          },
        });
    },
    consultaUltimosAgendamento() {
      if (this.registro.id)
        this.$router.push({
          name: NAME_ROUTE_ULTIMOS_AGENDAMENTO,
          params: {
            id: this.registro.id,
          },
        });
    },
    compartilhar() {
      if (!this.dadosAuxiliares) return;
      if (!this.dadosAuxiliares?.dataAgendamentoProxima) return;

      useCampartilharAgendamento({
        DataProxima: this.dadosAuxiliares.dataAgendamentoProxima,
        DataUltimo: this.dadosAuxiliares.dataAgendamentoAtual,
        Observacoes: this.dadosAuxiliares.observacoes,
      });
    },
    async confirmarExclusao() {
      const confirmou = await useConfirmDialog({
        cancelLabel: "Cancelar",
        okLabel: "Confirmar",
        message: "Tem certeza que deseja excluir o cliente?",
      });

      confirmou && this.excluir();
    },
  },
  components: {
    ALayoutPadraoCadastro,
    AInputForm,
    ACadastroBasicoFloatingActionButton,
  },
});
</script>
