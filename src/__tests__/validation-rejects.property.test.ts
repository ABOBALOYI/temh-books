import fc from 'fast-check';
import { validateForm } from '@/lib/validation';
import type { FormData } from '@/types/interest';

/**
 * Property 3: Validation rejects forms with missing or invalid required fields
 * Validates: Requirements 5.1, 5.2
 *
 * For any form data where at least one required field (name, email, phone)
 * is empty/whitespace-only or the email does not match a valid email pattern,
 * the validation function should return a non-empty errors object.
 */
describe('Property 3: Validation rejects forms with missing or invalid required fields', () => {
  // Arbitrary for whitespace-only or empty strings
  const emptyOrWhitespace = fc.constantFrom('', ' ', '  ', '   ', '\t', '\n');

  // Arbitrary for non-empty strings (used for valid-ish fields)
  const nonEmptyString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

  // Arbitrary for valid-looking emails
  const validEmail = fc
    .tuple(
      fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), { minLength: 1, maxLength: 10 }),
      fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 1, maxLength: 8 }),
      fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')), { minLength: 2, maxLength: 4 })
    )
    .map(([local, domain, tld]) => `${local.join('')}@${domain.join('')}.${tld.join('')}`);

  // Arbitrary for invalid emails (no @, or missing parts)
  const invalidEmail = fc.oneof(
    // No @ sign at all
    fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), { minLength: 1, maxLength: 15 })
      .map((chars) => chars.join('')),
    // Missing domain after @
    fc.string({ minLength: 1, maxLength: 10 }).map((s) => `${s.replace(/[@\s]/g, 'x')}@`),
    // Missing local part before @
    fc.string({ minLength: 1, maxLength: 10 }).map((s) => `@${s.replace(/[@\s]/g, 'x')}`)
  );

  it('rejects when name is empty or whitespace-only', () => {
    fc.assert(
      fc.property(
        emptyOrWhitespace,
        validEmail,
        nonEmptyString,
        (name, email, phone) => {
          const formData: FormData = {
            name,
            email,
            phone,
            province: 'Gauteng',
            city: 'Johannesburg',
            userType: 'Parent',
          };
          const errors = validateForm(formData);
          expect(Object.keys(errors).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('rejects when email is empty or whitespace-only', () => {
    fc.assert(
      fc.property(
        nonEmptyString,
        emptyOrWhitespace,
        nonEmptyString,
        (name, email, phone) => {
          const formData: FormData = {
            name,
            email,
            phone,
            province: 'Gauteng',
            city: 'Johannesburg',
            userType: 'Parent',
          };
          const errors = validateForm(formData);
          expect(Object.keys(errors).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('rejects when email does not match valid email pattern', () => {
    fc.assert(
      fc.property(
        nonEmptyString,
        invalidEmail,
        nonEmptyString,
        (name, email, phone) => {
          const formData: FormData = {
            name,
            email,
            phone,
            province: 'Gauteng',
            city: 'Johannesburg',
            userType: 'Parent',
          };
          const errors = validateForm(formData);
          expect(Object.keys(errors).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('rejects when phone is empty or whitespace-only', () => {
    fc.assert(
      fc.property(
        nonEmptyString,
        validEmail,
        emptyOrWhitespace,
        (name, email, phone) => {
          const formData: FormData = {
            name,
            email,
            phone,
            province: 'Gauteng',
            city: 'Johannesburg',
            userType: 'Parent',
          };
          const errors = validateForm(formData);
          expect(Object.keys(errors).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('rejects when at least one required field is invalid (combined)', () => {
    // Generate form data where at least one of the four conditions holds
    const invalidFormData = fc.oneof(
      // name is empty/whitespace
      fc.tuple(emptyOrWhitespace, validEmail, nonEmptyString).map(
        ([name, email, phone]): FormData => ({
          name, email, phone, province: 'Gauteng', city: 'Johannesburg', userType: 'Parent',
        })
      ),
      // email is empty/whitespace
      fc.tuple(nonEmptyString, emptyOrWhitespace, nonEmptyString).map(
        ([name, email, phone]): FormData => ({
          name, email, phone, province: 'Gauteng', city: 'Johannesburg', userType: 'Parent',
        })
      ),
      // email is invalid format
      fc.tuple(nonEmptyString, invalidEmail, nonEmptyString).map(
        ([name, email, phone]): FormData => ({
          name, email, phone, province: 'Gauteng', city: 'Johannesburg', userType: 'Parent',
        })
      ),
      // phone is empty/whitespace
      fc.tuple(nonEmptyString, validEmail, emptyOrWhitespace).map(
        ([name, email, phone]): FormData => ({
          name, email, phone, province: 'Gauteng', city: 'Johannesburg', userType: 'Parent',
        })
      )
    );

    fc.assert(
      fc.property(invalidFormData, (formData) => {
        const errors = validateForm(formData);
        expect(Object.keys(errors).length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});
