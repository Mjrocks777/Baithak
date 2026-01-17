import { BentoGrid } from "@/components/ui/bento-grid";
import { WelcomeWidget } from "@/components/dashboard/WelcomeWidget";
import { TimeSpentWidget } from "@/components/dashboard/TimeSpentWidget";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";

export default function Dashboard() {
    return (
        <div className="w-full pb-10">
            <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100 tracking-tight">
                Dashboard
            </h1>

            <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3">
                {/* Name Section - Spans 2 columns */}
                <div className="h-full w-full md:col-span-2 rounded-3xl">
                    <WelcomeWidget />
                </div>

                {/* Time Spent Section - Spans 1 column */}
                <div className="h-full w-full md:col-span-1 rounded-3xl">
                    <TimeSpentWidget />
                </div>

                {/* Activity Map Section - Spans full width (3 columns) */}
                <div className="h-full w-full md:col-span-3 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black/40 p-6 shadow-sm dark:shadow-none overflow-hidden">
                    <ActivityHeatmap />
                </div>
            </BentoGrid>
        </div>
    );
}
