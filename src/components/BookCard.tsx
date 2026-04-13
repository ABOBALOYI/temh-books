"use client";

import { useState } from "react";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  isSelected: boolean;
  onToggle: () => void;
}

export default function BookCard({ book, isSelected, onToggle }: BookCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border ${
        isSelected
          ? "border-accent shadow-lg"
          : "border-border shadow-sm hover:shadow-md"
      }`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-white/90 text-foreground shadow-sm">
          {book.ageGroup}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2 bg-white">
        <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
          {book.title}
        </h3>

        <p
          className={`text-xs sm:text-sm text-text-secondary leading-relaxed cursor-pointer ${
            expanded ? "" : "line-clamp-2"
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          {book.description}
        </p>
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-accent font-medium self-start hover:underline cursor-pointer"
          >
            Read more
          </button>
        )}

        <button
          onClick={onToggle}
          className={`mt-auto w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
            isSelected
              ? "bg-foreground text-white hover:bg-primary-light"
              : "bg-accent text-white hover:bg-accent-dark"
          }`}
        >
          {isSelected ? "Selected ✓" : "I'm Interested"}
        </button>
      </div>
    </div>
  );
}
