import { api } from "@/lib/api/baseURL";
import { RenameSubtaskPayload } from "@/lib/types/subtask.types";

export const renameSubtask = (data: RenameSubtaskPayload) => {
  return api.patch("/subtask/rename", data);
};
