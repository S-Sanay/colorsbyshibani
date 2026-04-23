import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Constrain content width and center it */
  contained?: boolean;
}

/** Consistent vertical rhythm wrapper for every page section. */
export function Section({ children, className = "", id, contained = true }: SectionProps) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      {contained ? (
        <div className="mx-auto max-w-6xl px-6 lg:px-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
