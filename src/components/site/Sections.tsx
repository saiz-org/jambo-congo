import { ArrowDown, Mail } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import kibaliImg from "@/assets/kibali.jpg";
import { about, hero, infrastructure, mainClient, vision, socials, footer } from "@/content/site";
import { FeatureGrid, Logo, Reveal, SectionHeader } from "./common";
import { VisionCarousel } from "./VisionCarousel";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-20">
        <Reveal className="text-center text-primary-foreground md:w-2/3 md:text-left">
          <h1 className="text-[2rem] font-extrabold drop-shadow-lg sm:text-[2.2rem] md:text-[3.5rem]">
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-[1.3rem] font-light drop-shadow md:mx-0">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
            <a
              href="#about"
              className="inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-semibold text-primary transition-all ease-jacco hover:-translate-y-1 hover:shadow-lift md:w-auto"
            >
              <ArrowDown className="h-5 w-5" /> {hero.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground px-6 py-3 font-semibold text-primary-foreground transition-all ease-jacco hover:bg-background hover:text-primary md:w-auto"
            >
              <Mail className="h-5 w-5" /> {hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title={about.title} subtitle={about.text} />
      </div>
    </section>
  );
}

export function Infrastructure() {
  return (
    <section id="infrastructure" className="bg-surface py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title={infrastructure.title} subtitle={infrastructure.subtitle} />
        <FeatureGrid features={infrastructure.features} />
        <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {infrastructure.photos.map((p, i) => (
            <Reveal key={p.alt} delay={i * 0.1}>
              <img src={p.src} alt={p.alt} loading="lazy" width={944} height={704} className="lift h-[280px] w-full rounded-lg object-cover" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title={vision.title} subtitle={vision.subtitle} />
        <FeatureGrid features={vision.features} />
        <Reveal className="mt-10 hidden md:block">
          <VisionCarousel slides={vision.slides} />
        </Reveal>
      </div>
    </section>
  );
}

export function MainClient() {
  return (
    <section id="client" className="bg-surface py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
        <Reveal from="left">
          <div className="rounded-lg bg-muted p-6 sm:p-8">
            <h2 className="text-[1.8rem] text-ink md:text-[2.2rem]">{mainClient.title}</h2>
            <p className="mt-2 text-lg font-semibold text-primary">{mainClient.subtitle}</p>
            <p className="mt-4 text-ink-muted">{mainClient.text}</p>
          </div>
        </Reveal>
        <Reveal from="right">
          <img src={kibaliImg} alt={mainClient.imageAlt} loading="lazy" width={1200} height={800} className="w-full rounded-lg shadow-soft" />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink py-12 text-center text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <Logo />
        <p className="mx-auto mt-4 max-w-xl opacity-80">{footer.tagline}</p>
        <div className="mt-6 flex justify-center gap-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-all ease-jacco hover:-translate-y-1 hover:bg-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
        <hr className="my-8 border-primary-foreground/15" />
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} {footer.credits}
        </p>
      </div>
    </footer>
  );
}
