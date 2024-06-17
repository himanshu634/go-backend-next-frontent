import { validateRewards } from "@/schema/rewards";
import axios, { Axios } from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3002" });

export function getRewards(sortBy?: string, ascending?: boolean) {
  return axiosInstance
    .get("/rewards", { params: { sortBy, ascending } })
    .then((res) => {
      return validateRewards(res.data);
    })
    .catch((e) => {
      console.log("Something went wrong!");
      return [];
    });
}
