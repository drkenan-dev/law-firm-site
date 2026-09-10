"use client";

import { useId } from "react";
import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-sm border border-line bg-white px-4 py-3 text-sm text-charcoal-900 shadow-sm transition-colors placeholder:text-charcoal-500/60 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30";

type FieldShellProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FieldShell({ label, htmlFor, required, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
        {required && (
          <span aria-hidden="true" className="text-gold-600">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-charcoal-500">{hint}</p>
      ) : null}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextInput({ label, error, hint, required, id, className, ...rest }: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, error && "border-red-500", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextArea({ label, error, hint, required, id, className, ...rest }: TextAreaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      <textarea
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, "min-h-32 resize-y", error && "border-red-500", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function SelectInput({
  label,
  error,
  hint,
  required,
  id,
  options,
  placeholder = "Select an option",
  className,
  ...rest
}: SelectInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      <select
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, "appearance-none bg-no-repeat pr-10", error && "border-red-500", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234b5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.25rem",
        }}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type RadioGroupProps = {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function RadioGroup({ label, name, required, options, value, onChange, error }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
        {required && (
          <span aria-hidden="true" className="text-gold-600">
            {" "}
            *
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 accent-gold-600"
            />
            <span className="text-sm text-charcoal-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}