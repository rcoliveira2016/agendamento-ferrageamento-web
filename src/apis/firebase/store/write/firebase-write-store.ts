import { addDoc } from "firebase/firestore";
import { useCollection } from "../read/firebase-read-store";
import { useCriarItemBaseDoc } from "./types/ibase-doc";

export const useAddDoc = async <T>(
  dado: T,
  colecao: string
): Promise<string> => {
  const docRef = await addDoc(
    useCollection(colecao),
    useCriarItemBaseDoc(dado)
  );

  return docRef.id;
};
