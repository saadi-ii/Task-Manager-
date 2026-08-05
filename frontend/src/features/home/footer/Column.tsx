import Link from "next/link";

interface columnInterface {
    heading:string,
    arr:string[]
}

export const Column = ({heading, arr}:columnInterface) => {
    return (
        <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">{heading}</h3>
            <ul role="list" className="mt-6 space-y-4">
                {arr.map((item:string) => (
                    <li key={item}>
                        <Link href="" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors hover:underline decoration-chart-1 underline-offset-4">
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    );
};
