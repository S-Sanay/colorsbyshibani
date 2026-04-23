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

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-widest uppercase font-sans font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-cream hover:bg-accent border border-charcoal hover:border-accent",
  outline:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
  ghost:
    "text-warm-gray hover:text-charcoal underline-offset-4 hover:underline",
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
