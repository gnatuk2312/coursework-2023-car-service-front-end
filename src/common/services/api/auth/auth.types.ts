import { AuthResponseInterface } from "@/common/types/types.common";

export type GetUsersResponseType = any;

interface SignInBodyInterface {
  email: string;
  password: string;
}

export interface SignInArgumentsInterface {
  body: SignInBodyInterface;
}

export type SignInResponseType = AuthResponseInterface;
