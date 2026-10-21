import Image from "next/image";

type LogoProps = {
    className?: string;
    alt?: string;
}

export default function Logo({ className, alt = "Iaso Arc Logo" }: LogoProps) {
    return (
        <Image
            src="/iaso-arc-logo.svg"
            alt={alt}
            width={1902}
            height={473}
            priority
            className={className}
        />
    )
}
