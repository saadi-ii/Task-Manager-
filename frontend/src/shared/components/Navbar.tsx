import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 z-50">
      <nav className="flex flex-col w-fit h-screen bg-slate-900 z-50 text-white text-2xl gap-10 justify-center items-center p-5">
        <Link href="/">Home</Link>
        <Link href="/signup">Signup</Link>
      </nav>
    </div>
  );
};
