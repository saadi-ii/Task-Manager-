import { api } from "@/lib/api/baseURL";

export const deleteBoard = (_id: string) => {
  return api.delete("/board/delete", { params: { _id } });
};
