import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_VUE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_VUE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_VUE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (import.meta.env.DEV) connectFirestoreEmulator(db, "localhost", 8080);

if (import.meta.env.DEV) connectAuthEmulator(auth, "http://localhost:9099");
export { auth, db };
