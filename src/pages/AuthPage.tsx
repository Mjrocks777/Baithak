import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

// --- Mock UI Components ---
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
    return (
        <input
            className={`flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' }>(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
    }
    return (
        <button
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${variants[variant]} ${className}`}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

// --- Assets ---
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
)

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    // For now, just navigate to dashboard on form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const handleGoogleLogin = () => {
        // Placeholder: Navigate to dashboard for now
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4 transition-colors duration-300">
            {/* Back Button */}
            <button onClick={() => navigate('/')} className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors">
                ← Back
            </button>

            <div className="absolute top-8 right-8">
                <ModeToggle />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    {/* Light Mode Logo */}
                    <img
                        src="/logos/logo-black.svg"
                        alt="Baithak Logo"
                        className="h-16 w-auto dark:hidden block"
                    />
                    {/* Dark Mode Logo */}
                    <img
                        src="/logos/logo-white.svg"
                        alt="Baithak Logo"
                        className="h-16 w-auto hidden dark:block"
                    />
                </div>

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isSignIn ? "Sign in" : "Create an account"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {isSignIn ? "Welcome back! Please sign in to continue" : "Enter your details to get started"}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card/50 border border-border p-8 rounded-2xl shadow-xl backdrop-blur-sm">

                    {/* Social Login */}
                    <div className="space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full py-6 bg-card border-input text-card-foreground hover:bg-accent hover:text-accent-foreground gap-3 rounded-xl transition-all"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </Button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Enter your email address"
                                    className="pl-10 bg-background/50 border-input text-foreground placeholder:text-muted-foreground h-11 rounded-xl focus:border-ring focus:bg-background transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="pl-10 bg-background/50 border-input text-foreground placeholder:text-muted-foreground h-11 rounded-xl focus:border-ring focus:bg-background transition-all"
                                />
                            </div>
                        </div>

                        {!isSignIn && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Enter your full name"
                                        className="pl-10 bg-background/50 border-input text-foreground placeholder:text-muted-foreground h-11 rounded-xl focus:border-ring focus:bg-background transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <Button type="submit" className="w-full h-11 rounded-xl font-semibold transition-all mt-4">
                            Continue
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    {isSignIn ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        className="font-medium text-foreground hover:underline underline-offset-4"
                    >
                        {isSignIn ? "Sign up" : "Sign in"}
                    </button>
                </p>

                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                    <Lock size={12} />
                    <span>Secured connection</span>
                </div>

            </motion.div>
        </div>
    )
}