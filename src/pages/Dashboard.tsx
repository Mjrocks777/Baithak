import { BentoGrid } from "@/components/ui/bento-grid";
import { WelcomeWidget } from "@/components/dashboard/WelcomeWidget";
import { TimeSpentWidget } from "@/components/dashboard/TimeSpentWidget";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
    name: string;
    university: string;
    stream: string;
    age: number;
    gender: string;
}

export default function Dashboard() {

    const { user, loading: authLoading } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [enrolledSubject, setEnrolledSubject] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            // Wait for auth to finish loading
            if (authLoading) return;

            if (!user) {
                // Should be handled by ProtectedRoute, but safe guard
                setIsLoading(false);
                return;
            }

            try {
                // Fetch user profile from public.users table
                const { data: profile, error: profileError } = await supabase
                    .from('users')
                    .select('name, university, stream, age, gender')
                    .eq('id', user.id)
                    .single();

                if (profileError) {
                    console.error('Error fetching profile:', profileError);
                }

                if (profile) {
                    setUserProfile(profile);
                } else {
                    // Fallback to auth metadata if profile row missing or empty
                    setUserProfile({
                        name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
                        university: "",
                        stream: "",
                        age: undefined as any,
                        gender: ""
                    });
                }

                // Fetch enrollments to get a subject
                const { data: enrollments } = await supabase
                    .from('enrollments')
                    .select('subject:subjects(name)')
                    .eq('user_id', user.id)
                    .limit(1)
                    .single();

                if (enrollments?.subject) {
                    // @ts-ignore
                    setEnrolledSubject(enrollments.subject.name);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, authLoading]);

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-neutral-200 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full pb-10">
            <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100 tracking-tight">
                Dashboard
            </h1>

            <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3">
                {/* Name Section - Spans 2 columns */}
                <div className="h-full w-full md:col-span-2 rounded-3xl">
                    <WelcomeWidget
                        name={userProfile?.name}
                        university={userProfile?.university}
                        stream={userProfile?.stream}
                        age={userProfile?.age}
                        gender={userProfile?.gender}
                    />
                </div>

                {/* Time Spent Section - Spans 1 column */}
                <div className="h-full w-full md:col-span-1 rounded-3xl">
                    <TimeSpentWidget subjectName={enrolledSubject || undefined} />
                </div>

                {/* Activity Map Section - Spans full width (3 columns) */}
                <div className="h-full w-full md:col-span-3 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black/40 p-6 shadow-sm dark:shadow-none overflow-hidden">
                    <ActivityHeatmap />
                </div>
            </BentoGrid>
        </div>
    );
}
