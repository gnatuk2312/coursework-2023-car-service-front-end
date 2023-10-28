import { FC, ReactNode, useReducer } from "react";

import { AuthStateType } from "./auth.types";
import { AuthContext } from "./auth.context";
import { authReducer } from "./auth.reducer";

type Props = {
  children: ReactNode;
};

const initialState: AuthStateType = {
  isAuthenticated: false,
};

const AuthProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
