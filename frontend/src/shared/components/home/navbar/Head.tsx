import Link from "next/link";


export const Head = ({ isUser }: { isUser: boolean }) => {

    return (
        <div className="flex gap-10 items-center">
            <div className="text-2xl font-bold text-primary">
                Task Management
            </div>
            <div className="flex justify-center items-center gap-3 font-semibold max-[800px]:hidden">
                <Link href={"/"} className="py-1 px-2 hover:text-foreground transition-all">Home</Link>
                <Link href={`${isUser ? "/board" : "/signin"}`} className="py-1 px-2 hover:text-foreground transition-all">Dashboard</Link>
            </div>
        </div>

    );
};
