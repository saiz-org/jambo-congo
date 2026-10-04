import type { LucideIcon } from "lucide-react";
import { Zap, BarChart3, Leaf, Users, Home, Shield } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Facebook, XTwitter as Twitter, Linkedin, Instagram } from "@/components/site/BrandIcons";
import infra1 from "@/assets/infra_1.jpg";
import infra2 from "@/assets/infra_2.jpg";
import infra3 from "@/assets/infra_3.jpg";
import vision1 from "@/assets/vision_1.jpg";
import vision2 from "@/assets/vision_2.jpg";
import vision3 from "@/assets/vision_3.jpg";

export type Feature = { icon: LucideIcon; title: string; text: string };
export type Slide = { image: string; title: string; text: string };
export type NavLink = { label: string; href: string };
export type Social = { label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

export const nav: NavLink[] = [
  { label: "Accueil", href: "#home" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Vision", href: "#vision" },
  { label: "Client principal", href: "#client" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  titleLines: ["JAMBO CONGO", "COMPANY"],
  subtitle:
    "Fournisseur leader de gaz industriel et domestique en République Démocratique du Congo. Depuis 2016, nous alimentons l'industrie et les ménages avec des solutions énergétiques fiables et durables.",
  ctaPrimary: "Découvrir JACCO",
  ctaSecondary: "Nous contacter",
};

export const about = {
  title: "JAMBO CONGO COMPANY",
  text: "Implantée à Doko depuis 2016, dans la province du Haut-Uele, JACCO s'engage à répondre aux besoins énergétiques croissants de l'industrie et des ménages avec excellence et innovation.",
};

export const infrastructure = {
  title: "Infrastructure & Production",
  subtitle:
    "Une infrastructure de pointe équipée des dernières technologies pour assurer une production fiable, rapide et respectueuse de l'environnement.",
  features: [
    { icon: Zap, title: "Production Fiable et Rapide", text: "Grâce à des installations automatisées et des processus de contrôle rigoureux, nous assurons une production continue et sécurisée." },
    { icon: BarChart3, title: "Capacité Élevée", text: "Notre site peut gérer d'importants volumes, garantissant un approvisionnement stable même en période de forte demande." },
    { icon: Leaf, title: "Respect Environnemental", text: "Équipements éco-responsables et matériaux durables pour réduire notre impact écologique et promouvoir la durabilité." },
  ] as Feature[],
  photos: [
    { src: infra1, alt: "Infrastructure industrielle moderne" },
    { src: infra2, alt: "Équipements de production avancés" },
    { src: infra3, alt: "Technologies environnementales durables" },
  ],
};

export const vision = {
  title: "Notre Vision",
  subtitle:
    "Devenir un leader énergétique en RDC en diversifiant notre clientèle, en stimulant l'économie locale et en proposant des solutions durables.",
  features: [
    { icon: Users, title: "Clients Variés", text: "Solutions énergétiques adaptées aux secteurs industriel, résidentiel et commercial pour renforcer notre présence sur l'ensemble du marché." },
    { icon: Home, title: "Développement Local", text: "Collaboration avec les acteurs locaux pour créer des emplois, soutenir l'industrialisation et favoriser le transfert de compétences." },
    { icon: Shield, title: "Solutions Durables", text: "Technologies fiables et respectueuses de l'environnement avec des standards rigoureux pour un approvisionnement énergétique stable." },
  ] as Feature[],
  slides: [
    { image: vision1, title: "Innovation Technologique", text: "Investissement dans les technologies de pointe pour l'avenir énergétique" },
    { image: vision2, title: "Collaboration d'Équipe", text: "Une équipe unie pour des solutions énergétiques durables" },
    { image: vision3, title: "Développement Durable", text: "Engagement pour un avenir énergétique respectueux de l'environnement" },
  ] as Slide[],
};

export const mainClient = {
  title: "KIBALI GOLD MINE",
  subtitle: "Notre Client Principal",
  text: "JACCO est fier d'être le principal fournisseur de gaz de KIBALI GOLD MINE, une mine d'envergure opérée par Barrick Gold Corporation. Cette collaboration stratégique illustre notre capacité à répondre aux exigences strictes du secteur minier.",
  imageAlt: "Mine d'or de Kibali",
};

export const contact = {
  title: "Contactez-nous",
  subtitle: "Prêt à découvrir nos solutions énergétiques ? Notre équipe est là pour répondre à vos besoins.",
  email: "support@jacco.cd",
  submit: "Envoyer le message",
};

export const socials: Social[] = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter / X", href: "#", icon: Twitter },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Instagram", href: "#", icon: Instagram },
];

export const footer = {
  tagline: "Fournisseur leader de solutions énergétiques en République Démocratique du Congo",
  credits: "JAMBO CONGO COMPANY. Tous droits réservés | Développé par Joyce Sabwe",
};

export const notFound = {
  title: "Page Introuvable",
  text: "Oups ! La page que vous recherchez n'existe pas ou a été déplacée. Elle a peut-être été supprimée, renommée ou est temporairement indisponible.",
  links: [
    { label: "Infrastructure", href: "/#infrastructure" },
    { label: "Notre Vision", href: "/#vision" },
    { label: "Nos Clients", href: "/#client" },
    { label: "Contact", href: "/#contact" },
  ] as NavLink[],
};

export const stats = [
  { value: "2016", label: "Année de création" },
  { value: "Doko", label: "Haut-Uele, RDC" },
  { value: "24/7", label: "Production continue" },
  { value: "Kibali", label: "Client principal" },
];

export const marquee = ["Gaz industriel", "Gaz domestique", "Sécurité", "Fiabilité", "Durabilité", "Haut-Uele", "Innovation"];

export const kibaliPage = {
  eyebrow: "Notre client principal",
  title: "KIBALI GOLD MINE",
  intro:
    "Plus grande mine d'or d'Afrique, Kibali est implantée dans le Haut-Uele, à quelques kilomètres de Doko. Opérée par Barrick, elle est devenue en dix ans un moteur de développement pour tout le nord-est de la RDC — et JACCO est fier d'accompagner ce partenaire au quotidien.",
  figures: [
    { value: "6,3 Md$", label: "investis en RDC depuis l'origine du projet" },
    { value: "3,1 Md$", label: "versés aux entreprises et fournisseurs congolais" },
    { value: "95 %", label: "d'employés congolais, direction générale comprise" },
    { value: "~85 %", label: "d'électricité d'origine renouvelable" },
  ],
  pillars: [
    {
      title: "Un moteur économique pour le Haut-Uele",
      text: "Kibali est le premier contributeur économique du nord-est de la RDC. Sa politique d'achats locaux a transformé la région en un véritable pôle commercial, autour de Doko et Durba.",
    },
    {
      title: "Des entreprises locales accompagnées",
      text: "La mine accompagne la croissance des PME congolaises en renforçant leurs compétences techniques et commerciales. Sa troisième centrale hydroélectrique, Azambi, a été construite par une équipe entièrement congolaise.",
    },
    {
      title: "Une énergie verte et locale",
      text: "Trois centrales hydroélectriques au fil de l'eau (Nzoro, Ambaru, Azambi), complétées par une centrale solaire et des batteries, font de Kibali l'une des mines les plus vertes du continent.",
    },
    {
      title: "Des projets pour les communautés",
      text: "Un fonds de développement communautaire alimenté par 0,3 % du chiffre d'affaires finance chaque année des dizaines de projets — écoles, santé, eau, agriculture — ainsi que le programme du Cahier des Charges.",
    },
    {
      title: "La biodiversité protégée",
      text: "Kibali soutient le Parc national de la Garamba, voisin de la mine, notamment à travers la réintroduction du rhinocéros blanc dans la région.",
    },
    {
      title: "Des Congolais aux commandes",
      text: "Sur plus de 6 500 collaborateurs, 95 % sont congolais. Une démonstration qu'une mine de classe mondiale peut être dirigée par des talents nationaux.",
    },
  ],
  partnership: {
    title: "JACCO, partenaire de proximité",
    text: "Installé à Doko depuis 2016, JACCO fournit à Kibali le gaz industriel indispensable à ses opérations. Cette relation illustre la vision de la mine : s'appuyer sur des entreprises congolaises fiables, implantées au cœur du Haut-Uele, pour créer de la valeur qui reste dans la région.",
  },
  sources: [
    { label: "Barrick — Kibali continue de croître (2025)", href: "https://www.barrick.com/English/news/news-details/2025/kibali-continues-to-deliver-growth/default.aspx" },
    { label: "Barrick — Kibali et l'ARSP pour le contenu local (2024)", href: "https://www.barrick.com/English/news/news-details/2024/kibali-and-DRC-partner-to-promote-local-content/default.aspx" },
    { label: "Barrick — L'une des mines les plus vertes d'Afrique (2024)", href: "https://www.barrick.com/English/news/news-details/2024/africas-largest-gold-mine-now-also-one-of-its-greenest/default.aspx" },
    { label: "Barrick — Un développement fondé sur les partenariats (2023)", href: "https://www.barrick.com/English/news/news-details/2023/pioneering-kibali-plans-further-partner-based-development/default.aspx" },
  ],
};
