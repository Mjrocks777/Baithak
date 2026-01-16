import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Mock Shadcn Components & Utilities ---
// (Reusing similar utilities for consistency)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <div className="relative group">
            <input
                className={cn(
                    "flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 text-foreground shadow-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    )
);
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground mb-2 block",
                className
            )}
            {...props}
        />
    )
);
Label.displayName = "Label";

const Select = ({ options, placeholder, icon: Icon, value, onChange }: any) => {
    return (
        <div className="relative group">
            {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground z-10" />}
            <select
                value={value}
                onChange={onChange}
                className="flex h-12 w-full appearance-none rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 text-foreground shadow-sm cursor-pointer"
            >
                <option value="" disabled className="bg-popover text-muted-foreground">{placeholder}</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-popover text-popover-foreground">{opt}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
        </div>
    )
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        university: "",
        stream: "",
        age: "",
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        // Navigate to dashboard or next step (mock)
        console.log("Profile Saved:", formData);
        navigate("/dashboard");
    };

    return (
        <div className="w-full flex justify-center p-4 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                        Profile Setup
                    </h1>
                    <p className="text-muted-foreground">Manage your personal information.</p>
                </div>

                {/* Form Card */}
                <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden p-8 md:p-10">
                    <form onSubmit={handleSave} className="space-y-6">

                        {/* Avatar Section */}
                        <div className="flex justify-start mb-8">
                            <div className="relative group cursor-pointer">
                                <div className="w-24 h-24 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors duration-300">
                                    <User className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 border-2 border-background">
                                    <Camera className="w-3 h-3 text-primary-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label className="text-foreground">Full Name</Label>
                            <Input
                                placeholder="Arjun Sharma"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
                                required
                            />
                        </div>

                        {/* University Field */}
                        <div className="space-y-2">
                            <Label className="text-foreground">University / College</Label>
                            <Input
                                placeholder="IIT Bombay"
                                value={formData.university}
                                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Stream Field */}
                            <div className="space-y-2">
                                <Label className="text-foreground">Stream</Label>
                                <Select
                                    placeholder="Select Stream"
                                    options={["Engineering", "Medical", "Arts", "Commerce", "Law", "Management", "Other"]}
                                    value={formData.stream}
                                    onChange={(e: any) => setFormData({ ...formData, stream: e.target.value })}
                                />
                            </div>

                            {/* Age Field */}
                            <div className="space-y-2">
                                <Label className="text-foreground">Age</Label>
                                <Input
                                    type="number"
                                    placeholder="20"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
                                    min="10"
                                    max="100"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </motion.div>
        </div>
    );
}
