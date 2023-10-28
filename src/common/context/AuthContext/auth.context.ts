import { createContext, useContext } from "react";

import { AuthContextInterface } from "./auth.types";

const AuthContext = createContext<AuthContextInterface | null>(null);

const useAuthContext = (): AuthContextInterface => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};

export { AuthContext, useAuthContext };
