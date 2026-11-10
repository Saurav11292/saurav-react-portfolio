export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export class InvalidContactMessageError extends Error {
  constructor() {
    super("Please enter a valid name, email, subject, and message.");
    this.name = "InvalidContactMessageError";
  }
}

export class EmailServiceConfigurationError extends Error {
  constructor() {
    super("Contact email is not configured. Please email me directly.");
    this.name = "EmailServiceConfigurationError";
  }
}

export class EmailDeliveryError extends Error {
  constructor() {
    super("Message could not be sent. Please try again later.");
    this.name = "EmailDeliveryError";
  }
}

export function parseContactMessage(input: unknown): ContactMessage {
  if (typeof input !== "object" || input === null) {
    throw new InvalidContactMessageError();
  }

  const values = input as Record<string, unknown>;
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const subject =
    typeof values.subject === "string" ? values.subject.trim() : "";
  const message =
    typeof values.message === "string" ? values.message.trim() : "";

  if (
    !name ||
    name.length > 100 ||
    !email ||
    email.length > 150 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !subject ||
    subject.length > 150 ||
    !message ||
    message.length > 3000
  ) {
    throw new InvalidContactMessageError();
  }

  return { name, email, subject, message };
}

export async function sendContactEmail(input: unknown): Promise<void> {
  const contact = parseContactMessage(input);
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    throw new EmailServiceConfigurationError();
  }

  let response: Response;
  try {
    response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          from_name: contact.name,
          reply_to: contact.email,
          subject: contact.subject,
          message: contact.message,
          to_name: "Saurav",
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("EmailJS request failed:", error);
    throw new EmailDeliveryError();
  }

  if (!response.ok) {
    console.error("EmailJS returned an unsuccessful status:", response.status);
    throw new EmailDeliveryError();
  }
}
