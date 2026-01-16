import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <DropdownMenuContext.Provider value={{ open, setOpen }}>
            <div className="relative inline-block text-left">{children}</div>
        </DropdownMenuContext.Provider>
    )
}

const DropdownMenuContext = React.createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => { } });


const DropdownMenuTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, onClick, children, asChild, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext);

    // If wrapping a child like Button, we should clone it to attach onClick, 
    // but for simplicity in this mockup, we'll just wrap it in a span if asChild is true,
    // or just assume standard button usage.
    // Actually, Radix asChild merges props. React.cloneElement is the way.

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(!open);
        onClick?.(e);
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: handleClick,
            // @ts-ignore
            ref
        });
    }

    return (
        <button
            ref={ref}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }
>(({ className, align = "center", ...props }, ref) => {
    const { open } = React.useContext(DropdownMenuContext);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 mt-2 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
                align === "end" ? "right-0" : "left-0",
                className
            )}
            {...props}
        />
    )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, onClick, ...props }, ref) => {
    const { setOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpen(false);
        onClick?.(e);
    }

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer",
                inset && "pl-8",
                className
            )}
            onClick={handleClick}
            {...props}
        />
    )
})
DropdownMenuItem.displayName = "DropdownMenuItem"


export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
}
