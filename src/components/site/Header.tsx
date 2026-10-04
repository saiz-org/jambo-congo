import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Logo } from "./common";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-border backdrop-blur-md transition-all ease-jacco ${
          scrolled ? "bg-background/[0.98] py-2 shadow-soft" : "bg-background/95 py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <a href="#home" aria-label="Jacco — accueil" className="text-ink">
            <Logo />
          </a>
          <nav className="hidden gap-8 md:flex" aria-label="Navigation principale">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>
          <button
            className="rounded-lg p-2 text-ink md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-overlay/50 transition-opacity ease-jacco ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 left-0 w-[280px] bg-background p-6 shadow-lift transition-transform ease-jacco ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between text-ink">
          <Logo />
          <button aria-label="Fermer le menu" onClick={onClose} className="p-2" tabIndex={open ? 0 : -1}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col">
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className="border-b border-border py-3 font-medium text-ink transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
