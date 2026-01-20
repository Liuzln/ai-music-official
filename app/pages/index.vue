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
          <a class="hover:text-slate-900 dark:hover:text-slate-100" href="#cta" @click="onMaybeSmoothAnchorClick">
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

      <!-- 第二屏：场景模板（卡片 + 背景切换 + BGM） -->
      <section
        id="features"
        class="templates-stage relative mx-auto max-w-6xl scroll-mt-24 overflow-hidden px-4 py-12 md:py-16"
        :style="templateStageStyle"
      >
        <div class="templates-stage__bg pointer-events-none absolute inset-0 -z-10"></div>

        <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            {{ t('sections.templates.title') }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {{ t('sections.templates.description') }}
          </p>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <!-- 左侧：模板卡片 -->
          <div class="grid gap-4 sm:grid-cols-2">
            <button
              v-for="(item, idx) in templates"
              :key="item.id"
              v-motion
              :initial="cardInitial"
              :visibleOnce="cardVisibleOnce(idx)"
              :hovered="cardHovered"
              type="button"
              class="glass-card group w-full p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
              :class="activeTemplateId === item.id ? 'ring-1 ring-indigo-500/30' : ''"
              :aria-pressed="activeTemplateId === item.id"
              @click="setActiveTemplate(item.id)"
            >
              <div class="flex items-start gap-3">
                <span
                  class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:bg-slate-800"
                >
                  <component :is="item.icon" class="h-5 w-5" />
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {{ item.title }}
                    </h3>
                    <span
                      class="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                    >
                      {{ item.bgmLabel }}
                    </span>
                  </div>
                  <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </button>
          </div>

          <!-- 右侧：当前模板详情 + BGM 开关 -->
          <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(2)" class="glass-card overflow-hidden p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {{ t('sections.templates.current') }}
                </div>
                <div class="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {{ activeTemplate.title }}
                </div>
              </div>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-white dark:border-slate-800/70 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:bg-slate-950"
                :aria-pressed="bgmEnabled"
                @click="toggleBgm"
              >
                <Headphones class="h-4 w-4" />
                {{ bgmToggleText }}
              </button>
            </div>

            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ activeTemplate.longDescription }}
            </p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                v-for="(point, pointIdx) in activeTemplate.points"
                :key="point"
                v-motion
                :initial="microPopInitial"
                :visibleOnce="microPopVisibleOnce(staggerDelay(pointIdx, microStaggerBase, microStaggerStep))"
                class="rounded-2xl bg-white/60 p-4 text-sm text-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
              >
                {{ point }}
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="(tag, tagIdx) in activeTemplate.tags"
                :key="tag"
                v-motion
                :initial="microPopInitial"
                :visibleOnce="microPopVisibleOnce(staggerDelay(tagIdx, microStaggerBase, microStaggerStepTight))"
                class="badge"
              >
                {{ tag }}
              </span>
            </div>

            <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
              {{ t('sections.templates.bgmHint') }}
            </p>
          </div>
        </div>
      </section>

      <!-- 第三屏：小语种特化模型 -->
      <section id="workflow" class="scroll-mt-24 border-y border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-950/40">
        <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
              {{ t('sections.models.title') }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
              {{ t('sections.models.description') }}
            </p>
          </div>

          <div class="mt-8 grid gap-6 lg:grid-cols-2">
            <!-- 左侧：小语种模板卡片 -->
            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="(m, idx) in localeModels"
                :key="m.id"
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
                    <component :is="m.icon" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </span>
                  <div class="min-w-0">
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {{ m.title }}
                    </h3>
                    <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {{ m.description }}
                    </p>
                  </div>
                </div>

                <ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li
                    v-for="(bullet, bulletIdx) in m.bullets"
                    :key="bullet"
                    v-motion
                    :initial="microInitial"
                    :visibleOnce="microVisibleOnce(staggerDelay(bulletIdx, microStaggerBase, microStaggerStep))"
                    class="flex gap-2"
                  >
                    <span class="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500/70"></span>
                    <span>{{ bullet }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 右侧：优势说明 -->
            <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(2)" class="glass-card p-6">
              <div class="flex items-start gap-3">
                <span
                  class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800"
                >
                  <Globe class="h-5 w-5" />
                </span>
                <div class="min-w-0">
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {{ t('sections.models.advantagesTitle') }}
                  </h3>
                  <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {{ t('sections.models.advantagesSubtitle') }}
                  </p>
                </div>
              </div>

              <div class="mt-5 space-y-3">
                <div
                  v-for="(adv, advIdx) in modelAdvantages"
                  :key="adv.id"
                  v-motion
                  :initial="microInitial"
                  :visibleOnce="microVisibleOnce(staggerDelay(advIdx, microStaggerBase, microStaggerStep))"
                  class="flex gap-3 rounded-2xl bg-white/60 p-4 dark:bg-slate-900/50"
                >
                  <span class="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800">
                    <component :is="adv.icon" class="h-5 w-5" />
                  </span>
                  <div class="min-w-0">
                    <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ adv.title }}</div>
                    <div class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ adv.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第四屏：关于我们 -->
      <section id="scenarios" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16">
        <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            {{ t('sections.about.title') }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {{ t('sections.about.description') }}
          </p>
        </div>

        <!-- 商业化案例 -->
        <div class="mt-10">
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0.04)" class="max-w-2xl">
            <h3 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {{ t('about.cases.title') }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t('about.cases.description') }}
            </p>
          </div>

          <div class="mt-6 grid gap-4 md:grid-cols-3">
            <div
              v-for="(c, idx) in commercialCases"
              :key="c.id"
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
                  <component :is="c.icon" class="h-5 w-5" />
                </span>
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {{ c.title }}
                  </div>
                  <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {{ c.description }}
                  </p>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div
                  v-for="(m, mIdx) in c.metrics"
                  :key="`${c.id}-metric-${mIdx}`"
                  v-motion
                  :initial="microPopInitial"
                  :visibleOnce="microPopVisibleOnce(staggerDelay(mIdx, microStaggerBase, microStaggerStep))"
                  class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50"
                >
                  <div class="text-slate-500 dark:text-slate-400">{{ m.label }}</div>
                  <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">{{ m.value }}</div>
                </div>
              </div>

              <p class="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {{ c.note }}
              </p>
            </div>
          </div>
        </div>

        <!-- 比赛与获奖：珊格/栅格展示（后续可替换为图片） -->
        <div class="mt-12">
          <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0.04)" class="max-w-2xl">
            <h3 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {{ t('about.awards.title') }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t('about.awards.description') }}
            </p>
          </div>

          <div class="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
            <div v-for="(a, idx) in awards" :key="a.id" class="mb-4 break-inside-avoid">
              <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(idx)" class="glass-card overflow-hidden">
                <div class="relative aspect-[4/3] bg-slate-900/5 dark:bg-white/5">
                  <img v-if="a.image" :src="a.image" :alt="a.title" class="h-full w-full object-cover" loading="lazy" />
                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10"
                  >
                    <div
                      class="flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/60 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800/60 dark:bg-slate-950/50 dark:text-slate-200"
                    >
                      <Trophy class="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      {{ t('about.awards.placeholder') }}
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ a.title }}</div>
                  <div class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ a.subtitle }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 政府评比企业 / 合作伙伴 -->
        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(0)" class="glass-card p-6">
            <div class="flex items-start gap-3">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800">
                <Building2 class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {{ t('about.government.title') }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {{ t('about.government.description') }}
                </p>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="(badge, badgeIdx) in governmentBadges"
                :key="badge"
                v-motion
                :initial="microPopInitial"
                :visibleOnce="microPopVisibleOnce(staggerDelay(badgeIdx, microStaggerBase, microStaggerStep))"
                class="badge"
              >
                {{ badge }}
              </span>
            </div>
          </div>

          <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(1)" class="glass-card p-6">
            <div class="flex items-start gap-3">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800">
                <Handshake class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {{ t('about.partners.title') }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {{ t('about.partners.description') }}
                </p>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div
                v-for="(p, partnerIdx) in partners"
                :key="p.name"
                v-motion
                :initial="microPopInitial"
                :visibleOnce="microPopVisibleOnce(staggerDelay(partnerIdx, microStaggerBase, microStaggerStep))"
                class="flex items-center justify-center rounded-2xl bg-white/60 p-4 text-xs font-semibold text-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
              >
                {{ p.name }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部：联系我们（微信 / 邮箱） -->
      <section id="cta" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16">
        <div
          v-motion
          :initial="cardInitial"
          :visibleOnce="cardVisibleOnce(0)"
          class="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-6 py-10 text-white md:px-10"
        >
          <div class="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 class="text-2xl font-bold tracking-tight md:text-3xl">
                {{ t('sections.contact.title') }}
              </h2>
              <p class="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                {{ t('sections.contact.description', { siteName }) }}
              </p>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  class="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="!contactWeChat"
                  @click="copyContact('wechat')"
                >
                  <Copy class="h-4 w-4" />
                  {{ copyWeChatText }}
                </button>
                <a
                  :href="mailtoLink"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/15"
                  :class="!contactEmail ? 'pointer-events-none opacity-60' : ''"
                  :aria-disabled="!contactEmail"
                >
                  <Mail class="h-4 w-4" />
                  {{ t('contact.actions.email') }}
                </a>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <div class="flex items-center gap-2 text-sm font-semibold">
                  <QrCode class="h-4 w-4" />
                  {{ t('contact.wechat.label') }}
                </div>
                <div class="mt-2 text-sm text-white/90">
                  {{ contactWeChat || t('contact.wechat.placeholder') }}
                </div>

                <div class="mt-4 overflow-hidden rounded-xl border border-white/20 bg-white/5">
                  <img
                    v-if="contactWeChatQr"
                    :src="contactWeChatQr"
                    :alt="t('contact.wechat.qrAlt')"
                    class="h-32 w-full object-cover"
                    loading="lazy"
                  />
                  <div v-else class="flex h-32 items-center justify-center text-xs text-white/70">
                    {{ t('contact.wechat.qrPlaceholder') }}
                  </div>
                </div>
              </div>

              <div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <div class="flex items-center gap-2 text-sm font-semibold">
                  <Mail class="h-4 w-4" />
                  {{ t('contact.email.label') }}
                </div>
                <div class="mt-2 text-sm text-white/90">
                  {{ contactEmail || t('contact.email.placeholder') }}
                </div>

                <button
                  type="button"
                  class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="!contactEmail"
                  @click="copyContact('email')"
                >
                  <Copy class="h-4 w-4" />
                  {{ copyEmailText }}
                </button>
              </div>
            </div>
          </div>

          <p class="mt-6 text-xs leading-relaxed text-white/75">
            {{ t('sections.contact.note') }}
          </p>
        </div>
      </section>
    </main>

    <!-- 页脚：版权信息与站内锚点 -->
    <footer class="border-t border-slate-200/70 bg-white/75 dark:border-slate-800/70 dark:bg-slate-950/70">
      <div class="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-slate-500 dark:text-slate-400 md:grid-cols-2 md:items-start">
        <div class="space-y-2">
          <div>© {{ year }} {{ siteName }}. All rights reserved.</div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <div class="inline-flex items-center gap-2">
              <QrCode class="h-4 w-4" />
              <span class="font-medium text-slate-600 dark:text-slate-300">{{ t('contact.wechat.label') }}:</span>
              <span>{{ contactWeChat || t('contact.wechat.placeholder') }}</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <Mail class="h-4 w-4" />
              <span class="font-medium text-slate-600 dark:text-slate-300">{{ t('contact.email.label') }}:</span>
              <span>{{ contactEmail || t('contact.email.placeholder') }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#features" @click="onMaybeSmoothAnchorClick">
            {{ t('sections.footerLinks.features') }}
          </a>
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#workflow" @click="onMaybeSmoothAnchorClick">
            {{ t('sections.footerLinks.workflow') }}
          </a>
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#scenarios" @click="onMaybeSmoothAnchorClick">
            {{ t('sections.footerLinks.scenarios') }}
          </a>
          <a class="hover:text-slate-700 dark:hover:text-slate-200" href="#cta" @click="onMaybeSmoothAnchorClick">
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
  Building2,
  Clapperboard,
  Copy,
  Handshake,
  Globe,
  Headphones,
  Languages,
  Layers,
  Mail,
  Megaphone,
  Monitor,
  Moon,
  Music,
  Play,
  QrCode,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Trophy,
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

const headerInitial = { opacity: 0, y: -18, filter: 'blur(12px)' }
const headerEnter = { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: easeOut } }

const fadeUpInitial = { opacity: 0, y: 34, scale: 0.98, filter: 'blur(18px)' }
const fadeUpEnter = (delay = 0) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
  transition: { duration: 0.95, delay, ease: easeOut },
})
const fadeUpVisible = (delay = 0) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
  transition: { duration: 0.95, delay, ease: easeOut },
})

