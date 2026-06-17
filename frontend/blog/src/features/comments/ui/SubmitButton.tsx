import { useFormStatus } from "react-dom";
import { Button as HeadlessButton } from "@headlessui/react";
import SpinnerMini from "@/components/ui/SpinnerMini";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

function SubmitButton({ children, className = "", disabled, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <HeadlessButton
      disabled={isDisabled}
      className={`flex items-center justify-center gap-x-4 py-4 rounded-lg bg-primary-50 text-surface transition disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
      {pending && <SpinnerMini />}
    </HeadlessButton>
  );
}

export default SubmitButton;