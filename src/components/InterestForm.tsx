"use client";

import { useState } from "react";
import { useBookSelection } from "@/components/BookSelectionProvider";
import { validateForm } from "@/lib/validation";
import type { FormData, FormErrors } from "@/types/interest";
import { books } from "@/data/books";

const PROVINCES = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape",
] as const;

const USER_TYPES = ["Parent", "Teacher", "School"] as const;

export default function InterestForm() {
  const { selectedBooks, clearSelection } = useBookSelection();

  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", province: "", city: "", userType: "Parent",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedBookTitles = books
    .filter((b) => selectedBooks.has(b.id))
    .map((b) => b.title);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, selectedBooks: selectedBookTitles }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccessMessage("Thank you! We'll notify you when we launch.");
      setFormData({ name: "", email: "", phone: "", province: "", city: "", userType: "Parent" });
      clearSelection();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all placeholder:text-text-secondary/50";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <section id="interest-form" className="w-full bg-muted py-16 md:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Register Your Interest
          </h2>
          <p className="mt-2 text-text-secondary text-sm sm:text-base">
            Fill in your details and we&apos;ll notify you when we launch.
          </p>
        </div>

        {selectedBookTitles.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-white border border-border">
            <p className="text-sm font-medium text-foreground mb-2">Your Selected Books</p>
            <div className="flex flex-wrap gap-2">
              {selectedBookTitles.map((title) => (
                <span key={title}
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground border border-border">
                  {title}
                </span>
              ))}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm font-medium text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm font-medium text-center">
            {errorMessage}
          </div>
        )}

        <div className="bg-white rounded-xl border border-border p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input id="name" name="name" type="text" value={formData.name}
                onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" name="email" type="email" value={formData.email}
                onChange={handleChange} placeholder="you@example.com" className={inputClass} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input id="phone" name="phone" type="tel" value={formData.phone}
                onChange={handleChange} placeholder="e.g. 082 123 4567" className={inputClass} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="province" className={labelClass}>Province</label>
                <select id="province" name="province" value={formData.province}
                  onChange={handleChange} className={inputClass}>
                  <option value="">Select a province</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>City / Area</label>
                <input id="city" name="city" type="text" value={formData.city}
                  onChange={handleChange} placeholder="Your city or area" className={inputClass} />
              </div>
            </div>

            <div>
              <p className={labelClass}>I am a</p>
              <div className="flex gap-3 mt-1">
                {USER_TYPES.map((type) => (
                  <label key={type}
                    className={`flex-1 flex items-center justify-center py-2.5 rounded-lg border cursor-pointer transition-all text-sm font-medium ${
                      formData.userType === type
                        ? "border-foreground bg-foreground text-white"
                        : "border-border text-text-secondary hover:border-foreground/30"
                    }`}>
                    <input type="radio" name="userType" value={type}
                      checked={formData.userType === type} onChange={handleChange} className="sr-only" />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className={`w-full rounded-lg py-3.5 text-white font-bold text-base transition-all ${
                isLoading ? "bg-foreground/50 cursor-not-allowed" : "bg-accent hover:bg-accent-dark"
              }`}>
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : "Submit Interest"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
