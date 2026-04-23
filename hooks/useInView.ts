"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean `inView` that becomes true once the element
 * enters the viewport. Disconnects after the first intersection so the
 * animation only plays once.
 */
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