const liftSpring = { type: 'spring', stiffness: 230, damping: 20, mass: 0.9 } as const

const cardInitial = { opacity: 0, y: 36, scale: 0.96, filter: 'blur(18px)' }
const cardEnter = (delay = 0) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
  transition: {
    opacity: { duration: 0.9, delay, ease: easeOut },
    filter: { duration: 0.9, delay, ease: easeOut },
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
      opacity: { duration: 0.9, delay, ease: easeOut },
      filter: { duration: 0.9, delay, ease: easeOut },
      y: { ...liftSpring, delay },
      scale: { ...liftSpring, delay },
    },
  }
}
const cardHovered = { y: -6, scale: 1.01, transition: { ...liftSpring } }

const staggerDelay = (index: number, base = 0, step = 0.06) => base + index * step

const microStaggerBase = 0.42
const microStaggerStep = 0.06
const microStaggerStepTight = 0.045

const microInitial = { opacity: 0, y: 22, filter: 'blur(12px)' }
const microVisibleOnce = (delay = 0) => ({
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  transition: {
    opacity: { duration: 0.75, delay, ease: easeOut },
    filter: { duration: 0.75, delay, ease: easeOut },
    y: { ...liftSpring, delay },
  },
})

const microPopInitial = { opacity: 0, y: 24, scale: 0.92, filter: 'blur(12px)' }
const microPopVisibleOnce = (delay = 0) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
  transition: {
    opacity: { duration: 0.75, delay, ease: easeOut },
    filter: { duration: 0.75, delay, ease: easeOut },
    y: { ...liftSpring, delay },
    scale: { ...liftSpring, delay },
  },
})

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

