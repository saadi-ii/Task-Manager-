import { api } from "@/lib/api/baseURL";
import { DeleteColumnPayload } from "@/lib/types/column.types";

export const deleteColumn = (params: DeleteColumnPayload) => {
  return api.delete("/column/delete", { params });
};
