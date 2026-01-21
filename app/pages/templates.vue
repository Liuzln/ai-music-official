<template>
  <section ref="stageEl" class="templates-stage relative mx-auto max-w-6xl overflow-hidden px-4 py-12 md:py-16" :style="stageVars">
    <div class="templates-stage__bg pointer-events-none absolute inset-0 -z-10"></div>

    <div v-motion :initial="fadeUpInitial" :visibleOnce="fadeUpVisible(0)" class="max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
        {{ t('sections.templates.title') }}
      </h1>
      <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
        {{ t('sections.templates.description') }}
      </p>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
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
          :class="selectedTemplateId === item.id ? 'ring-1 ring-indigo-500/30' : ''"
          :aria-pressed="selectedTemplateId === item.id"
          @click="switchTemplate(item.id)"
        >
          <div class="flex items-start gap-3">
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:bg-slate-800"
            >
              <component :is="item.icon" class="h-5 w-5" />
            </span>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {{ item.title }}
                </h2>
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

    <div v-if="activeTemplate" ref="detailsCardEl" v-motion :initial="cardInitial" :visibleOnce="cardVisibleOnce(2)" class="glass-card overflow-hidden p-6">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {{ t('sections.templates.current') }}
          </div>
          <div data-tpl="title" class="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {{ activeTemplate?.title }}
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

      <p data-tpl="long" class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ activeTemplate?.longDescription }}
      </p>

      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          v-for="point in activeTemplate?.points || []"
          :key="point"
          data-tpl="point"
          class="rounded-2xl bg-white/60 p-4 text-sm text-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
        >
          {{ point }}
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <span v-for="tag in activeTemplate?.tags || []" :key="tag" data-tpl="tag" class="badge">
          {{ tag }}
        </span>
      </div>

      <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
        {{ t('sections.templates.bgmHint') }}
      </p>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { AudioLines, Headphones, Layers, Play, Sparkles, Zap } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { t } = useI18n()
