import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export const BoardNavbar = () => {
  return (
    <div className="sticky top-0">
      <nav className="flex bg-slate-800 text-white text-2xl gap-10 justify-around items-center p-2">
        <div>Boards</div>
        <div>
          <Link href="/createBoard">
            <CiCirclePlus className="text-white size-10" />
          </Link>
        </div>
      </nav>
    </div>
  );
};
