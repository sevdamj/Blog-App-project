"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { Controller, Control, FieldValues, Path, FieldErrors, FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface RHFSelectProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  options: Option[];
  isRequired?: boolean;
  className?: string;
  placeholder?: string;
}

export default function RHFSelect<TFormValues extends FieldValues>({
  name,
  label,
  control,
  errors,
  options,
  isRequired = false,
  className = "",
  placeholder = "انتخاب کنید...",
}: RHFSelectProps<TFormValues>) {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className={`mb-4 ${className}`}>
      <label className="mb-1 block text-md font-medium text-secondary-300">
        {label} {isRequired && <span className="text-error">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const selectedOption = options.find((opt) => opt.value === value);

          return (
            <Listbox value={value} onChange={onChange}>
              <div className="relative">
                <Listbox.Button
                  className={`relative w-full cursor-pointer rounded-xl border-2 py-3.5 pr-4 pl-10 text-right shadow-md focus:border-primary-50 focus:ring-4 focus:ring-primary-50/70 ${
                    error ? "border-error" : "border-secondary-100/50"
                  }`}
                >
                  <span
                    className={`block truncate text-sm font-medium ${
                      !selectedOption ? "text-surface/50" : "text-surface/70"
                    }`}
                  >
                    {selectedOption?.label || placeholder}
                  </span>

                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <ChevronDown
                      className="h-4 w-4 text-surface/50 transition-transform duration-300 ui-open:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-20 mt-2 w-full overflow-auto rounded-xl border border-secondary-100/50 bg-background py-1 text-sm shadow-lg ring-2 ring-primary-100/10 focus:outline-none">
                    {options.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `relative cursor-pointer select-none py-2.5 pr-4 pl-10 text-right transition-colors ${
                            active || selected
                              ? "bg-secondary-100/20 text-surface/70 font-semibold"
                              : "text-surface/50 font-normal"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                <Check className="h-4 w-4" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          );
        }}
      />

      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
}