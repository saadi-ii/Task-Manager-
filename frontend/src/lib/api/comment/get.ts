import { api } from "@/lib/api/baseURL";
import { Comment } from "@/lib/types/comment.types";

export const getComments = (taskid: string) => {
  return api.get<{ comments: Comment[] }>("/comment/get", { params: { taskid } });
};
