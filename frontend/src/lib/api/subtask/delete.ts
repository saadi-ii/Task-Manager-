import { api } from "@/lib/api/baseURL";
import { DeleteSubtaskPayload } from "@/lib/types/subtask.types";

export const deleteSubtask = (params: DeleteSubtaskPayload) => {
  return api.delete("/subtask/delete", { params });
};
