import { date } from "quasar";
import { FORMAT_DATE_STRING } from "../constants";

export const useConvertDateSupabase = (
  dataString: string | undefined
): Date | undefined => {
  return dataString
    ? date.extractDate(dataString, FORMAT_DATE_STRING)
    : undefined;
};
