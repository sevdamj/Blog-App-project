interface TextAreaProps {
  label: string;
  name: string;
  value?: string;
  dir?: "rtl" | "ltr";
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
  defaultValue?: string;
}

function TextArea({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired = false,
  placeholder,
  rows = 4,
  className = "",
  defaultValue,
}: TextAreaProps) {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
        {isRequired && <span className="text-error mr-1">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        dir={dir}
        rows={rows}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`
          mt-2 w-full rounded-xl border-2 border-secondary-100/50 
          bg-background p-3 text-sm 
          transition-all duration-200 
           focus:ring-4 focus:ring-primary-50/70
          ${dir === "ltr" ? "text-left" : "text-right"}
        `}
      />
    </div>
  );
}

export default TextArea;