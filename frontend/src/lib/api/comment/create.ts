import { api } from "@/lib/api/baseURL";
import { Comment, CreateCommentPayload } from "@/lib/types/comment.types";

export const createComment = (data: CreateCommentPayload) => {
  return api.post<{ comment: Comment }>("/comment/create", data);
};
