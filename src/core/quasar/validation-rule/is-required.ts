export const isRequiredRule = (val: string | number | undefined) =>
  !!val || "Campo é obrigatório";
