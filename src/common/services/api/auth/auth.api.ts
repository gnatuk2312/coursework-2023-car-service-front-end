import baseAxiosInstance from "@/config/axios/base-instance";
import { SignInArgumentsInterface, SignInResponseType } from "./auth.types";

export const signInRequest = async (
  args: SignInArgumentsInterface
): Promise<SignInResponseType> => {
  const { body } = args;

  return await baseAxiosInstance.post("/auth/sign-in", body);
};
