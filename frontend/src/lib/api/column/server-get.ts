import { api2 } from "@/lib/api/baseURL.server";
import { Column } from "@/lib/types/column.types";

export const getColumnsServer = async (boardid: string) => {
  const { data } = await (await api2()).get("/column/get", {
    params: { boardid },
  });
  return (data.columns || []) as Column[];
};
