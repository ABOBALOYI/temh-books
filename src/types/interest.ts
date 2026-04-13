import { FieldValue } from 'firebase/firestore';

export interface InterestDocument {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  userType: string;
  selectedBooks: string[];
  createdAt: FieldValue;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  userType: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}
