import { useRef } from "react";
import { useInView } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import { formatNumber } from "@/lib/format";

interface Props {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const current = useCountUp(value, inView);

  return (
    <div ref={ref} className="border-t border-primary-foreground/20 pt-6">
      <p className="font-display text-[3rem] leading-none text-primary-foreground md:text-[3.75rem]">
        {formatNumber(current)}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-3 text-sm text-primary-foreground/55">{label}</p>
    </div>
  );
}
