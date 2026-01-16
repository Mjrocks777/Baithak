import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", // increased gap
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    header, // Added header prop
}: {
    name: string;
    className?: string;
    background?: ReactNode;
    Icon: any;
    description: ReactNode; // Changed to ReactNode
    href: string;
    cta: string;
    header?: ReactNode; // Added header prop type
}) => (
    <div
        key={name}
        className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-3xl", // rounded-3xl for softer look
            // light styles
            "bg-white hover:shadow-xl transition-all duration-300",
            // dark styles
            "dark:bg-black dark:border dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-neutral-800/50",
            className,
        )}
    >
        {/* Header for actions like Upvote/Delete */}
        {header && <div className="absolute top-4 right-4 z-20 transition-opacity duration-300 opacity-90 group-hover:opacity-100">{header}</div>}

        <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105">{background}</div>

        <div className="pointer-events-none z-10 flex flex-col gap-2 p-6 h-full justify-end bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:from-black/90 dark:via-black/60">
            <Icon className="h-8 w-8 text-neutral-700 dark:text-neutral-300 mb-1" />
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                {name}
            </h3>
            <div className="text-neutral-600 dark:text-neutral-400">{description}</div>

            {/* Reveal button on hover without shifting layout too much */}
            <div className="pt-2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 ease-in-out overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                <Button variant="default" asChild size="sm" className="pointer-events-auto cursor-pointer rounded-full w-fit">
                    <a href={href}>
                        {cta}
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        </div>
    </div>
);

export { BentoCard, BentoGrid };
