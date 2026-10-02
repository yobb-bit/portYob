"use client";

import { useEffect, useState } from "react";

const TYPED_WORDS = ["developer", "designer", "creator", "student"];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPED_WORDS[wordIndex];
    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && displayText === currentWord) {
      speed = 1800;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPED_WORDS.length);
      } else if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
      } else {
        setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="hero-title"
    >
      <div className="container-narrow">
        <div className="max-w-2xl xl:max-w-3xl">
          {/* Section label */}
          <p className="section-label mb-4 animate-entrance entrance-delay-1">
            01 — hero
          </p>

          {/* Main heading */}
          <h1
            id="hero-title"
            className="font-pixel text-display-title text-ink mb-6 animate-entrance entrance-delay-2"
            aria-live="polite"
          >
            Hi, I&apos;m
            <br />
            <span className="text-ink font-pixel">John Kent</span>
          </h1>

          {/* Typed tagline */}
          <p className="text-base-ui text-gray-500 mb-10 animate-entrance entrance-delay-3">
            I&apos;m a <span className="font-pixel text-ink">{displayText}</span>{" "}
            <span className="typed-cursor" aria-hidden="true" />
          </p>

          {/* Description */}
          <p className="text-base-ui text-gray-500 max-w-2xl mb-10 animate-entrance entrance-delay-4">
            2nd year BSIT student building for the web with JavaScript, React,
            and Next.js. I enjoy turning ideas into clean, functional digital
            experiences.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 animate-entrance entrance-delay-5">
            <a
              href="#projects"
              className="btn-primary"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn-link"
            >
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Halftone accent */}
          <div className="halftone absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none -z-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}