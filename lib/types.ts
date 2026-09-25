// Core domain types — schema mirrors the Cloudflare D1 schema that will be created later.

export type ProfileType = 'bride' | 'groom';

export interface Education {
  degree: string;
  institution: string;
  field: string;
}

export interface Profession {
  title: string;
  company: string;
  income: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  nativePlace: string;
}

export interface Family {
  father: string;
  mother: string;
  siblings: string;
  familyType: string;
  values: string;
}

export interface Lifestyle {
  diet: string;
  hobbies: string[];
  languages: string[];
}

export interface Religion {
  religion: string;
  community: string;
  subCommunity?: string;
}

export interface Profile {
  id: string;
  slug: string;
  type: ProfileType;
  name: string;
  age: number;
  height: string;
  maritalStatus: string;
  photos: string[];
  headline: string;
  about: string;
  education: Education;
  profession: Profession;
  location: Location;
  family: Family;
  lifestyle: Lifestyle;
  religion: Religion;
  partnerExpectations: string;
  createdAt: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  couple: string;
  quote: string;
  story: string;
  date: string;
  photo?: string;
}

export interface SuccessStory {
  id: string;
  bride: string;
  groom: string;
  city: string;
  weddingDate: string;
  story: string;
  photo?: string;
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  status: 'active' | 'suspended';
  joinedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  profileId?: string;
  createdAt: string;
  status: 'new' | 'read' | 'resolved';
}

export interface FilterState {
  ageMin: number;
  ageMax: number;
  city?: string;
  religion?: string;
  community?: string;
  education?: string;
  profession?: string;
  search?: string;
}
