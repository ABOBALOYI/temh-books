"use client";

import { books } from "@/data/books";
import { useBookSelection } from "@/components/BookSelectionProvider";
import BookCard from "@/components/BookCard";

export default function BookGrid() {
  const { selectedBooks, toggleBook } = useBookSelection();

  return (
    <section id="book-grid" className="w-full bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Explore Our Books
          </h2>
          <p className="mt-2 text-text-secondary max-w-md mx-auto text-sm sm:text-base">
            Select the books that interest you, then register below.
          </p>
          {selectedBooks.size > 0 && (
            <p className="mt-3 text-accent font-semibold text-sm">
              {selectedBooks.size} {selectedBooks.size === 1 ? "book" : "books"} selected
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isSelected={selectedBooks.has(book.id)}
              onToggle={() => toggleBook(book.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
