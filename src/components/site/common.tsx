import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { Feature } from "@/content/site";

export function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const offset = from === "up" ? { y: 30 } : { x: from === "left" ? -40 : 40 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-2xl font-extrabold transition-colors ease-jacco hover:text-primary ${className}`}>
      Jacco<span className="text-primary">.</span>
    </span>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-[1.8rem] text-ink md:text-[2.5rem]">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-muted">{subtitle}</p>}
    </Reveal>
  );
}

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="lift h-full rounded-lg border border-border bg-card p-6 sm:p-8">
      <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="mb-3 text-xl text-ink">{feature.title}</h3>
      <p className="text-ink-muted">{feature.text}</p>
    </div>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.1}>
          <FeatureCard feature={f} />
        </Reveal>
      ))}
    </div>
  );
}
