import { api } from "@/lib/api/baseURL";
import { SignupPayload } from "@/lib/types/signup.types";

export const signin = (data: SignupPayload) => {
  return api.post("/user/signin", data);
};
