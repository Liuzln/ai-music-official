<template>
  <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
    <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
        {{ t('sections.about.title') }}
      </h1>
      <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
        {{ t('sections.about.description') }}
      </p>
    </div>

    <div class="mt-10">
      <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0.04)" class="max-w-2xl">
        <h2 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {{ t('about.cases.title') }}
        </h2>
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

    <div class="mt-12">
      <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0.04)" class="max-w-2xl">
        <h2 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {{ t('about.awards.title') }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ t('about.awards.description') }}
        </p>
      </div>

      <div class="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <div v-for="(a, idx) in awards" :key="a.id" class="mb-4 break-inside-avoid">
          <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(idx)" class="glass-card overflow-hidden">
            <div class="relative aspect-[4/3] bg-slate-900/5 dark:bg-white/5">
              <img v-if="a.image" :src="a.image" :alt="a.title" class="h-full w-full object-cover" loading="lazy" />
              <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10">
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

    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(0)" class="glass-card p-6">
        <div class="flex items-start gap-3">
          <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800">
            <Building2 class="h-5 w-5" />
          </span>
          <div class="min-w-0">
            <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {{ t('about.government.title') }}
            </h2>
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
            <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {{ t('about.partners.title') }}
            </h2>
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

    <div id="contact" class="mt-14 scroll-mt-24">
      <div
        v-motion
        :initial="cardInitial"
        :visibleOnce="cardVisibleOnce(2)"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { Building2, Clapperboard, Copy, Handshake, Mail, Megaphone, QrCode, ShoppingBag, Trophy } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { t } = useI18n()
const { siteName, contactEmail, contactWeChat, contactWeChatQr } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.about.title')} - ${siteName.value}`),
  description: computed(() => t('sections.about.description')),
})

const {
  fadeUpInitial,
  fadeUpVisible,
  cardInitial,
  cardVisibleOnce,
  cardHovered,
  staggerDelay,
  microStaggerBase,
  microStaggerStep,
  microPopInitial,
  microPopVisibleOnce,
} = useLandingMotion()

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

onBeforeUnmount(() => {
  if (copyResetTimer != null) {
    window.clearTimeout(copyResetTimer)
    copyResetTimer = null
  }
})

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
