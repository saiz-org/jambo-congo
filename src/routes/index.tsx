import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { About, Footer, Hero, Infrastructure, MainClient, Vision } from "@/components/site/Sections";
import { Contact } from "@/components/site/Contact";
import { Marquee } from "@/components/site/common";
import { marquee } from "@/content/site";

const title = "Jacco — JAMBO CONGO COMPANY";
const description =
  "JAMBO CONGO COMPANY (JACCO) - Fournisseur de gaz industriel et domestique en République Démocratique du Congo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Marquee items={marquee} />
        <Infrastructure />
        <Vision />
        <MainClient />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
