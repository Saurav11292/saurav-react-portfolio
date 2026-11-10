import { Github, Linkedin, Youtube } from "lucide-react";
import { ContactForm } from "../contact/ContactForm";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap contact-inner">
        <p className="section-kicker">05 — CONTACT</p>
        <h2>
          Let's build something
          <br />
          <em> memorable.</em>
        </h2>
        <p className="contact-copy">
          I'm looking for opportunities to contribute, learn, and grow with a
          game development team.
        </p>
        <ContactForm />
        <div className="socials">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <Youtube />
          </a>
        </div>
        <footer>
          <span>© 2026 SAURAV VERMA</span>
          <a href="#home">BACK TO TOP ↑</a>
          <span>DESIGNED & BUILT WITH REACT</span>
        </footer>
      </div>
    </section>
  );
}
