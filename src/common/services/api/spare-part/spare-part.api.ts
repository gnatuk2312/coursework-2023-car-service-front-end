import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreateSparePartArgumentsInterface,
  CreateSparePartResponseType,
  GetAllSparePartsArgumentsInterface,
  GetAllSparePartsResponseType,
} from "./spare-part.types";

export const createSparePartRequest = async (
  args: CreateSparePartArgumentsInterface
): Promise<CreateSparePartResponseType> => {
  const { body } = args;

  return await authAxiosInstance.post("/spare-parts", body);
};

export const getAllSparePartsRequest = async (
  args: GetAllSparePartsArgumentsInterface
): Promise<GetAllSparePartsResponseType> => {
  const { query } = args;

  return await authAxiosInstance.get("/spare-parts", { params: query });
};
