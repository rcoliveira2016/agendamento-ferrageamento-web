import {
  useNotifyError,
  useNotifySuccess,
} from "@/core/notifications/notifications";
import {
  type RetornoPadraoService,
  enumRetornoPadraoServiceStatus,
} from "./types/retorno-padrao-service";

export const useValidarRetornoPadraoService = <T = undefined>(
  retorno: RetornoPadraoService<T>
): boolean => {
  if (retorno.status == enumRetornoPadraoServiceStatus.ERRO) {
    retorno.mensagens?.forEach((x) => useNotifyError(x));
    return false;
  }
  if (retorno.status == enumRetornoPadraoServiceStatus.SUCESSO) {
    retorno.mensagens?.forEach((x) => useNotifySuccess(x));
    return true;
  }
  return true;
};
