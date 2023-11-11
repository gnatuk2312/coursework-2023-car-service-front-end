import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreateVehicleArgumentsInterface,
  CreateVehicleResponseType,
  GetAllVehiclesArgumentsInterface,
  GetAllVehiclesResponseType,
  GetVehicleByIdArgumentsInterface,
  GetVehicleByIdResponseType,
  GetVehicleByOwnerIdArgumentsInterface,
  GetVehiclesByOwnerIdResponseType,
  UpdateVehicleArgumentsInterface,
  UpdateVehicleResponseType,
} from "./vehicle.types";

export const createVehicleRequest = async (
  args: CreateVehicleArgumentsInterface
): Promise<CreateVehicleResponseType> => {
  const { body } = args;

  return await authAxiosInstance.post("/vehicles", body);
};

export const updateVehicleRequest = async (
  args: UpdateVehicleArgumentsInterface
): Promise<UpdateVehicleResponseType> => {
  const { params, body } = args;

  return await authAxiosInstance.put(`/vehicles/${params.id}`, body);
};

export const getVehicleByIdRequest = async (
  args: GetVehicleByIdArgumentsInterface
): Promise<GetVehicleByIdResponseType> => {
  const { params } = args;

  return await authAxiosInstance.get(`/vehicles/${params.id}`);
};

export const getVehiclesByOwnerIdRequest = async (
  args: GetVehicleByOwnerIdArgumentsInterface
): Promise<GetVehiclesByOwnerIdResponseType> => {
  const { params } = args;

  return await authAxiosInstance.get(`/vehicles/owner/${params.ownerId}`);
};

export const getAllVehiclesRequest = async (
  args: GetAllVehiclesArgumentsInterface
): Promise<GetAllVehiclesResponseType> => {
  const { query } = args;

  return await authAxiosInstance.get("/vehicles", { params: query });
};
