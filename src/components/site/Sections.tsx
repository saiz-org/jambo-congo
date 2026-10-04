import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Quote } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import kibaliImg from "@/assets/kibali.jpg";
import { about, hero, infrastructure, mainClient, vision, socials, footer, stats } from "@/content/site";
import { FeatureGrid, Logo, Reveal, SectionHeader, ease } from "./common";
import { VisionCarousel } from "./VisionCarousel";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const words = hero.titleLines;

  return (
    <section id="home" ref={ref} className="grain relative flex min-h-screen items-center overflow-hidden bg-ink-deep">
      <motion.img
        src={heroImg}
        alt=""
        aria-hidden
        width={1920}
        height={1088}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/90 via-ink-deep/55 to-ink-deep/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-transparent to-transparent" />

      <motion.div style={{ y: contentY, opacity }} className="relative mx-auto w-full max-w-6xl px-4 pb-32 pt-32">
        <div className="text-center text-primary-foreground md:max-w-3xl md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="glass-dark mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Doko, Haut-Uele — depuis 2016
          </motion.span>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.02] sm:text-[3.5rem] md:text-[5.5rem]">
            {words.map((line, li) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${li === 1 ? "text-gradient" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.45 + li * 0.15, duration: 1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="mx-auto mt-8 max-w-[600px] text-lg font-light text-primary-foreground/85 md:mx-0 md:text-[1.3rem]"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease }}
            className="mt-10 flex flex-col items-center gap-4 md:flex-row"
          >
            <a href="#about" className="btn-primary group inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold md:w-auto">
              {hero.ctaPrimary}
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </a>
            <a href="#contact" className="glass-dark inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold text-primary-foreground transition-all ease-jacco hover:bg-background hover:text-primary md:w-auto">
              <Mail className="h-5 w-5" /> {hero.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.9, ease }}
        className="absolute inset-x-0 bottom-0 hidden md:block"
      >
        <div className="glass-dark mx-auto grid max-w-6xl grid-cols-4 rounded-t-lg">
          {stats.map((s) => (
            <div key={s.label} className="border-r border-primary-foreground/10 px-6 py-5 last:border-r-0">
              <p className="font-display text-2xl font-bold text-primary-foreground">{s.value}</p>
              <p className="text-sm text-primary-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-background py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.4fr] md:items-end">
        <Reveal from="left">
          <span className="eyebrow mb-4">Qui sommes-nous</span>
          <h2 className="text-[2rem] text-ink md:text-[3rem]">{about.title}</h2>
        </Reveal>
        <Reveal from="right">
          <p className="text-xl leading-relaxed text-ink-muted md:text-2xl">
            {about.text}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" /> Doko · Haut-Uele · RDC
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParallaxPhoto({ src, alt, offset }: { src: string; alt: string; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className="group overflow-hidden rounded-lg shadow-soft">
      <img src={src} alt={alt} loading="lazy" width={944} height={704} className="h-[320px] w-full object-cover transition-transform duration-700 ease-jacco group-hover:scale-110" />
    </motion.div>
  );
}

export function Infrastructure() {
  return (
    <section id="infrastructure" className="bg-surface py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Notre site" title={infrastructure.title} subtitle={infrastructure.subtitle} />
        <FeatureGrid features={infrastructure.features} />
        <div className="mt-16 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {infrastructure.photos.map((p, i) => (
            <ParallaxPhoto key={p.alt} src={p.src} alt={p.alt} offset={[30, 60, 30][i]!} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Demain" title={vision.title} subtitle={vision.subtitle} />
        <FeatureGrid features={vision.features} />
        <Reveal from="scale" className="mt-16 hidden md:block">
          <VisionCarousel slides={vision.slides} />
        </Reveal>
      </div>
    </section>
  );
}

export function MainClient() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], reduce ? [8, 8] : [40, 8]);

  return (
    <section id="client" ref={ref} className="grain relative overflow-hidden bg-ink-deep py-20 md:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <Reveal from="left">
          <span className="eyebrow mb-4">{mainClient.subtitle}</span>
          <h2 className="text-[2.2rem] text-primary-foreground md:text-[3.2rem]">{mainClient.title}</h2>
          <div className="glass-dark relative mt-8 rounded-lg p-6">
            <Quote className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-gradient-primary p-1.5 text-primary-foreground" />
            <p className="text-lg leading-relaxed text-primary-foreground/80">{mainClient.text}</p>
          </div>
          <Link to="/kibali" className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold">
            Voir plus sur Kibali
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <motion.div style={{ scale, borderRadius: radius }} className="overflow-hidden shadow-lift">
          <img src={kibaliImg} alt={mainClient.imageAlt} loading="lazy" width={1200} height={800} className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-16 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <Logo className="text-4xl" />
            <p className="mt-3 max-w-md text-primary-foreground/70">{footer.tagline}</p>
          </div>
          <div className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/10 transition-all ease-jacco hover:-translate-y-1 hover:bg-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} {footer.credits}</p>
          <a href="#home" className="inline-flex items-center gap-1 transition-colors hover:text-primary">
            Haut de page <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
