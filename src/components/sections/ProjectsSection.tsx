import { Github, Youtube } from "lucide-react";

export function ProjectsSection() {
  return (
    <section className="project-section" id="projects">
      <div className="section-wrap">
        <div className="section-heading project-heading">
          <div>
            <p className="section-kicker">03 — SELECTED WORK</p>
            <h2>
              Projects in <em>progress.</em>
            </h2>
          </div>
          <span className="project-count">01 FEATURED PROJECT</span>
        </div>
        <article className="featured-project">
          <div className="project-visual">
            <div className="visual-glow" />
            <div className="visual-moon" />
            <div className="ruin ruin-a" />
            <div className="ruin ruin-b" />
            <div className="ruin ruin-c" />
            <div className="visual-fog" />
            <span className="visual-label">
              LAST LIGHT / ENVIRONMENT STUDY
            </span>
            <span className="visual-number">LL_001</span>
          </div>
          <div className="project-info">
            <div className="project-meta">
              <span>UNREAL ENGINE 5.6</span>
              <span>IN DEVELOPMENT</span>
            </div>
            <h3>LAST LIGHT</h3>
            <p className="project-type">Third-person horror / adventure</p>
            <p>
              A dark exploration experience set among forgotten ruins. The
              player must manage a limited light source, explore the environment,
              and survive hostile encounters.
            </p>
            <div className="feature-tags">
              <span>Energy System</span>
              <span>Pickups</span>
              <span>Dynamic Lighting</span>
              <span>Combat Prototype</span>
              <span>Enemy Health</span>
            </div>
            <div className="project-links">
              <a
                href="https://www.youtube.com/watch?v=ZxzFI2kQyzU&list=PLTp2-FLoK7NI"
                target="_blank"
                rel="noreferrer"
              >
                Gameplay videos <Youtube size={16} />
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub <Github size={16} />
              </a>
            </div>
          </div>
        </article>
        <p className="project-note">
          Replace the artwork above with screenshots or a gameplay video from
          your actual project before publishing.
        </p>
      </div>
    </section>
  );
}
