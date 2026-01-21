<template>
  <header
    v-motion
    :initial="headerInitial"
    :enter="headerEnter"
    class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-sm transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
        >
          <Music class="h-5 w-5" />
        </span>
        <span class="font-semibold tracking-tight">{{ siteName }}</span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
        <NuxtLink class="hover:text-slate-900 dark:hover:text-slate-100" to="/templates">{{ t('nav.features') }}</NuxtLink>
        <NuxtLink class="hover:text-slate-900 dark:hover:text-slate-100" to="/models">{{ t('nav.workflow') }}</NuxtLink>
        <NuxtLink class="hover:text-slate-900 dark:hover:text-slate-100" to="/about">{{ t('nav.scenarios') }}</NuxtLink>
        <NuxtLink class="hover:text-slate-900 dark:hover:text-slate-100" to="/contact">{{ t('nav.faq') }}</NuxtLink>
      </nav>

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
          v-if="isExternalAppUrl"
          :href="appUrl"
          class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('actions.tryNow') }}
          <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        <a
          v-else-if="isHashAppUrl"
          :href="appUrl"
          class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
        >
          {{ t('actions.tryNow') }}
          <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        <NuxtLink
          v-else
          :to="appUrl"
          class="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
        >
          {{ t('actions.tryNow') }}
          <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowRight, Monitor, Moon, Sun, Music } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { locale, setLocale, t } = useI18n()
const { siteName, appUrl, isExternalAppUrl, isHashAppUrl } = useOfficialSiteConfig()

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
</script>
