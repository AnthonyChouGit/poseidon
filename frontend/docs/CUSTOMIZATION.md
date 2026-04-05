# 页面自定义指南（不改代码结构）

本文档说明如何在**不修改现有目录结构和组件拆分**的前提下，自定义你的个人导航页内容与样式。

## 1) 你可以改什么，不建议改什么

- 可以改：
  - 文案、品牌名、按钮文字
  - 导航链接和 footer 链接
  - 首页项目卡片数据
  - 路由配置（新增页面）
  - 主题色变量、间距等样式变量
  - 演示图片替换
- 不建议改：
  - `src/components/ui/` 下组件文件名与职责边界
  - `App.vue -> TopNav + RouterView + SiteFooter` 整体壳结构
  - `views` 页面对 UI 组件的组合方式（可扩展但不打散）

---

## 2) 快速定位：每类自定义在哪个文件

- 站点名称、顶部菜单、Footer 链接：
  - `src/App.vue`
- 首页主视觉文案、按钮、项目卡片：
  - `src/views/HomeView.vue`
- 关于页文案卡片：
  - `src/views/AboutView.vue`
- 路由（新增页面入口）：
  - `src/router/index.js`
- 全局主题色与基础排版变量：
  - `src/assets/base.css`
- 全局基础样式：
  - `src/assets/main.css`
- 复用 UI 组件（通常不需要改结构）：
  - `src/components/ui/*`

---

## 3) 自定义品牌与导航（App 层）

在 `src/App.vue` 中，你主要修改 2 组数据和 2 个组件参数：

1. `navLinks`：顶部导航菜单
2. `footerLinks`：底部链接
3. `<TopNav brand="...">`：品牌名和右侧 CTA
4. `<SiteFooter ...>`：footer 品牌文案

示例（直接替换数组内容即可）：

```js
const navLinks = [
  { label: '首页', to: '/' },
  { label: '项目', to: '/projects' },
  { label: '联系', to: '/contact' },
]

const footerLinks = [
  { label: '关于', to: '/about' },
  { label: 'GitHub', href: 'https://github.com/your-name', newTab: true },
  { label: '掘金', href: 'https://juejin.cn/user/xxx', newTab: true },
]
```

说明：
- `to` 用于站内路由（`vue-router`）
- `href` 用于外链
- `newTab: true` 会新窗口打开

---

## 4) 自定义首页项目卡片（最常用）

在 `src/views/HomeView.vue` 中，重点维护 `projects` 数组。

当前 `ProjectCard` 推荐的数据结构：

```js
{
  title: '项目名称',
  summary: '项目简介',
  cover: workspaceCover, // 建议引用 src/assets/images 下图片
  tags: ['标签1', '标签2'],
  actions: [
    { label: '进入模块', to: '/about', variant: 'primary' },
    { label: '查看文档', href: 'https://example.com', variant: 'ghost', newTab: true }
  ]
}
```

`actions.variant` 可选值：
- `primary`：主按钮（渐变强调）
- `secondary`：次按钮（浅色强调）
- `ghost`：弱化按钮（透明边框）

常见改法：
- 增加卡片：在 `projects` 里新增一个对象
- 删除卡片：移除对应对象
- 调整列数：修改模板中 `ProjectGrid` 的 `:columns`

```vue
<ProjectGrid :projects="projects" :columns="3" />
```

---

## 5) 自定义首页 Hero 区域

`src/views/HomeView.vue` 中 `SectionHeader` 和 `hero-actions` 就是首页头部。

你可以改：
- `title` / `subtitle` 文案
- 右上角标签（`TagBadge`）
- CTA 按钮（`ActionButton`）

示例：

```vue
<SectionHeader
  title="欢迎来到我的导航中枢"
  subtitle="聚合博客、工具与实验项目，统一入口管理。"
>
  <template #actions>
    <TagBadge text="Personal Hub" />
    <TagBadge text="2026" tone="success" />
  </template>
</SectionHeader>
```

---

## 6) 新增页面（不改结构，只扩展）

### Step A：新增 View 文件

在 `src/views/` 新建页面，例如：`ProjectsView.vue`。

### Step B：注册路由

在 `src/router/index.js` 的 `routes` 中新增：

```js
{
  path: '/projects',
  name: 'projects',
  component: () => import('../views/ProjectsView.vue'),
  meta: { title: '项目' },
}
```

### Step C：加入导航和 footer

在 `src/App.vue` 的 `navLinks` / `footerLinks` 数组中加一项：

```js
{ label: '项目', to: '/projects' }
```

---

## 7) 替换图片资源（演示图 -> 真实图）

当前演示图在：
- `src/assets/images/project-workspace.svg`
- `src/assets/images/project-dashboard.svg`
- `src/assets/images/project-lab.svg`

替换方式：
- 方案 1：保留文件名，直接替换文件内容（最省改动）
- 方案 2：新增文件并在 `HomeView.vue` 里修改 import 引用

建议：
- 图片比例保持接近 `800x480`，卡片展示更稳定
- 尽量使用 `webp/svg`，加载更快

---

## 8) 全局风格定制（清新/简洁/高端）

在 `src/assets/base.css` 的 `:root` 中改变量即可整体换肤，不用改组件结构。

重点变量：
- 品牌色：`--brand-500` / `--brand-600` / `--brand-700`
- 文本：`--color-heading` / `--color-text` / `--color-text-soft`
- 中性色边框：`--neutral-100` / `--neutral-200` / `--neutral-300`
- 背景：`--color-background`

示例（偏青绿色）：

```css
:root {
  --brand-500: #14b8a6;
  --brand-600: #0d9488;
  --brand-700: #0f766e;
  --brand-shadow: rgba(13, 148, 136, 0.35);
}
```

---

## 9) 组件参数速查（无需改组件内部）

- `TopNav`
  - `brand: string`
  - `links: Array<{label,to}>`
  - `ctaLabel: string`
  - `ctaTo: string|object`

- `SiteFooter`
  - `brand: string`
  - `description: string`
  - `links: Array<{label,to?|href?|newTab?}>`
  - `copyrightText: string`

- `ProjectGrid`
  - `projects: Array`
  - `columns: number`

- `ActionButton`
  - `label: string`
  - `to: string|object`（站内）
  - `href: string`（外链）
  - `variant: primary|secondary|ghost`
  - `size: sm|md|lg`

- `TagBadge`
  - `text: string`
  - `tone: primary|neutral|success`

---

## 10) 推荐自定义流程（不改结构版本）

1. 先改 `src/App.vue`：品牌、导航、footer 链接  
2. 再改 `src/views/HomeView.vue`：Hero 文案 + projects 数据  
3. 按需加页面并改 `src/router/index.js`  
4. 最后统一在 `src/assets/base.css` 微调主题色  

这样做可以保持结构稳定，同时快速完成内容定制。

