import axios from "axios";
import { GetUsersResponseType } from "./auth.types";

export const getUsersRequest = async (): Promise<GetUsersResponseType> => {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
};
