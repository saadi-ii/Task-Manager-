import { api } from "@/lib/api/baseURL";
import { CreateBoardPayload } from "@/lib/types/board.types";

export const createBoard = (data: CreateBoardPayload) => {
  return api.post("/board/create", data);
};
