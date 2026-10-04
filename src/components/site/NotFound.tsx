import { Link } from "@tanstack/react-router";
import { Home, Mail, Search } from "lucide-react";
import { notFound } from "@/content/site";
import { Logo } from "./common";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="px-4 py-6 text-ink">
        <div className="mx-auto max-w-6xl">
          <Link to="/" aria-label="Retour à l'accueil"><Logo /></Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-xl rounded-lg border border-border bg-card p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
            <Search className="h-7 w-7" aria-hidden />
          </div>
          <p className="text-7xl font-extrabold text-primary">404</p>
          <h1 className="mt-2 text-2xl text-ink">{notFound.title}</h1>
          <p className="mt-4 text-ink-muted">{notFound.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold">
              <Home className="h-5 w-5" /> Retour à l'accueil
            </Link>
            <a href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors ease-jacco hover:bg-primary hover:text-primary-foreground">
              <Mail className="h-5 w-5" /> Nous contacter
            </a>
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <p className="font-semibold text-ink">Liens utiles :</p>
            <div className="mt-3 flex flex-wrap justify-center gap-4">
              {notFound.links.map((l) => (
                <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
