"use client";

import { useEffect, useRef, useState } from "react";
import { Headset, Network } from "lucide-react";

const SKILL_GROUPS = [
  {
    number: "01",
    label: "Support & Operations",
    note: "Customer-facing work & reliable delivery",
    icon: Headset,
    skills: [
      "Customer Support", "Technical Support", "Digital Product Delivery",
      "Order Fulfillment", "E-Commerce Operations", "Virtual Assistance",
      "Troubleshooting", "Problem Solving", "Online Operations",
    ],
  },
  {
    number: "02",
    label: "IT & Technical",
    note: "Building practical technical foundations",
    icon: Network,
    skills: [
      "Computer Networking", "Network Troubleshooting", "API Development",
      "Database Management", "REST APIs",
    ],
  },
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

        <h2 id="skills-title" className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-4">
          skills in practice
        </h2>
        <p className="text-base-ui text-gray-500 mb-10 max-w-2xl">
          Strengths from digital operations, alongside technical areas I&apos;m actively developing.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
            <article key={group.label} className="card p-card sm:p-6">
              <div className="flex items-start gap-3 mb-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-ink text-bg">
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-micro text-gray-400 mb-1">{group.number} / focus</p>
                  <h3 className="font-pixel text-xl text-ink">{group.label}</h3>
                  <p className="text-[12px] text-gray-500 mt-1">{group.note}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list" aria-label={group.label}>
                {group.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2 text-small-ui text-gray-600 dark:bg-gray-100"
                    role="listitem"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(16px)",
                      transition: `opacity 0.4s ease-out ${(groupIndex * 5 + i) * 50}ms, transform 0.4s ease-out ${(groupIndex * 5 + i) * 50}ms`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
