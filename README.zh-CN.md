# Iaso Arc

[English](./README.md) | **简体中文**

**Iaso Arc 官方网站**：通过研究、工程实践与实验，探索智能系统。

网站围绕**研究（Research）**、**系统（Systems）**、**智能（Intelligence）**和**发现（Discovery）**四个方向展开。目前已实现首页、中英文路由、主题切换和共享页面布局。四个主题子页现阶段仅包含占位标题，内容将逐步补充。

## 功能

- **中英文支持**：带语言前缀的路由、本地翻译词典，以及保留当前页面、查询参数和锚点的语言切换。
- **亮色与深色主题**：未手动选择时跟随系统，选择后将偏好保存在浏览器中。
- **交互式方向预览**：悬停或用键盘聚焦以预览介绍，点击后保留当前介绍，通过介绍中的链接进入对应页面。
- **响应式布局**：小屏采用紧凑排布，电脑端使用左右两栏和悬浮偏好按钮。
- **基础无障碍支持**：键盘操作、可见焦点、“跳到正文”链接、屏幕阅读器标签与状态播报，以及减少动态效果支持。
- **本地资源与系统字体**：应用不加载 Google Fonts 或其他远程字体文件。

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Next.js 16 · App Router | 路由、布局、页面元数据与渲染 |
| React 19 | 组件与交互逻辑 |
| TypeScript 5 | 类型检查 |
| Tailwind CSS 4 | 样式与响应式布局 |

依赖版本定义在 [package.json](./package.json)，具体安装版本由 [package-lock.json](./package-lock.json) 锁定。

## 本地运行

环境要求：**Node.js 20.9.0 或更高版本**，以及 **npm**。

克隆仓库后，在项目根目录运行：

```bash
npm ci
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)，根地址会跳转到简体中文首页 `/zh-CN`。

当前版本无需配置应用专用的环境变量。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm ci` | 按照锁定文件安装依赖 |
| `npm run dev` | 启动开发服务器 |
| `npm run lint` | 执行 ESLint 检查 |
| `npm run build` | 构建生产版本并执行 TypeScript 检查 |
| `npm run start` | 在构建成功后启动生产服务器 |

本地运行生产版本：

```bash
npm ci
npm run build
npm run start
```

生产服务器默认使用 `3000` 端口。在 Ubuntu VPS 上也使用这些应用层面的构建和启动命令；进程管理、反向代理等由服务器环境另行配置。

中英文页面会在构建时预渲染。项目目前通过 Next.js 服务器运行生产版本，包括执行配置中的重定向规则。

## 页面与语言

| 页面 | 简体中文 | 英文 |
| --- | --- | --- |
| 首页 | `/zh-CN` | `/en` |
| 研究 | `/zh-CN/research` | `/en/research` |
| 系统 | `/zh-CN/systems` | `/en/systems` |
| 智能 | `/zh-CN/intelligence` | `/en/intelligence` |
| 发现 | `/zh-CN/discovery` | `/en/discovery` |

- 默认语言为**简体中文**，在 [src/i18n/config.ts](./src/i18n/config.ts) 中配置。
- `/` 和 `/research` 等四个不带语言前缀的主题地址，会跳转到对应的中文页面。规则定义在 [next.config.ts](./next.config.ts)。
- 不支持的语言前缀返回 404 页面。
- 站内页面在当前标签页跳转；GitHub 和页脚备案链接在新标签页打开。
- 两种语言下的页脚文字均固定使用中文。

## 首页交互

| 操作 | 效果 |
| --- | --- |
| 悬停或用键盘聚焦某个方向 | 预览对应介绍 |
| 点击方向，或按回车、空格 | 保留当前方向的介绍 |
| 激活介绍中的链接 | 进入对应主题页面 |
| 点击空白处 | 恢复默认介绍 |
| 在探索区域按 Escape | 恢复默认介绍 |

另有恢复按钮供键盘和屏幕阅读器用户使用。正常浏览时它在视觉上隐藏，用 Tab 聚焦后才会显示。

语言选择器支持 Tab、回车、空格、方向键、Home、End 和 Escape。每个页面的第一个 Tab 焦点都提供**跳到正文**链接。

## 目录结构

```text
public/                      # 品牌资源、图标与初始主题脚本
src/
├── app/
│   ├── globals.css           # 全局样式、主题与焦点提示
│   └── [lang]/
│       ├── layout.tsx        # 根文档、语言、页面元数据与页脚
│       ├── (home)/
│       │   └── page.tsx      # 首页与偏好设置按钮
│       └── (site)/
│           ├── layout.tsx    # 主题子页共用布局与 Sitebar
│           ├── research/page.tsx
│           ├── systems/page.tsx
│           ├── intelligence/page.tsx
│           └── discovery/page.tsx
├── components/              # 共用组件与首页交互组件
└── i18n/
    ├── config.ts            # 支持的语言与语言路径工具
    ├── dictionaries.ts      # 服务器端词典加载与语言校验
    ├── types.ts             # 共用词典类型
    └── dictionaries/
        ├── en.json
        └── zh-CN.json
```

`[lang]` 对应网址中的语言段。`(home)` 和 `(site)` 是路由分组，用于组织不同布局，不会出现在网址中。`Sitebar` 提供主题子页的偏好设置按钮，首页单独安排这些按钮的位置。

## 修改内容与外观

| 要修改的内容 | 位置 |
| --- | --- |
| 英文文案与页面元数据 | [src/i18n/dictionaries/en.json](./src/i18n/dictionaries/en.json) |
| 中文文案与页面元数据 | [src/i18n/dictionaries/zh-CN.json](./src/i18n/dictionaries/zh-CN.json) |
| 支持的语言与默认语言 | [src/i18n/config.ts](./src/i18n/config.ts) |
| 首页布局 | [src/app/[lang]/(home)/page.tsx](./src/app/%5Blang%5D/%28home%29/page.tsx) |
| 方向预览与介绍链接 | [src/components/home/ExploreSection.tsx](./src/components/home/ExploreSection.tsx) |
| 主题子页内容 | `src/app/[lang]/(site)/<topic>/page.tsx` |
| 主题颜色与全局样式 | [src/app/globals.css](./src/app/globals.css) |
| 页脚文案与备案信息 | [src/components/Footer.tsx](./src/components/Footer.tsx) |
| Logo 与其他静态资源 | [public/](./public/) |

两份 JSON 词典应保持相同的键。创建站内页面链接时，使用 `src/i18n/config.ts` 中的 `localizePathname()`，以保留当前语言。`/sun.svg` 等静态资源地址不添加语言前缀。

主题初始化由 `public/theme-init.js` 和 `ThemeController` 处理；`ThemeSwitcher` 处理用户点击，`LanguageSwitcher` 负责更新语言路由。

提交修改前运行：

```bash
npm run lint
npm run build
```

修改界面后，还应检查键盘操作、中英文、亮暗主题和窄屏排布。

## 许可证

[MIT](./LICENSE)。
