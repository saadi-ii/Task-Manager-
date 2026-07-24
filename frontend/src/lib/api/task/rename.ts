import { api } from "@/lib/api/baseURL";
import { RenameTaskPayload } from "@/lib/types/task.types";

export const renameTask = (data: RenameTaskPayload) => {
  return api.patch("/task/rename", data);
};
