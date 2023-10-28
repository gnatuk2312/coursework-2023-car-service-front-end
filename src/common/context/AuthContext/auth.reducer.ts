import { AUTH_LOGOUT, AUTH_SIGN_IN } from "./auth.constants";
import { AuthActionsType, AuthStateType } from "./auth.types";

const authReducer = (
  state: AuthStateType,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case AUTH_SIGN_IN: {
      return { ...state, isAuthenticated: true };
    }
    case AUTH_LOGOUT: {
      return { ...state, isAuthenticated: false };
    }
  }
};

export { authReducer };
