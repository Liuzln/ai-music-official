# AI Music Official（单页官网）

本项目是一个基于 **Nuxt + Vue 3 + TailwindCSS** 的单页官网，用于展示 **AI 生成音乐软件** 的核心能力与使用场景。

## 内容编辑

主要内容在：
- `app/pages/index.vue`：Hero / 场景模板（背景+BGM）/ 小语种模型 / 关于我们 / 联系我们

可通过环境变量配置：
- `NUXT_PUBLIC_SITE_URL`：站点 URL（用于 SEO / OG）
- `NUXT_PUBLIC_SITE_NAME`：站点名称
- `NUXT_PUBLIC_OG_IMAGE`：OG 图片路径（默认 `/og-image.svg`）
- `NUXT_PUBLIC_APP_URL`：产品入口链接（Header/CTA “立即体验” 按钮）
- `NUXT_PUBLIC_CONTACT_EMAIL`：联系邮箱（底部联系方式展示）
- `NUXT_PUBLIC_CONTACT_WECHAT`：联系微信（底部联系方式展示）
- `NUXT_PUBLIC_CONTACT_WECHAT_QR`：微信二维码图片路径（例如 `/wechat-qr.png`，放在 `public/` 下）

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
