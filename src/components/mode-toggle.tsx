import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div
            className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/5 dark:bg-black/5 p-1 relative backdrop-blur-xl shadow-inner cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute w-8 h-8 rounded-full bg-white dark:bg-neutral-800 shadow-md z-0"
                style={{
                    left: theme === "dark" ? "calc(100% - 2.25rem)" : "0.25rem"
                }}
            />
            <div className="z-10 w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                <Sun size={16} className={theme === "light" ? "text-orange-500" : ""} />
            </div>
            <div className="z-10 w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                <Moon size={16} className={theme === "dark" ? "text-blue-400" : ""} />
            </div>
        </div>
    )
}
