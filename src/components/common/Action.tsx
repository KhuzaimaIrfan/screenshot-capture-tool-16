import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[0.75rem] uppercase tracking-[0.16em] transition-all duration-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-foreground text-background hover:bg-ink",
        outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
        light:
          "border border-primary-foreground/45 text-primary-foreground hover:bg-primary-foreground hover:text-primary",
        accent: "bg-accent text-accent-foreground hover:brightness-110",
        ghost: "text-foreground hover:text-accent",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-11 px-5",
        lg: "h-14 px-9",
        bare: "h-auto p-0",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  },
);

type Variants = VariantProps<typeof actionVariants>;

export function ActionButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return <button className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function ActionLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(actionVariants({ variant, size }), className)} {...props} />;
}
