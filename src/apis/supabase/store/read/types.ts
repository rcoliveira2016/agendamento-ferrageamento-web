import type { IErrosSupabase } from "../types";

export interface IRetornoQueryPaginada<TDado> extends IErrosSupabase {
  dados: Array<TDado>;
  terminouRegistro: boolean;
}

export interface IRetornoGet<TDado> extends IErrosSupabase {
  dado: TDado;
}
