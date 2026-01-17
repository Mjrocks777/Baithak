
import { User, CalendarClock } from "lucide-react";

export function WelcomeWidget() {
    return (
        <div className="h-full flex flex-col justify-center p-6 rounded-3xl bg-white dark:bg-black border border-neutral-200 dark:border-white/10">
            {/* Clean design, no gradients */}

            <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-pink-500">
                    <span className="text-4xl font-bold text-white">M</span>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Meet Jain
                    </h2>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>Male</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarClock className="h-4 w-4" />
                            <span>20 years old</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
