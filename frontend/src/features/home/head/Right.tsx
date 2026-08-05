import Image from 'next/image';


export const Right = () => {
    return (
        <div className="min-w-2/5 max-xl:min-w-3/4 h-[50vh] max-sm:h-[35vh] max-xl:h-[70vh] relative right-0" style={{ position: 'relative' }}>
            <div className="relative w-full h-full" style={{ position: 'relative' }}>
                <Image
                    src={"/personalboard.png"}
                    alt="board"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover border border-primary rounded-2xl rotate-5 hover:rotate-0 transition-all "
                />
            </div>
            <div className="w-1/3 h-[120%] absolute left-[50%] -top-[20%] rounded-4xl animate-[pivot_1.5s_ease-in-out_infinite_alternate]" style={{ position: 'absolute' }}>
                <Image
                    src={"/columns.png"}
                    alt="column"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain border-primary rounded-4xl"
                />
            </div>
        </div>
    );
};

