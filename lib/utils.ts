import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date, opts?: { withTime?: boolean }) {
  const date = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return '';
  const dateStr = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  if (!opts?.withTime) return dateStr;
  const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} · ${timeStr}`;
}

export function timeAgo(input: string | Date) {
  const date = typeof input === 'string' ? new Date(input) : input;
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const ranges: Array<[number, string]> = [
    [60, 'second'],
    [3600, 'minute'],
    [86400, 'hour'],
    [604800, 'day'],
    [2592000, 'week'],
    [31536000, 'month'],
  ];
  let last = 31536000;
  let lastUnit = 'year';
  for (const [s, u] of ranges) {
    if (seconds < s) {
      last = s;
      lastUnit = u;
      break;
    }
    last = s;
    lastUnit = u;
  }
  const divisor = last === 31536000 ? 31536000 : last;
  const unitDivisors: Record<string, number> = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000,
    year: 31536000,
  };
  const value = Math.floor(seconds / (unitDivisors[lastUnit] || 1));
  return `${value} ${lastUnit}${value === 1 ? '' : 's'} ago`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ageRange(birthYear: number) {
  const now = new Date().getFullYear();
  return now - birthYear;
}

export function uniqueBy<T, K>(arr: T[], key: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Goa',
];

export const INDIAN_STATES = [
  'Maharashtra', 'Karnataka', 'Delhi', 'Telangana', 'Tamil Nadu',
  'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Punjab', 'Goa',
];

export const RELIGIONS = ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain', 'Buddhist', 'Parsi'];

export const COMMUNITIES = [
  'Brahmin', 'Marwari', 'Punjabi', 'Bengali', 'Tamil', 'Telugu',
  'Gujarati', 'Marathi', 'Kannadiga', 'Malayali', 'Sindhi', 'Kashmiri',
];

export const EDUCATIONS = [
  'B.Tech / B.E.', 'MBA', 'MBBS', 'CA', 'M.A.', 'M.Tech', 'B.A.', 'B.Com', 'PhD',
];
