"use client";
// This entire component needs "use client" because it uses:
// - useState (theme toggle, menu open/close, typing animation)
// - useEffect (IntersectionObserver for blur animation, click-outside listener)
// - useRef (DOM references for the menu and button)

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, ArrowUp } from "lucide-react";

// ─── BlurText ────────────────────────────────────────────────────────────────
// Animates text by blurring each letter/word in from the top.
// "inView" becomes true when the element scrolls into the viewport.
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // IntersectionObserver fires when the element enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    // Copy ref.current to a local variable so the cleanup function
    // uses the same element even if ref.current changes later.
    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Split the text into words or individual letters depending on `animateBy`
  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            // Start: blurred + shifted; End: clear + in place
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            // Each segment animates in with a slight delay after the one before it
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {/* Add a non-breaking space between words (not letters) */}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

// ─── Typing animation hook ────────────────────────────────────────────────────
// Same typing effect from the original Hero.tsx — cycles through a list of words.
const TYPED_WORDS = ["I'm John Kent.", "I'm a Developer.", "I'm a Designer.", "I'm a Creator."];

function useTypingEffect() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPED_WORDS[wordIndex];
    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && displayText === currentWord) {
      speed = 1800; // pause before deleting
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

  return displayText;
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { label: "HOME",     href: "#hero",     highlight: true },
  { label: "ABOUT",    href: "#about" },
  { label: "SKILLS",   href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT",  href: "#contact" },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function PortfolioHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // imgHovered: true when the mouse is over the profile photo
  const [imgHovered, setImgHovered] = useState(false);
  // showBackToTop: true once the user has scrolled down past the hero
  const [showBackToTop, setShowBackToTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typedText = useTypingEffect();

  // Show the "back to top" button after the user scrolls down a bit
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the hamburger menu when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0d0d0d", color: "#f0ede8" }}
    >
      {/* ── Header / Nav ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">

          {/* Left side: hamburger (mobile only) + inline links (desktop) */}
          <div className="flex items-center">
            {/* Hamburger button + dropdown — hidden on md+ because inline links take over */}
            <div className="relative md:hidden">
              <button
                ref={buttonRef}
                type="button"
                className="p-2 transition-colors duration-300 text-neutral-500 hover:text-[#FF6B35]"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-8 h-8" strokeWidth={2} />
                ) : (
                  <Menu className="w-8 h-8" strokeWidth={2} />
                )}
              </button>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute top-full left-0 w-[220px] shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                  style={{
                    backgroundColor: "#111111",
                    border: "1px solid #2a2a2a",
                  }}
                >
                  {MENU_ITEMS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-lg font-bold tracking-tight py-1.5 px-2 transition-colors duration-200"
                      style={{
                        color: item.highlight ? "#FF6B35" : "#f0ede8",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FF6B35";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = item.highlight
                          ? "#FF6B35"
                          : "#f0ede8";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Inline nav links — shown on md screens and up */}
            <div className="hidden md:flex items-center gap-8 ml-2">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold tracking-[0.12em] uppercase
                    transition-colors duration-200 hover:text-[#FF6B35]"
                  style={{ color: item.highlight ? "#FF6B35" : "#888" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Signature — cursive "K" for Kent */}
          <div
            className="text-4xl select-none"
            style={{
              color: "#f0ede8",
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            K
          </div>
        </nav>
      </header>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <main className="relative min-h-screen flex flex-col">

        {/* Big name — perfectly centered on screen */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">

            {/* "JOHN" — wrapped in a block div so it sits on its own line */}
            <div>
              <BlurText
                text="JOHN"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px]
                  leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#FF6B35", fontFamily: "'Bebas Neue', sans-serif" }}
              />
            </div>

            {/* "KENT" — on its own line below JOHN */}
            <div>
              <BlurText
                text="KENT"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px]
                  leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#FF6B35", fontFamily: "'Bebas Neue', sans-serif" }}
              />
            </div>

            {/* Profile photo — sits on top of the name by default.
                On hover: drops behind (z-0) so the JOHN KENT text appears in front,
                and a popup label fades in over the image area. */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                transition-all duration-500 cursor-pointer
                ${imgHovered ? "z-0 scale-95 opacity-40" : "z-10 scale-100 opacity-100"}`}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              {/* Pill-shaped photo */}
              <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px]
                lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="John Kent"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Popup label — appears above the image on hover.
                  opacity-0 → opacity-100 and translateY(-8px) → translateY(0) on hover */}
              <div
                className={`absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                  bg-[#FF6B35] text-[#0d0d0d] px-4 py-2 rounded-lg shadow-xl
                  font-bold text-sm tracking-wide pointer-events-none
                  transition-all duration-300
                  ${imgHovered
                    ? "opacity-100 -translate-y-0"
                    : "opacity-0 translate-y-2"
                  }`}
              >
                👋 John Kent — Developer
                {/* Small triangle arrow pointing down at the image */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full
                  border-[6px] border-transparent border-t-[#FF6B35]" />
              </div>
            </div>
          </div>
        </div>

        {/* Typing animation tagline — sits below the big name */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36
          left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            {/*
              We render the typing text here instead of a static tagline.
              typed-cursor is a CSS class in globals.css that adds the blinking "|"
            */}
            <span
              className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px]
                text-center text-neutral-500 typed-cursor"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {typedText}
            </span>
          </div>
        </div>

        {/* Scroll down arrow */}
        <a
          href="#about"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2
            text-neutral-500 hover:text-[#FF6B35] transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8" />
        </a>
      </main>

      {/* Back to top button — slides in after the user scrolls down */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#FF6B35] text-[#0d0d0d]
          flex items-center justify-center shadow-xl transition-all duration-300
          ${showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