onBeforeUnmount(() => {
  cancelAnchorScroll()
  stopBgmScheduler()
  if (bgmAudioContext) void bgmAudioContext.close().catch(() => {})
  bgmAudioContext = null
  bgmMaster = null
  bgmFilter = null

  if (copyResetTimer != null) {
    window.clearTimeout(copyResetTimer)
    copyResetTimer = null
  }

  if (previewTiltFrame != null) {
    cancelAnimationFrame(previewTiltFrame)
    previewTiltFrame = null
  }
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
const contactWeChat = computed(() => (config.public.contactWeChat as string) || '')
const contactWeChatQr = computed(() => (config.public.contactWeChatQr as string) || '')

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

type CopyTarget = 'wechat' | 'email'

const copiedTarget = ref<CopyTarget | null>(null)
let copyResetTimer: number | null = null

const copyWeChatText = computed(() =>
  copiedTarget.value === 'wechat' ? t('contact.actions.copied') : t('contact.actions.copyWeChat'),
)
const copyEmailText = computed(() =>
  copiedTarget.value === 'email' ? t('contact.actions.copied') : t('contact.actions.copyEmail'),
)

const writeClipboard = async (text: string) => {
  if (!import.meta.client) return false

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / non-secure contexts
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', 'true')
      textarea.style.position = 'fixed'
      textarea.style.top = '0'
      textarea.style.left = '0'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      return ok
    } catch {
      return false
    }
  }
}

