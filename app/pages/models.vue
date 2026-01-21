<template>
  <section ref="stageEl" class="models-stage relative mx-auto flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden px-4 md:px-8" :style="stageVars">
    <!-- Dynamic Background -->
    <div class="models-stage__bg pointer-events-none absolute inset-0 -z-10 transition-colors duration-700"></div>

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
        <button
          v-for="(item, idx) in carouselItems"
          :key="item.id"
          type="button"
          class="absolute left-1/2 top-1/2 h-[55vh] max-h-[500px] min-h-[350px] w-[min(85vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
          :class="[
            'glass-card flex flex-col items-center justify-between border border-white/40 shadow-xl dark:border-white/10',
            idx === activeIndex ? 'cursor-default ring-1 ring-indigo-500/30' : 'cursor-pointer hover:bg-white/40 dark:hover:bg-slate-800/40'
          ]"
          :style="getCardStyle(idx)"
          @click="handleCardClick(idx)"
        >
          <!-- Card Content -->
          <div class="flex w-full flex-col items-center text-center">
            <span
              class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg transition-transform duration-300 dark:from-slate-700 dark:to-slate-800 md:h-16 md:w-16 md:mb-6"
              :class="{ 'scale-110 shadow-indigo-500/20': idx === activeIndex }"
            >
              <component :is="item.icon" class="h-7 w-7 md:h-8 md:w-8" />
            </span>
            
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 md:text-xl">
              {{ item.title }}
            </h2>
            
            <span v-if="item.label" class="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 md:text-xs">
              {{ item.label }}
            </span>

            <p class="mt-4 line-clamp-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 md:text-sm md:line-clamp-3">
              {{ item.description }}
            </p>
          </div>

          <!-- Actions / Details -->
          <div class="w-full space-y-4">
             <!-- Play Button (Only prominent on active) -->
            <div 
              class="flex justify-center transition-all duration-300"
              :class="idx === activeIndex ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4 pointer-events-none'"
            >
              <div
                class="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95 md:h-14 md:w-14"
                @click.stop="toggleBgm"
              >
                <span v-if="bgmEnabled && idx === activeIndex" class="absolute inset-0 animate-ping rounded-full bg-indigo-500 opacity-20"></span>
                <component :is="bgmEnabled && idx === activeIndex ? Pause : Play" class="fill-current h-5 w-5 md:h-6 md:w-6 ml-0.5" />
              </div>
            </div>

            <!-- Bullets/Tags -->
            <div class="flex flex-wrap justify-center gap-2 opacity-80" v-if="idx === activeIndex && item.bullets.length">
               <span v-for="bullet in item.bullets.slice(0, 3)" :key="bullet" class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                 • {{ bullet }}
               </span>
            </div>
          </div>
        </button>
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
import { AudioLines, Globe, Languages, Layers, Play, Pause, SlidersHorizontal } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { t } = useI18n()
const { siteName } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.models.title')} - ${siteName.value}`),
  description: computed(() => t('sections.models.description')),
})

const { fadeUpInitial, fadeUpVisible } = useLandingMotion()

// --- Data Definition ---

type ItemTheme = {
  glow1: string
  glow2: string
  glow3: string
}

type CarouselItemModel = {
  id: string
  title: string
  description: string
  label?: string
  bullets: string[]
  icon: Component
  theme: ItemTheme
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
    theme: {
      glow1: 'rgba(99, 102, 241, 0.20)', // Indigo
      glow2: 'rgba(168, 85, 247, 0.18)', // Purple
      glow3: 'rgba(236, 72, 153, 0.15)', // Pink
    },
    bgmPreset: 'lofi',
  },
  {
    id: 'khmer',
    titleKey: 'models.items.khmer.title',
    descriptionKey: 'models.items.khmer.description',
    bulletKeys: ['models.items.khmer.bullets.0', 'models.items.khmer.bullets.1', 'models.items.khmer.bullets.2'],
    icon: AudioLines,
    label: 'Language',
    theme: {
      glow1: 'rgba(14, 165, 233, 0.18)', // Sky
      glow2: 'rgba(59, 130, 246, 0.18)', // Blue
      glow3: 'rgba(99, 102, 241, 0.14)', // Indigo
    },
    bgmPreset: 'cinematic',
  },
] as const

