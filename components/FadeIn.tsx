"use client";

import { useInView } from "@/hooks/useInView";
import { ReactNode, CSSProperties } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms, for staggering sibling elements
}

/**
 * Wraps children in a div that fades up into view once it enters the viewport.
 * Uses Intersection Observer — animation plays once, then stays visible.
 */
export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const { ref, inView } = useInView();

  const style: CSSProperties = { transitionDelay: delay ? `${delay}ms` : undefined };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
