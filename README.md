# Iaso Arc

**English** | [简体中文](./README.zh-CN.md)

The official website of **Iaso Arc**, exploring intelligent systems through research, engineering, and experimentation.

The site brings together four areas: **Research**, **Systems**, **Intelligence**, and **Discovery**. The homepage, bilingual routes, theme switching, and shared page layouts are implemented. The four topic pages currently contain placeholder headings; their content will be added over time.

## Features

- **Chinese and English** — language-prefixed routes, local translation dictionaries, and a language switcher that preserves the current page, query parameters, and URL fragment.
- **Light and dark themes** — follows the system preference until a theme is chosen, then saves the choice in browser storage.
- **Interactive topic previews** — hover or focus to preview a topic, activate it to keep its description, and follow the link in the description to visit its page.
- **Responsive layouts** — a compact layout on smaller screens, with a two-column exploration area and floating preference controls on desktop.
- **Basic accessibility** — keyboard controls, visible focus indicators, a skip-to-content link, screen reader labels and status announcements, and reduced-motion support.
- **Local assets and system fonts** — the application does not load Google Fonts or other remote font files.

## Tech stack

| Technology | Role |
| --- | --- |
| Next.js 16 · App Router | Routing, layouts, metadata, and rendering |
| React 19 | Components and interactive behavior |
| TypeScript 5 | Type checking |
| Tailwind CSS 4 | Styling and responsive layouts |

Dependency versions are defined in [package.json](./package.json) and locked in [package-lock.json](./package-lock.json).

## Run locally

Requirements: **Node.js 20.9.0 or later** and **npm**.

Clone this repository, then run these commands from its root directory:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root URL redirects to the Simplified Chinese homepage at `/zh-CN`.

The current application requires no application-specific environment variables.

## Commands

| Command | Description |
| --- | --- |
| `npm ci` | Install the dependencies recorded in the lockfile |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build the production application and check TypeScript |
| `npm run start` | Start the production server after a successful build |

For a local production run:

```bash
npm ci
npm run build
npm run start
```

The production server uses port `3000` by default. On an Ubuntu VPS, these are the same application-level build and start commands; process management and reverse proxy configuration are configured separately on the host.

The localized pages are prerendered during the build. The project currently uses the Next.js server for production, including its configured redirects.

## Pages and languages

| Page | Simplified Chinese | English |
| --- | --- | --- |
| Home | `/zh-CN` | `/en` |
| Research | `/zh-CN/research` | `/en/research` |
| Systems | `/zh-CN/systems` | `/en/systems` |
| Intelligence | `/zh-CN/intelligence` | `/en/intelligence` |
| Discovery | `/zh-CN/discovery` | `/en/discovery` |

- The default language is **Simplified Chinese**, configured in [src/i18n/config.ts](./src/i18n/config.ts).
- `/` and the four unprefixed topic URLs, such as `/research`, redirect to their Chinese equivalents. Redirects are defined in [next.config.ts](./next.config.ts).
- Unsupported language prefixes return a 404 page.
- Internal page links stay in the current tab. GitHub and the footer registration link open in a new tab.
- Footer text is intentionally kept in Chinese in both language versions.

## Homepage interactions

| Action | Behavior |
| --- | --- |
| Hover over or focus a topic | Preview its description |
| Click a topic, or press Enter or Space | Keep that topic selected |
| Activate the description link | Open the topic page |
| Click an empty area | Restore the default introduction |
| Press Escape within the exploration area | Restore the default introduction |

A reset button is available to keyboard and screen reader users. It is visually hidden during normal browsing and becomes visible when focused with Tab.

The language selector supports Tab, Enter, Space, arrow keys, Home, End, and Escape. The first Tab stop on each page provides a **Skip to main content** link.

## Project structure

```text
public/                      # Brand assets, icons, and initial theme script
src/
├── app/
│   ├── globals.css           # Global styles, themes, and focus indicators
│   └── [lang]/
│       ├── layout.tsx        # Root document, language, metadata, and footer
│       ├── (home)/
│       │   └── page.tsx      # Homepage and preference controls
│       └── (site)/
│           ├── layout.tsx    # Shared topic-page layout and Sitebar
│           ├── research/page.tsx
│           ├── systems/page.tsx
│           ├── intelligence/page.tsx
│           └── discovery/page.tsx
├── components/              # Shared components and homepage interactions
└── i18n/
    ├── config.ts            # Supported locales and localized path helpers
    ├── dictionaries.ts      # Server-side dictionary loading and locale validation
    ├── types.ts             # Shared dictionary types
    └── dictionaries/
        ├── en.json
        └── zh-CN.json
```

`[lang]` is the language segment in the URL. `(home)` and `(site)` are route groups: they organize layouts without adding segments to the URL. The `Sitebar` contains the preference controls for topic pages; the homepage has its own control placement.

## Edit content and appearance

| What to change | Location |
| --- | --- |
| English text and metadata | [src/i18n/dictionaries/en.json](./src/i18n/dictionaries/en.json) |
| Chinese text and metadata | [src/i18n/dictionaries/zh-CN.json](./src/i18n/dictionaries/zh-CN.json) |
| Supported and default languages | [src/i18n/config.ts](./src/i18n/config.ts) |
| Homepage layout | [src/app/[lang]/(home)/page.tsx](./src/app/%5Blang%5D/%28home%29/page.tsx) |
| Topic previews and description links | [src/components/home/ExploreSection.tsx](./src/components/home/ExploreSection.tsx) |
| Topic-page content | `src/app/[lang]/(site)/<topic>/page.tsx` |
| Theme colors and global styles | [src/app/globals.css](./src/app/globals.css) |
| Footer text and registration information | [src/components/Footer.tsx](./src/components/Footer.tsx) |
| Logos and other static assets | [public/](./public/) |

Keep the translation keys consistent between the two JSON dictionaries. Use `localizePathname()` from `src/i18n/config.ts` when building internal page links so that they retain the current language. Static asset URLs such as `/sun.svg` do not use a language prefix.

Theme initialization is handled by `public/theme-init.js` and `ThemeController`. `ThemeSwitcher` handles user input, while `LanguageSwitcher` updates the route.

Before submitting changes, run:

```bash
npm run lint
npm run build
```

For changes to the interface, also check keyboard navigation, both languages, both themes, and narrow screen widths.

## License

[MIT](./LICENSE).
