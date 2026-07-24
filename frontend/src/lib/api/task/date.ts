import { api } from "@/lib/api/baseURL";
import { TaskDatePayload } from "@/lib/types/task.types";

export const setTaskDate = (data: TaskDatePayload) => {
  return api.patch("/task/date", data);
};
