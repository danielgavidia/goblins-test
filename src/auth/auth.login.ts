import { auth } from "./auth.firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const firebaseAuth = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  return;
};
