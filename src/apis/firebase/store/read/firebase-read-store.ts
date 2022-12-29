import { collection } from "firebase/firestore";
import { db } from "../../firebase-bootstrap";

export const useCollection = (path: string) => {
  return collection(db, path);
};
