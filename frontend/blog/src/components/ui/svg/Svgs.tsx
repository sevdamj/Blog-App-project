import Image from 'next/image';

export default function Svgs({
    src='',
    alt = '',
    className = '',
    width = 150, 
    height = 50,  
    ...props
}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className} 
            {...props}
        />
    );
}