const modelAdvantageData = [
  {
    id: 'corpus',
    titleKey: 'models.advantages.corpus.title',
    descriptionKey: 'models.advantages.corpus.description',
    icon: Globe,
    theme: {
      glow1: 'rgba(16, 185, 129, 0.18)', // Emerald
      glow2: 'rgba(20, 184, 166, 0.16)', // Teal
      glow3: 'rgba(59, 130, 246, 0.12)', // Blue
    },
    bgmPreset: 'ads',
  },
  {
    id: 'control',
    titleKey: 'models.advantages.control.title',
    descriptionKey: 'models.advantages.control.description',
    icon: SlidersHorizontal,
    theme: {
      glow1: 'rgba(245, 158, 11, 0.18)', // Amber
      glow2: 'rgba(234, 179, 8, 0.16)', // Yellow
      glow3: 'rgba(249, 115, 22, 0.12)', // Orange
    },
    bgmPreset: 'anime',
  },
  {
    id: 'voiceover',
    titleKey: 'models.advantages.voiceover.title',
    descriptionKey: 'models.advantages.voiceover.description',
    icon: AudioLines,
    theme: {
      glow1: 'rgba(244, 63, 94, 0.18)', // Rose
      glow2: 'rgba(236, 72, 153, 0.16)', // Pink
      glow3: 'rgba(168, 85, 247, 0.12)', // Purple
    },
    bgmPreset: 'dub',
  },
  {
    id: 'delivery',
    titleKey: 'models.advantages.delivery.title',
    descriptionKey: 'models.advantages.delivery.description',
    icon: Layers,
    theme: {
      glow1: 'rgba(6, 182, 212, 0.18)', // Cyan
      glow2: 'rgba(14, 165, 233, 0.16)', // Sky
      glow3: 'rgba(99, 102, 241, 0.12)', // Indigo
    },
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
    theme: item.theme,
    bgmPreset: item.bgmPreset as 'lofi' | 'cinematic',
  }))

  const advantages = modelAdvantageData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    label: 'Feature',
    bullets: [],
    icon: item.icon,
    theme: item.theme,
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
  
  const xSpacing = 260
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
    visibility: isVisible ? 'visible' : 'hidden',
  }
}

const handleCardClick = (index: number) => {
  if (index === activeIndex.value) return
  switchItemByIndex(index)
}

const switchItemByIndex = (index: number) => {
  activeIndex.value = index
  updateBackground(index)
  if (bgmEnabled.value) {
    startBgm() 
  }
}

// --- Background & Theme Logic ---

const stageEl = ref<HTMLElement | null>(null)
const stageVars = ref<Record<string, string>>({
  '--tpl-glow-1': localeModelData[0].theme.glow1,
  '--tpl-glow-2': localeModelData[0].theme.glow2,
  '--tpl-glow-3': localeModelData[0].theme.glow3,
})

let gsapApi: any | null = null
const loadGsap = async () => {
  if (gsapApi) return gsapApi
  const mod = await import('gsap')
  gsapApi = (mod as any).gsap ?? (mod as any).default ?? mod
  return gsapApi
}

const updateBackground = (index: number) => {
  const theme = carouselItems.value[index].theme
  
  loadGsap().then((gsap) => {
     if (stageEl.value && gsap) {
       gsap.to(stageEl.value, {
         '--tpl-glow-1': theme.glow1,
         '--tpl-glow-2': theme.glow2,
         '--tpl-glow-3': theme.glow3,
         duration: 0.8,
         ease: 'power2.out'
       })
     } else {
        stageVars.value = {
          '--tpl-glow-1': theme.glow1,
          '--tpl-glow-2': theme.glow2,
          '--tpl-glow-3': theme.glow3,
        }
     }
  })
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
  const preset = presetId ? bgmPresets[presetId] : bgmPresets.lofi
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
  applyBgmPreset(bgmPresets[activeItem.value?.bgmPreset || 'lofi'])
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

<style scoped>
.models-stage__bg {
  /* Dynamic Mesh Gradient using CSS Variables */
  background: 
    radial-gradient(at 0% 0%, var(--tpl-glow-1) 0px, transparent 50%),
    radial-gradient(at 100% 0%, var(--tpl-glow-2) 0px, transparent 50%),
    radial-gradient(at 100% 100%, var(--tpl-glow-3) 0px, transparent 50%),
    radial-gradient(at 0% 100%, var(--tpl-glow-2) 0px, transparent 50%);
  filter: blur(80px);
  opacity: 0.6;
}

.glass-card {
  @apply backdrop-blur-xl bg-white/70 dark:bg-slate-900/60;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
