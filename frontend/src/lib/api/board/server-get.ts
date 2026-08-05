import { api2 } from "@/lib/api/baseURL.server";
import { Board } from "@/lib/types/board.types";

export const getBoardsServer = async () => {
  const { data } = await (await api2()).get("/board/get");
  return (data.boards || []) as Board[];
};
