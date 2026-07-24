import { api } from "@/lib/api/baseURL";
import { SubtaskDatePayload } from "@/lib/types/subtask.types";

export const setSubtaskDate = (data: SubtaskDatePayload) => {
  return api.patch("/subtask/date", data);
};