const copyContact = async (target: CopyTarget) => {
  const text = target === 'wechat' ? contactWeChat.value : contactEmail.value
  if (!text) return

  const ok = await writeClipboard(text)
  if (!ok) return

  copiedTarget.value = target
  if (copyResetTimer != null) window.clearTimeout(copyResetTimer)
  copyResetTimer = window.setTimeout(() => {
    copiedTarget.value = null
    copyResetTimer = null
  }, 1500)
}

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

const templateData = [
  {
    id: 'general',
    titleKey: 'templates.items.general.title',
    descriptionKey: 'templates.items.general.description',
    longDescriptionKey: 'templates.items.general.longDescription',
    pointKeys: [
      'templates.items.general.points.0',
      'templates.items.general.points.1',
      'templates.items.general.points.2',
      'templates.items.general.points.3',
    ],
    tagKeys: [
      'templates.items.general.tags.0',
      'templates.items.general.tags.1',
      'templates.items.general.tags.2',
    ],
    bgmLabelKey: 'templates.bgm.labels.lofi',
    bgmPreset: 'lofi',
    icon: Layers,
    theme: {
      glow1: 'rgba(99, 102, 241, 0.24)',
      glow2: 'rgba(168, 85, 247, 0.18)',
      glow3: 'rgba(56, 189, 248, 0.12)',
    },
  },
  {
    id: 'shortDrama',
    titleKey: 'templates.items.shortDrama.title',
    descriptionKey: 'templates.items.shortDrama.description',
    longDescriptionKey: 'templates.items.shortDrama.longDescription',
    pointKeys: [
      'templates.items.shortDrama.points.0',
      'templates.items.shortDrama.points.1',
      'templates.items.shortDrama.points.2',
      'templates.items.shortDrama.points.3',
    ],
    tagKeys: [
      'templates.items.shortDrama.tags.0',
      'templates.items.shortDrama.tags.1',
      'templates.items.shortDrama.tags.2',
    ],
    bgmLabelKey: 'templates.bgm.labels.cinematic',
    bgmPreset: 'cinematic',
    icon: Play,
    theme: {
      glow1: 'rgba(244, 63, 94, 0.18)',
      glow2: 'rgba(99, 102, 241, 0.18)',
      glow3: 'rgba(251, 146, 60, 0.14)',
    },
  },
  {
    id: 'comic',
    titleKey: 'templates.items.comic.title',
    descriptionKey: 'templates.items.comic.description',
    longDescriptionKey: 'templates.items.comic.longDescription',
    pointKeys: [
      'templates.items.comic.points.0',
      'templates.items.comic.points.1',
      'templates.items.comic.points.2',
      'templates.items.comic.points.3',
    ],
    tagKeys: [
      'templates.items.comic.tags.0',
      'templates.items.comic.tags.1',
      'templates.items.comic.tags.2',
    ],
    bgmLabelKey: 'templates.bgm.labels.anime',
    bgmPreset: 'anime',
    icon: Sparkles,
    theme: {
      glow1: 'rgba(34, 197, 94, 0.16)',
      glow2: 'rgba(59, 130, 246, 0.18)',
      glow3: 'rgba(236, 72, 153, 0.14)',
    },
  },
  {
    id: 'ads',
    titleKey: 'templates.items.ads.title',
    descriptionKey: 'templates.items.ads.description',
    longDescriptionKey: 'templates.items.ads.longDescription',
    pointKeys: [
      'templates.items.ads.points.0',
      'templates.items.ads.points.1',
      'templates.items.ads.points.2',
      'templates.items.ads.points.3',
    ],
    tagKeys: [
      'templates.items.ads.tags.0',
      'templates.items.ads.tags.1',
      'templates.items.ads.tags.2',
    ],
    bgmLabelKey: 'templates.bgm.labels.punchy',
    bgmPreset: 'ads',
    icon: Zap,
    theme: {
      glow1: 'rgba(245, 158, 11, 0.20)',
      glow2: 'rgba(168, 85, 247, 0.16)',
      glow3: 'rgba(99, 102, 241, 0.14)',
    },
  },
  {
    id: 'dub',
    titleKey: 'templates.items.dub.title',
    descriptionKey: 'templates.items.dub.description',
    longDescriptionKey: 'templates.items.dub.longDescription',
    pointKeys: [
      'templates.items.dub.points.0',
      'templates.items.dub.points.1',
      'templates.items.dub.points.2',
      'templates.items.dub.points.3',
    ],
    tagKeys: [
      'templates.items.dub.tags.0',
      'templates.items.dub.tags.1',
      'templates.items.dub.tags.2',
    ],
    bgmLabelKey: 'templates.bgm.labels.clean',
    bgmPreset: 'dub',
    icon: AudioLines,
    theme: {
      glow1: 'rgba(14, 165, 233, 0.18)',
      glow2: 'rgba(99, 102, 241, 0.16)',
      glow3: 'rgba(148, 163, 184, 0.12)',
    },
  },
] as const

