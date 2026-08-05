import { BoardList } from "@/features/board/components/BoardList";
import { Board } from "@/lib/types/board.types";
import { getBoardsServer } from "@/lib/api/board/server-get";
import { getno } from "@/lib/api/auth/getno"

export default async function Page() {
  let boards: Board[] = [];
  try {
    boards = await getBoardsServer();
  } catch (err) {
    console.error("Failed to fetch boards:", err);
  }

  let Todo: number = 0
  let Progress: number = 0
  let Completed: number = 0

  try {
    const res = await getno()
    Todo = res.todo;
    Progress = res.progress;
    Completed = res.completed;
  } catch(err) {
    console.log(err);
  }
  
  

  return (
    <div className="">
      <BoardList boards={boards} Todo={Todo} Progress={Progress} Completed={Completed}/>
    </div>
  );
}