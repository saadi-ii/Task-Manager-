import { api } from "@/lib/api/baseURL";
import { SubtaskPriorityPayload } from "@/lib/types/subtask.types";

export const setSubtaskPriority = (data: SubtaskPriorityPayload) => {
  return api.patch("/subtask/priority", data);
};
