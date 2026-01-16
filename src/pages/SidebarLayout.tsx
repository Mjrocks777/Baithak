
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { LayoutDashboard, UserCog, Settings, LogOut, FolderOpen } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

export function SidebarLayout() {
    console.log("Rendering SidebarLayout");
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "The Vault",
            href: "/vault",
            icon: (
                <FolderOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "/profile",
            icon: (
                <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/settings",
            icon: (
                <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            href: "/auth",
            icon: (
                <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Arjun Sharma",
                                href: "/profile",
                                icon: (
                                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                        AS
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {/* Main Content Area */}
            <div className="flex flex-1 overflow-y-auto bg-white dark:bg-neutral-900 relative">
                <div className="absolute top-4 right-4 z-50">
                    {/* <ModeToggle /> */}
                </div>
                <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black/50 flex flex-col gap-2 flex-1 w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div >
    );
}

export const Logo = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-16 w-auto relative">
                <img
                    src="/logos/logo-black.svg"
                    className="h-16 w-auto dark:hidden block"
                    alt="Baithak Logo"
                />
                <img
                    src="/logos/logo-white.svg"
                    className="h-16 w-auto hidden dark:block"
                    alt="Baithak Logo"
                />
            </div>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-9 w-auto relative">
                <img
                    src="/logos/logo-black.svg"
                    className="h-9 w-auto dark:hidden block"
                    alt="Baithak Logo"
                />
                <img
                    src="/logos/logo-white.svg"
                    className="h-9 w-auto hidden dark:block"
                    alt="Baithak Logo"
                />
            </div>
        </Link>
    );
};
