import { api } from "@/lib/api/baseURL";
import { Board } from "@/lib/types/board.types";

export const getBoards = () => {
  return api.get<{ boards: Board[] }>("/board/get");
};
