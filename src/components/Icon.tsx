import Image from "next/image";

type IconProps = {
    className?: string;
}

export default function Icon({ className }: IconProps) {
    return (
        <Image
            src="/iaso-arc-icon.svg"
            alt="Iaso Arc Icon"
            width={489}
            height={489}
            priority
            className={className}
        />
    )
}
