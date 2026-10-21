"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/i18n/config";

export default function ThemeController({ locale }: { locale: Locale }) {
    useLayoutEffect(() => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

        function syncTheme() {
            let isDark = systemTheme.matches;

            try {
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme === "light" || savedTheme === "dark") {
                    isDark = savedTheme === "dark";
                }
            } catch {
                // Follow the system when browser storage is unavailable.
            }

            document.documentElement.classList.toggle("dark", isDark);
        }

        function handleStorage(event: StorageEvent) {
            if (event.key === "theme" || event.key === null) syncTheme();
        }

        // Changing [lang] can reset <html>; restore its theme before repaint.
        syncTheme();
        systemTheme.addEventListener("change", syncTheme);
        window.addEventListener("storage", handleStorage);

        return () => {
            systemTheme.removeEventListener("change", syncTheme);
            window.removeEventListener("storage", handleStorage);
        };
    }, [locale]);

    return null;
}
