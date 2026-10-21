"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { localizePathname, topicKeys, type Locale, type TopicKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type ExploreSectionProps = {
    locale: Locale;
    labels: Dictionary["explore"];
    opensInNewTab: string;
};

export default function ExploreSection({ locale, labels, opensInNewTab }: ExploreSectionProps) {
    const [hovered, setHovered] = useState<TopicKey | null>(null);
    const [selected, setSelected] = useState<TopicKey | null>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const descriptionId = useId();
    const instructionsId = useId();
    const active = hovered ?? selected;
    const content = active ? labels.topics[active] : labels.default;

    function resetIntroduction() {
        setSelected(null);
        setHovered(null);
    }

    useEffect(() => {
        function handleBackgroundClick(event: MouseEvent) {
            const target = event.target;
            if (!(target instanceof Element)) return;

            // Preserve selection when clicking the description, links, or other content.
            if (descriptionRef.current?.contains(target)) return;
            if (target.closest('a, button, input, select, textarea, label, img, svg, video, audio, canvas, [contenteditable="true"], [role="button"]')) return;

            const hasText = Array.from(target.childNodes).some(
                node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
            );
            if (hasText) return;

            setSelected(null);
            setHovered(null);
        }

        document.addEventListener("click", handleBackgroundClick);
        return () => document.removeEventListener("click", handleBackgroundClick);
    }, []);

    return (
        <section
            className="grid w-full min-w-0 max-w-4xl grid-cols-1 items-center gap-8 sm:gap-10 lg:flex-1 lg:grid-cols-2 lg:gap-12"
            onKeyDown={(event) => {
                if (event.key === "Escape" && (selected || hovered)) {
                    event.preventDefault();
                    resetIntroduction();
                }
            }}
        >
            {/* 44px targets + 36px gaps retain the original 80px desktop row spacing. */}
            <div role="group" aria-label={labels.label} aria-describedby={instructionsId} className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:items-center lg:gap-9">
                <p id={instructionsId} className="sr-only">{labels.instructions}</p>
                {topicKeys.map(topic => (
                    <button
                        key={topic}
                        type="button"
                        aria-pressed={selected === topic}
                        aria-controls={descriptionId}
                        className="explore-item min-h-11 min-w-0 cursor-pointer rounded-sm px-2 py-2 text-left text-lg font-semibold tracking-tight aria-pressed:underline aria-pressed:decoration-2 aria-pressed:underline-offset-8 min-[360px]:text-xl sm:text-2xl lg:w-fit lg:p-0 lg:text-right lg:text-4xl"
                        onPointerEnter={(event) => {
                            if (event.pointerType === "mouse") setHovered(topic);
                        }}
                        onPointerLeave={(event) => {
                            if (event.pointerType === "mouse") setHovered(null);
                        }}
                        onFocus={() => setHovered(topic)}
                        onBlur={() => setHovered(null)}
                        onClick={() => {
                            setSelected(topic);
                            setHovered(null);
                        }}
                    >
                        <span aria-hidden="true">- </span>{labels.topics[topic].label}
                    </button>
                ))}
            </div>

            <div ref={descriptionRef} id={descriptionId} className="flex min-h-64 min-w-0 flex-col items-end gap-5 text-right sm:min-h-72 lg:col-start-1 lg:row-start-1 lg:min-h-0 lg:gap-6">
                <h2 className="text-2xl font-semibold leading-9 tracking-tight break-words text-foreground sm:text-3xl sm:leading-10">
                    {content.title}
                </h2>
                <p className="max-w-md text-base leading-7 break-words text-zinc-600 sm:text-lg sm:leading-8 dark:text-zinc-400">
                    {content.description}{" "}
                    {active ? (
                        <Link href={localizePathname(`/${active}`, locale)} aria-label={`${content.linkLabel} — ${labels.topics[active].label}`} className="rounded-sm font-medium text-foreground underline underline-offset-4">
                            {content.linkLabel}
                        </Link>
                    ) : (
                        <a href="https://github.com/iasoarc" target="_blank" rel="noopener noreferrer" className="rounded-sm font-medium text-foreground underline underline-offset-4">
                            {content.linkLabel}
                            <span className="sr-only"> ({opensInNewTab})</span>
                        </a>
                    )}
                </p>
                <button type="button" onClick={resetIntroduction} className="sr-only keyboard-reset">
                    {labels.resetLabel}
                </button>
            </div>
            {/* Announce a committed selection, without announcing every hover. */}
            <p role="status" aria-atomic="true" className="sr-only">
                {selected ? labels.topics[selected].title : labels.default.title}
            </p>
        </section>
    )
}
