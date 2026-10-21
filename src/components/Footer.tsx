export default function Footer() {
    return (
        <footer lang="zh-CN" className="mt-auto px-6 py-4 text-center text-sm leading-6 text-zinc-600 sm:py-6 dark:text-zinc-400">
            © 2026 Iaso Arc | 智能系统探索 <br />
            <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-sm underline underline-offset-4 transition-colors hover:text-foreground"
            >
                沪ICP备2026053210号
                <span className="sr-only">（在新标签页打开）</span>
            </a>
        </footer>
    )
}
