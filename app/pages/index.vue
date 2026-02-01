<template>
  <section class="mx-auto max-w-6xl px-4 pb-12 pt-14 md:pb-16 md:pt-20">
    <div class="grid items-center gap-10 md:grid-cols-2">
      <div>
        <div
          v-motion
          :initial="fadeUpInitial"
          :enter="fadeUpEnter(0)"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
        >
          <Sparkles class="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          {{ t('hero.tag') }}
        </div>

        <h1
          v-motion
          :initial="fadeUpInitial"
          :enter="fadeUpEnter(0.08)"
          class="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl"
        >
          {{ t('hero.title') }}
        </h1>

        <p
          v-motion
          :initial="fadeUpInitial"
          :enter="fadeUpEnter(0.16)"
          class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg"
        >
          {{ t('hero.subtitle', { siteName }) }}
        </p>

        <div v-motion :initial="fadeUpInitial" :enter="fadeUpEnter(0.24)" class="mt-6 flex flex-col gap-3 sm:flex-row">
          <NuxtLink
            to="/templates"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900/80"
          >
            {{ t('actions.viewFeatures') }}
          </NuxtLink>
        </div>

        <div v-motion :initial="fadeUpInitial" :enter="fadeUpEnter(0.32)" class="mt-6 flex flex-wrap gap-2">
          <span class="badge">{{ t('hero.badges.textToMusic') }}</span>
          <span class="badge">{{ t('hero.badges.styleControl') }}</span>
          <span class="badge">{{ t('hero.badges.stemsExport') }}</span>
          <span class="badge">{{ t('hero.badges.multiVersion') }}</span>
        </div>

        <p v-motion :initial="fadeUpInitial" :enter="fadeUpEnter(0.4)" class="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {{ t('hero.disclaimer') }}
        </p>
      </div>

      <div class="relative">
        <div v-motion :initial="cardInitial" :enter="cardEnter(0.12)" :hovered="cardHovered" class="tilt-wrapper">
          <div
            v-tilt
            class="glass-card preview-tilt overflow-hidden p-6"
          >
            <MultiLangAudioPlayer
              v-if="hasMultiLangTracks"
              :title="t('preview.title')"
              :prompt="t('preview.prompt')"
              :style-label="t('preview.style')"
              :duration-label="t('preview.duration')"
              :export-label="t('preview.export')"
              :style-value="t('preview.values.scene')"
              :duration-value="t('preview.values.emotion')"
              :export-value="t('preview.values.format')"
              :play-label="t('preview.listen')"
              :pause-label="t('preview.pause')"
              :waveform-label="t('preview.waveform')"
              :tracks="previewAudioTracks"
            />
            <AudioPreviewCard
              v-else
              :title="t('preview.title')"
              :prompt="t('preview.prompt')"
              :style-label="t('preview.style')"
              :duration-label="t('preview.duration')"
              :export-label="t('preview.export')"
              :style-value="t('preview.values.scene')"
              :duration-value="t('preview.values.emotion')"
              :export-value="t('preview.values.format')"
              :play-label="t('preview.listen')"
              :pause-label="t('preview.pause')"
              :waveform-label="t('preview.waveform')"
              :src="previewAudioUrl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

definePageMeta({ layout: 'default' })

const { t } = useI18n()
const { siteName, previewAudioUrl, previewAudioTracks } = useOfficialSiteConfig()

const hasMultiLangTracks = computed(() => previewAudioTracks.value.length > 0)

useBaseSeo()

const { fadeUpInitial, fadeUpEnter, cardInitial, cardEnter, cardHovered } = useLandingMotion()
</script>
