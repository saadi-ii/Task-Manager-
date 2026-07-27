import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export const BoardNavbar = () => {
  return (
    <div className="shrink-0">
      <nav className="flex bg-slate-100 text-slate-600 text-2xl max-sm:text-xl gap-10 justify-around items-center p-2">
        <div>Boards</div>
        <div>
          <Link href="/createBoard">
            <CiCirclePlus className="text-slate-600 size-10 max-sm:size-7" />
          </Link>
        </div>
      </nav>
    </div>
  );
};
