"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function handleScroll() {
      const sectionIds = NAV_ITEMS.map((l) => l.href.slice(1));
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
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[14rem] lg:z-50 lg:border-r lg:border-gray-300 lg:bg-white lg:shadow-[0_0_0_1px_rgba(0,0,0,0.05)] lg:transition-colors lg:duration-500 dark:lg:bg-gray-950 dark:lg:border-gray-700 dark:lg:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
        <nav className="h-full flex flex-col px-6 py-10 lg:py-16 space-y-8">
          {/* Logo */}
          <Link href="/" className="font-pixel text-ink text-[1.5rem] lowercase select-none hover:opacity-70 transition-opacity">
            portyob
          </Link>

          {/* Nav links */}
          <ul className="flex flex-col space-y-1" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[8px] font-mono text-[11px] uppercase tracking-[1px] transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? "text-ink bg-gray-200"
                      : "text-gray-500 hover:text-ink hover:bg-gray-200"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {activeSection === item.href.slice(1) && (
                    <span className="w-1 h-1 rounded-full bg-ink" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme toggle at bottom */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-gray-300 bg-white/95 backdrop-blur-sm transition-colors duration-500 dark:bg-gray-950/95 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-pixel text-ink text-[1.25rem] lowercase select-none">
            portyob
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 rounded-[8px] text-gray-500 hover:text-ink hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 px-4 bg-gray-50 dark:bg-gray-100">
            <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-[11px] uppercase tracking-[1px] py-2 px-3 rounded-[6px] transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? "text-ink bg-gray-200"
                      : "text-gray-500 hover:text-ink hover:bg-gray-200"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Content offset for desktop sidebar */}
      <div className="lg:pl-[14rem]" />
    </>
  );
}