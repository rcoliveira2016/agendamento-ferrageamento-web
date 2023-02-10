import { Loading, LoadingBar, QSpinnerGears } from "quasar";

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

export const useLoadingBarRequestService = <T = undefined>(
  action: () => T,
  addTime = 0
) => {
  LoadingBar.start();
  const result = action();

  if (!addTime) LoadingBar.stop();
  else setTimeout(LoadingBar.stop, addTime);

  return result;
};

export function loadingRequestService(addTime = 0) {
  return function loadingRequestServic(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return useLoadingRequestService(
        () => original.apply(this, args),
        addTime
      );
    };
  };
}

export function loadingBarRequestService(addTime = 0) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return useLoadingBarRequestService(
        () => original.apply(this, args),
        addTime
      );
    };
  };
}
