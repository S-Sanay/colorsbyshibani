import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

type ButtonAsLink = BaseProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/* Sharp (0px radius) per Gallery System spec */
const base =
  "inline-flex items-center justify-center gap-2 px-8 py-3.5 font-sans text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-white hover:opacity-70",
  outline:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
  ghost:
    "text-muted hover:text-charcoal underline-offset-4 hover:underline",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...(rest as object)}>
        {rest.children}
      </Link>
    );
  }

  return <button className={cls} {...(props as ButtonAsButton)} />;
}
