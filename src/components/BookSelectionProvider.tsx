"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface BookSelectionContextType {
  selectedBooks: Set<string>;
  toggleBook: (bookId: string) => void;
  clearSelection: () => void;
}

const BookSelectionContext = createContext<BookSelectionContextType | null>(null);

export function useBookSelection(): BookSelectionContextType {
  const context = useContext(BookSelectionContext);
  if (!context) {
    throw new Error(
      "useBookSelection must be used within a BookSelectionProvider"
    );
  }
  return context;
}

export default function BookSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(
    new Set<string>()
  );

  const toggleBook = (bookId: string) => {
    setSelectedBooks((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedBooks(new Set<string>());
  };

  return (
    <BookSelectionContext.Provider
      value={{ selectedBooks, toggleBook, clearSelection }}
    >
      {children}
    </BookSelectionContext.Provider>
  );
}
