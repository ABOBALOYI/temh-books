import fc from 'fast-check';
import { books } from '@/data/books';

/**
 * Property 6: Mock book data entries have all required fields
 * Validates: Requirements 2.4, 11.4
 *
 * For any entry in the books data array, the entry should have
 * non-empty string values for id, title, description, ageGroup, and image.
 */
describe('Property 6: Mock book data entries have all required fields', () => {
  it('every book entry has non-empty string values for all required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...books),
        (book) => {
          const requiredFields = ['id', 'title', 'description', 'ageGroup', 'image'] as const;

          for (const field of requiredFields) {
            const value = book[field];
            // Must be a string
            expect(typeof value).toBe('string');
            // Must be non-empty
            expect(value.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
