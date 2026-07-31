import Image from "next/image";



export const Pic = () => {
    return (
        <div className="relative w-2/3 max-xl:w-5/6 max-sm:w-8/9 m-auto h-[75vh] max-xl:h-[30vh] max-sm:h-[20vh] shadow-2xl">
            <Image
                src="/overview.png"
                alt="overview"
                fill
                sizes="66vw"
                className="object-cover"
            />
        </div>
    );
};
