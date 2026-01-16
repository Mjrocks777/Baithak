
import React, { useEffect, useRef, useMemo, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useSpring,
    useMotionTemplate,
    AnimatePresence,
} from "framer-motion";
import {
    MessageCircle,
    Bell,
    Image as ImageIcon,
    MoreHorizontal,
    Play,
    CheckCircle2,
    Users,
    MousePointer2,
    ArrowRight,
    BookOpen,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility Functions ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Mock Shadcn Components ---
const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "sm" | "default" | "lg" }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
    };
    const sizes = {
        sm: "h-9 px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8",
    };
    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});
Button.displayName = "Button";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

// --- Constants ---
const TOTAL_FRAMES = 241;
const SEQUENCE_PATH = "/sequence/ezgif-frame-"; // Expects 001.jpg suffix

// --- Canvas Component ---
const StickyCanvas = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images (smart loading - load first few immediately, then rest)
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        // Create image objects for all frames
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${SEQUENCE_PATH}${i.toString().padStart(3, "0")}.jpg`;
            imgArray.push(img);

            // Simple loading text logic
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) setIsLoaded(true);
            };
        }
        setImages(imgArray);

        // Quick start: mark loaded after a short delay/progressive checks or just start drawing
        // For this demo, we'll start drawing immediately but valid images only appear when loaded
        setIsLoaded(true);

        return () => {
            // Cleanup if needed
        };
    }, []);

    // Frame Interpolation
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
    const smoothFrame = useSpring(frameIndex, { stiffness: 200, damping: 30 }); // Smooth scrubbing

    useMotionValueEvent(smoothFrame, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const index = Math.min(Math.max(Math.floor(latest), 0), TOTAL_FRAMES - 1);
        const img = images[index];

        if (img && img.complete) {
            // Draw image creating 'contain' effect
            const w = canvas.width;
            const h = canvas.height;
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawW, drawH, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawH = h;
                drawW = h * imgRatio;
                offsetX = (w - drawW) / 2;
                offsetY = 0;
            } else {
                drawW = w;
                drawH = w / imgRatio;
                offsetX = 0;
                offsetY = (h - drawH) / 2;
            }

            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black/5 -z-10">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ pointerEvents: "none" }}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background text-muted-foreground">
                    Loading Sequence...
                </div>
            )}
        </div>
    );
};

// --- DOM Sections ---

// Section 1: Hero - The Chaos (0% - 30%)
const HeroSection = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.25], [1, 2]);
    const y = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Random dispersion for chaos elements
    const dispersionX = useTransform(scrollYProgress, [0, 0.2], [0, 500]);
    const dispersionY = useTransform(scrollYProgress, [0, 0.2], [0, -500]);

    // Create chaotic elements array
    const chaosElements = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        icon: [MessageCircle, Bell, ImageIcon, MoreHorizontal][i % 4],
        x: Math.random() * 80 - 40, // Random default position %
        y: Math.random() * 60 - 30,
        rotate: Math.random() * 40 - 20,
        delay: Math.random() * 0.5,
    })), []);

    return (
        <motion.section
            style={{ opacity, scale, y }}
            className="absolute top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden pointer-events-none"
        >
            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50 drop-shadow-sm">
                        Distracted?
                    </h1>
                    <p className="mt-4 text-2xl md:text-3xl font-light text-muted-foreground">
                        Study Together, Not Alone.
                    </p>
                </motion.div>
            </div>

            {/* Chaos Cards */}
            {chaosElements.map((el, idx) => (
                <ChaosCard
                    key={el.id}
                    data={el}
                    scrollYProgress={scrollYProgress}
                    idx={idx}
                />
            ))}
        </motion.section>
    );
};

const ChaosCard = ({ data, scrollYProgress, idx }: { data: any, scrollYProgress: any, idx: number }) => {
    // Unique transformation for each card to create "explosion" effect
    const x = useTransform(scrollYProgress, [0, 0.2], [`${data.x}vw`, `${data.x * 5}vw`]);
    const y = useTransform(scrollYProgress, [0, 0.2], [`${data.y}vh`, `${data.y * 5}vh`]);
    const rotate = useTransform(scrollYProgress, [0, 0.2], [data.rotate, data.rotate * 3]);

    return (
        <motion.div
            style={{ x, y, rotate }}
            className="absolute rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-4 shadow-xl will-change-transform"
        >
            <data.icon className="h-8 w-8 text-primary/80" />
            <div className="mt-2 h-2 w-24 rounded-full bg-white/20" />
            <div className="mt-1 h-2 w-16 rounded-full bg-white/10" />
        </motion.div>
    )
}


// Section 2: Mid - The Knowledge Timeline (30% - 60%)
const TimelineSection = ({ scrollYProgress }: { scrollYProgress: any }) => {
    // Visible range approximately 35% to 65% of total scroll
    const opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1]);

    // Timeline Drawing
    const drawProgress = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

    const steps = [
        { title: "Lecture Watched", icon: Play, desc: "Sync with friends in real-time" },
        { title: "Notes Compiled", icon: BookOpen, desc: "Collaborative markdown editor" },
        { title: "Doubts Resolved", icon: CheckCircle2, desc: "Instant peer support" },
    ];

    return (
        <motion.section
            style={{ opacity, scale }}
            className="absolute top-[35%] left-0 flex h-auto w-full flex-col items-center justify-center p-8 pointer-events-none"
        >
            <div className="max-w-4xl w-full">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-12 text-center">
                    The Journey to Clarity
                </h2>

                <div className="relative flex flex-col md:flex-row justify-between items-center w-full">
                    {/* Connecting Line */}
                    <svg className="absolute top-[2.25rem] left-0 w-full h-[2px] hidden md:block overflow-visible">
                        <motion.line
                            x1="0%"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/30"
                            strokeDasharray="1 1"
                        />
                        <motion.line
                            x1="0%"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                            initial={{ pathLength: 0 }}
                            style={{ pathLength: drawProgress }}
                        />
                    </svg>

                    {steps.map((step, i) => (
                        <TimelineNode
                            key={i}
                            step={step}
                            index={i}
                            rangeStart={0.35 + (i * 0.08)}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const TimelineNode = ({ step, index, rangeStart, scrollYProgress }: any) => {
    // Pop up animation for each node
    const scale = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05], [0.5, 1]);
    const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05], [0, 1]);
    const y = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05], [50, 0]);

    return (
        <motion.div
            style={{ scale, opacity, y }}
            className="flex flex-col items-center text-center z-10 bg-background/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm md:w-1/3"
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner ring-4 ring-background">
                <step.icon size={32} />
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground text-sm mt-2 font-medium">{step.desc}</p>
        </motion.div>
    )
}


// Section 3: Bottom - Live Workspace (60% - 100%)
const WorkspaceSection = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
    const y = useTransform(scrollYProgress, [0.65, 0.85], ["50%", "0%"]);
    const scale = useTransform(scrollYProgress, [0.65, 0.85], [0.9, 1]);

    const navigate = useNavigate();

    return (
        <motion.section
            style={{ opacity, y, scale }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
        >
            <motion.div
                className="relative w-full max-w-5xl aspect-video md:h-[60vh] bg-background rounded-xl border shadow-2xl overflow-hidden"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Dots Pattern Background */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
                        backgroundSize: "24px 24px"
                    }}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-center z-20 bg-background/80 p-6 rounded-xl border backdrop-blur"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Enter Baithak.</h2>
                        <p className="text-lg md:text-xl text-muted-foreground">Where ideas converge.</p>
                    </motion.div>
                </div>

                {/* Animated Cursors - Simulation of collaboration */}
                <Cursor
                    color="#ef4444"
                    label="Alex"
                    path={[{ x: 10, y: 10 }, { x: 40, y: 30 }, { x: 30, y: 60 }]}
                    delay={0}
                />
                <Cursor
                    color="#3b82f6"
                    label="Sarah"
                    path={[{ x: 80, y: 80 }, { x: 60, y: 40 }, { x: 50, y: 50 }]}
                    delay={1}
                />

                {/* Drawing a path */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-50">
                    <motion.path
                        d="M 100 100 Q 400 50 600 300 T 900 300"
                        stroke="#ef4444"
                        strokeWidth="4"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1] }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: 1
                        }}
                    />
                </svg>
            </motion.div>

            {/* CTA Section - Directly below whiteboard */}
            <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
                <Button
                    size="lg"
                    className="rounded-full px-8 gap-2"
                    onClick={() => navigate('/auth')}
                >
                    Log in <ArrowRight size={16} />
                </Button>
            </motion.div>
        </motion.section>
    );
};

const Cursor = ({ color, label, path, delay }: any) => {
    return (
        <motion.div
            className="absolute z-30 flex items-center gap-2"
            initial={{
                left: `${path[0].x}%`,
                top: `${path[0].y}%`,
            }}
            animate={{
                left: path.map((p: any) => `${p.x}%`),
                top: path.map((p: any) => `${p.y}%`),
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                delay: delay,
                ease: "easeInOut"
            }}
        >
            <div className="relative">
                <MousePointer2
                    className="h-6 w-6"
                    style={{ color: color, fill: color }}
                />
                <span
                    className="absolute left-4 top-4 rounded px-2 py-0.5 text-xs font-bold text-white shadow-md whitespace-nowrap"
                    style={{ backgroundColor: color }}
                >
                    {label}
                </span>
            </div>
        </motion.div>
    )
}

import { useNavigate } from "react-router-dom";

// --- Main Page Component ---
export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20"
        >
            {/* Scroll Spacer */}
            <div className="relative h-[400vh]">
                {/* Sticky Global Layers */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* 1. Canvas Layer */}
                    <StickyCanvas scrollYProgress={scrollYProgress} />

                    {/* 2. Overlay Gradients (optional visual polish) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/20 pointer-events-none" />

                    {/* 3. Global Navbar Mock */}
                    <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
                        <img
                            src="/logos/logo-white.svg"
                            alt="Baithak"
                            className="h-12 w-auto"
                        />
                        {/* Removed Right side buttons as per request */}
                    </header>

                    {/* 4. DOM Animation Layers Over Canvas */}
                    <HeroSection scrollYProgress={scrollYProgress} />
                    <TimelineSection scrollYProgress={scrollYProgress} />
                    <WorkspaceSection scrollYProgress={scrollYProgress} />
                </div>
            </div>


        </div>
    );
}
