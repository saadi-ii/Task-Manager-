import { api } from "@/lib/api/baseURL";
import { Column } from "@/lib/types/column.types";

export const getColumns = (boardid: string) => {
  return api.get<{ columns: Column[] }>("/column/get", { params: { boardid } });
};
