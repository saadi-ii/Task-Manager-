import { api } from "@/lib/api/baseURL";
import { CreateSubtaskPayload } from "@/lib/types/subtask.types";

export const createSubtask = (data: CreateSubtaskPayload) => {
  return api.post("/subtask/create", data);
};
