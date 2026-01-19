<template>
  <!-- 首页：单页官网（用于展示产品信息/引导转化） -->
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <!-- 背景装饰：渐变光斑（纯装饰，不可交互） -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="bg-blob bg-blob-1 absolute -top-32 -right-40 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/15"></div>
      <div class="bg-blob bg-blob-2 absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-500/10"></div>
      <div class="bg-blob bg-blob-3 absolute -bottom-40 right-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10"></div>
    </div>

    <!-- 顶部区域：粘性导航栏（Logo / 锚点导航 / 立即体验） -->
    <header
      v-motion
      :initial="headerInitial"
      :enter="headerEnter"
      ref="headerEl"
      class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <!-- 左侧：Logo + 站点名（点击回到顶部） -->
        <a href="#top" class="group flex items-center gap-2" @click="onMaybeSmoothAnchorClick">
          <span
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-sm transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
          >
            <Music class="h-5 w-5" />
          </span>
          <span class="font-semibold tracking-tight">{{ siteName }}</span>
        </a>

        <!-- 中部：锚点导航（桌面端显示） -->
        <nav class="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <a class="hover:text-slate-900 dark:hover:text-slate-100" href="#features" @click="onMaybeSmoothAnchorClick">
            {{ t('nav.features') }}
          </a>
          <a class="hover:text-slate-900 dark:hover:text-slate-100" href="#workflow" @click="onMaybeSmoothAnchorClick">
            {{ t('nav.workflow') }}
          </a>
          <a class="hover:text-slate-900 dark:hover:text-slate-100" href="#scenarios" @click="onMaybeSmoothAnchorClick">
            {{ t('nav.scenarios') }}
          </a>
          <a class="hover:text-slate-900 dark:hover:text-slate-100" href="#faq" @click="onMaybeSmoothAnchorClick">
            {{ t('nav.faq') }}
          </a>
        </nav>

        <!-- 右侧：主按钮（跳转到应用或 CTA） -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/70 bg-white/70 text-slate-700 shadow-sm transition-colors hover:bg-white dark:border-slate-800/70 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:bg-slate-950"
            :title="themeToggleTitle"
            :aria-label="themeToggleTitle"
            @click="onToggleThemeMode"
          >
            <component :is="themeToggleIcon" class="h-4 w-4" />
          </button>
          <div
            class="inline-flex items-center rounded-xl border border-slate-200/70 bg-white/70 p-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/60 dark:text-slate-200"
            role="group"
            :aria-label="t('language.switch')"
          >
            <button
              type="button"
              class="rounded-lg px-2 py-1 transition-colors duration-200 hover:text-slate-900 dark:hover:text-slate-100"
              :class="locale === 'zh-CN' ? 'bg-slate-900 text-white hover:text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:text-slate-900' : ''"
              :aria-pressed="locale === 'zh-CN'"
              @click="setLocale('zh-CN')"
            >
              {{ t('language.zh') }}
            </button>
            <button
              type="button"
              class="rounded-lg px-2 py-1 transition-colors duration-200 hover:text-slate-900 dark:hover:text-slate-100"
              :class="locale === 'en' ? 'bg-slate-900 text-white hover:text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:text-slate-900' : ''"
              :aria-pressed="locale === 'en'"
              @click="setLocale('en')"
            >
              {{ t('language.en') }}
            </button>
          </div>
          <a
            :href="appUrl"
            @click="onMaybeSmoothAnchorClick"
            class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            :target="isExternalAppUrl ? '_blank' : undefined"
            :rel="isExternalAppUrl ? 'noopener noreferrer' : undefined"
          >
            {{ t('actions.tryNow') }}
            <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>

    <!-- 主内容：从上到下的各模块 -->
    <main id="top">
      <!-- 首屏（Hero）：核心卖点 + 主次按钮 + 右侧示意卡片 -->
      <section class="mx-auto max-w-6xl px-4 pb-12 pt-14 md:pb-16 md:pt-20">
        <div class="grid items-center gap-10 md:grid-cols-2">
          <!-- 左侧：文案与行动区 -->
          <div>
            <!-- 顶部小标签：产品定位/说明 -->
            <div
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0)"
              class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
            >
              <Sparkles class="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              {{ t('hero.tag') }}
            </div>

            <!-- 标题：主 Slogan -->
            <h1
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.08)"
              class="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl"
            >
              {{ t('hero.title') }}
            </h1>
            <!-- 副标题：产品介绍 -->
            <p
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.16)"
              class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg"
            >
              {{ t('hero.subtitle', { siteName }) }}
            </p>

            <!-- 按钮区：主按钮（立即体验）+ 次按钮（查看功能） -->
            <div
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.24)"
              class="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <a
                :href="appUrl"
                @click="onMaybeSmoothAnchorClick"
                class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                :target="isExternalAppUrl ? '_blank' : undefined"
                :rel="isExternalAppUrl ? 'noopener noreferrer' : undefined"
              >
                {{ t('actions.tryNow') }}
                <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                @click="onMaybeSmoothAnchorClick"
                class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900/80"
              >
                {{ t('actions.viewFeatures') }}
              </a>
            </div>

            <!-- 卖点标签：能力概览 -->
            <div
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.32)"
              class="mt-6 flex flex-wrap gap-2"
            >
              <span class="badge">{{ t('hero.badges.textToMusic') }}</span>
              <span class="badge">{{ t('hero.badges.styleControl') }}</span>
              <span class="badge">{{ t('hero.badges.stemsExport') }}</span>
              <span class="badge">{{ t('hero.badges.multiVersion') }}</span>
            </div>

            <!-- 说明：模板提示/免责声明 -->
            <p
              v-motion
              :initial="fadeUpInitial"
              :enter="fadeUpEnter(0.4)"
              class="mt-4 text-xs text-slate-500 dark:text-slate-400"
            >
              {{ t('hero.disclaimer') }}
            </p>
          </div>

          <!-- 右侧：生成预览卡片（示意 UI） -->
          <div class="relative">
            <div
              v-motion
              :initial="cardInitial"
              :enter="cardEnter(0.12)"
              :hovered="cardHovered"
              class="tilt-wrapper"
            >
              <div
                ref="previewCardEl"
                class="glass-card preview-tilt overflow-hidden p-6"
                @mouseenter="onPreviewCardMouseEnter"
                @mousemove="onPreviewCardMouseMove"
                @mouseleave="onPreviewCardMouseLeave"
              >
                <div class="flex items-center gap-3">
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/10 dark:bg-indigo-400/10">
                    <AudioLines class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </span>
                  <div>
                    <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ t('preview.title') }}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">{{ t('preview.prompt') }}</div>
                  </div>
                </div>

                <div class="mt-6 space-y-3">
                  <div class="h-2 w-full rounded-full bg-slate-200/70 dark:bg-slate-700/60"></div>
                  <div class="h-2 w-11/12 rounded-full bg-slate-200/60 dark:bg-slate-700/50"></div>
                  <div class="h-2 w-10/12 rounded-full bg-slate-200/60 dark:bg-slate-700/50"></div>
                  <div class="h-2 w-9/12 rounded-full bg-slate-200/50 dark:bg-slate-700/40"></div>
                </div>

                <div class="mt-6 grid grid-cols-3 gap-3 text-xs">
                  <div class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
                    {{ t('preview.style') }}
                    <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">Lo-fi</div>
                  </div>
                  <div class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
                    {{ t('preview.duration') }}
                    <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">30s / 60s</div>
                  </div>
                  <div class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
                    {{ t('preview.export') }}
                    <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">WAV / MP3</div>
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white dark:bg-slate-950/80">
                  <div class="flex items-center gap-2 text-sm font-semibold">
                    <span class="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"></span>
                    <Play class="h-4 w-4" />
                    {{ t('preview.listen') }}
                  </div>
                  <div class="text-xs text-white/70">{{ t('preview.demo') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能区：软件功能（卡片列表） -->
      <section id="features" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16">
        <!-- 功能区标题与说明 -->
        <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            {{ t('sections.features.title') }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {{ t('sections.features.description') }}
          </p>
        </div>

        <!-- 功能卡片：循环渲染 features -->
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(f, idx) in features"
            :key="f.id"
            v-motion
            :initial="cardInitial"
            :visibleOnce="cardVisibleOnce(idx)"
            :hovered="cardHovered"
            class="glass-card group p-6"
          >
            <div class="flex items-start gap-3">
              <span
                class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600/10 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:bg-indigo-400/10"
              >
                <component :is="f.icon" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {{ f.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {{ f.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 流程区：3 步完成创作 -->
      <section id="workflow" class="scroll-mt-24 border-y border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-950/40">
        <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <!-- 流程区标题与说明 -->
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
              {{ t('sections.workflow.title') }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
              {{ t('sections.workflow.description') }}
            </p>
          </div>

          <!-- 步骤卡片：循环渲染 workflow -->
          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <div
              v-for="(s, idx) in workflow"
              :key="s.id"
              v-motion
              :initial="cardInitial"
              :visibleOnce="cardVisibleOnce(idx)"
              :hovered="cardHovered"
              class="glass-card p-6"
            >
              <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {{ t('sections.workflow.step', { index: idx + 1 }) }}
              </div>
              <div class="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {{ s.title }}
              </div>
              <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {{ s.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 场景区：适用场景（卡片列表） -->
      <section id="scenarios" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16">
        <!-- 场景区标题与说明 -->
        <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            {{ t('sections.scenarios.title') }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {{ t('sections.scenarios.description') }}
          </p>
        </div>

        <!-- 场景卡片：循环渲染 scenarios -->
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(s, idx) in scenarios"
            :key="s.id"
            v-motion
            :initial="cardInitial"
            :visibleOnce="cardVisibleOnce(idx)"
            :hovered="cardHovered"
            class="glass-card group p-6"
          >
            <div class="flex items-start gap-3">
              <span
                class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:bg-slate-800"
              >
                <component :is="s.icon" class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {{ s.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {{ s.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ：常见问题（折叠面板） -->
      <section id="faq" class="scroll-mt-24 border-t border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-950/40">
        <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <!-- FAQ 标题与说明 -->
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
              {{ t('sections.faq.title') }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
              {{ t('sections.faq.description') }}
            </p>
          </div>

          <!-- 问题列表：循环渲染 faqs -->
          <div class="mt-8 space-y-3">
            <div
              v-for="(item, idx) in faqs"
              :key="item.id"
              v-motion
              :initial="cardInitial"
              :visibleOnce="cardVisibleOnce(idx)"
              :hovered="cardHovered"
              class="glass-card p-5"
            >
              <button
                :id="`faq-trigger-${idx}`"
                type="button"
                class="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60 dark:focus-visible:ring-offset-slate-950/60"
                :aria-expanded="isFaqOpen(idx)"
                :aria-controls="`faq-panel-${idx}`"
                @click="toggleFaq(idx)"
              >
                <span>{{ item.q }}</span>
                <ChevronDown
                  :class="[
                    'h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform duration-200',
                    isFaqOpen(idx) ? 'rotate-180' : '',
                  ]"
                />
              </button>

              <Transition
                :css="false"
                @before-enter="onFaqBeforeEnter"
                @enter="onFaqEnter"
                @after-enter="onFaqAfterEnter"
                @before-leave="onFaqBeforeLeave"
                @leave="onFaqLeave"
                @after-leave="onFaqAfterLeave"
              >
                <div
                  v-show="isFaqOpen(idx)"
                  :id="`faq-panel-${idx}`"
                  role="region"
                  :aria-labelledby="`faq-trigger-${idx}`"
                >
                  <div class="pt-3">
                    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {{ item.a }}
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <!-- 结尾 CTA：再次引导体验 / 留下联系方式 -->
      <section id="cta" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16">
        <div
          v-motion
          :initial="cardInitial"
          :visibleOnce="cardVisibleOnce(0)"
          class="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-6 py-10 text-white md:px-10"
        >
          <div class="grid gap-8 md:grid-cols-2 md:items-center">
            <!-- 左侧：CTA 文案 -->
            <div>
              <h2 class="text-2xl font-bold tracking-tight md:text-3xl">
                {{ t('sections.cta.title') }}
              </h2>
              <p class="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                {{ t('sections.cta.description', { siteName }) }}
              </p>
            </div>

            <!-- 右侧：CTA 按钮组（立即体验 / 商务合作） -->
            <div class="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                :href="appUrl"
                @click="onMaybeSmoothAnchorClick"
                class="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-md"
                :target="isExternalAppUrl ? '_blank' : undefined"
                :rel="isExternalAppUrl ? 'noopener noreferrer' : undefined"
              >
                {{ t('actions.tryNow') }}
                <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                :href="mailtoLink"
                class="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/15"
              >
                {{ t('actions.business') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚：版权信息与站内锚点 -->
    <footer class="border-t border-slate-200/70 bg-white/75 dark:border-slate-800/70 dark:bg-slate-950/70">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between"
      >
        <!-- 版权信息 -->
        <div>© {{ year }} {{ siteName }}. All rights reserved.</div>
        <!-- 快速链接：站内锚点 -->
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#features" @click="onMaybeSmoothAnchorClick">
            {{ t('sections.footerLinks.features') }}
          </a>
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#workflow" @click="onMaybeSmoothAnchorClick">
            {{ t('sections.footerLinks.workflow') }}
          </a>
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#faq" @click="onMaybeSmoothAnchorClick">
            {{ t('sections.footerLinks.faq') }}
          </a>
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
  Monitor,
  Moon,
  Music,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-vue-next'

const { locale, setLocale, t } = useI18n()

const { mode: themeMode, resolved: resolvedTheme, cycleMode } = useThemeMode()
const themeToggleIcon = computed(() => {
  if (themeMode.value === 'system') return Monitor
  return themeMode.value === 'dark' ? Moon : Sun
})
const themeResolvedLabel = computed(() => (resolvedTheme.value === 'dark' ? t('theme.label.dark') : t('theme.label.light')))
const themeModeLabel = computed(() => {
  if (themeMode.value === 'system') return t('theme.label.system')
  return themeMode.value === 'dark' ? t('theme.label.dark') : t('theme.label.light')
})
const themeToggleTitle = computed(() => {
  if (themeMode.value === 'system') return t('theme.title.system', { resolved: themeResolvedLabel })
  return t('theme.title.fixed', { mode: themeModeLabel })
})
const onToggleThemeMode = () => {
  cycleMode()
}

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

const previewCardEl = ref<HTMLElement | null>(null)
const headerEl = ref<HTMLElement | null>(null)
const prefersReducedMotion = ref(false)
let previewTiltFrame: number | null = null
const previewTiltPointer = { x: 0, y: 0 }
const previewTiltMaxDeg = 10

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

const scrollClamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const getAnchorOffset = () => {
  const headerHeight = headerEl.value?.getBoundingClientRect().height ?? 0
  return Math.round(headerHeight) + 12
}

let anchorScrollFrame: number | null = null
let cleanupAnchorScrollInterruption: (() => void) | null = null

const cancelAnchorScroll = () => {
  if (anchorScrollFrame != null) {
    cancelAnimationFrame(anchorScrollFrame)
    anchorScrollFrame = null
  }
  if (cleanupAnchorScrollInterruption) {
    cleanupAnchorScrollInterruption()
    cleanupAnchorScrollInterruption = null
  }
}

const smoothScrollToY = (targetY: number) => {
  const startY = window.scrollY
  const distance = targetY - startY

  if (prefersReducedMotion.value) {
    window.scrollTo({ top: targetY })
    return
  }

  cancelAnchorScroll()

  const duration = scrollClamp(600 + Math.abs(distance) * 0.2, 650, 1400)
  let startTime: number | null = null

  const onInterrupt = (event: Event) => {
    if (event.type === 'keydown') {
      const { key } = event as KeyboardEvent
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']
      if (!scrollKeys.includes(key)) return
    }
    cancelAnchorScroll()
  }

  window.addEventListener('wheel', onInterrupt, { passive: true })
  window.addEventListener('touchstart', onInterrupt, { passive: true })
  window.addEventListener('keydown', onInterrupt)
  cleanupAnchorScrollInterruption = () => {
    window.removeEventListener('wheel', onInterrupt)
    window.removeEventListener('touchstart', onInterrupt)
    window.removeEventListener('keydown', onInterrupt)
  }

  const step = (time: number) => {
    if (startTime == null) startTime = time
    const progress = scrollClamp((time - startTime) / duration, 0, 1)
    const eased = easeInOutCubic(progress)
    window.scrollTo(0, startY + distance * eased)

    if (progress < 1) {
      anchorScrollFrame = requestAnimationFrame(step)
      return
    }
    cancelAnchorScroll()
  }

  anchorScrollFrame = requestAnimationFrame(step)
}

const scrollToHash = (hash: string) => {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return

  const offset = getAnchorOffset()
  const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)
  smoothScrollToY(targetY)
}

const onMaybeSmoothAnchorClick = (event: MouseEvent) => {
  if (!import.meta.client) return
  if (event.defaultPrevented) return
  if (event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const anchor = event.currentTarget as HTMLAnchorElement | null
  const href = anchor?.getAttribute('href') ?? ''
  if (!href.startsWith('#') || href === '#') return

  if (!document.querySelector(href)) return

  event.preventDefault()
  if (window.location.hash !== href) history.pushState(null, '', href)
  scrollToHash(href)
}

const openFaqIndexes = ref<number[]>([])

const isFaqOpen = (index: number) => openFaqIndexes.value.includes(index)

const toggleFaq = (index: number) => {
  openFaqIndexes.value = isFaqOpen(index)
    ? openFaqIndexes.value.filter((value) => value !== index)
    : [...openFaqIndexes.value, index]
}

const faqTransition = {
  durationMs: 260,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

const onFaqBeforeEnter = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = '0'
  el.style.opacity = '0'
  el.style.overflow = 'hidden'
  el.style.willChange = 'height,opacity'
}

const onFaqEnter = (element: Element, done: () => void) => {
  if (prefersReducedMotion.value) {
    done()
    return
  }

  const el = element as HTMLElement
  el.style.transition = `height ${faqTransition.durationMs}ms ${faqTransition.easing}, opacity ${faqTransition.durationMs}ms ${faqTransition.easing}`
  const targetHeight = el.scrollHeight

  requestAnimationFrame(() => {
    el.style.height = `${targetHeight}px`
    el.style.opacity = '1'
  })

  const onEnd = (event: TransitionEvent) => {
    if (event.target !== el) return
    if (event.propertyName !== 'height') return
    done()
  }
  el.addEventListener('transitionend', onEnd, { once: true })
}

const onFaqAfterEnter = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = 'auto'
  el.style.opacity = ''
  el.style.overflow = ''
  el.style.transition = ''
  el.style.willChange = ''
}

const onFaqBeforeLeave = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.overflow = 'hidden'
  el.style.willChange = 'height,opacity'
}

const onFaqLeave = (element: Element, done: () => void) => {
  if (prefersReducedMotion.value) {
    done()
    return
  }

  const el = element as HTMLElement
  el.style.transition = `height ${faqTransition.durationMs}ms ${faqTransition.easing}, opacity ${faqTransition.durationMs}ms ${faqTransition.easing}`

  requestAnimationFrame(() => {
    el.style.height = '0'
    el.style.opacity = '0'
  })

  const onEnd = (event: TransitionEvent) => {
    if (event.target !== el) return
    if (event.propertyName !== 'height') return
    done()
  }
  el.addEventListener('transitionend', onEnd, { once: true })
}

const onFaqAfterLeave = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = ''
  el.style.opacity = ''
  el.style.overflow = ''
  el.style.transition = ''
  el.style.willChange = ''
}

onBeforeUnmount(() => {
  cancelAnchorScroll()
  if (previewTiltFrame == null) return
  cancelAnimationFrame(previewTiltFrame)
  previewTiltFrame = null
})

const updatePreviewTilt = () => {
  previewTiltFrame = null
  const card = previewCardEl.value
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = previewTiltPointer.x - rect.left
  const y = previewTiltPointer.y - rect.top
  const px = Math.min(1, Math.max(0, x / rect.width))
  const py = Math.min(1, Math.max(0, y / rect.height))

  const nx = (px - 0.5) * 2
  const ny = (py - 0.5) * 2

  card.style.setProperty('--tilt-rx', `${(-ny * previewTiltMaxDeg).toFixed(2)}deg`)
  card.style.setProperty('--tilt-ry', `${(nx * previewTiltMaxDeg).toFixed(2)}deg`)
}

const schedulePreviewTilt = () => {
  if (previewTiltFrame != null) return
  previewTiltFrame = requestAnimationFrame(updatePreviewTilt)
}

const onPreviewCardMouseEnter = (event: MouseEvent) => {
  if (prefersReducedMotion.value) return
  const card = previewCardEl.value
  if (!card) return

  card.classList.add('is-tilting')
  previewTiltPointer.x = event.clientX
  previewTiltPointer.y = event.clientY
  schedulePreviewTilt()
}

const onPreviewCardMouseMove = (event: MouseEvent) => {
  if (prefersReducedMotion.value) return
  previewTiltPointer.x = event.clientX
  previewTiltPointer.y = event.clientY
  schedulePreviewTilt()
}

const onPreviewCardMouseLeave = () => {
  const card = previewCardEl.value
  if (!card) return

  card.classList.remove('is-tilting')
  card.style.setProperty('--tilt-rx', '0deg')
  card.style.setProperty('--tilt-ry', '0deg')

  if (previewTiltFrame == null) return
  cancelAnimationFrame(previewTiltFrame)
  previewTiltFrame = null
}

const config = useRuntimeConfig()

const siteName = computed(() => (config.public.siteName as string) || 'AI Music')
const siteUrl = computed(() => (config.public.siteUrl as string) || 'http://localhost:3000')
const ogImage = computed(() => (config.public.ogImage as string) || '/og-image.svg')
const appUrl = computed(() => (config.public.appUrl as string) || '#cta')
const isExternalAppUrl = computed(() => /^https?:\/\//i.test(appUrl.value))
const contactEmail = computed(() => (config.public.contactEmail as string) || '')

const pageTitle = computed(() => t('meta.title', { siteName }))
const ogTitle = computed(() => t('meta.ogTitle', { siteName }))
const twitterTitle = computed(() => t('meta.twitterTitle', { siteName }))
const schemaName = computed(() => t('meta.schemaName', { siteName }))
const keywords = computed(() => t('meta.keywords'))
const description = computed(() => t('meta.description', { siteName }))

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
    htmlAttrs: { lang: locale.value },
    title: pageTitle.value,
    meta: [
      { name: 'description', content: description.value, key: 'description' },
      { name: 'keywords', content: keywords.value, key: 'keywords' },
      { property: 'og:title', content: ogTitle.value, key: 'og:title' },
      { property: 'og:description', content: description.value, key: 'og:description' },
      { property: 'og:type', content: 'website', key: 'og:type' },
      { property: 'og:url', content: siteUrl.value, key: 'og:url' },
      { property: 'og:image', content: absoluteOgImage.value, key: 'og:image' },
      { name: 'twitter:card', content: 'summary_large_image', key: 'twitter:card' },
      { name: 'twitter:title', content: twitterTitle.value, key: 'twitter:title' },
      { name: 'twitter:description', content: description.value, key: 'twitter:description' },
      { name: 'twitter:image', content: absoluteOgImage.value, key: 'twitter:image' },
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
    name: schemaName.value,
    description: description.value,
  }),
])

const featureData = [
  {
    id: 'textToMusic',
    titleKey: 'features.items.textToMusic.title',
    descriptionKey: 'features.items.textToMusic.description',
    icon: Sparkles,
  },
  {
    id: 'styleControl',
    titleKey: 'features.items.styleControl.title',
    descriptionKey: 'features.items.styleControl.description',
    icon: SlidersHorizontal,
  },
  {
    id: 'multiVersion',
    titleKey: 'features.items.multiVersion.title',
    descriptionKey: 'features.items.multiVersion.description',
    icon: Zap,
  },
  {
    id: 'highQuality',
    titleKey: 'features.items.highQuality.title',
    descriptionKey: 'features.items.highQuality.description',
    icon: AudioLines,
  },
  {
    id: 'stems',
    titleKey: 'features.items.stems.title',
    descriptionKey: 'features.items.stems.description',
    icon: Layers,
  },
  {
    id: 'licensing',
    titleKey: 'features.items.licensing.title',
    descriptionKey: 'features.items.licensing.description',
    icon: ShieldCheck,
  },
] as const

const features = computed(() =>
  featureData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    icon: item.icon,
  })),
)

const workflowData = [
  { id: 'describe', titleKey: 'workflow.steps.describe.title', descriptionKey: 'workflow.steps.describe.description' },
  { id: 'generate', titleKey: 'workflow.steps.generate.title', descriptionKey: 'workflow.steps.generate.description' },
  { id: 'export', titleKey: 'workflow.steps.export.title', descriptionKey: 'workflow.steps.export.description' },
] as const

const workflow = computed(() =>
  workflowData.map((step) => ({
    id: step.id,
    title: t(step.titleKey),
    description: t(step.descriptionKey),
  })),
)

const scenarioData = [
  { id: 'shortVideo', titleKey: 'scenarios.items.shortVideo.title', descriptionKey: 'scenarios.items.shortVideo.description', icon: Play },
  { id: 'game', titleKey: 'scenarios.items.game.title', descriptionKey: 'scenarios.items.game.description', icon: Headphones },
  { id: 'ads', titleKey: 'scenarios.items.ads.title', descriptionKey: 'scenarios.items.ads.description', icon: Music },
  { id: 'podcast', titleKey: 'scenarios.items.podcast.title', descriptionKey: 'scenarios.items.podcast.description', icon: AudioLines },
  { id: 'library', titleKey: 'scenarios.items.library.title', descriptionKey: 'scenarios.items.library.description', icon: Layers },
  { id: 'delivery', titleKey: 'scenarios.items.delivery.title', descriptionKey: 'scenarios.items.delivery.description', icon: Download },
] as const

const scenarios = computed(() =>
  scenarioData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    icon: item.icon,
  })),
)

const faqData = [
  { id: 'commercial', qKey: 'faq.items.commercial.q', aKey: 'faq.items.commercial.a' },
  { id: 'exportFormats', qKey: 'faq.items.exportFormats.q', aKey: 'faq.items.exportFormats.a' },
  { id: 'controlParams', qKey: 'faq.items.controlParams.q', aKey: 'faq.items.controlParams.a' },
  { id: 'chinesePrompt', qKey: 'faq.items.chinesePrompt.q', aKey: 'faq.items.chinesePrompt.a' },
] as const

const faqs = computed(() =>
  faqData.map((item) => ({
    id: item.id,
    q: t(item.qKey),
    a: t(item.aKey),
  })),
)
</script>

<style scoped>
.badge {
  @apply inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300;
}

.tilt-wrapper {
  perspective: 900px;
}

.preview-tilt {
  --tilt-rx: 0deg;
  --tilt-ry: 0deg;
  transform: rotateX(var(--tilt-rx)) rotateY(var(--tilt-ry));
  transform-style: preserve-3d;
  transition:
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 300ms cubic-bezier(0.22, 1, 0.36, 1),
    background 300ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.preview-tilt.is-tilting {
  transition:
    transform 60ms linear,
    box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 300ms cubic-bezier(0.22, 1, 0.36, 1),
    background 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .preview-tilt,
  .preview-tilt.is-tilting {
    transform: none;
    transition: none;
  }
}
</style>
