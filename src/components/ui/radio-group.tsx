import * as React from "react"
import { cn } from "@/lib/utils"
// Using context to share value
const RadioGroupContext = React.createContext<{
    value?: string;
    onValueChange?: (value: string) => void;
}>({});

const RadioGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        value?: string;
        onValueChange?: (value: string) => void;
    }
>(({ className, value, onValueChange, ...props }, ref) => {
    return (
        <RadioGroupContext.Provider value={{ value, onValueChange }}>
            <div className={cn("grid gap-2", className)} ref={ref} {...props} />
        </RadioGroupContext.Provider>
    )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const isChecked = context.value === value;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isChecked}
            className={cn(
                "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                isChecked ? "bg-primary text-primary-foreground" : "bg-transparent",
                className
            )}
            onClick={() => context.onValueChange?.(value)}
            ref={ref}
            {...props}
        >
            {isChecked && (
                <span className="flex items-center justify-center">
                    <span className="h-2 w-2 fill-current text-white bg-white rounded-full block" />
                </span>
            )}
        </button>
    )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
