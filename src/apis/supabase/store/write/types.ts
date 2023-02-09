import type { IDataRegistroId, IErrosSupabase } from "../types";

export interface IRetornoInsert extends IErrosSupabase {
  id: number;
}

export interface IRetornoUpdate extends IErrosSupabase {}

export interface IRetornoDelete extends IErrosSupabase {}

export interface IRetornoUpdateOrInsert<T extends IDataRegistroId>
  extends IErrosSupabase {
  data: T;
}
