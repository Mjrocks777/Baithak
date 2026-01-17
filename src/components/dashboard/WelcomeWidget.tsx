
import { User, CalendarClock } from "lucide-react";

interface WelcomeWidgetProps {
    name?: string;
    university?: string;
    stream?: string;
    age?: number;
    gender?: string;
}

export function WelcomeWidget({ name, university, stream, age, gender }: WelcomeWidgetProps) {
    // Get first initial or default to 'U'
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    const displayName = name || "User";

    return (
        <div className="h-full flex flex-col justify-center p-6 rounded-3xl bg-white dark:bg-black border border-neutral-200 dark:border-white/10">
            {/* Clean design, no gradients */}

            <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-pink-500">
                    <span className="text-4xl font-bold text-white">{initial}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {displayName}
                    </h2>

                    <div className="flex flex-col gap-1">
                        {university && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{university}</span>
                            </div>
                        )}
                        {stream && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarClock className="h-4 w-4" />
                                <span>{stream}</span>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                            {gender && (
                                <span className="text-sm font-medium px-2 py-0.5 rounded-md bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                                    {gender}
                                </span>
                            )}
                            {age && (
                                <span className="text-sm font-medium px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                    {age} years
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
