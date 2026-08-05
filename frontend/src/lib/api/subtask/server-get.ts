import { api2 } from "@/lib/api/baseURL.server";
import { Subtask } from "@/lib/types/subtask.types";

export const getSubtasksServer = async () => {
  const { data } = await (await api2()).get("/subtask/get");
  return (data.subtasks || []) as Subtask[];
};
 