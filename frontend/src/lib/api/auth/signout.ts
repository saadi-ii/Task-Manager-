import { api } from "@/lib/api/baseURL";

export const signout = async() => {
  return api.post("/user/signout");
};
