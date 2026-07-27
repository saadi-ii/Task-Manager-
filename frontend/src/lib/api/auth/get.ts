import { api } from "@/lib/api/baseURL";

export const get = () => {
  return api.get("/user/get");
};