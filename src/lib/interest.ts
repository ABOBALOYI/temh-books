import { serverTimestamp } from 'firebase/firestore';
import type { FormData } from '@/types/interest';

export function buildInterestDocument(formData: FormData, selectedBookTitles: string[]) {
  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    province: formData.province,
    city: formData.city,
    userType: formData.userType,
    selectedBooks: selectedBookTitles,
    createdAt: serverTimestamp(),
  };
}
