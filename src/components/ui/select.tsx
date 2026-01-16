import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

const SelectContext = React.createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
    value?: string;
    onValueChange?: (value: string) => void;
}>({ open: false, setOpen: () => { } });

const Select: React.FC<{
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode
}> = ({ defaultValue, onValueChange, children }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);

    const handleValueChange = (val: string) => {
        setValue(val);
        onValueChange?.(val);
        setOpen(false);
    };

    return (
        <SelectContext.Provider value={{ open, setOpen, value, onValueChange: handleValueChange }}>
            <div className="relative inline-block w-full">{children}</div>
        </SelectContext.Provider>
    )
}

const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(SelectContext);
    return (
        <button
            type="button"
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            onClick={() => setOpen(!open)}
            ref={ref}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, placeholder, ...props }, ref) => {
    const { value } = React.useContext(SelectContext);
    return (
        <span
            ref={ref}
            className={cn("block truncate", className)}
            {...props}
        >
            {value || placeholder}
        </span>
    )
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { open } = React.useContext(SelectContext);
    if (!open) return null;
    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 w-full mt-1",
                className
            )}
            {...props}
        >
            <div className="p-1 w-full bg-white dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
                {children}
            </div>
        </div>
    )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(SelectContext);
    return (
        <div
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer",
                className
            )}
            onClick={() => onValueChange?.(value)}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {selectedValue === value && <Check className="h-4 w-4" />}
            </span>
            <span className="truncate">{children}</span>
        </div>
    )
})
SelectItem.displayName = "SelectItem"

export {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
}
