"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);

      const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center
        bg-[rgba(13,13,13,0.85)] backdrop-blur-md border-b border-[#252525]
        transition-all duration-300
        ${isScrolled ? "px-12 py-3" : "px-12 py-5"}`}
    >
      <div className="font-head text-2xl tracking-wide">
        Tech<span className="text-accent">.</span>Kent
      </div>

      <div className="hidden md:flex gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`font-body text-xs font-medium tracking-widest uppercase transition-colors duration-200
              ${activeSection === link.href.slice(1)
                ? "text-accent"
                : "text-muted hover:text-accent"
              }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        className="md:hidden flex flex-col gap-[5px] p-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-[2px] bg-[#F5F5F0] rounded transition-all duration-300
          ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`block w-6 h-[2px] bg-[#F5F5F0] rounded transition-all duration-300
          ${isMenuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-[2px] bg-[#F5F5F0] rounded transition-all duration-300
          ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 flex flex-col gap-5
          bg-[rgba(13,13,13,0.97)] px-8 py-6 border-b border-[#252525] md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs font-medium tracking-widest uppercase text-muted hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
