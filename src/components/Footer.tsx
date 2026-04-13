"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/images/logo.jpeg" alt="Temh Books" className="h-10 w-10 rounded-lg" />
              <h3 className="text-xl font-bold">Temh Books</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Children&apos;s books from South Africa — stories of faith, culture, science, and adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => document.getElementById("book-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm text-white/60 hover:text-white transition-colors text-left cursor-pointer">
                Our Books
              </button>
              <button onClick={() => document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm text-white/60 hover:text-white transition-colors text-left cursor-pointer">
                Register Interest
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:info@temh.co.za"
                className="text-sm text-white/60 hover:text-white transition-colors">
                info@temh.co.za
              </a>
              <a href="https://temh.co.za" target="_blank" rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors">
                temh.co.za
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Temh Books. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
