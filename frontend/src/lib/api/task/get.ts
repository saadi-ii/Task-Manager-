import { api } from "@/lib/api/baseURL";
import { Task } from "@/lib/types/task.types";

export const getTasks = () => {
  return api.get<{ tasks: Task[] }>("/task/get");
};
