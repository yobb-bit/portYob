"use client";

import { useEffect, useRef, useState } from "react";

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Java",
  "Figma",
  "Git & GitHub",
];

export default function Skills() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      id="skills"
      className="py-section px-4 sm:px-6"
      aria-labelledby="skills-title"
    >
      <div className="container-narrow">
        <p className="section-label mb-4">03 — skills</p>

        <h2
          id="skills-title"
          className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-10"
        >
          Skills & Tools
        </h2>

        <div ref={ref} className="flex flex-wrap gap-2" role="list" aria-label="Technical skills">
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              className="tag"
              role="listitem"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s ease-out ${i * 50}ms, transform 0.4s ease-out ${i * 50}ms`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}