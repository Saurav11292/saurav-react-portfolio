import emailjs from "@emailjs/browser";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export class EmailServiceConfigurationError extends Error {
  constructor() {
    super(
      "Email is not configured yet. Add your EmailJS values to the .env file.",
    );
    this.name = "EmailServiceConfigurationError";
  }
}

export async function sendContactEmail(contact: ContactMessage): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new EmailServiceConfigurationError();
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: contact.name,
      reply_to: contact.email,
      subject: contact.subject,
      message: contact.message,
      to_name: "Saurav",
    },
    { publicKey },
  );
}
