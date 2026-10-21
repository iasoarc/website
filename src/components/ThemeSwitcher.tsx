"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

type ThemeSwitcherProps = {
    className?: string;
    labels: Dictionary["themeSwitcher"];
};

export default function ThemeSwitcher({ className, labels }: ThemeSwitcherProps) {
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle("dark");

        try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch {
            // Keep the selected theme for this page even without persistence.
        }
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            title={labels.title}
            className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-sm p-2 opacity-80 transition-opacity hover:opacity-100 ${className ?? ""}`}
        >
            {/* CSS keeps the icons and labels in sync before React loads. */}
            <Image src="/moon.svg" alt="" width={20} height={20} className="dark:hidden" />
            <span className="sr-only dark:hidden">{labels.toDark}</span>
            <Image src="/sun.svg" alt="" width={20} height={20} className="hidden dark:block dark:invert" />
            <span className="sr-only hidden dark:block">{labels.toLight}</span>
        </button>
    );
}
