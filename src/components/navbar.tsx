"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Infinity } from "@phosphor-icons/react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-glass-white-strong backdrop-blur-2xl shadow-(--shadow-glass) border-b border-glass-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-350 mx-auto flex items-center justify-between px-6 lg:px-12 h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-zinc-950 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Infinity size={20} weight="bold" className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-950">
              Infinite UGC
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Sign In
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-accent-600/90 backdrop-blur-sm hover:bg-accent-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all active:scale-[0.97] shadow-lg shadow-accent-600/20"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-zinc-950 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-16 z-30 bg-white/95 backdrop-blur-xl border-b border-zinc-200/50 shadow-lg md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-zinc-700 hover:text-zinc-950 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200/50">
                <a
                  href="#"
                  className="text-sm font-medium text-zinc-600 text-center py-2"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-accent-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
