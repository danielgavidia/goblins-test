import { auth } from "./auth.firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const firebaseAuth = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log(result);

  return;
};
