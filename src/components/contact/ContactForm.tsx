import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";

export function ContactForm() {
  const { sending, result, handleSubmit } = useContactForm();

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            maxLength={100}
          />
        </label>
        <label>
          Your email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            maxLength={150}
          />
        </label>
      </div>
      <label>
        Subject
        <input
          name="subject"
          type="text"
          placeholder="What would you like to discuss?"
          required
          maxLength={150}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          placeholder="Write your message..."
          rows={5}
          required
          maxLength={3000}
        />
      </label>
      <button
        className="button button-primary submit-button"
        type="submit"
        disabled={sending}
      >
        {sending ? "Sending..." : "Send message"} <Send size={16} />
      </button>
      {result && (
        <p className={`form-result ${result.type}`} role="status">
          {result.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {result.message}
        </p>
      )}
      <p className="form-note">
        Or email directly:{" "}
        <a href="mailto:svjobs111@gmail.com">svjobs111@gmail.com</a>
      </p>
    </form>
  );
}
