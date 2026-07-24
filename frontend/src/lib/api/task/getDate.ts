import { api } from "@/lib/api/baseURL";

export const getTaskDate = (taskname: string, columnid: string) => {
  return api.get<string>("/task/getdate", { params: { taskname, columnid } });
};
