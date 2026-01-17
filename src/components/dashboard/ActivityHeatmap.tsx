import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

// Generate heatmap data: all empty except the last one
const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    // 365 days back
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Exact logic: "dont fill the whole grids just fill the last grid with medium green"
        // i === 0 is today (since we're iterating backwards from 0)
        // Set intensity 3 for "medium green" if it's today, 0 otherwise.
        const intensity = i === 0 ? 3 : 0;

        data.push({
            date: date.toISOString().split('T')[0],
            intensity,
        });
    }
    return data.reverse(); // Oldest to newest, so today is last
};

const heatmapData = generateHeatmapData();

const intensityColors: Record<number, string> = {
    0: "bg-neutral-200 dark:bg-neutral-900", // Empty
    1: "bg-emerald-200 dark:bg-emerald-900",
    2: "bg-emerald-400 dark:bg-emerald-700",
    3: "bg-emerald-500 dark:bg-emerald-500", // Medium Green
    4: "bg-emerald-700 dark:bg-emerald-300",
};

export function ActivityHeatmap() {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                    <Calendar className="h-5 w-5" />
                    Activity
                </h3>
            </div>

            <div className="flex-1 w-full overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                    <div className="grid grid-rows-7 grid-flow-col gap-1">
                        {heatmapData.map((day, _i) => (
                            <div
                                key={day.date}
                                className={cn(
                                    "w-3 h-3 md:w-4 md:h-4 rounded-[2px] transition-colors",
                                    intensityColors[day.intensity] || intensityColors[0]
                                )}
                                title={`${day.date}: ${day.intensity > 0 ? 'Active' : 'No activity'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className={`w-3 h-3 rounded-[2px] ${intensityColors[0]}`} />
                <div className={`w-3 h-3 rounded-[2px] ${intensityColors[2]}`} />
                <div className={`w-3 h-3 rounded-[2px] ${intensityColors[4]}`} />
                <span>More</span>
            </div>
        </div>
    );
}
