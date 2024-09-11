"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

export function FadeInCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const id = useId();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn("transform-gpu", className)}
    >
      {children}
    </motion.div>
  );
}
