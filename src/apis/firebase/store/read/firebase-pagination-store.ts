import {
  query,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  type DocumentData,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { useCollection } from "./firebase-read-store";

export interface IRetornoQueryPaginada<TDado = DocumentData> {
  dados: Array<QueryDocumentSnapshot<TDado>>;
  terminouRegistro: boolean;
}

export interface IRetornoQueryPaginadaMap<TDado> {
  dados: Array<TDado>;
  terminouRegistro: boolean;
}

export const useQueryPaginada = async <T = DocumentData>(
  colecao: string,
  quantidade: number,
  comecarEm: T | 0,
  ordenacao: string
): Promise<IRetornoQueryPaginada> => {
  const data = await getDocs(
    query(
      useCollection(colecao),
      orderBy(ordenacao),
      startAfter(comecarEm),
      limit(quantidade)
    )
  );

  return {
    dados: data.docs,
    terminouRegistro: data.empty,
  };
};

export const useQueryPaginadaMap = async <T = DocumentData>(
  colecao: string,
  quantidade: number,
  comecarEm: T | 0,
  ordenacao: string,
  map: (doc: QueryDocumentSnapshot<DocumentData>) => T
): Promise<IRetornoQueryPaginadaMap<T>> => {
  const querySnap = await useQueryPaginada(
    colecao,
    quantidade,
    comecarEm,
    ordenacao
  );

  const retorno: T[] = [];
  querySnap.dados.forEach((doc) => {
    retorno.push(map(doc));
  });
  return {
    dados: retorno,
    terminouRegistro: querySnap.terminouRegistro,
  };
};