type TemplateId = (typeof templateData)[number]['id']

type TemplateTheme = {
  glow1: string
  glow2: string
  glow3: string
}

type TemplateViewModel = {
  id: TemplateId
  title: string
  description: string
  longDescription: string
  points: string[]
  tags: string[]
  bgmLabel: string
  bgmPreset: keyof typeof bgmPresets
  icon: Component
  theme: TemplateTheme
}

const templates = computed<TemplateViewModel[]>(() =>
  templateData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    longDescription: t(item.longDescriptionKey),
    points: item.pointKeys.map((key) => t(key)),
    tags: item.tagKeys.map((key) => t(key)),
    bgmLabel: t(item.bgmLabelKey),
    bgmPreset: item.bgmPreset,
    icon: item.icon,
    theme: item.theme,
  })),
)

const activeTemplateId = ref<TemplateId>(templateData[0].id)
const activeTemplate = computed(() => templates.value.find((item) => item.id === activeTemplateId.value) ?? templates.value[0])

const setActiveTemplate = (id: TemplateId) => {
  activeTemplateId.value = id
}

const templateStageStyle = computed(() => {
  const theme = activeTemplate.value?.theme
  return {
    '--tpl-glow-1': theme?.glow1 ?? 'rgba(99, 102, 241, 0.18)',
    '--tpl-glow-2': theme?.glow2 ?? 'rgba(168, 85, 247, 0.14)',
    '--tpl-glow-3': theme?.glow3 ?? 'rgba(56, 189, 248, 0.12)',
  } as Record<string, string>
})

