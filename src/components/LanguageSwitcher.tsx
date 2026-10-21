"use client"

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { locales, localizePathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type LanguageSwitcherProps = {
    className?: string;
    menuSide?: "bottom" | "right" | "responsive";
    locale: Locale;
    labels: Dictionary["languageSwitcher"];
}

const flags: Record<Locale, string> = { en: "🇺🇸", "zh-CN": "🇨🇳" };

export default function LanguageSwitcher({ className, menuSide = "bottom", locale, labels }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const focusOnOpenRef = useRef<number | null>(null);
    const menuId = useId();

    // Listen for outside clicks only while the list is open.
    useEffect(() => {
        if (!isOpen) return;

        if (focusOnOpenRef.current !== null) {
            optionRefs.current[focusOnOpenRef.current]?.focus();
            focusOnOpenRef.current = null;
        }

        function handlePointerDown(event: PointerEvent) {
            if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);

    function selectLanguage(selectedLocale: Locale) {
        setIsOpen(false);
        buttonRef.current?.focus();

        if (selectedLocale === locale) return;

        // Change only the language: keep the current page, query, and fragment.
        const href = localizePathname(pathname, selectedLocale) + window.location.search + window.location.hash;
        router.push(href, { scroll: false });
    }

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex ${className ?? ""}`}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsOpen(false);
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    event.preventDefault();
                    setIsOpen(false);
                    buttonRef.current?.focus();
                }
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-sm p-2 opacity-80 transition-opacity hover:opacity-100"
                onClick={() => setIsOpen(open => !open)}
                onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                    event.preventDefault();
                    const index = event.key === "ArrowDown" ? 0 : locales.length - 1;
                    if (isOpen) optionRefs.current[index]?.focus();
                    else {
                        focusOnOpenRef.current = index;
                        setIsOpen(true);
                    }
                }}
                aria-label={labels.triggerLabel.replace("{language}", labels.names[locale])}
                aria-expanded={isOpen}
                aria-controls={isOpen ? menuId : undefined}
                title={isOpen ? undefined : labels.names[locale]}
            >
                <Image
                    src="/globe.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="dark:invert"
                />
            </button>

            {isOpen && (
                <ul
                    id={menuId}
                    aria-label={labels.label}
                    className={`absolute z-50 min-w-40 border border-zinc-200 bg-background p-1 text-sm shadow-lg dark:border-zinc-800 ${menuSide === "right" ? "left-full top-0 ml-2" : menuSide === "responsive" ? "right-0 top-full mt-2 lg:left-full lg:right-auto lg:top-0 lg:ml-2 lg:mt-0" : "right-0 top-full mt-2"}`}
                >
                    {locales.map((option, index) => (
                        <li key={option}>
                            <button
                                type="button"
                                ref={(node) => { optionRefs.current[index] = node; }}
                                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 rounded-sm px-3 py-2 text-left text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                                aria-current={locale === option ? "true" : undefined}
                                onClick={() => selectLanguage(option)}
                                onKeyDown={(event) => {
                                    let nextIndex: number;
                                    if (event.key === "ArrowDown") nextIndex = (index + 1) % locales.length;
                                    else if (event.key === "ArrowUp") nextIndex = (index - 1 + locales.length) % locales.length;
                                    else if (event.key === "Home") nextIndex = 0;
                                    else if (event.key === "End") nextIndex = locales.length - 1;
                                    else return;
                                    event.preventDefault();
                                    optionRefs.current[nextIndex]?.focus();
                                }}
                            >
                                <span className="inline-flex items-center gap-2">
                                    <span aria-hidden="true">{flags[option]}</span>
                                    <span>{labels.names[option]}</span>
                                </span>
                                {locale === option && <span aria-hidden="true">✓</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
