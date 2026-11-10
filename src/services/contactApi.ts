export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export class ContactSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactSubmissionError";
  }
}

export async function sendContactMessage(
  contact: ContactMessage,
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  if (response.ok) return;

  const body: { message?: string } = await response
    .json()
    .catch(() => ({}));
  throw new ContactSubmissionError(
    body.message ?? "Message could not be sent. Please try again later.",
  );
}
