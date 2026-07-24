import { api } from "@/lib/api/baseURL";
import { DeleteTaskPayload } from "@/lib/types/task.types";

export const deleteTask = (params: DeleteTaskPayload) => {
  return api.delete("/task/delete", { params });
};
