import { Box, Code2, Gamepad2 } from "lucide-react";
import { skills } from "../../data/portfolio";

const skillIcons = [Gamepad2, Box, Code2];

export function SkillsSection() {
  return (
    <section className="skills section-wrap" id="skills">
      <div className="section-heading">
        <p className="section-kicker">02 — TOOLKIT</p>
        <h2>
          Tools of the <em>trade.</em>
        </h2>
      </div>
      <div className="skill-grid">
        {skills.map((group, index) => {
          const Icon = skillIcons[index];

          return (
            <article className="skill-card" key={group.title}>
              <div className="skill-card-top">
                <span>0{index + 1}</span>
                <Icon />
              </div>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