type BgmPreset = {
  tempo: number
  rootHz: number
  wave: OscillatorType
  filterHz: number
  masterGain: number
  noteGain: number
  bassGain: number
  scaleSemitones: number[]
  sequence: number[]
} & { labelKey: string }

const bgmPresets = {
  lofi: {
    labelKey: 'templates.bgm.labels.lofi',
    tempo: 86,
    rootHz: 220,
    wave: 'triangle',
    filterHz: 1500,
    masterGain: 0.22,
    noteGain: 0.08,
    bassGain: 0.05,
    scaleSemitones: [0, 3, 5, 7, 10],
    sequence: [0, 2, 3, 2, 0, 2, 4, 2],
  },
  cinematic: {
    labelKey: 'templates.bgm.labels.cinematic',
    tempo: 98,
    rootHz: 196,
    wave: 'sine',
    filterHz: 1200,
    masterGain: 0.24,
    noteGain: 0.09,
    bassGain: 0.06,
    scaleSemitones: [0, 2, 3, 5, 7, 10],
    sequence: [0, 3, 5, 3, 0, 2, 4, 2],
  },
  anime: {
    labelKey: 'templates.bgm.labels.anime',
    tempo: 122,
    rootHz: 262,
    wave: 'sawtooth',
    filterHz: 2000,
    masterGain: 0.18,
    noteGain: 0.06,
    bassGain: 0.04,
    scaleSemitones: [0, 2, 4, 7, 9],
    sequence: [0, 2, 1, 3, 2, 4, 3, 1],
  },
  ads: {
    labelKey: 'templates.bgm.labels.punchy',
    tempo: 128,
    rootHz: 330,
    wave: 'square',
    filterHz: 2600,
    masterGain: 0.13,
    noteGain: 0.05,
    bassGain: 0.035,
    scaleSemitones: [0, 4, 7, 11],
    sequence: [0, 2, 1, 3, 0, 2, 1, 3],
  },
  dub: {
    labelKey: 'templates.bgm.labels.clean',
    tempo: 104,
    rootHz: 247,
    wave: 'triangle',
    filterHz: 1700,
    masterGain: 0.16,
    noteGain: 0.06,
    bassGain: 0.04,
    scaleSemitones: [0, 2, 3, 5, 7, 9, 10],
    sequence: [0, 2, 4, 2, 0, 3, 5, 3],
  },
} as const satisfies Record<string, BgmPreset>

const bgmEnabled = ref(false)
const bgmToggleText = computed(() => (bgmEnabled.value ? t('templates.bgm.toggleOff') : t('templates.bgm.toggleOn')))

let bgmAudioContext: AudioContext | null = null
let bgmMaster: GainNode | null = null
let bgmFilter: BiquadFilterNode | null = null
let bgmScheduler: number | null = null
let bgmNextTime = 0
let bgmStep = 0

const getAudioContextCtor = () => {
  if (!import.meta.client) return null
  return window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext || null
}

const ensureBgmAudio = async () => {
  if (!import.meta.client) return false
  const AudioCtor = getAudioContextCtor()
  if (!AudioCtor) return false

  if (bgmAudioContext && bgmMaster && bgmFilter) return true

  bgmAudioContext = new AudioCtor()
  bgmMaster = bgmAudioContext.createGain()
  bgmFilter = bgmAudioContext.createBiquadFilter()

  bgmFilter.type = 'lowpass'
  bgmFilter.frequency.value = 1600
  bgmMaster.gain.value = 0

  bgmFilter.connect(bgmMaster)
  bgmMaster.connect(bgmAudioContext.destination)

  return true
}

const semitoneToHz = (rootHz: number, semitone: number) => rootHz * Math.pow(2, semitone / 12)

