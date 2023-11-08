import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreateClientArgumentsInterface,
  CreateClientResponseType,
  GetAllClientsArgumentsInterface,
  GetAllClientsResponseType,
  GetClientByIdArgumentsInterface,
  GetClientByIdResponseType,
  UpdateClientArgumentsInterface,
  UpdateClientResponseType,
} from "./client.types";

export const createClientRequest = async (
  args: CreateClientArgumentsInterface
): Promise<CreateClientResponseType> => {
  const { body } = args;

  return await authAxiosInstance.post("/clients", body);
};

export const updateClientRequest = async (
  args: UpdateClientArgumentsInterface
): Promise<UpdateClientResponseType> => {
  const { params, body } = args;

  return await authAxiosInstance.put(`/clients/${params.id}`, body);
};

export const getClientByIdRequest = async (
  args: GetClientByIdArgumentsInterface
): Promise<GetClientByIdResponseType> => {
  const { params } = args;

  return await authAxiosInstance.get(`/clients/${params.id}`);
};

export const getAllClientsRequest = async (
  args: GetAllClientsArgumentsInterface
): Promise<GetAllClientsResponseType> => {
  const { query } = args;

  return await authAxiosInstance.get("/clients", { params: query });
};
