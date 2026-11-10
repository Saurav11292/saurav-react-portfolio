import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> AVAILABLE FOR GAME DEVELOPMENT
          OPPORTUNITIES
        </p>
        <h1>
          Building worlds.
          <br />
          <em>Creating</em> gameplay.
        </h1>
        <p className="hero-text">
          I'm <strong>Saurav Verma</strong>, an aspiring Unreal Engine Developer
          focused on gameplay programming, interactive systems, and atmospheric
          worlds.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href="#contact">
            Get in touch <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <div className="hero-art" aria-label="Decorative game environment artwork">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-sun" />
        <div className="art-mountain mountain-back" />
        <div className="art-mountain mountain-front" />
        <div className="art-ground" />
        <div className="art-caption">
          <span>01 / 04</span>
          <span>WORLDS IN PROGRESS</span>
        </div>
      </div>
      <div className="hero-index">
        <span>01</span>
        <span className="index-line" />
        <span>PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
