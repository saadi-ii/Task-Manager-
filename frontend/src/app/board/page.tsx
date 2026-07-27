import { BoardNavbar } from "@/features/board/components/BoardNavbar";
import { BoardList } from "@/features/board/components/BoardList";

export default function Page() {
  return (
    <div>
      <BoardNavbar />
      <BoardList />
    </div>
  );
}
