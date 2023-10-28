import { Dispatch } from "react";

import { AUTH_LOGOUT, AUTH_SIGN_IN } from "./auth.constants";

export type AuthSignInActionType = {
  type: typeof AUTH_SIGN_IN;
};

export type AuthLogoutActionType = {
  type: typeof AUTH_LOGOUT;
};

export type AuthActionsType = AuthSignInActionType | AuthLogoutActionType;

export type AuthStateType = {
  isAuthenticated: boolean;
};

export interface AuthContextInterface {
  state: AuthStateType;
  dispatch: Dispatch<AuthActionsType>;
}
