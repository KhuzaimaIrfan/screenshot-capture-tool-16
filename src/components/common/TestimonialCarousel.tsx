import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla || paused || reduced) return;
    const id = setInterval(() => embla.scrollNext(), 6500);
    return () => clearInterval(id);
  }, [embla, paused, reduced]);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((t) => (
            <div key={t.id} className="min-w-0 flex-[0_0_100%] px-0 md:flex-[0_0_60%] md:pr-12">
              <div className="flex h-full flex-col">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-[1.5rem] leading-[1.35] md:text-[1.875rem]">
                  “{t.quote}”
                </blockquote>
                <footer className="mt-7 border-t border-border pt-5">
                  <p className="text-sm">{t.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => scrollTo(i)}
              className="h-11 w-8"
            >
              <span className="relative block h-px w-full bg-border">
                <AnimatePresence>
                  {i === selected && (
                    <motion.span
                      layoutId="testimonial-progress"
                      className="absolute inset-0 block bg-accent"
                    />
                  )}
                </AnimatePresence>
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center border border-border transition-colors hover:border-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center border border-border transition-colors hover:border-foreground"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
