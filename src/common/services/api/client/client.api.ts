import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreateClientArgumentsInterface,
  CreateClientResponseType,
  GetAllClientsArgumentsInterface,
  GetAllClientsResponseType,
} from "./client.types";

export const createClientRequest = async (
  args: CreateClientArgumentsInterface
): Promise<CreateClientResponseType> => {
  const { body } = args;

  return await authAxiosInstance.post("/clients", body);
};

export const getAllClientsRequest = async (
  args: GetAllClientsArgumentsInterface
): Promise<GetAllClientsResponseType> => {
  const { query } = args;

  return await authAxiosInstance.get("/clients", { params: query });
};
