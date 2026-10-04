export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export const CONTACT_EMAIL = "support@jacco.cd";

/**
 * Single sending point for the contact form.
 * Currently opens a pre-filled mailto link; swap the body for Formspree/EmailJS later.
 */
export async function sendContact(data: ContactPayload): Promise<void> {
  const body = [
    `Nom : ${data.lastName}`,
    `Prénom : ${data.firstName}`,
    `Email : ${data.email}`,
    "",
    data.message,
  ].join("\n");
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}
