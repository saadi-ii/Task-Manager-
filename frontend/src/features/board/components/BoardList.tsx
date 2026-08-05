
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Board } from "@/lib/types/board.types";
import { DeleteButton } from "@/shared/components/task-subtask/DeleteButton";
import { Report } from "./Report";
import { Tip } from "./Tip";


interface BoardListProps {
  boards: Board[],
  Todo:number,
  Progress:number,
  Completed:number
}

export const BoardList = async ({boards,Todo,Progress,Completed}:BoardListProps) => {
  const refreshBoards = async () => {
    "use server";
    revalidatePath("/board","layout");
  };

  return (
    <div className="flex max-xl:flex-col justify-center max-xl:items-center gap-9">
      <div className="flex flex-1 flex-col gap-2 justify-start items-center w-full overflow-y-auto min-h-0 ">
        {boards.length > 0 ? (
          boards.map((board) => (
            <Link
              href={`/board/${board._id}`}
              key={board._id}
              className="w-full h-20 px-5 max-sm:h-15 flex justify-between items-center text-2xl max-sm:text-xl bg-muted rounded-2xl"
            >
              <div>
                <div className="max-w-100 truncate ">{board.boardname}</div>
                <div className="max-w-100 truncate text-sm">{board.boarddescription}</div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-1 text-xs bg-accent text-accent-foreground rounded-full px-3 py-1 border border-border"
                  title="Tasks in TO DO"
                >
                  <span className="font-semibold">{board.todoCount ?? 0}</span>
                  <span className="text-muted-foreground">to do</span>
                </div>
                {!board.isDefault && <DeleteButton mode="board" boardId={board._id} onSuccess={refreshBoards} />}
              </div>
            </Link>
          ))
        ) : (
          <p>No boards found</p>
        )}
      </div>
      <div className="flex flex-col max-sm:flex-col max-xl:flex-row max-xl:sticky max-xl:bottom-5 max-2xl:top-5 z-10  gap-5">
        <Report Todo={Todo} Progress={Progress} Completed={Completed}/>
        <Tip />
      </div>
    </div>
  );
};