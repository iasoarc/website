import Image from "next/image";

type IconProps = {
    className?: string;
    alt?: string;
}

export default function Icon({ className, alt = "Iaso Arc Icon" }: IconProps) {
    return (
        <Image
            src="/iaso-arc-icon.svg"
            alt={alt}
            width={489}
            height={489}
            priority
            className={className}
        />
    )
}
