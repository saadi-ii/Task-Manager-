import { api } from "@/lib/api/baseURL";
import { Task } from "@/lib/types/task.types";
import { Subtask } from "@/lib/types/subtask.types";
import { Comment } from "@/lib/types/comment.types";

export const getTaskDetail = (taskid: string) => {
  return api.get<{ task: Task; subtasks: Subtask[]; comments: Comment[] }>(
    "/task/getall",
    { params: { taskid } }
  );
};
