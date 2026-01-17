
interface TimeSpentWidgetProps {
    subjectName?: string;
}

export function TimeSpentWidget({ subjectName }: TimeSpentWidgetProps) {
    const displaySubject = subjectName || "Operating Systems";

    return (
        <div className="h-full flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-black border border-neutral-200 dark:border-white/10 relative overflow-hidden group">
            {/* Removed gradient background as per "cleaner" request implication, though not explicitly asked for this widget, it fits the theme */}

            <div className="z-10 flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Time Spent Today
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-5xl font-bold tracking-tighter text-foreground">
                        27
                    </span>
                    <span className="text-xl text-muted-foreground font-medium">
                        mins
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    studying <span className="text-foreground font-semibold">{displaySubject}</span>
                </p>
            </div>

            <div className="z-10 mt-4">
                {/* Visual Bars: All 0/small except last one which is now taller */}
                <div className="flex items-end gap-1 h-12 w-full">
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-t-sm h-full relative overflow-hidden">
                        {/* Empty/No color */}
                    </div>
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-t-sm h-full relative overflow-hidden">
                        {/* Empty/No color */}
                    </div>
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-t-sm h-full relative overflow-hidden">
                        {/* Empty/No color */}
                    </div>
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-t-sm h-full relative overflow-hidden">
                        {/* Last day colored - Increased height to 95% to make it "longer" */}
                        <div className="absolute bottom-0 w-full bg-orange-500 h-[95%]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
