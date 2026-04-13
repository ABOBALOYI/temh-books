"use client";

import { useBookSelection } from "@/components/BookSelectionProvider";
import { books } from "@/data/books";

export default function StickySelectionBar() {
  const { selectedBooks } = useBookSelection();

  if (selectedBooks.size === 0) return null;

  const selectedTitles = books
    .filter((b) => selectedBooks.has(b.id))
    .map((b) => b.title);

  const handleClick = () => {
    document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {selectedBooks.size} {selectedBooks.size === 1 ? "book" : "books"} selected
            </p>
            <p className="text-xs text-text-secondary truncate hidden sm:block">
              {selectedTitles.join(", ")}
            </p>
          </div>
          <button
            onClick={handleClick}
            className="flex-shrink-0 px-6 py-2.5 bg-accent text-white font-bold text-sm rounded-full hover:bg-accent-dark hover:scale-105 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Register Now →
          </button>
        </div>
      </div>
    </div>
  );
}
