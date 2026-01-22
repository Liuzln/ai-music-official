<template>
  <section class="models-stage relative mx-auto flex h-[calc(100vh-64px-var(--icp-beian-offset,0px))] w-full flex-col overflow-hidden px-4 md:px-8">
    <!-- Header -->
    <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="relative z-10 mx-auto mt-4 max-w-2xl flex-none text-center md:mt-8">
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl lg:text-4xl">
        {{ t('sections.models.title') }}
      </h1>
      <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base lg:text-lg">
        {{ t('sections.models.description') }}
      </p>
    </div>

    <!-- Carousel Container -->
    <div class="relative z-10 flex flex-1 items-center justify-center perspective-1000">
      <div class="relative flex h-full w-full max-w-6xl items-center justify-center">
        <LandingCarouselCard
          v-for="(item, idx) in carouselItems"
          :key="item.id"
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
          :pill="item.label"
          :tags="item.bullets"
          tag-variant="bullet"
          :max-tags="3"
          :active="idx === activeIndex"
          :playing="bgmEnabled && idx === activeIndex"
          :card-style="getCardStyle(idx)"
          @select="switchItemByIndex(idx)"
          @toggle-play="toggleBgm"
        />
      </div>
    </div>
    
    <!-- Navigation Dots -->
    <div class="mb-6 flex flex-none justify-center gap-2 md:mb-8">
      <button
        v-for="(_, idx) in carouselItems"
        :key="idx"
        type="button"
        class="h-1.5 rounded-full transition-all duration-300 md:h-2"
        :class="idx === activeIndex ? 'w-6 bg-indigo-600 md:w-8' : 'w-1.5 bg-slate-300 hover:bg-indigo-400 dark:bg-slate-700 md:w-2'"
        @click="switchItemByIndex(idx)"
        :aria-label="`Go to slide ${idx + 1}`"
      />
    </div>

  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { AudioLines, Globe, Languages, Layers, SlidersHorizontal } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { t } = useI18n()
const { siteName } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.models.title')} - ${siteName.value}`),
  description: computed(() => t('sections.models.description')),
})

const { fadeUpInitial, fadeUpVisible } = useLandingMotion()

// --- Data Definition ---

type CarouselItemModel = {
  id: string
  title: string
  description: string
  label?: string
  bullets: string[]
  icon: Component
  bgmPreset: 'lofi' | 'cinematic' | 'anime' | 'ads' | 'dub' // Reusing BGM presets for simplicity
}

const localeModelData = [
  {
    id: 'thai',
    titleKey: 'models.items.thai.title',
    descriptionKey: 'models.items.thai.description',
    bulletKeys: ['models.items.thai.bullets.0', 'models.items.thai.bullets.1', 'models.items.thai.bullets.2'],
    icon: Languages,
    label: 'Language',
    bgmPreset: 'lofi',
  },
  {
    id: 'khmer',
    titleKey: 'models.items.khmer.title',
    descriptionKey: 'models.items.khmer.description',
    bulletKeys: ['models.items.khmer.bullets.0', 'models.items.khmer.bullets.1', 'models.items.khmer.bullets.2'],
    icon: AudioLines,
    label: 'Language',
    bgmPreset: 'cinematic',
  },
] as const

const modelAdvantageData = [
  {
    id: 'corpus',
    titleKey: 'models.advantages.corpus.title',
    descriptionKey: 'models.advantages.corpus.description',
    icon: Globe,
    bgmPreset: 'ads',
  },
  {
    id: 'control',
    titleKey: 'models.advantages.control.title',
    descriptionKey: 'models.advantages.control.description',
    icon: SlidersHorizontal,
    bgmPreset: 'anime',
  },
  {
    id: 'voiceover',
    titleKey: 'models.advantages.voiceover.title',
    descriptionKey: 'models.advantages.voiceover.description',
    icon: AudioLines,
    bgmPreset: 'dub',
  },
  {
    id: 'delivery',
    titleKey: 'models.advantages.delivery.title',
    descriptionKey: 'models.advantages.delivery.description',
    icon: Layers,
    bgmPreset: 'lofi',
  },
] as const

const carouselItems = computed<CarouselItemModel[]>(() => {
  const models = localeModelData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    label: item.label,
    bullets: item.bulletKeys.map((key) => t(key)),
    icon: item.icon,
    bgmPreset: item.bgmPreset as 'lofi' | 'cinematic',
  }))

  const advantages = modelAdvantageData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    label: 'Feature',
    bullets: [],
    icon: item.icon,
    bgmPreset: item.bgmPreset as 'ads' | 'anime' | 'dub' | 'lofi',
  }))

  return [...models, ...advantages]
})

// --- Carousel Logic ---

const activeIndex = ref(0)
const activeItem = computed(() => carouselItems.value[activeIndex.value])

const getCardStyle = (index: number) => {
  const offset = index - activeIndex.value
  const absOffset = Math.abs(offset)
  
  const xSpacing = 320
  const scaleRatio = 0.85
  const opacityRatio = 0.5
  
  const translateX = offset * xSpacing
  const scale = Math.pow(scaleRatio, absOffset)
  const opacity = absOffset === 0 ? 1 : Math.max(0.3, Math.pow(opacityRatio, absOffset))
  const zIndex = 10 - absOffset
  const blur = absOffset === 0 ? 0 : 2 * absOffset
  
  const isVisible = absOffset <= 2
  
  return {
    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
    opacity: isVisible ? opacity : 0,
    zIndex: zIndex,
    filter: `blur(${blur}px)`,
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
    visibility: (isVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
  }
}

const switchItemByIndex = (index: number) => {
  activeIndex.value = index
  if (bgmEnabled.value) {
    startBgm() 
  }
}

// --- BGM Logic (Copied from Templates) ---

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
}

const bgmPresets: Record<string, BgmPreset> = {
  lofi: {
    tempo: 86,
    rootHz: 220,
    wave: 'triangle',
    filterHz: 1500,
    masterGain: 0.22,
    noteGain: 0.08,
    bassGain: 0.05,
    scaleSemitones: [0, 3, 5, 7, 10],
    sequence: [0, 2, 1, 3, 2, 4, 3, 1],
  },
  cinematic: {
    tempo: 92,
    rootHz: 196,
    wave: 'sine',
    filterHz: 1800,
    masterGain: 0.2,
    noteGain: 0.07,
    bassGain: 0.05,
    scaleSemitones: [0, 2, 5, 7, 9],
    sequence: [0, 3, 2, 4, 1, 3, 2, 0],
  },
  anime: {
    tempo: 118,
    rootHz: 262,
    wave: 'triangle',
    filterHz: 2200,
    masterGain: 0.16,
    noteGain: 0.06,
    bassGain: 0.04,
    scaleSemitones: [0, 2, 4, 7, 9],
    sequence: [0, 2, 4, 2, 1, 3, 4, 3],
  },
  ads: {
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
}

const bgmEnabled = ref(false)
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
  const presetId = activeItem.value?.bgmPreset
  if (!presetId) return

  const preset = bgmPresets[presetId]
  if (!preset) return

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
  const presetId = activeItem.value?.bgmPreset || 'lofi'
  const preset = bgmPresets[presetId]
  if (preset) {
    applyBgmPreset(preset)
  }
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

onBeforeUnmount(() => {
  stopBgmScheduler()
  if (bgmAudioContext) void bgmAudioContext.close().catch(() => {})
  bgmAudioContext = null
  bgmMaster = null
  bgmFilter = null
})
</script>
