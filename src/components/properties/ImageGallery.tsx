import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { modalTransition } from "@/utils/motion";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      {/* Desktop composition */}
      <div className="hidden gap-2 md:grid md:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="media-frame group aspect-[4/3] w-full"
          aria-label="Open gallery"
        >
          <img
            src={images[0]}
            alt={`${title} — main view`}
            width={1600}
            height={1200}
            className="size-full object-cover group-hover:scale-[1.04]"
          />
          <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/92 px-3 py-2 text-[0.625rem] uppercase tracking-[0.16em] backdrop-blur-sm">
            <Expand className="size-3.5" /> {images.length} photos
          </span>
        </button>
        <div className="grid grid-rows-3 gap-2">
          {images.slice(1, 4).map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => openAt(i + 1)}
              className="media-frame group w-full"
              aria-label={`Open photo ${i + 2}`}
            >
              <img
                src={src}
                alt={`${title} — view ${i + 2}`}
                loading="lazy"
                width={800}
                height={600}
                className="size-full object-cover group-hover:scale-[1.06]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile swipe strip */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 md:hidden">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => openAt(i)}
            className="media-frame aspect-[4/3] w-[85%] shrink-0 snap-center"
            aria-label={`Open photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} — view ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              width={1200}
              height={900}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={modalTransition}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/97"
          >
            <div className="flex items-center justify-between px-5 py-4 text-primary-foreground">
              <span className="text-sm">
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close gallery"
                className="flex size-11 items-center justify-center"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 z-10 flex size-12 items-center justify-center border border-primary-foreground/25 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                <ChevronLeft className="size-5" />
              </button>
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={modalTransition}
                  src={images[index]}
                  alt={`${title} — photo ${index + 1}`}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </AnimatePresence>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 z-10 flex size-12 items-center justify-center border border-primary-foreground/25 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto px-5 py-5">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-16 w-24 shrink-0 overflow-hidden border transition-opacity ${
                    i === index ? "border-accent opacity-100" : "border-transparent opacity-50"
                  }`}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
