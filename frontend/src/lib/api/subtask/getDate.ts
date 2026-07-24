import { api } from "@/lib/api/baseURL";

export const getSubtaskDate = (subtaskname: string, taskid: string) => {
  return api.get<string>("/subtask/getdate", { params: { subtaskname, taskid } });
};
