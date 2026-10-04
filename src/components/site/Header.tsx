import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Logo, ease } from "./common";

function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const ids = ["home", "about", "infrastructure", "vision", "client", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "about" ? "#home" : `#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled;

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-primary" />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-x-0 top-0 z-40 px-4 pt-3"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 ease-jacco ${
            scrolled ? "glass py-2" : "border border-transparent py-3"
          }`}
        >
          <a href="#home" aria-label="Jacco — accueil" className={dark ? "text-primary-foreground" : "text-ink"}>
            <Logo />
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {nav.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-primary-foreground" : dark ? "text-primary-foreground/80 hover:text-primary-foreground" : "text-ink hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-primary shadow-[var(--shadow-primary)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>
          <button
            className={`rounded-full p-2 md:hidden ${dark ? "text-primary-foreground" : "text-ink"}`}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>
      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}

export function MobileMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            className="absolute inset-0 bg-overlay/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-background p-6 shadow-lift"
          >
            <div className="mb-10 flex items-center justify-between text-ink">
              <Logo />
              <button aria-label="Fermer le menu" onClick={onClose} className="rounded-full p-2 hover:bg-surface">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease }}
                  className={`rounded-lg px-4 py-3 font-display text-lg font-semibold transition-colors ${
                    active === l.href ? "bg-gradient-primary text-primary-foreground" : "text-ink hover:bg-surface"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
