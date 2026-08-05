export const FooterFoot = () => {
    return (
        <div className="mt-16 border-t border-border/40 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs leading-5 text-muted-foreground">
                &copy; {new Date().getFullYear()} Task Management, Inc. All rights reserved.
            </p>
            <p className="text-xs leading-5 text-muted-foreground flex items-center gap-1">
                Built with <span className="text-chart-1 animate-pulse">❤️</span> for better productivity
            </p>
        </div>
    );
};
