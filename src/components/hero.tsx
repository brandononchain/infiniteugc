"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lightning, Play } from "@phosphor-icons/react";
import { useRef } from "react";
import Image from "next/image";
import GradientBackground from "./gradient-background";

/* ─── Floating Video Card ─── */
interface FloatingCardProps {
  src: string;
  type: "video" | "avatar";
  className?: string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  delay?: number;
  duration?: number;
}

function FloatingVideoCard({
  src,
  type,
  className = "",
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  delay = 0,
  duration = 7,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + delay, duration: 0.6, ease: "easeOut" }}
      className={`absolute pointer-events-none z-10 ${className}`}
      style={{
        perspective: "800px",
      }}
    >
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotateZ: [rotateZ, rotateZ + 1, rotateZ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="rounded-2xl overflow-hidden border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-sm"
      >
        {/* Glass reflection overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

        {type === "video" ? (
          <div className="relative">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 bg-white/70 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                <Play size={12} weight="fill" className="text-zinc-700 ml-0.5" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-10">
              <motion.div
                className="h-full bg-accent-500/80"
                animate={{ width: ["0%", "100%"] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: delay,
                }}
              />
            </div>
          </div>
        ) : (
          <img
            src={src}
            alt="AI Avatar"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated Word Reveal ─── */
function AnimatedHeadline() {
  const words = ["Mass-Produce", "Studio-Quality", "UGC", "in", "Minutes"];
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] font-extrabold text-zinc-950">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.15 + i * 0.08,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

/* ─── Magnetic Button ─── */
function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all active:scale-[0.97] ${
        isPrimary
          ? "btn-ice shadow-(--shadow-accent-glow-lg) hover:shadow-(--shadow-accent-glow-lg)"
          : "border border-glass-border text-zinc-700 hover:border-zinc-400 hover:text-zinc-950 bg-glass-white backdrop-blur-xl shadow-(--shadow-glass)"
      }`}
    >
      {children}
    </motion.a>
  );
}

/* ─── Hero Visual — Infinity Loop ─── */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.4 }}
      className="relative w-full flex items-center justify-center"
    >
      {/* Accent glow behind the image */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-accent-400/15 rounded-full blur-[100px] animate-drift" />
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-accent-300/20 rounded-full blur-[80px] animate-drift-reverse" />

      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-3xl"
      >
        <Image
          src="/hero/infinityloop.png"
          alt="Infinite UGC"
          width={900}
          height={900}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(14,165,233,0.25)] scale-125 lg:scale-150"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating card data ─── */
const floatingCards: FloatingCardProps[] = [
  // Left side cards
  {
    src: "/videos/ugc-1.mp4",
    type: "video",
    className: "hidden lg:block -left-8 top-[18%] w-[130px] h-[185px]",
    rotateX: 5,
    rotateY: 15,
    rotateZ: -6,
    delay: 0,
    duration: 7,
  },
  {
    src: "/avatars/ai-avatar-3.jpg",
    type: "avatar",
    className: "hidden lg:block left-[2%] bottom-[15%] w-[110px] h-[140px]",
    rotateX: -4,
    rotateY: 12,
    rotateZ: 4,
    delay: 0.3,
    duration: 8,
  },
  {
    src: "/videos/ugc-3.mp4",
    type: "video",
    className: "hidden xl:block left-[8%] top-[55%] w-[105px] h-[150px]",
    rotateX: 3,
    rotateY: 8,
    rotateZ: -3,
    delay: 0.6,
    duration: 9,
  },
  // Right side cards
  {
    src: "/avatars/ai-avatar-5.jpg",
    type: "avatar",
    className: "hidden lg:block -right-4 top-[12%] w-[120px] h-[155px]",
    rotateX: -3,
    rotateY: -14,
    rotateZ: 5,
    delay: 0.15,
    duration: 7.5,
  },
  {
    src: "/videos/ugc-5.mp4",
    type: "video",
    className: "hidden lg:block right-[1%] bottom-[18%] w-[125px] h-[175px]",
    rotateX: 4,
    rotateY: -10,
    rotateZ: -4,
    delay: 0.45,
    duration: 8.5,
  },
  {
    src: "/avatars/ai-avatar-7.jpg",
    type: "avatar",
    className: "hidden xl:block right-[7%] top-[50%] w-[100px] h-[130px]",
    rotateX: -5,
    rotateY: -8,
    rotateZ: 3,
    delay: 0.7,
    duration: 9.5,
  },
];

/* ─── Hero Section ─── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform for floating cards
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      {/* ── WebGL Cinematic Ice Gradient Background ── */}
      <GradientBackground className="-z-20" />

      {/* Bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent -z-10 pointer-events-none" />

      {/* ── Floating Video Cards ── */}
      <motion.div style={{ y: cardsY }} className="absolute inset-0 z-10 pointer-events-none">
        {floatingCards.map((card, i) => (
          <FloatingVideoCard key={i} {...card} />
        ))}
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-20 max-w-350 mx-auto w-full px-6 lg:px-12 pt-24 pb-16 lg:pb-0">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Left — Copy */}
          <div className="max-w-xl">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0,
              }}
              className="inline-flex items-center gap-2 rounded-full badge-ice backdrop-blur-xl text-accent-700 px-4 py-1.5 text-sm font-medium mb-6 shadow-(--shadow-glass)"
            >
              <Lightning size={16} weight="fill" />
              AI-Powered Video at Scale
            </motion.div>

            <AnimatedHeadline />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.55,
              }}
              className="text-lg text-zinc-500 leading-relaxed max-w-[55ch] mt-6"
            >
              Generate thousands of AI avatar videos, custom campaigns, and ad
              creatives, from script to export. Built for brands that move fast
              and need content yesterday.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.7,
              }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <MagneticButton href="#pricing" variant="primary">
                Start Creating
                <ArrowRight size={16} weight="bold" />
              </MagneticButton>
              <MagneticButton href="#how-it-works" variant="ghost">
                <Play size={16} weight="fill" />
                See How It Works
              </MagneticButton>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 flex items-center gap-6"
            >
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                Trusted by 500+ brands
              </span>
              <div className="flex gap-6 items-center opacity-40">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-5 bg-zinc-300 rounded"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Infinity Loop Visual */}
          <div className="relative lg:pl-4">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
