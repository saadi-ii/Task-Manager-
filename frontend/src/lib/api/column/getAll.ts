import { api } from "@/lib/api/baseURL";
import { Column } from "@/lib/types/column.types";

export const getAllColumns = () => {
  return api.get<{ columns: Column[] }>("/column/get");
};
