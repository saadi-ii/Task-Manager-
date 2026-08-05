"use client"
import { get } from "@/lib/api/auth/get";
import { useRouter } from "next/navigation";
import { Button } from '@base-ui/react';

export const Nevigate = () => {
    const router = useRouter();

    const fetchUser = async () => {
        try {
            await get();
            router.push("/board");
        } catch {
            router.push("/signin");
        }
    };
    return (
        <Button
            onClick={fetchUser}
            className="text-xl max-sm:text-lg text-card rounded-2xl bg-chart-1 mt-3 py-3 px-6 max-sm:px-5 max-sm:py-2 hover:bg-muted hover:text-chart-1 transition-all duration-[0.5s] ease-[ease-in-out] drop-shadow-2xl"
        >
            Start Your First Task
        </Button>
    )
}
