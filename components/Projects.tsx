"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS as SHARED_PROJECTS } from "@/lib/projects";

const PROJECTS = SHARED_PROJECTS.map((p) => ({
  slug: p.slug,
  emoji: p.slug === "pila" ? "🎟️" : p.slug === "pisoblox" ? "🛒" : "🔗",
  title: p.title,
  description: p.tagline,
  tags: p.tech.slice(0, 4),
  link: p.liveUrl,
  repo: p.repoUrl,
}));

export default function Projects() {
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
    <section
      id="projects"
      className="py-section px-4 sm:px-6"
      aria-labelledby="projects-title"
    >
      <div className="container-narrow">
        <p className="section-label mb-4">04 — projects</p>

        <h2
          id="projects-title"
          className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-10"
        >
          things i&apos;ve built.
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Projects"
        >
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="card group"
              role="listitem"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.55s ease-out ${i * 120}ms, transform 0.55s ease-out ${i * 120}ms`,
              }}
            >
              <div
                className="aspect-[4/3] flex items-center justify-center text-5xl overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%)" }}
              >
                <span
                  className="transition-transform duration-420 ease-out-expo group-hover:scale-[1.04]"
                  aria-hidden="true"
                >
                  {project.emoji}
                </span>
              </div>

              <div className="p-card">
                <h3 className="font-pixel text-xl text-ink mb-2">
                  {project.title}
                </h3>
                <p className="text-base-ui text-gray-500 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag" role="listitem">
                      {tag}
                    </span>
                  ))}
                </div>

                {(project.link || project.repo) && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn-link"
                    >
                      View Project
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link text-micro"
                      >
                        source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}