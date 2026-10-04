import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Slide } from "@/content/site";
import { ease } from "./common";

const DURATION = 5000;

export function VisionCarousel({ slides }: { slides: Slide[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = slides.length;
  const go = useCallback((d: number) => setState(([i]) => [(i + d + n) % n, d]), [n]);
  const goTo = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, reduce, paused, go]);

  const slide = slides[index]!;

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Notre vision en images"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative h-[420px] overflow-hidden rounded-lg bg-ink-deep shadow-lift">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: `${d * 100}%`, scale: 1.05 }),
              center: { x: 0, scale: 1 },
              exit: (d: number) => ({ x: `${-d * 30}%`, opacity: 0.3 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <img src={slide.image} alt={slide.title} draggable={false} width={1600} height={608} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-overlay/80 via-overlay/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-center text-primary-foreground md:p-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease }}
                className="text-3xl md:text-4xl"
              >
                {slide.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease }}
                className="mx-auto mt-3 max-w-xl text-lg"
              >
                {slide.text}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute right-6 top-6 flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              aria-label={d < 0 ? "Diapositive précédente" : "Diapositive suivante"}
              onClick={() => go(d)}
              className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground transition-all ease-jacco hover:scale-110 hover:bg-primary"
            >
              {d < 0 ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {slides.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Aller à la diapositive ${i + 1} : ${s.title}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className="group text-left"
          >
            <div className="h-1 overflow-hidden rounded-full bg-dot/60">
              {i === index ? (
                <motion.div
                  key={`${index}-${paused}`}
                  className="h-full bg-gradient-primary"
                  initial={{ width: reduce || paused ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: reduce || paused ? 0 : DURATION / 1000, ease: "linear" }}
                />
              ) : (
                <div className={`h-full ${i < index ? "w-full bg-primary/40" : "w-0"}`} />
              )}
            </div>
            <span className={`mt-2 block text-sm font-medium transition-colors ${i === index ? "text-ink" : "text-ink-muted group-hover:text-ink"}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
