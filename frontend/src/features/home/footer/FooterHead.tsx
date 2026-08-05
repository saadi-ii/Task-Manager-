import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Crafty_Girls } from "next/font/google";

const craftyGirls = Crafty_Girls({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const FooterHead = () => {
    return (
        <div className="space-y-8 m-10">
            <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <CheckCircle2 className="size-5" />
                </div>
                <span className={`text-2xl max-sm:text-xl font-bold tracking-tight`}>Task <span className={`${craftyGirls.className} text-chart-1`}>Management</span></span>
            </div>
            <p className="text-sm leading-6 text-muted-foregro`und max-w-xs">
                Organize your work and simplify your life with our flexible workspace. Plan, track, and manage any project seamlessly.
            </p>
            <div className="flex space-x-6">
                {[
                    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/saadi-ii' },
                    { name: 'Twitter', icon: FaInstagram, href: 'https://www.instagram.com/saadi__iiii?igsh=MXBxdzBoajJyYWhieg==' },
                    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/saad-hameed-developer?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
                    { name: "Mail", icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=saadhameed588@gmail.com" },
                ].map((item) => (
                    <Link key={item.name} target="_blank" href={item.href} className="text-muted-foreground hover:text-chart-1 transition-all hover:scale-110 hover:-translate-y-1 duration-300">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                ))}
            </div>
        </div>

    );
};
