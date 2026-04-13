import fc from 'fast-check';
import { buildInterestDocument } from '@/lib/interest';
import type { FormData } from '@/types/interest';

jest.mock('firebase/firestore', () => ({
  serverTimestamp: () => 'SERVER_TIMESTAMP_SENTINEL',
}));

/**
 * Property 5: Interest document construction preserves all form data
 * Validates: Requirements 6.1, 6.2
 *
 * For any valid form data and any set of selected book titles, the constructed
 * InterestDocument should contain all provided field values unchanged,
 * a selectedBooks array matching the input titles, and a createdAt field
 * set to serverTimestamp.
 */
describe('Property 5: Interest document construction preserves all form data', () => {
  const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

  const formDataArb: fc.Arbitrary<FormData> = fc
    .tuple(nonEmptyString, nonEmptyString, nonEmptyString, nonEmptyString, nonEmptyString, nonEmptyString)
    .map(([name, email, phone, province, city, userType]) => ({
      name,
      email,
      phone,
      province,
      city,
      userType,
    }));

  const bookTitlesArb = fc.array(nonEmptyString, { minLength: 0, maxLength: 20 });

  it('preserves all form fields and selected books in the constructed document', () => {
    fc.assert(
      fc.property(formDataArb, bookTitlesArb, (formData, selectedBooks) => {
        const doc = buildInterestDocument(formData, selectedBooks);

        expect(doc.name).toBe(formData.name);
        expect(doc.email).toBe(formData.email);
        expect(doc.phone).toBe(formData.phone);
        expect(doc.province).toBe(formData.province);
        expect(doc.city).toBe(formData.city);
        expect(doc.userType).toBe(formData.userType);
        expect(doc.selectedBooks).toEqual(selectedBooks);
        expect(doc.createdAt).toBe('SERVER_TIMESTAMP_SENTINEL');
      }),
      { numRuns: 100 }
    );
  });
});
