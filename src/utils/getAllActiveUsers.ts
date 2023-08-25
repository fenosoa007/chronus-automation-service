import axios, { AxiosResponse } from "axios";
import { ChronusUser } from "../types/ChronusUser";

export const getAllActiveUsers = async (
  status: number = 0
): Promise<ChronusUser[]> => {
  // console.log(
  //   `${process.env.CHRONUS_BASE_URL}/members?status=${status}&api_key=${process.env.CHRONUS_API_KEY}`
  // );

  return axios
    .get(
      `${process.env.CHRONUS_BASE_URL}/members?status=${status}&api_key=${process.env.CHRONUS_API_KEY}`
    )
    .then(result => {
      console.log(result.status);
      return result.data as ChronusUser[];
    })
    .catch(err => {
      console.log(err.message);
      return [];
    });
};
