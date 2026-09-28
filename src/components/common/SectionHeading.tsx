import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp, revealProps } from "@/utils/motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  align = "left",
  tone = "default",
  className,
}: Props) {
  return (
    <motion.div
      variants={fadeUp}
      {...revealProps}
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={cn("eyebrow", tone === "inverse" && "text-accent")}>{eyebrow}</p>
        )}
        <h2
          className={cn(
            "display-section mt-4",
            tone === "inverse" ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={cn(
              "mt-5 text-base leading-relaxed",
              tone === "inverse" ? "text-primary-foreground/65" : "text-muted-foreground",
            )}
          >
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
