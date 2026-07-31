import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Crafty_Girls } from "next/font/google";

const craftyGirls = Crafty_Girls({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-transparent to-muted/50 border-t border-border/40 flex justify-center">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-chart-1 to-primary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <CheckCircle2 className="size-5" />
              </div>
              <span className={`text-2xl max-sm:text-xl font-bold tracking-tight`}>Task <span className={`${craftyGirls.className} text-chart-1`}>Management</span></span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
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
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Task Tracking', 'Project Management', 'Team Collaboration', 'Analytics'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors hover:underline decoration-chart-1 underline-offset-4">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Documentation', 'Guides', 'API Status', 'Contact Us'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors hover:underline decoration-chart-1 underline-offset-4">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors hover:underline decoration-chart-1 underline-offset-4">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors hover:underline decoration-chart-1 underline-offset-4">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border/40 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Task Management, Inc. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-muted-foreground flex items-center gap-1">
            Built with <span className="text-chart-1 animate-pulse">❤️</span> for better productivity
          </p>
        </div>
      </div>
    </footer>
  );
};
