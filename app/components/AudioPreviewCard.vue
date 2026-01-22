<template>
  <div>
    <div class="flex items-center gap-3">
      <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/10 dark:bg-indigo-400/10">
        <AudioLines class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </span>
      <div>
        <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ title }}</div>
        <div class="text-xs text-slate-500 dark:text-slate-400">{{ prompt }}</div>
      </div>
    </div>

    <div class="mt-6">
      <div
        class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 px-4 py-5 shadow-inner shadow-slate-200/70 dark:border-white/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 dark:shadow-black/10"
      >
        <div class="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-indigo-500/10 blur-2xl dark:bg-indigo-500/15"></div>
        <div class="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-fuchsia-500/8 blur-2xl dark:bg-fuchsia-500/10"></div>

        <div class="flex items-center justify-between gap-3">
          <div class="text-xs font-semibold text-slate-600 dark:text-white/70">{{ waveformLabel }}</div>
          <div class="flex items-center gap-2">
            <div v-if="waveformPalette.length > 1" class="flex items-center gap-1">
              <button
                v-for="(c, idx) in waveformPalette"
                :key="`${c}-${idx}`"
                type="button"
                class="h-3 w-3 rounded-full ring-1 ring-slate-300/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:ring-white/15"
                :class="idx === waveformColorIndex ? 'scale-110 ring-slate-400/80 dark:ring-white/60' : 'opacity-80 hover:opacity-100'"
                :style="{ backgroundColor: c }"
                :aria-label="`Waveform color ${idx + 1}`"
                @click="waveformColorIndex = idx"
              />
            </div>
            <div class="text-[11px] font-medium tabular-nums text-slate-500 dark:text-white/70">
              {{ timeLabel }}
            </div>
          </div>
        </div>

        <div class="mt-3 h-20 w-full">
          <AudioWaveformCanvas
            :analyser="analyser"
            :active="isPlaying"
            variant="bars"
            :color="waveformColor"
            :inactive-color="waveformInactiveColor"
            :bar-width="3"
            :bar-gap="4"
            :line-width="2"
            :dotted-baseline="true"
          />
        </div>

        <button
          type="button"
          class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900/5 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300/40 transition hover:bg-slate-900/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/15"
          :aria-label="isPlaying ? pauseLabel : playLabel"
          @click="togglePlay"
        >
          <span
            v-if="isPlaying"
            class="h-2 w-2 rounded-full motion-safe:animate-pulse"
            :style="{ backgroundColor: waveformColor }"
          ></span>
          <component :is="isPlaying ? Pause : Play" class="h-4 w-4" />
          {{ isPlaying ? pauseLabel : playLabel }}
        </button>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-3 text-xs">
      <div class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
        {{ styleLabel }}
        <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">{{ styleValue }}</div>
      </div>
      <div class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
        {{ durationLabel }}
        <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">{{ durationValue }}</div>
      </div>
      <div class="rounded-2xl bg-white/60 p-3 dark:bg-slate-900/50">
        {{ exportLabel }}
        <div class="mt-1 font-semibold text-slate-900 dark:text-slate-100">{{ exportValue }}</div>
      </div>
    </div>

    <audio ref="audioRef" class="hidden" :src="resolvedSrc" preload="metadata" playsinline></audio>
  </div>
</template>

<script setup lang="ts">
import { AudioLines, Pause, Play } from 'lucide-vue-next'
import { useThemeMode } from '../composables/useThemeMode'

const props = withDefaults(
  defineProps<{
    title: string
    prompt: string
    styleLabel: string
    durationLabel: string
    exportLabel: string
    styleValue: string
    durationValue: string
    exportValue: string
    playLabel?: string
    pauseLabel?: string
    waveformLabel?: string
    src?: string
    waveformColors?: string[]
    waveformDefaultColor?: string
  }>(),
  {
    playLabel: '试听',
    pauseLabel: '暂停',
    waveformLabel: '音频波形',
    src: '',
    waveformColors: undefined,
    waveformDefaultColor: '#6ee7b7',
  },
)

const audioRef = ref<HTMLAudioElement | null>(null)
const analyser = shallowRef<AnalyserNode | null>(null)

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

let audioContext: AudioContext | null = null
let sourceNode: MediaElementAudioSourceNode | null = null
let demoUrl: string | null = null

const resolvedSrc = ref('')

const { resolved: resolvedTheme } = useThemeMode()
const isDark = computed(() => resolvedTheme.value === 'dark')

const waveformPalette = computed(() => {
  const colors = (props.waveformColors && props.waveformColors.length ? props.waveformColors : []) as string[]
  if (colors.length) return colors
  return [props.waveformDefaultColor, '#818cf8', '#fbbf24', '#fb7185']
})

const waveformColorIndex = ref(0)
const waveformColor = computed(() => waveformPalette.value[Math.min(waveformColorIndex.value, waveformPalette.value.length - 1)] || '#6ee7b7')
const waveformInactiveColor = computed(() => (isDark.value ? '#ffffff' : '#64748b'))

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

const timeLabel = computed(() => {
  if (!duration.value) return '—'
  return `${formatTime(currentTime.value)} / ${formatTime(duration.value)}`
})

const writeString = (view: DataView, offset: number, value: string) => {
  for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i))
}

