import { BoardNavbar } from "@/features/board/components/BoardNavbar";
import { CreateBoardForm } from "@/features/board/components/CreateBoardForm";

export default function Page() {
  return (
    <div>
      <BoardNavbar />
      <CreateBoardForm />
    </div>
  );
}
