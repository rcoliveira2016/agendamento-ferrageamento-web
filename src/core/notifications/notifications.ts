import { Notify, type QNotifyCreateOptions } from "quasar";

const useNotifyBase = (opt: QNotifyCreateOptions) => {
  Notify.create({
    position: "top-left",
    type: "negative",
    progress: true,
    actions: [
      {
        icon: "close",
        color: "white",
      },
    ],
    ...opt,
  });
};

export const useNotifyError = (mensagem: string) => {
  useNotifyBase({
    message: mensagem,
    type: "negative",
  });
};

export const useNotifySuccess = (mensagem: string) => {
  useNotifyBase({
    message: mensagem,
    type: "positive",
  });
};
