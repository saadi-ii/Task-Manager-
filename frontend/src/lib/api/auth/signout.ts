import { api } from "@/lib/api/baseURL";

export const signout = () => {
  return api.post("/user/signout");
};
