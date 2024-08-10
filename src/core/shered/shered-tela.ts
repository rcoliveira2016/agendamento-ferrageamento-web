import { toPng } from "html-to-image";
import { useNotifyError } from "../notifications/notifications";

const getImageFileFromURL = async (imageURL: string, title: string) => {
  const response = await fetch(imageURL);
  const blob = await response.blob();
  return new File([blob], title, { type: blob.type });
};

export const useCompartilharTela = async () => {
  try {
    const dataUrl = await toPng(document.getElementById("app")!);

    const file = await getImageFileFromURL(dataUrl, "agentamento");

    const shareData = {
      title: "agendamento",
      files: [file],
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
