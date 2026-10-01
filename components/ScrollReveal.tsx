"use client";
// ScrollReveal wraps any content and makes it fade + slide up when scrolled into view.
//
// How it works:
//   - Starts invisible (opacity: 0) and shifted down (translateY: 40px)
//   - IntersectionObserver fires when the element enters the viewport
//   - Sets isVisible = true, which triggers the CSS transition to animate in
//   - observer.disconnect() stops watching after it fires once (no re-animation)
//
// "use client" is required because we use useEffect and useState (React hooks).

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // optional delay in ms — useful for staggering multiple reveals
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once, then stop watching
        }
      },
      { threshold: 0.1 } // fire when at least 10% of the element is on screen
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        // The delay prop lets you chain reveals: one section starts after another
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
