/**
 * OPC Global — Awwwards-Level Motion Components
 * Scroll-driven reveals, stat counters, parallax wrappers
 */
import { motion, useInView, useMotionValue, useTransform, useScroll, useSpring } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";

/* ─── Reveal on Scroll ─── */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger Children ─── */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function Stagger({ children, className = "", staggerDelay = 0.1, once = true }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/* ─── Animated Counter ─── */
interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── Parallax Wrapper ─── */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.1 = subtle, 0.5 = strong
}

export function Parallax({ children, className = "", speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ─── Fade Mask (top/bottom gradient) ─── */
export function FadeMask({ position = "bottom", className = "" }: { position?: "top" | "bottom"; className?: string }) {
  return (
    <div
      className={`absolute left-0 right-0 h-32 pointer-events-none z-10 ${
        position === "bottom" ? "bottom-0" : "top-0"
      } ${className}`}
      style={{
        background:
          position === "bottom"
            ? "linear-gradient(to bottom, transparent, var(--background))"
            : "linear-gradient(to top, transparent, var(--background))",
      }}
    />
  );
}

/* ─── Section Heading ─── */
interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({ label, title, subtitle, align = "center", dark = false }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : ""}`}>
      <h2 className={dark ? "text-white" : "text-foreground"}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 max-w-xl text-base leading-relaxed ${
          align === "center" ? "mx-auto" : ""
        } ${dark ? "text-white/60" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ─── Scroll Indicator ─── */
export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
        Scroll
      </span>
      <motion.div
        className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─── Motion Variants for direct use ─── */
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, ease: "easeOut" },
};
