import authAxiosInstance from "@/config/axios/auth-instance";
import {
  CreatePerformedWorkArgumentsInterface,
  CreatePerformedWorkResponseType,
  GetPerformedWorksByVehicleIdArgumentsInterface,
  GetPerformedWorksByVehicleIdResponseType,
} from "./performed-work.types";

export const createPerformedWorkRequest = async (
  args: CreatePerformedWorkArgumentsInterface
): Promise<CreatePerformedWorkResponseType> => {
  const { body } = args;

  return authAxiosInstance.post("/performed-works", body);
};

export const getPerformedWorksByVehicleIdRequest = async (
  args: GetPerformedWorksByVehicleIdArgumentsInterface
): Promise<GetPerformedWorksByVehicleIdResponseType> => {
  const { params } = args;

  return await authAxiosInstance.get(
    `/performed-works/vehicle/${params.vehicleId}`
  );
};
