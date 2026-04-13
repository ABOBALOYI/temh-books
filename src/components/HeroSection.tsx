"use client";

export default function HeroSection() {
  const handleCtaClick = () => {
    document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleBooksClick = () => {
    document.getElementById("book-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6 pt-16">
        <img src="/images/logo.jpeg" alt="Temh Books" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-2xl" />

        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm font-medium border border-white/10">
          Coming Soon — Pre-Launch
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
          Temh Books
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
          Children&apos;s books from South Africa — stories of faith, culture, science, and adventure.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-2">
          <div className="text-center">
            <p className="text-2xl font-black text-white">11</p>
            <p className="text-xs text-white/50">Books</p>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">3–12</p>
            <p className="text-xs text-white/50">Age Range</p>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">🇿🇦</p>
            <p className="text-xs text-white/50">South African</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
          <button
            onClick={handleCtaClick}
            className="px-8 py-3.5 bg-accent text-white font-bold rounded-full hover:bg-accent-dark hover:scale-105 transition-all duration-300 cursor-pointer text-base"
          >
            Register Your Interest
          </button>
          <button
            onClick={handleBooksClick}
            className="px-8 py-3.5 bg-white/10 text-white font-medium rounded-full border border-white/15 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer text-base"
          >
            Browse Books ↓
          </button>
        </div>
      </div>
    </section>
  );
}
