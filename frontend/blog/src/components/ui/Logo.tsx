import Image from "next/image";

interface LogoProps {
  width: number;
  height: number;
  className?: string;
}

export default function Logo({ 
  width, 
  height, 
  className = "",
}: LogoProps) {
  return (
    <div>
      <Image
        src="/images/icons8-b-64.png"
        alt="بلاگ اپ"
        width={width}
        height={height}
        priority
        className={`object-contain ${className}`}
      />
    </div>
  );
}