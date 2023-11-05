import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreateVisitArgumentsInterface,
  CreateVisitResponseType,
  GetAllVisitsResponseType,
} from "./visit.types";

export const getAllVisitsRequest =
  async (): Promise<GetAllVisitsResponseType> => {
    return await authAxiosInstance.get("/visits");
  };

export const createVisitRequest = async (
  args: CreateVisitArgumentsInterface
): Promise<CreateVisitResponseType> => {
  const { body } = args;

  return await authAxiosInstance.post("/visits", body);
};
