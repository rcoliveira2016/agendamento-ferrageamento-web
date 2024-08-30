import { Dialog } from "quasar";

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  okLabel?: string;
  cancelLabel?: string;
}
export const useConfirmDialog = async (options: ConfirmDialogOptions) => {
  const {
    title = "Confirmar",
    message = "Você tem certeza?",
    okLabel = "OK",
    cancelLabel = "Cancelar",
  } = options;

  return new Promise<boolean>((resolve) => {
    Dialog.create({
      title,
      message,
      dark: true,
      persistent: true,
      cancel: {
        label: cancelLabel,
        push: true,
        color: "negative",
      },
      ok: {
        label: okLabel,
        push: true,
        color: "accent",
      },
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false));
  });
};
