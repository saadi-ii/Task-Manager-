import { BoardNavbar } from "@/features/board/components/BoardNavbar";
import { BoardList } from "@/features/board/components/BoardList";

export default function Page() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <BoardNavbar />
      <BoardList />
    </div>
  );
}
