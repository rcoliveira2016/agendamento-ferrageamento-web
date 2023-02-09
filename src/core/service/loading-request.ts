import { Loading, QSpinnerGears } from "quasar";

export const useLoadingRequestService = <T = undefined>(
  action: () => T,
  addTime = 0
) => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const result = action();

  if (!addTime) Loading.hide();
  else setTimeout(Loading.hide, addTime);

  return result;
};

export function loadingRequestService(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    return useLoadingRequestService(() => original.apply(this, args));
  };
}
