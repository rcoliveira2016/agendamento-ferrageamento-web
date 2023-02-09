import type { IErrosSupabase } from "../store/types";

export interface IRetornoLogar extends IErrosSupabase {
  statusErro?: number;
}
