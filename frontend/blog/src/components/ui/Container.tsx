import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Container = ({ children, className = "", fullWidth = false }: ContainerProps) => {
  return (
    <div
      className={`
        mx-auto 
        w-full 
        ${fullWidth ? "" : "max-w-7xl"} 
        px-4
        lg:px-0
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;

/**
 * این کامپوننت مسئول حفظ یکپارچگی عرض و پدینگ در تمام صفحات است.
 *  - برای افزودن کلاس‌های اضافی مثل flex یا gap
 *  - اگر بخواهیم سکشن تمام عرض باشد اما محتوا محدود بماند
 */

