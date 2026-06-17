import { ArrowUp } from "lucide-react";

interface FileInputProps {
  label: string;
  name: string;
  dir?: "rtl" | "ltr";
  value?: string;
  isRequired?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  validationSchema?: Record<string, unknown>;
  errors?: Record<string, { message?: string }>;
  [key: string]: unknown;
}

function FileInput({
  label,
  name,
  dir = "rtl",
  value,
  isRequired,
  onChange,
  className = "",
  validationSchema = {},
  errors,
  ...rest
}: FileInputProps) {
  const errorMessage = errors?.[name]?.message;
  const hasError = !!errorMessage;

  return (
    <>
      <label
        htmlFor="file-upload"
        className={`cursor-pointer border-2 border-primary-200 rounded-lg px-3 py-2
         text-primary-200 items-center justify-center flex gap-x-1 ${className}`}
      >
        {label}
        <ArrowUp className="w-5 h-5" />
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          name={name}
          dir={dir}
          onChange={onChange}
          {...rest}
        />
      </label>

      {hasError && (
        <span className="text-error text-xs mt-2 block">
          {errorMessage}
        </span>
      )}
    </>
  );
}

export default FileInput;