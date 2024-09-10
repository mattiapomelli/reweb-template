"use client";

import { AnimatePresence } from "framer-motion";
import { AlignJustify, XIcon } from "lucide-react";
import { useEffect, useState, forwardRef } from "react";

import { cn } from "@/lib/utils";

export const AnimatedMobileNavbar = forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setIsOpen(false);
    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setIsOpen]);

  return (
    <>
      <button
        {...props}
        className={cn("md:hidden", className)}
        onClick={() => setIsOpen((open) => !open)}
        ref={ref}
      >
        <span className="sr-only">Toggle menu</span>
        {isOpen ? <XIcon /> : <AlignJustify />}
      </button>
      <AnimatePresence>{isOpen ? children : null}</AnimatePresence>
    </>
  );
});

AnimatedMobileNavbar.displayName = "AnimatedMobileNavbar";
