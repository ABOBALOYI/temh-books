import fc from 'fast-check';

/**
 * Pure toggle function that replicates the toggle logic from BookSelectionProvider.
 * Given a Set<string> and a bookId, adds the bookId if absent, removes if present.
 */
function toggleBook(set: Set<string>, bookId: string): Set<string> {
  const next = new Set(set);
  if (next.has(bookId)) {
    next.delete(bookId);
  } else {
    next.add(bookId);
  }
  return next;
}

/**
 * Property 1: Book selection toggle is a round-trip
 * Validates: Requirements 3.1, 3.2
 *
 * For any book ID and any initial selection state, toggling the book twice
 * (select then deselect, or deselect then select) should return the selection
 * set to its original state.
 */
describe('Property 1: Book selection toggle is a round-trip', () => {
  it('toggling a book twice returns to the original selection state', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.array(fc.string({ minLength: 1 })),
        (bookId, initialIds) => {
          const initialSet = new Set(initialIds);
          const afterFirst = toggleBook(initialSet, bookId);
          const afterSecond = toggleBook(afterFirst, bookId);

          // The resulting set should equal the initial set
          expect(afterSecond.size).toBe(initialSet.size);
          for (const id of initialSet) {
            expect(afterSecond.has(id)).toBe(true);
          }
          for (const id of afterSecond) {
            expect(initialSet.has(id)).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
