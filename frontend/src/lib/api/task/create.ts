import { api } from "@/lib/api/baseURL";
import { CreateTaskPayload } from "@/lib/types/task.types";

export const createTask = (data: CreateTaskPayload) => {
  return api.post("/task/create", data);
};