const { siteName } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.templates.title')} - ${siteName.value}`),
  description: computed(() => t('sections.templates.description')),
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
  microStaggerStepTight,
  microPopInitial,
  microPopVisibleOnce,
} = useLandingMotion()

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
    tagKeys: ['templates.items.general.tags.0', 'templates.items.general.tags.1', 'templates.items.general.tags.2'],
    bgmLabelKey: 'templates.bgm.labels.lofi',
    bgmPreset: 'lofi',
    icon: Layers,
    theme: {
      glow1: 'rgba(99, 102, 241, 0.20)',
      glow2: 'rgba(99, 102, 241, 0.18)',
      glow3: 'rgba(99, 102, 241, 0.15)',
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
    tagKeys: ['templates.items.shortDrama.tags.0', 'templates.items.shortDrama.tags.1', 'templates.items.shortDrama.tags.2'],
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
    tagKeys: ['templates.items.comic.tags.0', 'templates.items.comic.tags.1', 'templates.items.comic.tags.2'],
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
    tagKeys: ['templates.items.ads.tags.0', 'templates.items.ads.tags.1', 'templates.items.ads.tags.2'],
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
    tagKeys: ['templates.items.dub.tags.0', 'templates.items.dub.tags.1', 'templates.items.dub.tags.2'],
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

type BgmPresetId = 'lofi' | 'cinematic' | 'anime' | 'ads' | 'dub'

type TemplateViewModel = {
  id: TemplateId
  title: string
  description: string
  longDescription: string
  points: string[]
  tags: string[]
  bgmLabel: string
  bgmPreset: BgmPresetId
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
const activeTemplate = computed(() => templates.value.find((item) => item.id === activeTemplateId.value) || templates.value[0])

const selectedTemplateId = ref<TemplateId>(activeTemplateId.value)

const stageEl = ref<HTMLElement | null>(null)
const detailsCardEl = ref<HTMLElement | null>(null)
const stageVars = ref<Record<string, string>>({
  '--tpl-glow-1': templateData[0].theme.glow1,
  '--tpl-glow-2': templateData[0].theme.glow2,
  '--tpl-glow-3': templateData[0].theme.glow3,
})

const prefersReducedMotion = ref(false)

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

const getGlowVarsById = (id: TemplateId) => {
  const theme = templateData.find((item) => item.id === id)?.theme
  return {
    '--tpl-glow-1': theme?.glow1 ?? 'rgba(99, 102, 241, 0.18)',
    '--tpl-glow-2': theme?.glow2 ?? 'rgba(168, 85, 247, 0.14)',
    '--tpl-glow-3': theme?.glow3 ?? 'rgba(56, 189, 248, 0.12)',
  } as Record<string, string>
}

let gsapApi: any | null = null
let contentTimeline: any | null = null
let switchNonce = 0

const loadGsap = async () => {
  if (gsapApi) return gsapApi
  const mod = await import('gsap')
  gsapApi = (mod as any).gsap ?? (mod as any).default ?? mod
  return gsapApi
}

const getDetailsTargets = () => {
  const card = detailsCardEl.value
  if (!card) return null

  const title = card.querySelector<HTMLElement>('[data-tpl="title"]')
  const long = card.querySelector<HTMLElement>('[data-tpl="long"]')
  const points = Array.from(card.querySelectorAll<HTMLElement>('[data-tpl="point"]'))
  const tags = Array.from(card.querySelectorAll<HTMLElement>('[data-tpl="tag"]'))
  const targets = [title, long, ...points, ...tags].filter((el): el is HTMLElement => Boolean(el))

  return { title, long, points, tags, targets }
}

const switchTemplate = async (id: TemplateId) => {
  if (id === selectedTemplateId.value) return
  const nonce = ++switchNonce
  selectedTemplateId.value = id

  if (!import.meta.client || prefersReducedMotion.value) {
    activeTemplateId.value = id
    stageVars.value = getGlowVarsById(id)
    return
  }

  const stage = stageEl.value
  if (!stage) {
    activeTemplateId.value = id
    stageVars.value = getGlowVarsById(id)
    return
  }

  const gsap = await loadGsap().catch(() => null)
  if (!gsap) {
    activeTemplateId.value = id
    stageVars.value = getGlowVarsById(id)
    return
  }

  if (contentTimeline) contentTimeline.kill()

  gsap.killTweensOf(stage)
  gsap.to(stage, {
    ...getGlowVarsById(id),
    duration: 0.65,
    ease: 'power3.out',
    overwrite: 'auto',
  })

  const before = getDetailsTargets()
  if (!before) {
    activeTemplateId.value = id
    stageVars.value = getGlowVarsById(id)
    return
  }

  contentTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
  contentTimeline.to(before.targets, {
    opacity: 0,
    y: -10,
    duration: 0.18,
    stagger: 0.012,
    overwrite: 'auto',
  })
  await new Promise<void>((resolve) => {
    contentTimeline?.eventCallback('onComplete', resolve)
    contentTimeline?.eventCallback('onInterrupt', resolve)
  })
  if (nonce !== switchNonce) return

  activeTemplateId.value = id
  await nextTick()
  if (nonce !== switchNonce) return

  const after = getDetailsTargets()
  if (!after) {
    stageVars.value = getGlowVarsById(id)
    return
  }

  gsap.set(after.targets, { opacity: 0, y: 10 })

  contentTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
  contentTimeline.to(after.targets, {
    opacity: 1,
    y: 0,
    duration: 0.26,
    stagger: 0.016,
    overwrite: 'auto',
  })
  await new Promise<void>((resolve) => {
    contentTimeline?.eventCallback('onComplete', resolve)
    contentTimeline?.eventCallback('onInterrupt', resolve)
  })
  if (nonce !== switchNonce) return

  stageVars.value = getGlowVarsById(id)
}

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
    sequence: [0, 2, 1, 3, 2, 4, 3, 1],
  },
  cinematic: {
    labelKey: 'templates.bgm.labels.cinematic',
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
    labelKey: 'templates.bgm.labels.anime',
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

  const preset = activeTemplate.value?.bgmPreset ? bgmPresets[activeTemplate.value.bgmPreset] : bgmPresets.lofi
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
  applyBgmPreset(bgmPresets[activeTemplate.value?.bgmPreset || 'lofi'])
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

onBeforeUnmount(() => {
  stopBgmScheduler()
  if (bgmAudioContext) void bgmAudioContext.close().catch(() => {})
  bgmAudioContext = null
  bgmMaster = null
  bgmFilter = null
})
</script>

<style scoped>
.templates-stage__bg {
  /* Removed radial-gradient background to eliminate the glow effect */
  background: transparent;
  transition: background 650ms cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
