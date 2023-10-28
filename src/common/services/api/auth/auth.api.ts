import axios from "axios";

import {
  GetUsersResponseType,
  SignInArgumentsInterface,
  SignInResponseType,
} from "./auth.types";
import baseAxiosInstance from "@/config/axios/base-instance";

export const signInRequest = async (
  args: SignInArgumentsInterface
): Promise<SignInResponseType> => {
  const { body } = args;

  return await baseAxiosInstance.post("/auth/sign-in", body);
};

export const getUsersRequest = async (): Promise<GetUsersResponseType> => {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
};
