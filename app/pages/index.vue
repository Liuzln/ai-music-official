<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <!-- Background decoration -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="bg-blob bg-blob-1 absolute -top-32 -right-40 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl"></div>
      <div class="bg-blob bg-blob-2 absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/20 blur-3xl"></div>
      <div class="bg-blob bg-blob-3 absolute -bottom-40 right-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-300/20 blur-3xl"></div>
    </div>

    <!-- Header -->
    <header
      v-motion
      :initial="headerInitial"
      :enter="headerEnter"
      class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" class="group flex items-center gap-2">
          <span
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-sm transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
          >
            <Music class="h-5 w-5" />
          </span>
          <span class="font-semibold tracking-tight">{{ siteName }}</span>
        </a>

        <nav class="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a class="hover:text-slate-900" href="#features">软件功能</a>
          <a class="hover:text-slate-900" href="#workflow">工作流程</a>
          <a class="hover:text-slate-900" href="#scenarios">适用场景</a>
          <a class="hover:text-slate-900" href="#faq">FAQ</a>
        </nav>

        <div class="flex items-center gap-2">
          <a
            :href="appUrl"
            class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            :target="isExternalAppUrl ? '_blank' : undefined"
            :rel="isExternalAppUrl ? 'noopener noreferrer' : undefined"
          >
            立即体验
            <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>

    <main id="top">
      <!-- Hero -->
      <section class="mx-auto max-w-6xl px-4 pb-12 pt-14 md:pb-16 md:pt-20">
        <div class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0)"
              class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700"
            >
              <Sparkles class="h-4 w-4 text-indigo-600" />
              AI 生成音乐 · 单页官网
            </div>

            <h1
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.08)"
              class="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
            >
              用一句话生成你的音乐灵感
            </h1>
            <p
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.16)"
              class="mt-4 text-base leading-relaxed text-slate-600 md:text-lg"
            >
              {{ siteName }} 面向内容创作者与音乐制作人：输入提示词，选择风格与情绪，即可生成可用于视频、游戏、广告的音乐草稿，并支持导出与二次编辑。
            </p>

            <div
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.24)"
              class="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <a
                :href="appUrl"
                class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                :target="isExternalAppUrl ? '_blank' : undefined"
                :rel="isExternalAppUrl ? 'noopener noreferrer' : undefined"
              >
                立即体验
                <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                查看功能
              </a>
            </div>

            <div
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.32)"
              class="mt-6 flex flex-wrap gap-2"
            >
              <span class="badge">文本生成音乐</span>
              <span class="badge">风格/速度控制</span>
              <span class="badge">分轨导出</span>
              <span class="badge">快速迭代多版本</span>
            </div>

            <p
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.4)"
              class="mt-4 text-xs text-slate-500"
            >
              * 页面为展示用单页官网模板，功能与授权以实际产品为准。
            </p>
          </div>

          <div class="relative">
            <div
              v-motion
              :initial="cardInitial"
              :enter="cardEnter(0.12)"
              :hovered="cardHovered"
              class="glass-card overflow-hidden p-6"
            >
              <div class="flex items-center gap-3">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/10">
                  <AudioLines class="h-5 w-5 text-indigo-600" />
                </span>
                <div>
                  <div class="text-sm font-semibold text-slate-900">生成预览</div>
                  <div class="text-xs text-slate-500">提示词：Lo-fi / 雨夜 / 温暖 / 90 BPM</div>
                </div>
              </div>

              <div class="mt-6 space-y-3">
                <div class="h-2 w-full rounded-full bg-slate-200/70"></div>
                <div class="h-2 w-11/12 rounded-full bg-slate-200/60"></div>
                <div class="h-2 w-10/12 rounded-full bg-slate-200/60"></div>
                <div class="h-2 w-9/12 rounded-full bg-slate-200/50"></div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3 text-xs">
                <div class="rounded-2xl bg-white/60 p-3">
                  风格
                  <div class="mt-1 font-semibold text-slate-900">Lo-fi</div>
                </div>
                <div class="rounded-2xl bg-white/60 p-3">
                  时长
                  <div class="mt-1 font-semibold text-slate-900">30s / 60s</div>
                </div>
                <div class="rounded-2xl bg-white/60 p-3">
                  导出
                  <div class="mt-1 font-semibold text-slate-900">WAV / MP3</div>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white">
                <div class="flex items-center gap-2 text-sm font-semibold">
                  <span class="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"></span>
                  <Play class="h-4 w-4" />
                  试听
                </div>
                <div class="text-xs text-white/70">示意 UI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            软件功能
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            聚焦“生成 + 控制 + 导出 + 二次编辑”，让创作从灵感到成品更顺畅。
          </p>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(f, idx) in features"
            :key="f.title"
            v-motion
            :initial="cardInitial"
            :visibleOnce="cardVisibleOnce(idx)"
            :hovered="cardHovered"
            class="glass-card group p-6"
          >
            <div class="flex items-start gap-3">
              <span
                class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600/10 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
              >
                <component :is="f.icon" class="h-5 w-5 text-indigo-600" />
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-900">
                  {{ f.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  {{ f.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Workflow -->
      <section id="workflow" class="border-y border-slate-200/70 bg-white/60">
        <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              3 步完成创作
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              让 AI 成为你的“灵感加速器”，而不是替代创作本身。
            </p>
          </div>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <div
              v-for="(s, idx) in workflow"
              :key="s.title"
              v-motion
              :initial="cardInitial"
              :visibleOnce="cardVisibleOnce(idx)"
              :hovered="cardHovered"
              class="glass-card p-6"
            >
              <div class="text-xs font-semibold text-indigo-600">
                STEP {{ idx + 1 }}
              </div>
              <div class="mt-2 text-sm font-semibold text-slate-900">
                {{ s.title }}
              </div>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">
                {{ s.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Scenarios -->
      <section id="scenarios" class="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            适用场景
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            从内容配乐到商业项目，快速产出多版本音乐素材。
          </p>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(s, idx) in scenarios"
            :key="s.title"
            v-motion
            :initial="cardInitial"
            :visibleOnce="cardVisibleOnce(idx)"
            :hovered="cardHovered"
            class="glass-card group p-6"
          >
            <div class="flex items-start gap-3">
              <span
                class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
              >
                <component :is="s.icon" class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-900">
                  {{ s.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  {{ s.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="border-t border-slate-200/70 bg-white/60">
        <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              常见问题
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              你可能关心的几个问题，我们先在这里说明。
            </p>
          </div>

          <div class="mt-8 space-y-3">
            <details
              v-for="(item, idx) in faqs"
              :key="item.q"
              v-motion
              :initial="cardInitial"
              :visibleOnce="cardVisibleOnce(idx)"
              :hovered="cardHovered"
              class="glass-card p-5"
            >
              <summary
                class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900"
              >
                <span>{{ item.q }}</span>
                <ChevronDown class="h-4 w-4 text-slate-500 transition-transform duration-200" />
              </summary>
              <p class="mt-3 text-sm leading-relaxed text-slate-600">
                {{ item.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section id="cta" class="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div
          v-motion
          :initial="cardInitial"
          :visibleOnce="cardVisibleOnce(0)"
          class="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-6 py-10 text-white md:px-10"
        >
          <div class="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 class="text-2xl font-bold tracking-tight md:text-3xl">
                准备开始创作？
              </h2>
              <p class="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                打开 {{ siteName }}，用更少的时间完成更多版本，专注于选择、编排与情绪表达。
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                :href="appUrl"
                class="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-md"
                :target="isExternalAppUrl ? '_blank' : undefined"
                :rel="isExternalAppUrl ? 'noopener noreferrer' : undefined"
              >
                立即体验
                <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                :href="mailtoLink"
                class="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/15"
              >
                商务合作
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-200/70 bg-white/75">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"
      >
        <div>© {{ year }} {{ siteName }}. All rights reserved.</div>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <a class="hover:text-slate-700" href="#features">功能</a>
          <a class="hover:text-slate-700" href="#workflow">流程</a>
          <a class="hover:text-slate-700" href="#faq">FAQ</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import {
  ArrowRight,
  AudioLines,
  ChevronDown,
  Download,
  Headphones,
  Layers,
  Music,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-vue-next'

const easeOut = [0.22, 1, 0.36, 1] as const

const headerInitial = { opacity: 0, y: -12, filter: 'blur(8px)' }
const headerEnter = { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: easeOut } }

const fadeUpInitial = { opacity: 0, y: 18, filter: 'blur(10px)' }
const fadeUpEnter = (delay = 0) => ({
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  transition: { duration: 0.7, delay, ease: easeOut },
})
const fadeUpVisible = (delay = 0) => ({
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  transition: { duration: 0.7, delay, ease: easeOut },
})

const liftSpring = { type: 'spring', stiffness: 260, damping: 24, mass: 0.8 } as const

const cardInitial = { opacity: 0, y: 16, scale: 0.99, filter: 'blur(10px)' }
const cardEnter = (delay = 0) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
  transition: {
    opacity: { duration: 0.65, delay, ease: easeOut },
    filter: { duration: 0.65, delay, ease: easeOut },
    y: { ...liftSpring, delay },
    scale: { ...liftSpring, delay },
  },
})
const cardVisibleOnce = (index = 0) => {
  const delay = index * 0.06
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      opacity: { duration: 0.65, delay, ease: easeOut },
      filter: { duration: 0.65, delay, ease: easeOut },
      y: { ...liftSpring, delay },
      scale: { ...liftSpring, delay },
    },
  }
}
const cardHovered = { y: -6, scale: 1.01, transition: { ...liftSpring } }

const config = useRuntimeConfig()

const siteName = computed(() => (config.public.siteName as string) || 'AI Music')
const siteUrl = computed(() => (config.public.siteUrl as string) || 'http://localhost:3000')
const ogImage = computed(() => (config.public.ogImage as string) || '/og-image.svg')
const appUrl = computed(() => (config.public.appUrl as string) || '#cta')
const isExternalAppUrl = computed(() => /^https?:\/\//i.test(appUrl.value))
const contactEmail = computed(() => (config.public.contactEmail as string) || '')

const description = computed(() => {
  return `${siteName.value}：AI 生成音乐单页官网示例，展示文本生成音乐、风格控制、导出与二次编辑等能力。`
})

const absoluteOgImage = computed(() => {
  try {
    return new URL(ogImage.value, siteUrl.value).toString()
  } catch {
    return ogImage.value
  }
})

const mailtoLink = computed(() => {
  if (!contactEmail.value) return '#'
  return `mailto:${contactEmail.value}`
})

const year = new Date().getFullYear()

useHead(() => {
  return {
    title: `${siteName.value} - AI 生成音乐，一键创作`,
    meta: [
      { name: 'description', content: description.value },
      { name: 'keywords', content: 'AI生成音乐,AI音乐,音乐生成,文本生成音乐,配乐,BGM' },
      { property: 'og:title', content: `${siteName.value} - AI 生成音乐` },
      { property: 'og:description', content: description.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: siteUrl.value },
      { property: 'og:image', content: absoluteOgImage.value },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${siteName.value} - AI 生成音乐` },
      { name: 'twitter:description', content: description.value },
      { name: 'twitter:image', content: absoluteOgImage.value },
    ],
    link: [{ rel: 'canonical', href: siteUrl.value }],
  }
})

useSchemaOrg([
  defineOrganization({
    name: siteName.value,
    url: siteUrl.value,
  }),
  defineWebSite({
    name: siteName.value,
    url: siteUrl.value,
  }),
  defineWebPage({
    name: `${siteName.value} - AI 生成音乐`,
    description: description.value,
  }),
])

const features = [
  {
    title: '文本生成音乐',
    description: '输入提示词与场景描述，快速生成旋律、和声与编曲草稿。',
    icon: Sparkles,
  },
  {
    title: '风格与参数控制',
    description: '支持风格、情绪、速度（BPM）、时长等维度的可控生成。',
    icon: SlidersHorizontal,
  },
  {
    title: '快速迭代多版本',
    description: '一键生成多个候选版本，便于挑选方向并持续优化。',
    icon: Zap,
  },
  {
    title: '高质量音频输出',
    description: '生成可直接用于内容配乐的音频素材，支持常用格式导出。',
    icon: AudioLines,
  },
  {
    title: '分轨导出与二次编辑',
    description: '支持分轨导出，进入 DAW 做混音、母带与细节打磨。',
    icon: Layers,
  },
  {
    title: '授权与使用指引',
    description: '提供授权选项与使用建议，帮助更安心地发布与商用。',
    icon: ShieldCheck,
  },
] as Array<{ title: string; description: string; icon: Component }>

const workflow = [
  {
    title: '描述你想要的音乐',
    description: '用一句话说明风格、情绪、场景与参考方向（支持中文提示词）。',
  },
  {
    title: '选择参数并生成',
    description: '设置时长、速度等参数，一键生成多版本候选，快速预览筛选。',
  },
  {
    title: '导出并继续制作',
    description: '导出音频或分轨，进入你熟悉的工作流继续编排、混音与发布。',
  },
]

const scenarios = [
  {
    title: '短视频 / 直播配乐',
    description: '快速产出多条 BGM，适配不同情绪与转场节奏。',
    icon: Play,
  },
  {
    title: '游戏与互动内容',
    description: '生成氛围音乐草稿，为关卡与场景提供灵感与素材。',
    icon: Headphones,
  },
  {
    title: '商业广告与品牌片',
    description: '更快试错不同风格方向，提高提案效率。',
    icon: Music,
  },
  {
    title: '播客 / 片头片尾',
    description: '生成符合调性的片头片尾与提示音，统一品牌听感。',
    icon: AudioLines,
  },
  {
    title: '创作者音乐素材库',
    description: '沉淀可复用的风格模板与素材片段，长期迭代。',
    icon: Layers,
  },
  {
    title: '导出交付',
    description: '支持一键导出，便于与剪辑、制作、客户协作。',
    icon: Download,
  },
] as Array<{ title: string; description: string; icon: Component }>

const faqs = [
  {
    q: '生成的音乐可以商用吗？',
    a: '是否可商用取决于你所选择的授权方案与服务条款。建议在发布前查看授权说明，并保留导出/订单记录以备查询。',
  },
  {
    q: '支持哪些导出格式？',
    a: '常见会提供 WAV/MP3 等音频导出，并可在部分版本中支持分轨导出，便于进入 DAW 做进一步制作。',
  },
  {
    q: '我可以控制风格、BPM 和时长吗？',
    a: '可以。你可以通过提示词与参数设置控制风格、情绪、速度（BPM）与时长，并通过多版本生成快速迭代。',
  },
  {
    q: '是否支持中文提示词？',
    a: '支持。用中文描述场景与关键词即可，也可以混用英文风格词以获得更精确的风格指向。',
  },
] as Array<{ q: string; a: string }>
</script>

<style scoped>
.badge {
  @apply inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600;
}

details[open] summary svg {
  transform: rotate(180deg);
}
</style>
