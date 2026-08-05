import axios from "axios";
import { cookies } from "next/headers";

export const SERVER_API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:9003";

export const api2 = async () => {
  const cookieStore = await cookies();
  return axios.create({
    baseURL: SERVER_API_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });
};
 