const scheduleBgmNote = (preset: BgmPreset, time: number, hz: number, seconds: number, gainValue: number) => {
  if (!bgmAudioContext || !bgmFilter) return

  const osc = bgmAudioContext.createOscillator()
  osc.type = preset.wave
  osc.frequency.setValueAtTime(hz, time)

  const gain = bgmAudioContext.createGain()
  gain.gain.setValueAtTime(0.0001, time)
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, gainValue), time + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + seconds)

  osc.connect(gain)
  gain.connect(bgmFilter)

  osc.start(time)
  osc.stop(time + seconds + 0.05)
}

const scheduleBgm = () => {
  if (!bgmAudioContext) return

  const preset = bgmPresets[activeTemplate.value.bgmPreset]
  const stepSeconds = (60 / preset.tempo) / 2
  const lookAhead = 0.35

  while (bgmNextTime < bgmAudioContext.currentTime + lookAhead) {
    const stepIndex = preset.sequence[bgmStep % preset.sequence.length] ?? 0
    const semitone = preset.scaleSemitones[stepIndex % preset.scaleSemitones.length] ?? 0
    const noteHz = semitoneToHz(preset.rootHz, semitone)

    scheduleBgmNote(preset, bgmNextTime, noteHz, stepSeconds * 0.92, preset.noteGain)

    if (bgmStep % 4 === 0) {
      scheduleBgmNote(preset, bgmNextTime, noteHz / 2, stepSeconds * 1.8, preset.bassGain)
    }

    bgmNextTime += stepSeconds
    bgmStep += 1
  }
}

const startBgmScheduler = () => {
  if (bgmScheduler != null) return
  bgmScheduler = window.setInterval(scheduleBgm, 40)
}

const stopBgmScheduler = () => {
  if (bgmScheduler == null) return
  window.clearInterval(bgmScheduler)
  bgmScheduler = null
}

const applyBgmPreset = (preset: BgmPreset) => {
  if (!bgmAudioContext || !bgmMaster || !bgmFilter) return
  bgmFilter.frequency.setTargetAtTime(preset.filterHz, bgmAudioContext.currentTime, 0.06)
  bgmMaster.gain.setTargetAtTime(preset.masterGain, bgmAudioContext.currentTime, 0.06)
}

const startBgm = async () => {
  const ok = await ensureBgmAudio()
  if (!ok || !bgmAudioContext) return

  try {
    await bgmAudioContext.resume()
  } catch {
    return
  }

  bgmNextTime = bgmAudioContext.currentTime + 0.05
  bgmStep = 0
  applyBgmPreset(bgmPresets[activeTemplate.value.bgmPreset])
  startBgmScheduler()
}

const stopBgm = async () => {
  stopBgmScheduler()
  if (!bgmAudioContext || !bgmMaster) return

  bgmMaster.gain.setTargetAtTime(0, bgmAudioContext.currentTime, 0.05)
  try {
    await bgmAudioContext.suspend()
  } catch {
    // ignore
  }
}

const toggleBgm = async () => {
  bgmEnabled.value = !bgmEnabled.value
  if (!bgmEnabled.value) {
    await stopBgm()
    return
  }
  await startBgm()
}

watch(activeTemplateId, async () => {
  if (!bgmEnabled.value) return
  await startBgm()
})

const localeModelData = [
  {
    id: 'thai',
    titleKey: 'models.items.thai.title',
    descriptionKey: 'models.items.thai.description',
    bulletKeys: [
      'models.items.thai.bullets.0',
      'models.items.thai.bullets.1',
      'models.items.thai.bullets.2',
    ],
    icon: Languages,
  },
  {
    id: 'khmer',
    titleKey: 'models.items.khmer.title',
    descriptionKey: 'models.items.khmer.description',
    bulletKeys: [
      'models.items.khmer.bullets.0',
      'models.items.khmer.bullets.1',
      'models.items.khmer.bullets.2',
    ],
    icon: AudioLines,
  },
] as const

const localeModels = computed(() =>
  localeModelData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    bullets: item.bulletKeys.map((key) => t(key)),
    icon: item.icon,
  })),
)

const modelAdvantageData = [
  {
    id: 'corpus',
    titleKey: 'models.advantages.corpus.title',
    descriptionKey: 'models.advantages.corpus.description',
    icon: Languages,
  },
  {
    id: 'control',
    titleKey: 'models.advantages.control.title',
    descriptionKey: 'models.advantages.control.description',
    icon: SlidersHorizontal,
  },
  {
    id: 'voiceover',
    titleKey: 'models.advantages.voiceover.title',
    descriptionKey: 'models.advantages.voiceover.description',
    icon: AudioLines,
  },
  {
    id: 'delivery',
    titleKey: 'models.advantages.delivery.title',
    descriptionKey: 'models.advantages.delivery.description',
    icon: Layers,
  },
] as const

