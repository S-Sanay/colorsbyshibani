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
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      {contained ? (
        <div className="mx-auto max-w-[90rem] px-8 lg:px-16">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
