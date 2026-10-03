"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CERTIFICATES = [
  {
    title: "Anthropic AI Code 101",
    issuer: "Anthropic / Skilljar",
    date: "October 2026",
    image: "/certificate-anthropic-code101.png",
    pdf: "/certificate-anthropic-code101.pdf",
    verifyUrl: "https://verify.skilljar.com/c/w7bqec827228",
    description: "Introductory course on coding with AI assistance using Claude.",
  },
];

export default function Certificates() {
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
      id="certificates"
      className="py-section px-4 sm:px-6"
      aria-labelledby="certificates-title"
    >
      <div className="container-narrow">
        <p className="section-label mb-4">05 — certificates</p>

        <h2
          id="certificates-title"
          className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-10"
        >
          learning & achievements
        </h2>

        <div ref={ref} className="space-y-6">
          {CERTIFICATES.map((cert, i) => (
            <article
              key={cert.title}
              className="card group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.55s ease-out ${i * 120}ms, transform 0.55s ease-out ${i * 120}ms`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 p-card">
                <div className="lg:col-span-2">
                  <div className="aspect-[16/10] overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      width={1600}
                      height={1000}
                      className="h-full w-full object-cover object-top transition-transform duration-[500ms] ease-out-expo group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
                <div className="lg:col-span-3 flex flex-col justify-center">
                  <h3 className="font-pixel text-xl text-ink mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-base-ui text-gray-500 mb-2">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.description && (
                    <p className="text-base-ui text-gray-500 mb-4">
                      {cert.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                    >
                      View PDF
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link text-micro"
                    >
                      Verify
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
