"use client";
// AnimatedProjects renders project cards with a staggered entrance + glow on hover.
//
// Two-layer animation approach:
//   - Outer <div>: handles the scroll entrance (fade + slide up, staggered by index)
//   - Inner <div>: handles the hover effect (lift + orange glow)
//   These need to be separate elements because inline styles (used for scroll animation)
//   override Tailwind's hover: classes if they're on the same element.
//
// "use client" is required because we use useState and useEffect.

import { useEffect, useRef, useState } from "react";

interface Project {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    emoji: "🎲",
    title: "Dice Roller",
    description: "A dice roller program built with JavaScript, HTML, and CSS.",
    tags: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/yobb-bit",
  },
  // The two below are EXAMPLES — swap them for your real projects.
  // Set `link` to your repo or live site and "View Project" will appear on the card.
  {
    emoji: "📝",
    title: "Todo List App",
    description: "A simple to-do list that lets you add, complete, and delete tasks.",
    tags: ["React", "CSS"],
    link: "https://github.com/yobb-bit",
  },
  {
    emoji: "🌦️",
    title: "Weather App",
    description: "Shows the current weather for any city using a public API.",
    tags: ["JavaScript", "API", "CSS"],
    link: "https://github.com/yobb-bit",
  },
];

export default function AnimatedProjects() {
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
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((project, i) => (
        // Outer div: controls scroll entrance animation
        <div
          key={project.title}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            // Each card is delayed 150ms more than the previous one
            transition: `opacity 0.55s ease ${i * 150}ms, transform 0.55s ease ${i * 150}ms`,
          }}
        >
          {/* Inner div: controls hover animation — separate so transforms don't conflict */}
          <div
            className="bg-surface border border-[#252525] rounded-xl overflow-hidden h-full
              hover:-translate-y-2 hover:border-accent
              hover:shadow-[0_0_30px_rgba(255,107,53,0.12)]
              transition-all duration-300 cursor-default"
          >
            {/* Thumbnail area */}
            <div
              className="h-44 flex items-center justify-center text-5xl
                transition-transform duration-300 hover:scale-110"
              style={{ background: "linear-gradient(135deg, #161616 0%, #252525 100%)" }}
            >
              {project.emoji}
            </div>

            {/* Card text body */}
            <div className="p-6">
              <h3 className="font-head text-[1.6rem] leading-none tracking-wide mb-2">
                {project.title}
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[0.72rem] px-2 py-0.5 rounded
                      bg-[rgba(255,107,53,0.12)] text-accent tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link to the project — only shows if `link` is set */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium
                    text-accent hover:underline"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
