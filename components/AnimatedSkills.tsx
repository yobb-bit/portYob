"use client";
// AnimatedSkills renders skill pills with a staggered entrance animation.
//
// The stagger trick:
//   Each pill has the same IntersectionObserver trigger (inView = true),
//   but each one gets a different CSS transition-delay based on its index.
//   So when inView flips to true, pill 0 starts first, pill 1 starts 60ms later,
//   pill 2 starts 120ms later, etc. — creating a cascade effect.
//
// "use client" is required because we use useState and useEffect.

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

export default function AnimatedSkills() {
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
      { threshold: 0.2 } // fire when 20% of the skill section is visible
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap gap-3">
      {SKILLS.map((skill, i) => (
        <span
          key={skill}
          className="font-body px-5 py-2 border border-[#252525] rounded-full
            text-sm text-muted
            hover:border-accent hover:text-accent hover:scale-105
            transition-colors duration-200 cursor-default"
          style={{
            // Before inView: invisible, shifted down slightly
            // After inView: fully visible at original position
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            // i * 60ms = each pill delays a bit longer than the previous one
            transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
