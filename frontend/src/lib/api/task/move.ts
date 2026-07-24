import { api } from "@/lib/api/baseURL";
import { MoveTaskPayload } from "@/lib/types/task.types";

export const moveTask = (data: MoveTaskPayload) => {
  return api.patch("/task/markcompletion", data);
};
