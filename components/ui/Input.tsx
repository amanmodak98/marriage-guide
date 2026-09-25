'use client';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react';

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
}

const fieldBase =
  'block w-full bg-alabaster border border-crimson/15 rounded-xl px-4 py-3 text-ink font-serif placeholder:text-ink-mute/70 focus:bg-white transition-colors';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FieldProps>(
  ({ label, hint, error, className, ...props }, ref) => (
    <label className="block">
      {label && (
        <span className="block mb-2 font-cinzel text-[10px] tracking-wide-cap text-ink-soft uppercase">
          {label}
        </span>
      )}
      <input ref={ref} className={cn(fieldBase, error && 'border-vermilion', className)} {...props} />
      {hint && !error && <span className="block mt-1.5 text-xs text-ink-mute font-serif">{hint}</span>}
      {error && <span className="block mt-1.5 text-xs text-vermilion font-serif">{error}</span>}
    </label>
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps>(
  ({ label, hint, error, className, ...props }, ref) => (
    <label className="block">
      {label && (
        <span className="block mb-2 font-cinzel text-[10px] tracking-wide-cap text-ink-soft uppercase">
          {label}
        </span>
      )}
      <textarea
        ref={ref}
        className={cn(fieldBase, 'min-h-[120px] resize-y', error && 'border-vermilion', className)}
        {...props}
      />
      {hint && !error && <span className="block mt-1.5 text-xs text-ink-mute font-serif">{hint}</span>}
      {error && <span className="block mt-1.5 text-xs text-vermilion font-serif">{error}</span>}
    </label>
  ),
);
Textarea.displayName = 'Textarea';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>, FieldProps {
  onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, className, children, onChange, ...props }, ref) => (
    <label className="block">
      {label && (
        <span className="block mb-2 font-cinzel text-[10px] tracking-wide-cap text-ink-soft uppercase">
          {label}
        </span>
      )}
      <select
        ref={ref}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(fieldBase, 'appearance-none pr-10 cursor-pointer', error && 'border-vermilion', className)}
        {...props}
      >
        {children}
      </select>
      {hint && !error && <span className="block mt-1.5 text-xs text-ink-mute font-serif">{hint}</span>}
      {error && <span className="block mt-1.5 text-xs text-vermilion font-serif">{error}</span>}
    </label>
  ),
);
Select.displayName = 'Select';
