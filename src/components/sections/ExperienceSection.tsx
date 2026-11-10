import { experience } from "../../data/portfolio";

export function ExperienceSection() {
  return (
    <section className="experience section-wrap" id="experience">
      <div className="section-heading">
        <p className="section-kicker">04 — EXPERIENCE</p>
        <h2>
          Engineering <em>foundation.</em>
        </h2>
      </div>
      <div className="timeline">
        {experience.map((job, index) => (
          <article className="timeline-item" key={job.company}>
            <span className="timeline-number">0{index + 1}</span>
            <div>
              <h3>{job.role}</h3>
              <p className="company">{job.company}</p>
              <p className="job-detail">{job.detail}</p>
            </div>
            <span className="period">{job.period}</span>
          </article>
        ))}
      </div>
      <div className="education-row">
        <span>EDUCATION</span>
        <strong>B.Tech — Marine Engineering</strong>
        <span>Indian Maritime University</span>
      </div>
    </section>
  );
}
