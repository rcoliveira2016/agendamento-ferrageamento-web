// outside of a Vue file
import { Notify } from "quasar";

export const useNotifyError = (mensagem: string) => {
  Notify.create({
    message: mensagem,
    position: "top-left",
    type: "negative",
  });
};
