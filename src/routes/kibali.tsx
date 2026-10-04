import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Building2, Users, Leaf, HeartHandshake, Trees, Factory, Handshake } from "lucide-react";
import kibaliImg from "@/assets/kibali.jpg";
import { kibaliPage as k } from "@/content/site";
import { Logo, Reveal, ease } from "@/components/site/common";
import { Footer } from "@/components/site/Sections";

const title = "Kibali Gold Mine — partenaire de JACCO à Doko";
const description =
  "Kibali, plus grande mine d'or d'Afrique, moteur du développement du Haut-Uele : emplois congolais, entreprises locales, énergie verte et projets communautaires.";

export const Route = createFileRoute("/kibali")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KibaliPage,
});

const icons = [Factory, Building2, Leaf, HeartHandshake, Trees, Users];

function KibaliPage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3">
        <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2">
          <Link to="/" className="text-ink" aria-label="Retour à l'accueil"><Logo /></Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
      </header>

      <main>
        <section ref={ref} className="grain relative flex min-h-[85vh] items-end overflow-hidden bg-ink-deep">
          <motion.img src={kibaliImg} alt="Vue aérienne de la mine d'or de Kibali" width={1200} height={800} style={{ y, scale: 1.1 }} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/60 to-ink-deep/20" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-40 text-primary-foreground">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="eyebrow mb-5">
              {k.eyebrow}
            </motion.span>
            <h1 className="overflow-hidden text-[2.6rem] font-extrabold leading-[1.02] md:text-[5rem]">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1, ease }}>
                {k.title}
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
              {k.intro}
            </motion.p>
          </div>
        </section>

        <section className="bg-ink-deep pb-20">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {k.figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.1}>
                <div className="glass-dark h-full rounded-lg p-6">
                  <p className="font-display text-4xl font-bold text-gradient">{f.value}</p>
                  <p className="mt-2 text-primary-foreground/70">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-background py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal className="mx-auto mb-14 max-w-3xl text-center">
              <span className="eyebrow mb-4">Impact dans la région</span>
              <h2 className="text-[2rem] text-ink md:text-[3rem]">Un partenaire du développement de Doko</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {k.pillars.map((p, i) => {
                const Icon = icons[i % icons.length]!;
                return (
                  <Reveal key={p.title} delay={(i % 3) * 0.1}>
                    <div className="lift h-full rounded-lg border border-border bg-card p-7">
                      <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                        <Icon className="h-7 w-7" aria-hidden />
                      </div>
                      <h3 className="mb-3 text-xl text-ink">{p.title}</h3>
                      <p className="text-ink-muted">{p.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal from="scale">
              <div className="grain relative overflow-hidden rounded-lg bg-ink-deep p-8 text-primary-foreground shadow-lift md:p-14">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
                <Handshake className="relative h-12 w-12 text-primary" aria-hidden />
                <h2 className="relative mt-6 text-[1.8rem] md:text-[2.5rem]">{k.partnership.title}</h2>
                <p className="relative mt-4 text-lg text-primary-foreground/80">{k.partnership.text}</p>
                <a href="/#contact" className="btn-primary relative mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold">
                  Travailler avec JACCO <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
            <div className="mt-12">
              <p className="text-sm font-semibold text-ink">Sources</p>
              <ul className="mt-3 space-y-2 text-sm">
                {k.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ink-muted underline-offset-4 hover:text-primary hover:underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
