import { api } from "@/lib/api/baseURL";

export const getno = () => {
  return api.get("/user/getno");
};