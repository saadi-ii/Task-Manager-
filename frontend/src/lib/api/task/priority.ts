import { api } from "@/lib/api/baseURL";
import { TaskPriorityPayload } from "@/lib/types/task.types";

export const setTaskPriority = (data: TaskPriorityPayload)=> {
  return api.patch("/task/priority", data);
};
