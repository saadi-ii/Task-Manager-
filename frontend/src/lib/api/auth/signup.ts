import { api } from "@/lib/api/baseURL";
import { SignupPayload } from "@/lib/types/signup.types";

export const signup = (data: SignupPayload) => {
  return api.post("/signup/create", data);
};
