import fc from 'fast-check';
import { validateForm } from '@/lib/validation';
import type { FormData } from '@/types/interest';

/**
 * Property 4: Validation accepts forms with all valid required fields
 * Validates: Requirements 5.3
 *
 * For any form data where name is a non-empty string, email matches a valid
 * email pattern, and phone is a non-empty string, the validation function
 * should return an empty errors object.
 */
describe('Property 4: Validation accepts forms with all valid required fields', () => {
  // Arbitrary for non-empty strings (trimmed length > 0)
  const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

  // Arbitrary for valid email addresses matching /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const validEmail = fc
    .tuple(
      fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), { minLength: 1, maxLength: 10 }),
      fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 1, maxLength: 8 }),
      fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 2, maxLength: 4 })
    )
    .map(([local, domain, tld]) => `${local.join('')}@${domain.join('')}.${tld.join('')}`);

  it('accepts forms where all required fields are valid', () => {
    fc.assert(
      fc.property(
        nonEmptyString,
        validEmail,
        nonEmptyString,
        nonEmptyString,
        nonEmptyString,
        nonEmptyString,
        (name, email, phone, province, city, userType) => {
          const formData: FormData = {
            name,
            email,
            phone,
            province,
            city,
            userType,
          };
          const errors = validateForm(formData);
          expect(Object.keys(errors).length).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
