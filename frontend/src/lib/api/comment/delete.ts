import { api } from "@/lib/api/baseURL";

export const deleteComment = (commentid: string) => {
  return api.delete("/comment/delete", { params: { commentid } });
};
