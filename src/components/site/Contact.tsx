import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Send, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { contact } from "@/content/site";
import { sendContact } from "@/lib/sendContact";
import { Reveal, SectionHeader } from "./common";

const schema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(100),
  lastName: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  subject: z.string().trim().min(1, "Le sujet est requis").max(200),
  message: z.string().trim().min(1, "Le message est requis").max(2000),
});
type Values = z.infer<typeof schema>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold text-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (v: Values) => {
    await sendContact(v);
    toast.success("Merci ! Votre messagerie va s'ouvrir pour envoyer le message.");
    reset();
  };

  return (
    <section id="contact" className="bg-surface py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Parlons-en" title={contact.title} subtitle={contact.subtitle} />
        <div className="grid overflow-hidden rounded-lg shadow-lift lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal from="left" className="grain relative overflow-hidden bg-ink-deep p-8 text-primary-foreground sm:p-10">
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-[90px]" />
          <h3 className="relative text-2xl">JACCO</h3>
          <p className="relative mt-3 text-primary-foreground/70">{contact.subtitle}</p>
          <ul className="relative mt-10 space-y-6">
            {[
              { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
              { icon: MapPin, label: "Adresse", value: "Doko, Haut-Uele, RDC" },
              { icon: Clock, label: "Depuis", value: "2016" },
            ].map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary"><Icon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-primary-foreground/50">{label}</span>
                  {href ? <a href={href} className="font-medium hover:text-primary">{value}</a> : <span className="font-medium">{value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal from="right">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="h-full space-y-5 bg-card p-6 sm:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="firstName" label="Prénom" error={errors.firstName?.message}>
                <input id="firstName" className="field" placeholder="Votre prénom" required {...register("firstName")} />
              </Field>
              <Field id="lastName" label="Nom" error={errors.lastName?.message}>
                <input id="lastName" className="field" placeholder="Votre nom" required {...register("lastName")} />
              </Field>
            </div>
            <Field id="email" label="Adresse email" error={errors.email?.message}>
              <input id="email" type="email" className="field" placeholder="votre.email@exemple.com" required {...register("email")} />
            </Field>
            <Field id="subject" label="Sujet" error={errors.subject?.message}>
              <input id="subject" className="field" placeholder="Objet de votre message" required {...register("subject")} />
            </Field>
            <Field id="message" label="Message" error={errors.message?.message}>
              <textarea id="message" className="field min-h-[100px] resize-y" rows={5} placeholder="Décrivez votre projet, vos besoins ou votre demande..." required {...register("message")} />
            </Field>
            <div className="text-center">
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={isSubmitting}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold sm:w-auto"
              >
                <Send className="h-5 w-5" /> {contact.submit}
              </motion.button>
            </div>
          </form>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
