import React, { forwardRef, ReactNode } from "react";
import {
  Field,
  Input as HeadlessInput,
  Label,
  Description,
} from "@headlessui/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  icon?: ReactNode;
  suffix?: ReactNode;
}

const InputRender = (props: AppInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { label, description, error, icon, suffix, className, ...restProps } = props;

  return (
    <Field className="flex w-full flex-col gap-2 animate-fadeIn">
      {label && (
        <Label className="text-sm font-medium text-secondary-200/80 pr-1">
          {label}
        </Label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-secondary-100 group-focus-within:text-primary-300 transition-colors duration-300">
            {icon}
          </div>
        )}

        <HeadlessInput
          ref={ref}
          {...restProps}
          className={cn(
            "block w-full rounded-lg  py-3 px-4 text-sm text-surface",
            "focus:ring-2 focus:ring-inset focus:ring-primary-200 focus:shadow-brand",
            error && "ring-error focus:ring-error shadow-none bg-error",
            icon && "pl-10",
            suffix && "pr-10",
            className,
          )}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-error font-semibold px-1 animate-fadeIn">
          {error}
        </p>
      ) : (
        description && (
          <Description className="text-xs text-secondary-100 px-1">
            {description}
          </Description>
        )
      )}
    </Field>
  );
};

const AppInput = forwardRef(InputRender);
AppInput.displayName = "AppInput";

export default AppInput;