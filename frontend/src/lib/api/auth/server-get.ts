import { api2 } from "@/lib/api/baseURL.server";

export const getUserServer = async () => {
  const { data } = await (await api2()).get("/user/get");
  return data;
};
