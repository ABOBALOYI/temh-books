"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/images/logo.jpeg" alt="Temh Books" className="h-8 w-auto rounded-md" />
          <span className={`text-lg font-bold transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}>
            Temh Books
          </span>
        </button>

        <nav className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => scrollTo("book-grid")}
            className={`text-sm font-medium transition-colors cursor-pointer hidden sm:block ${
              scrolled ? "text-text-secondary hover:text-foreground" : "text-white/70 hover:text-white"
            }`}
          >
            Books
          </button>
          <button
            onClick={() => scrollTo("interest-form")}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
              scrolled
                ? "bg-accent text-white hover:bg-accent-dark"
                : "bg-white/15 text-white border border-white/20 hover:bg-white/25"
            }`}
          >
            Register
          </button>
        </nav>
      </div>
    </header>
  );
}
