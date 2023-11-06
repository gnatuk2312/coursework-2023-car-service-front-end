import { AuthResponseInterface } from "@/common/types/common.types";

interface SignInBodyInterface {
  email: string;
  password: string;
}

export interface SignInArgumentsInterface {
  body: SignInBodyInterface;
}

export type SignInResponseType = AuthResponseInterface;
