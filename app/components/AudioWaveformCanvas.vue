<template>
  <div class="relative h-full w-full">
    <canvas ref="canvasRef" class="h-full w-full"></canvas>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    analyser?: AnalyserNode | null
    active?: boolean
    variant?: 'bars' | 'line'
    color?: string
    inactiveColor?: string
    lineWidth?: number
    barWidth?: number
    barGap?: number
    barCount?: number
    minBarHeight?: number
    dottedBaseline?: boolean
  }>(),
  {
    analyser: null,
    active: false,
    variant: 'bars',
    color: '#6ee7b7',
    inactiveColor: '#ffffff',
    lineWidth: 2,
    barWidth: 3,
    barGap: 3,
    barCount: 0,
    minBarHeight: 1.5,
    dottedBaseline: true,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)

let frameId: number | null = null
let resizeObserver: ResizeObserver | null = null
let dataArray: Uint8Array | null = null
let pixelRatio = 1

const stop = () => {
  if (frameId != null) {
    cancelAnimationFrame(frameId)
    frameId = null
  }
}

const drawIdle = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height)
  drawBaseline(ctx, width, height, { active: false })
}

const drawBaseline = (ctx: CanvasRenderingContext2D, width: number, height: number, options: { active: boolean }) => {
  const y = Math.round(height / 2) + 0.5

  ctx.save()
  ctx.lineWidth = Math.max(1, props.lineWidth * pixelRatio)
  ctx.lineCap = 'round'

  ctx.strokeStyle = options.active ? props.color : props.inactiveColor
  ctx.globalAlpha = options.active ? 0.35 : 0.5

  if (props.dottedBaseline) {
    const dash = Math.max(2, 2.5 * pixelRatio)
    const gap = Math.max(6, 7 * pixelRatio)
    ctx.setLineDash([dash, gap])
  } else {
    ctx.setLineDash([])
  }

  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
  ctx.stroke()
  ctx.restore()
}

const drawLine = (ctx: CanvasRenderingContext2D, width: number, height: number, data: Uint8Array) => {
  ctx.clearRect(0, 0, width, height)
  drawBaseline(ctx, width, height, { active: true })

  ctx.save()
  ctx.setLineDash([])
  ctx.lineWidth = Math.max(1, props.lineWidth * pixelRatio)
  ctx.strokeStyle = props.color
  ctx.globalAlpha = 0.9
  ctx.beginPath()

  const bufferLength = data.length
  const sliceWidth = width / bufferLength
  let x = 0
  for (let i = 0; i < bufferLength; i++) {
    const v = data[i] / 128.0
    const y = (v * height) / 2
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
    x += sliceWidth
  }
  ctx.stroke()
  ctx.restore()
}

const drawBars = (ctx: CanvasRenderingContext2D, width: number, height: number, data: Uint8Array) => {
  ctx.clearRect(0, 0, width, height)
  drawBaseline(ctx, width, height, { active: true })

  const dpr = pixelRatio
  const barWidthPx = Math.max(1, props.barWidth * dpr)
  const gapPx = Math.max(0, props.barGap * dpr)
  const step = barWidthPx + gapPx
  const maxBars = Math.max(1, Math.floor(width / step))
  const count = props.barCount && props.barCount > 0 ? Math.min(props.barCount, maxBars) : maxBars
  const totalWidth = count * step - gapPx
  let x = (width - totalWidth) / 2 + barWidthPx / 2

  const midY = height / 2
  const maxHalf = height * 0.42
  const minHalf = Math.max(0, props.minBarHeight * dpr) / 2
  const bufferLength = data.length

  ctx.save()
  ctx.setLineDash([])
  ctx.strokeStyle = props.color
  ctx.globalAlpha = 0.95
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

const draw = () => {
  const canvas = canvasRef.value
  const analyser = props.analyser
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height

  if (!analyser || !props.active) {
    drawIdle(ctx, width, height)
    return
  }

  const bufferLength = analyser.fftSize
  if (!dataArray || dataArray.length !== bufferLength) dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)

  if (props.variant === 'line') drawLine(ctx, width, height, dataArray)
  else drawBars(ctx, width, height, dataArray)
}

const tick = () => {
  draw()
  frameId = requestAnimationFrame(tick)
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  pixelRatio = dpr
  const nextWidth = Math.max(1, Math.floor(rect.width * dpr))
  const nextHeight = Math.max(1, Math.floor(rect.height * dpr))
  if (canvas.width !== nextWidth) canvas.width = nextWidth
  if (canvas.height !== nextHeight) canvas.height = nextHeight
  draw()
}

onMounted(() => {
  resizeCanvas()
  resizeObserver = new ResizeObserver(resizeCanvas)
  if (canvasRef.value) resizeObserver.observe(canvasRef.value)
  draw()
  if (props.active) tick()
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(
  () => [props.active, props.analyser] as const,
  () => {
    if (!props.active) {
      stop()
      draw()
      return
    }

    if (frameId == null) tick()
  },
)
</script>
