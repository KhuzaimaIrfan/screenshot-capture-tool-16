import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });
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
    const id = setInterval(() => {
      if (embla.canScrollNext()) embla.scrollNext();
      else embla.scrollTo(0);
    }, 5200);
    return () => clearInterval(id);
  }, [embla, paused, reduced]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") embla?.scrollNext();
      if (e.key === "ArrowLeft") embla?.scrollPrev();
    },
    [embla],
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="overflow-hidden"
        ref={emblaRef}
        tabIndex={0}
        role="region"
        aria-label="Featured developments"
        onKeyDown={onKeyDown}
      >
        <div className="flex gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="min-w-0 flex-[0_0_84%] sm:flex-[0_0_52%] lg:flex-[0_0_33%]"
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-1 gap-1.5 pr-8">
          {projects.map((p, i) => (
            <span
              key={p.id}
              className={`h-px flex-1 transition-colors duration-500 ${
                i <= selected ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous development"
            className="flex size-11 items-center justify-center border border-border transition-colors hover:border-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            aria-label="Next development"
            className="flex size-11 items-center justify-center border border-border transition-colors hover:border-foreground"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
