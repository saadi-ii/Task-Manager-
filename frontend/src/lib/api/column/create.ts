import { api } from "@/lib/api/baseURL";
import { CreateColumnPayload } from "@/lib/types/column.types";

export const createColumn = (data: CreateColumnPayload) => {
  return api.post("/column/create", data);
};
