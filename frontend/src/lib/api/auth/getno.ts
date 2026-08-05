import { api2 } from "@/lib/api/baseURL.server";

export const getno = async () => {
  const { data } = await (await api2()).get("/user/getno");
  return data;
}; 
