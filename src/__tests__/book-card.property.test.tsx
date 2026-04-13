import fc from 'fast-check';
import { render } from '@testing-library/react';
import BookCard from '@/components/BookCard';
import { Book } from '@/types/book';

/**
 * Arbitrary generator for valid Book objects with non-empty strings for all fields.
 */
const bookArb: fc.Arbitrary<Book> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 50 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.string({ minLength: 1, maxLength: 300 }),
  ageGroup: fc.string({ minLength: 1, maxLength: 30 }),
  image: fc.webUrl(),
});

/**
 * Property 2: BookCard renders all required book fields
 * Validates: Requirements 2.2
 *
 * For any valid Book object with non-empty id, title, description, ageGroup,
 * and image, rendering a BookCard should produce output containing the book's
 * title, description, and ageGroup text.
 */
describe('Property 2: BookCard renders all required book fields', () => {
  it('rendered output contains the book title, description, and ageGroup', () => {
    fc.assert(
      fc.property(bookArb, (book) => {
        const { container } = render(
          <BookCard book={book} isSelected={false} onToggle={() => {}} />
        );

        const textContent = container.textContent || '';

        expect(textContent).toContain(book.title);
        expect(textContent).toContain(book.description);
        expect(textContent).toContain(book.ageGroup);
      }),
      { numRuns: 100 }
    );
  });
});
