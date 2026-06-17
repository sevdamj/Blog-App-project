import { Button as HeadlessButton } from "@headlessui/react";
import Link from "next/link";
import { ReactNode } from "react";
import * as Icons from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "responsive" | "icon";
type IconName = keyof typeof Icons;

const btnVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-200/80 text-secondary-50/90 shadow-lg shadow-primary-50/50 hover:brightness-110 active:bg-secondary-300",
  secondary: "border text-secondary-300/80 text-secondary-300/80 hover:bg-secondary-100",
  outline: "border-2 border-primary-300 text-primary-300 bg-transparent hover:bg-primary-100/10",
  danger: "border border-error text-error  hover:bg-error/30",
};

const btnSizes: Record<ButtonSize, string> = {
  sm: "px-1 py-1 text-xs rounded-xl",
  md: "px-3 py-3 text-sm rounded-xl",
  lg: "px-10 py-4 text-lg rounded-2xl",
  responsive: "h-10 px-5 text-xs md:h-12 md:px-8 md:text-base lg:h-14 lg:px-10 lg:text-lg rounded-2xl",
  icon: "p-1 rounded-md [&>svg]:w-4 [&>svg]:h-4",
};

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ElementType;  
  iconName?: IconName;     
  iconPosition?: "start" | "end" | "left" | "right";
}


export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  href,
  disabled = false,
  type = "button",
  icon: IconProp,      
  iconName,           
  iconPosition = "start",
  ...rest
}: ButtonProps) {
   const Icon = iconName 
    ? Icons[iconName] 
    : IconProp;

  const baseClasses = `inline-flex items-center justify-center gap-1 font-bold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] ${btnVariants[variant]} ${btnSizes[size]} ${className}`;

  const renderIcon = () => {
  if (!Icon) return null;
  
  const iconSize = size === "icon" 
    ? "w-4 h-4" 
    : size === "sm" 
      ? "w-3 h-3" 
      : "w-5 h-5";
  
  const IconComponent = Icon as any;
  return <IconComponent className={`shrink-0 ${iconSize}`} />;
};

  const isStart = iconPosition === "start" || iconPosition === "left";
  const isEnd = iconPosition === "end" || iconPosition === "right";

  const Content = (
    <>
      {isStart && renderIcon()}
      {children && <span>{children}</span>}
      {isEnd && renderIcon()}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses} {...rest}>
        {Content}
      </Link>
    );
  }

  return (
    <HeadlessButton
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
      type={type}
      {...rest}
    >
      {Content}
    </HeadlessButton>
  );
}