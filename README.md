# AI Music Official（单页官网）

本项目是一个基于 **Nuxt + Vue 3 + TailwindCSS** 的单页官网，用于展示 **AI 生成音乐软件** 的核心能力与使用场景。

## 内容编辑

主要内容在：
- `app/pages/index.vue`：Hero / 功能 / 流程 / 场景 / FAQ / CTA

可通过环境变量配置：
- `NUXT_PUBLIC_SITE_URL`：站点 URL（用于 SEO / OG）
- `NUXT_PUBLIC_SITE_NAME`：站点名称
- `NUXT_PUBLIC_OG_IMAGE`：OG 图片路径（默认 `/og-image.svg`）
- `NUXT_PUBLIC_APP_URL`：产品入口链接（Header/CTA “立即体验” 按钮）
- `NUXT_PUBLIC_CONTACT_EMAIL`：联系邮箱（CTA “商务合作” 按钮）

## 开发

安装依赖：

```bash
npm install
```

启动开发服务器（默认 `http://localhost:3000`）：

```bash
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```
