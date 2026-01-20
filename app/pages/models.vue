<template>
  <section class="border-y border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-950/40">
    <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
          {{ t('sections.models.title') }}
        </h1>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          {{ t('sections.models.description') }}
        </p>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
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
                <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {{ m.title }}
                </h2>
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

        <div v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(2)" class="glass-card p-6">
          <div class="flex items-start gap-3">
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800">
              <Globe class="h-5 w-5" />
            </span>
            <div class="min-w-0">
              <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {{ t('sections.models.advantagesTitle') }}
              </h2>
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
</template>

<script setup lang="ts">
import { AudioLines, Globe, Languages, Layers, SlidersHorizontal } from 'lucide-vue-next'

const { t } = useI18n()
const { siteName } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.models.title')} - ${siteName.value}`),
  description: computed(() => t('sections.models.description')),
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
  microInitial,
  microVisibleOnce,
} = useLandingMotion()

const localeModelData = [
  {
    id: 'thai',
    titleKey: 'models.items.thai.title',
    descriptionKey: 'models.items.thai.description',
    bulletKeys: ['models.items.thai.bullets.0', 'models.items.thai.bullets.1', 'models.items.thai.bullets.2'],
    icon: Languages,
  },
  {
    id: 'khmer',
    titleKey: 'models.items.khmer.title',
    descriptionKey: 'models.items.khmer.description',
    bulletKeys: ['models.items.khmer.bullets.0', 'models.items.khmer.bullets.1', 'models.items.khmer.bullets.2'],
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
</script>
