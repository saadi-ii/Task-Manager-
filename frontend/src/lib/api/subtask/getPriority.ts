import { api } from "@/lib/api/baseURL";

export const getSubtaskPriority = (subtaskname: string, taskid: string) => {
  return api.get<string>("/subtask/getpriority", { params: { subtaskname, taskid } });
};
