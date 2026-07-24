import { api } from "@/lib/api/baseURL";

export const getTaskPriority = (taskname: string, columnid: string) => {
  return api.get<string>("/task/getpriority", { params: { taskname, columnid } });
};
