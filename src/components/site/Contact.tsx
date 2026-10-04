import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
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

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
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
    <section id="contact" className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title={contact.title} subtitle={contact.subtitle} />
        <Reveal className="mx-auto lg:w-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 rounded-lg border border-border bg-card p-5 shadow-soft sm:p-8"
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3 font-semibold sm:w-auto"
              >
                <Send className="h-5 w-5" /> {contact.submit}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
