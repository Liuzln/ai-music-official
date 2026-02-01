<template>
  <div class="space-y-1">
    <div
      v-for="track in tracks"
      :key="track.lang"
      class="group relative flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200"
      :class="[
        activeLang === track.lang
          ? 'bg-indigo-500/10 dark:bg-indigo-400/15'
          : 'hover:bg-slate-500/5 dark:hover:bg-white/5',
      ]"
      @mouseenter="handleMouseEnter(track.lang)"
    >
      <div class="flex min-w-[72px] items-center gap-1.5">
        <span v-if="track.flag" class="text-sm">{{ track.flag }}</span>
        <span
          class="text-[11px] font-medium transition-colors"
          :class="[
            activeLang === track.lang
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 dark:text-slate-400',
          ]"
        >
          {{ track.label }}
        </span>
      </div>

      <div class="h-6 flex-1">
        <canvas
          :ref="(el) => setCanvasRef(track.lang, el as HTMLCanvasElement | null)"
          class="h-full w-full"
        />
      </div>

      <div
        v-if="activeLang === track.lang && isPlaying"
        class="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <span
          class="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 motion-safe:animate-pulse"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface LangTrack {
  lang: string
  label: string
  flag?: string
  audioUrl: string
}

const props = withDefaults(
  defineProps<{
    tracks: LangTrack[]
    activeLang: string
    analyser: AnalyserNode | null
    isPlaying: boolean
    activeColor?: string
    inactiveColor?: string
  }>(),
  {
    activeColor: '#818cf8',
    inactiveColor: '#94a3b8',
  },
)

const emit = defineEmits<{
  hover: [lang: string]
}>()

const canvasRefs = new Map<string, HTMLCanvasElement>()
const resizeObservers = new Map<string, ResizeObserver>()
let frameId: number | null = null
let dataArray: Uint8Array | null = null

const setCanvasRef = (lang: string, el: HTMLCanvasElement | null) => {
  if (el) {
    canvasRefs.set(lang, el)
    setupCanvas(lang, el)
  } else {
    const observer = resizeObservers.get(lang)
    if (observer) {
      observer.disconnect()
      resizeObservers.delete(lang)
    }
    canvasRefs.delete(lang)
  }
}

const setupCanvas = (lang: string, canvas: HTMLCanvasElement) => {
  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const nextWidth = Math.max(1, Math.floor(rect.width * dpr))
    const nextHeight = Math.max(1, Math.floor(rect.height * dpr))
    if (canvas.width !== nextWidth) canvas.width = nextWidth
    if (canvas.height !== nextHeight) canvas.height = nextHeight
    drawTrack(lang, canvas)
  }

  resizeCanvas()

  const observer = new ResizeObserver(resizeCanvas)
  observer.observe(canvas)
  resizeObservers.set(lang, observer)
}

const drawBaseline = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string,
  active: boolean,
) => {
  const y = Math.round(height / 2) + 0.5
  const dpr = window.devicePixelRatio || 1

  ctx.save()
  ctx.lineWidth = Math.max(1, 1.5 * dpr)
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.globalAlpha = active ? 0.4 : 0.5

  const dash = Math.max(2, 2.5 * dpr)
  const gap = Math.max(6, 7 * dpr)
  ctx.setLineDash([dash, gap])

  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
  ctx.stroke()
  ctx.restore()
}

const drawBars = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: Uint8Array,
  color: string,
) => {
  const dpr = window.devicePixelRatio || 1
  const barWidthPx = Math.max(1, 2 * dpr)
  const gapPx = Math.max(0, 3 * dpr)
  const step = barWidthPx + gapPx
  const maxBars = Math.max(1, Math.floor(width / step))
  const count = maxBars
  const totalWidth = count * step - gapPx
  let x = (width - totalWidth) / 2 + barWidthPx / 2

  const midY = height / 2
  const maxHalf = height * 0.38
  const minHalf = Math.max(0, 1 * dpr) / 2
  const bufferLength = data.length

  ctx.save()
  ctx.setLineDash([])
  ctx.strokeStyle = color
  ctx.globalAlpha = 0.9
  ctx.lineWidth = barWidthPx
  ctx.lineCap = 'round'

  for (let i = 0; i < count; i++) {
    const start = Math.floor((i / count) * bufferLength)
    const end = Math.max(start + 1, Math.floor(((i + 1) / count) * bufferLength))
    let peak = 0
    for (let j = start; j < end; j++) {
      const v = (data[j] - 128) / 128
      const a = Math.abs(v)
      if (a > peak) peak = a
    }

    const eased = Math.pow(peak, 0.7)
    const half = Math.max(minHalf, eased * maxHalf)

    ctx.beginPath()
    ctx.moveTo(x, midY - half)
    ctx.lineTo(x, midY + half)
    ctx.stroke()

    x += step
  }
  ctx.restore()
}

const drawTrack = (lang: string, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const isActive = lang === props.activeLang
  const color = isActive ? props.activeColor : props.inactiveColor

  ctx.clearRect(0, 0, width, height)

  if (isActive && props.isPlaying && props.analyser && dataArray) {
    props.analyser.getByteTimeDomainData(dataArray)
    drawBaseline(ctx, width, height, color, true)
    drawBars(ctx, width, height, dataArray, color)
  } else {
    drawBaseline(ctx, width, height, color, isActive)
  }
}

const tick = () => {
  if (props.analyser && props.isPlaying) {
    const bufferLength = props.analyser.fftSize
    if (!dataArray || dataArray.length !== bufferLength) {
      dataArray = new Uint8Array(bufferLength)
    }
  }

  canvasRefs.forEach((canvas, lang) => {
    drawTrack(lang, canvas)
  })

  frameId = requestAnimationFrame(tick)
}

const startAnimation = () => {
  if (frameId === null) {
    tick()
  }
}

const stopAnimation = () => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId)
    frameId = null
  }
  canvasRefs.forEach((canvas, lang) => {
    drawTrack(lang, canvas)
  })
}

const handleMouseEnter = (lang: string) => {
  if (lang !== props.activeLang) {
    emit('hover', lang)
  }
}

watch(
  () => [props.isPlaying, props.analyser] as const,
  ([playing, analyser]) => {
    if (playing && analyser) {
      startAnimation()
    } else {
      stopAnimation()
    }
  },
  { immediate: true },
)

watch(
  () => props.activeLang,
  () => {
    canvasRefs.forEach((canvas, lang) => {
      drawTrack(lang, canvas)
    })
  },
)

onMounted(() => {
  if (props.isPlaying && props.analyser) {
    startAnimation()
  }
})

onBeforeUnmount(() => {
  stopAnimation()
  resizeObservers.forEach((observer) => observer.disconnect())
  resizeObservers.clear()
  canvasRefs.clear()
})
</script>