const modelAdvantages = computed(() =>
  modelAdvantageData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    icon: item.icon,
  })),
)

const commercialCaseData = [
  {
    id: 'shortDrama',
    titleKey: 'about.cases.items.shortDrama.title',
    descriptionKey: 'about.cases.items.shortDrama.description',
    noteKey: 'about.cases.items.shortDrama.note',
    metrics: [
      { labelKey: 'about.cases.items.shortDrama.metrics.0.label', valueKey: 'about.cases.items.shortDrama.metrics.0.value' },
      { labelKey: 'about.cases.items.shortDrama.metrics.1.label', valueKey: 'about.cases.items.shortDrama.metrics.1.value' },
    ],
    icon: Clapperboard,
  },
  {
    id: 'ads',
    titleKey: 'about.cases.items.ads.title',
    descriptionKey: 'about.cases.items.ads.description',
    noteKey: 'about.cases.items.ads.note',
    metrics: [
      { labelKey: 'about.cases.items.ads.metrics.0.label', valueKey: 'about.cases.items.ads.metrics.0.value' },
      { labelKey: 'about.cases.items.ads.metrics.1.label', valueKey: 'about.cases.items.ads.metrics.1.value' },
    ],
    icon: Megaphone,
  },
  {
    id: 'ecommerce',
    titleKey: 'about.cases.items.ecommerce.title',
    descriptionKey: 'about.cases.items.ecommerce.description',
    noteKey: 'about.cases.items.ecommerce.note',
    metrics: [
      { labelKey: 'about.cases.items.ecommerce.metrics.0.label', valueKey: 'about.cases.items.ecommerce.metrics.0.value' },
      { labelKey: 'about.cases.items.ecommerce.metrics.1.label', valueKey: 'about.cases.items.ecommerce.metrics.1.value' },
    ],
    icon: ShoppingBag,
  },
] as const

const commercialCases = computed(() =>
  commercialCaseData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    note: t(item.noteKey),
    metrics: item.metrics.map((metric) => ({
      label: t(metric.labelKey),
      value: t(metric.valueKey),
    })),
    icon: item.icon,
  })),
)

const awardData = [
  { id: 'award-1', titleKey: 'about.awards.items.0.title', subtitleKey: 'about.awards.items.0.subtitle', image: '' },
  { id: 'award-2', titleKey: 'about.awards.items.1.title', subtitleKey: 'about.awards.items.1.subtitle', image: '' },
  { id: 'award-3', titleKey: 'about.awards.items.2.title', subtitleKey: 'about.awards.items.2.subtitle', image: '' },
  { id: 'award-4', titleKey: 'about.awards.items.3.title', subtitleKey: 'about.awards.items.3.subtitle', image: '' },
  { id: 'award-5', titleKey: 'about.awards.items.4.title', subtitleKey: 'about.awards.items.4.subtitle', image: '' },
  { id: 'award-6', titleKey: 'about.awards.items.5.title', subtitleKey: 'about.awards.items.5.subtitle', image: '' },
] as const

const awards = computed(() =>
  awardData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    subtitle: t(item.subtitleKey),
    image: item.image,
  })),
)

const governmentBadgeKeys = [
  'about.government.badges.0',
  'about.government.badges.1',
  'about.government.badges.2',
  'about.government.badges.3',
] as const

const governmentBadges = computed(() => governmentBadgeKeys.map((key) => t(key)))

const partnerKeys = [
  'about.partners.items.0',
  'about.partners.items.1',
  'about.partners.items.2',
  'about.partners.items.3',
  'about.partners.items.4',
  'about.partners.items.5',
] as const

const partners = computed(() => partnerKeys.map((key) => ({ name: t(key) })))

</script>

<style scoped>
.templates-stage__bg {
  background:
    radial-gradient(900px circle at 18% 8%, var(--tpl-glow-1), transparent 60%),
    radial-gradient(800px circle at 82% 12%, var(--tpl-glow-2), transparent 58%),
    radial-gradient(700px circle at 55% 100%, var(--tpl-glow-3), transparent 55%);
  transition: background 650ms cubic-bezier(0.22, 1, 0.36, 1);
}

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