const generateDemoWav = (options: { durationSeconds: number; sampleRate: number }) => {
  const channelCount = 1
  const { durationSeconds, sampleRate } = options
  const frameCount = Math.floor(durationSeconds * sampleRate)
  const bytesPerSample = 2
  const blockAlign = channelCount * bytesPerSample
  const byteRate = sampleRate * blockAlign
  const dataSize = frameCount * blockAlign
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, channelCount, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bytesPerSample * 8, true)
  writeString(view, 36, 'data')
  view.setUint32(40, dataSize, true)

  const base = 220
  const scale = [0, 3, 5, 7, 10]
  const stepHz = (step: number) => base * Math.pow(2, scale[step % scale.length] / 12)
  const bpm = 96
  const beat = 60 / bpm

  let writeOffset = 44
  for (let i = 0; i < frameCount; i++) {
    const t = i / sampleRate
    const bar = Math.floor(t / (beat * 2))
    const step = bar % 8
    const freq = stepHz(step)

    const phase = 2 * Math.PI * freq * t
    const lead = Math.sin(phase) * 0.45 + Math.sin(phase * 2) * 0.12
    const bass = Math.sin(2 * Math.PI * (freq / 2) * t) * 0.18

    const beatPos = (t % beat) / beat
    const env = Math.min(1, beatPos / 0.02) * Math.exp(-beatPos * 3.2)
    const kick = Math.sin(2 * Math.PI * 55 * t) * env * 0.28

    const sample = (lead + bass + kick) * 0.9
    const clamped = Math.max(-1, Math.min(1, sample))
    view.setInt16(writeOffset, Math.floor(clamped * 0x7fff), true)
    writeOffset += 2
  }

  return new Blob([buffer], { type: 'audio/wav' })
}

const ensureDemoSrc = () => {
  const setResolved = (next: string) => {
    resolvedSrc.value = next
    const audioEl = audioRef.value
    if (audioEl && audioEl.src !== next) audioEl.src = next
  }

  if (props.src) {
    setResolved(props.src)
    return
  }
  if (demoUrl) {
    setResolved(demoUrl)
    return
  }
  const blob = generateDemoWav({ durationSeconds: 8, sampleRate: 44100 })
  demoUrl = URL.createObjectURL(blob)
  setResolved(demoUrl)
}

const ensureAudioGraph = async () => {
  const audioEl = audioRef.value
  if (!audioEl) return

  if (!audioContext) {
    audioContext = new AudioContext()
  }

  if (audioContext.state !== 'running') {
    await audioContext.resume()
  }

  if (!sourceNode) {
    sourceNode = audioContext.createMediaElementSource(audioEl)
    const nextAnalyser = audioContext.createAnalyser()
    nextAnalyser.fftSize = 2048
    nextAnalyser.smoothingTimeConstant = 0.85
    sourceNode.connect(nextAnalyser)
    nextAnalyser.connect(audioContext.destination)
    analyser.value = nextAnalyser
  }
}

const togglePlay = async () => {
  const audioEl = audioRef.value
  if (!audioEl) return

  ensureDemoSrc()

  if (!audioEl.paused) {
    audioEl.pause()
    return
  }

  await ensureAudioGraph()
  await audioEl.play()
}

const attachAudioListeners = (audioEl: HTMLAudioElement) => {
  const onPlay = () => {
    isPlaying.value = true
  }
  const onPause = () => {
    isPlaying.value = false
  }
  const onTimeUpdate = () => {
    currentTime.value = audioEl.currentTime || 0
  }
  const onLoadedMeta = () => {
    duration.value = audioEl.duration || 0
  }
  const onEnded = () => {
    isPlaying.value = false
  }

  audioEl.addEventListener('play', onPlay)
  audioEl.addEventListener('pause', onPause)
  audioEl.addEventListener('timeupdate', onTimeUpdate)
  audioEl.addEventListener('loadedmetadata', onLoadedMeta)
  audioEl.addEventListener('ended', onEnded)

  return () => {
    audioEl.removeEventListener('play', onPlay)
    audioEl.removeEventListener('pause', onPause)
    audioEl.removeEventListener('timeupdate', onTimeUpdate)
    audioEl.removeEventListener('loadedmetadata', onLoadedMeta)
    audioEl.removeEventListener('ended', onEnded)
  }
}

let detachAudioListeners: (() => void) | null = null

onMounted(() => {
  ensureDemoSrc()

  const audioEl = audioRef.value
  if (!audioEl) return

  detachAudioListeners = attachAudioListeners(audioEl)
})

watch(
  () => props.src,
  (next) => {
    if (next) {
      resolvedSrc.value = next
      return
    }
    if (!demoUrl) ensureDemoSrc()
  },
)

onBeforeUnmount(() => {
  detachAudioListeners?.()
  detachAudioListeners = null

  if (demoUrl) {
    URL.revokeObjectURL(demoUrl)
    demoUrl = null
  }

  try {
    sourceNode?.disconnect()
  } catch {}
  sourceNode = null

  try {
    analyser.value?.disconnect()
  } catch {}
  analyser.value = null

  if (audioContext) {
    audioContext.close().catch(() => {})
    audioContext = null
  }
})
</script>
