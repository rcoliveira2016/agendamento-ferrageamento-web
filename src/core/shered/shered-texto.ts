import { useNotifyError } from "../notifications/notifications";

export const useCompartilharTexto = async (texto: string) => {
  try {
    const shareData = {
      title: "agendamento",
      text: texto,
    };

    if (!navigator.canShare(shareData)) {
      useNotifyError("Não é possuivel compartilhar");
      return;
    }

    await navigator.share(shareData);
  } catch (error) {
    useNotifyError("Erro inesperado ao tentar compartilhar");
  }
};
