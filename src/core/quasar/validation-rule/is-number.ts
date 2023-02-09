export const isNumberRule = (val: string | undefined) =>
  Number.isInteger(val) || "Campo é só aceita numero";
