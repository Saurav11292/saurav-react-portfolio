import { useState, type FormEvent } from "react";
import {
  EmailServiceConfigurationError,
  sendContactEmail,
} from "../services/contactEmailService";
import type { ContactMessage } from "../services/contactEmailService";

type SubmissionResult = {
  type: "success" | "error";
  message: string;
};

export function useContactForm() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const contact: ContactMessage = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setSending(true);
    try {
      await sendContactEmail(contact);
      form.reset();
      setResult({
        type: "success",
        message: "Thanks! Your message has been sent.",
      });
    } catch (error) {
      if (error instanceof EmailServiceConfigurationError) {
        setResult({ type: "error", message: error.message });
      } else {
        console.error("EmailJS error:", error);
        setResult({
          type: "error",
          message:
            "Message could not be sent. Please try again or email me directly.",
        });
      }
    } finally {
      setSending(false);
    }
  }

  return { sending, result, handleSubmit };
}
