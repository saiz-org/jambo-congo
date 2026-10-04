import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Slide } from "@/content/site";

export function VisionCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = slides.length;
  const go = useCallback((i: number) => setIndex((i + n) % n), [n]);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [reduce, paused, n]);

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Notre vision en images"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-soft">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={s.title} className="relative h-[300px] w-full shrink-0" aria-hidden={i !== index}>
              <img src={s.image} alt={s.title} loading="lazy" width={1600} height={608} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-overlay/70 to-transparent px-6 pb-6 pt-16 text-center text-primary-foreground">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-1 opacity-90">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          aria-label="Diapositive précédente"
          onClick={() => go(index - 1)}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-ink transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Diapositive suivante"
          onClick={() => go(index + 1)}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-ink transition-colors hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Aller à la diapositive ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-dot"}`}
          />
        ))}
      </div>
    </div>
  );
}
