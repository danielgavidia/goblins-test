import { AuthContextType } from "@/app/x-components/general.auth-provider";

import { AuthContext } from "@/app/x-components/general.auth-provider";
import { auth } from "@/auth/auth.firebase-config";
import { firebaseAuth } from "@/auth/auth.login";
import { signOut } from "firebase/auth";
import { useContext } from "react";

export const useAuth = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const handleLogin = async () => {
    await firebaseAuth();
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return { user, handleLogin, handleLogout };
};
