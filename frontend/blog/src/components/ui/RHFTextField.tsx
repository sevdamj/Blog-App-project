// src/components/ui/RHFTextField.tsx
import { FieldError, UseFormRegister, Path, FieldErrors } from "react-hook-form";

interface RHFTextFieldProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  label: string;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  isRequired?: boolean;
  type?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  className?: string;
}

export default function RHFTextField<TFormValues extends Record<string, unknown>>({
  name,
  label,
  register,
  errors,
  isRequired = false,
  type = "text",
  placeholder = "",
  dir = "rtl",
  className = "",
}: RHFTextFieldProps<TFormValues>) {
  const error = errors[name] as FieldError | undefined;
  
  return (
    <div className="mb-4">
      <label className="block text-md font-medium text-secondary-300 mb-1">
        {label} {isRequired && <span className="text-error">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        dir={dir}
        className={`w-full px-4 py-2 rounded-lg border shadow-sm ${
          error ? "border-error" : "border-secondary-100/70"
        } focus:outline-none focus:ring-2 focus:ring-primary-100 ${className}`}
        {...register(name)}
      />
      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
}