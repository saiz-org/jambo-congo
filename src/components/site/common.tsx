import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import type { Feature } from "@/content/site";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const offset =
    from === "up" ? { y: 40 } : from === "scale" ? { scale: 0.94 } : { x: from === "left" ? -60 : 60 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-2xl font-extrabold tracking-tight transition-colors ease-jacco hover:text-primary ${className}`}>
      Jacco<span className="text-primary">.</span>
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal className={`mb-14 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className={`text-[2rem] md:text-[3rem] ${dark ? "text-primary-foreground" : "text-ink"}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-5 text-lg ${dark ? "text-primary-foreground/70" : "text-ink-muted"}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}

/** Card with a cursor-following glow and subtle 3D tilt. */
export function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ["--mx" as string]: mx, ["--my" as string]: my }}
      className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-7 shadow-soft transition-shadow ease-jacco hover:shadow-lift sm:p-8"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-primary transition-transform duration-500 group-hover:scale-x-100" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at calc(var(--mx) * 1%) calc(var(--my) * 1%), color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%)" }}
      />
      <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-primary/10 transition-colors duration-300 group-hover:text-primary/25">
        0{index + 1}
      </span>
      <div className="relative mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-[var(--shadow-primary)] transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="relative mb-3 text-xl text-ink">{feature.title}</h3>
      <p className="relative text-ink-muted">{feature.text}</p>
    </motion.div>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.1}>
          <FeatureCard feature={f} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-primary-foreground/10 bg-ink-deep py-5" aria-hidden>
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold text-primary-foreground/80 md:text-3xl">
            {t}
            <span className="h-2 w-2 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
