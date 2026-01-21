<template>
  <div
    ref="containerEl"
    class="relative overflow-hidden"
    :class="wrapperClass"
    :aria-label="ariaLabel"
  >
    <div v-if="framed" class="pointer-events-none absolute inset-0">
      <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-950/70"></div>
      <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-950/70"></div>
      <div class="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(192,132,252,0.18),transparent_60%)]"></div>
    </div>

    <div v-if="reducedMotion" class="relative p-3">
      <div class="flex flex-wrap gap-3">
        <span
          v-for="p in normalizedPartners"
          :key="p.id"
          class="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-800 dark:border-slate-700/40 dark:bg-slate-900/30 dark:text-slate-200"
          :class="p.tier === 'core' ? 'ring-1 ring-emerald-600/20 dark:ring-emerald-400/20' : ''"
        >
          <span class="h-2.5 w-2.5 rounded-full" :style="logoDotStyle(p)"></span>
          <span class="truncate">{{ p.name }}</span>
        </span>
      </div>
    </div>

    <ul v-else class="relative h-full w-full" role="list">
      <li
        v-for="p in normalizedPartners"
        :key="p.id"
        :ref="(el) => setItemEl(p.id, el)"
        class="partner-capsule-item absolute left-0 top-0"
      >
        <component
          :is="p.href ? 'a' : 'button'"
          class="partner-capsule group inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-left text-sm font-semibold shadow-sm shadow-black/10 backdrop-blur transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
          :class="[
            p.tier === 'core'
              ? 'border-emerald-600/25 bg-white/80 text-slate-900 hover:border-emerald-600/40 dark:border-emerald-400/25 dark:bg-slate-900/40 dark:text-slate-50 dark:hover:border-emerald-300/40'
              : 'border-slate-900/10 bg-white/70 text-slate-800 hover:border-slate-900/20 dark:border-slate-700/40 dark:bg-slate-900/30 dark:text-slate-100 dark:hover:border-slate-600/60',
          ]"
          :href="p.href || undefined"
          :target="p.href ? '_blank' : undefined"
          :rel="p.href ? 'noopener noreferrer' : undefined"
          :type="p.href ? undefined : 'button'"
          :data-partner-id="p.id"
          :data-tier="p.tier"
          :title="p.name"
          @pointerenter="setPaused(p.id, true)"
          @pointerleave="setPaused(p.id, false)"
          @focus="setPaused(p.id, true)"
          @blur="setPaused(p.id, false)"
        >
          <span class="partner-capsule-logo h-7 w-7 shrink-0 rounded-full" :style="logoDotStyle(p)"></span>
          <span class="partner-capsule-name truncate">{{ p.name }}</span>
          <span
            v-if="p.tier === 'core'"
            class="hidden items-center rounded-full border border-emerald-600/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200 sm:inline-flex"
          >
            Core
          </span>
        </component>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type PartnerTier = 'core' | 'standard'

export interface PartnerCapsule {
  id?: string
  name: string
  tier?: PartnerTier
  href?: string
  color?: string
}

const props = withDefaults(
  defineProps<{
    partners?: PartnerCapsule[]
    ariaLabel?: string
    framed?: boolean
  }>(),
  {
    partners: () => [],
    ariaLabel: 'Partners',
    framed: true,
  },
)

type NormalizedPartner = Required<Pick<PartnerCapsule, 'name'>> & {
  id: string
  tier: PartnerTier
  href?: string
  hue: number
}

const reducedMotion = ref(false)
const containerEl = ref<HTMLElement | null>(null)
const framed = computed(() => props.framed !== false)
const wrapperClass = computed(() =>
  framed.value ? 'rounded-2xl border border-slate-900/10 bg-white/60 dark:border-slate-700/40 dark:bg-slate-950/20' : 'bg-transparent',
)

const normalizedPartners = computed<NormalizedPartner[]>(() => {
  const raw = props.partners ?? []
  const defaultCoreCount = Math.min(2, raw.length)

  return raw
    .map((p, index) => {
      const name = p.name?.trim() || `Partner ${index + 1}`
      const id = p.id?.trim() || `${index}-${slugify(name)}`
      const tier: PartnerTier = p.tier ?? (index < defaultCoreCount ? 'core' : 'standard')
      const hue = typeof p.color === 'string' ? hueFromColor(p.color) : hueFromName(name)
      return { id, name, tier, href: p.href, hue }
    })
    .filter((p, idx, arr) => arr.findIndex((candidate) => candidate.id === p.id) === idx)
})

const setItemEl = (id: string, el: Element | null) => {
  if (!(el instanceof HTMLElement)) {
    itemEls.delete(id)
    return
  }
  itemEls.set(id, el)
}

const logoDotStyle = (partner: Pick<NormalizedPartner, 'hue'>) => {
  const hue = partner.hue
  return {
    background: `radial-gradient(circle at 30% 30%, hsl(${hue} 92% 70%), hsl(${hue} 82% 48%))`,
  }
}

type ItemState = {
  id: string
  lane: number
  y: number
  x: number
  width: number
  speed: number
  paused: boolean
  delayRemaining: number
  tier: PartnerTier
}

const SPEED_MULTIPLIER = 1.5

const itemEls = new Map<string, HTMLElement>()
let states: ItemState[] = []
let resizeObserver: ResizeObserver | null = null
let rafId: number | null = null
let lastTs = 0
let layoutWidth = 0

const stop = () => {
  if (!import.meta.client) return
  if (rafId != null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
  lastTs = 0
}

const setPaused = (id: string, paused: boolean) => {
  const state = states.find((candidate) => candidate.id === id)
  if (!state) return
  state.paused = paused
  const el = itemEls.get(id)
  if (!el) return
  el.toggleAttribute('data-paused', paused)
}

let reducedMotionMedia: MediaQueryList | null = null
let reducedMotionHandler: ((event: MediaQueryListEvent) => void) | null = null

const measureReducedMotion = () => {
  if (!import.meta.client) return
  reducedMotionMedia = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null
  reducedMotion.value = Boolean(reducedMotionMedia?.matches)

  reducedMotionHandler = (event: MediaQueryListEvent) => {
    reducedMotion.value = event.matches
    if (reducedMotion.value) stop()
    else scheduleInit()
  }

  reducedMotionMedia?.addEventListener?.('change', reducedMotionHandler)
}

let initScheduled = false
const scheduleInit = () => {
  if (!import.meta.client) return
  if (initScheduled) return
  initScheduled = true
  window.requestAnimationFrame(() => {
    initScheduled = false
    void init()
  })
}

const getLaneCount = (containerWidth: number) => {
  if (containerWidth < 640) return 2
  if (containerWidth < 1024) return 3
  return 4
}

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const init = async () => {
  if (!import.meta.client) return
  if (reducedMotion.value) return

  const container = containerEl.value
  if (!container) return

  await nextTick()

  const containerWidth = Math.max(1, container.getBoundingClientRect().width)
  layoutWidth = containerWidth
  const laneCount = Math.max(1, Math.min(getLaneCount(containerWidth), normalizedPartners.value.length || 1))
  const laneHeight = containerWidth < 640 ? 64 : 56

  container.style.height = `${laneCount * laneHeight}px`

  const partnerList = normalizedPartners.value
  const idsInOrder = partnerList.map((p) => p.id)
  const elements = idsInOrder.map((id) => itemEls.get(id)).filter(Boolean) as HTMLElement[]
  if (!elements.length) return

  const measure = (id: string) => {
    const el = itemEls.get(id)
    if (!el) return 0
    const button = el.querySelector<HTMLElement>('.partner-capsule')
    const rect = (button ?? el).getBoundingClientRect()
    return Math.ceil(rect.width)
  }

  const isMobile = containerWidth < 640
  const cursorByLane = new Array<number>(laneCount).fill(containerWidth + randomBetween(120, 320))
  const laneCounts = new Array<number>(laneCount).fill(0)
  const nextDelayPattern = [0, 3, 5, 1.5]

  states = partnerList.map((p, index) => {
    const lane = index % laneCount
    const laneIndex = laneCounts[lane]
    laneCounts[lane] = laneIndex + 1
    const yJitter = randomBetween(-6, 6)
    const y = lane * laneHeight + (laneHeight - 44) / 2 + yJitter
    const width = measure(p.id)
    const durationBase = p.tier === 'core' ? randomBetween(35, 45) : randomBetween(25, 32)
    const duration = durationBase * (isMobile ? 1.25 : 1)
    const travel = containerWidth + width + 120
    const speed = (travel / Math.max(10, duration)) * SPEED_MULTIPLIER
    const gap = randomBetween(isMobile ? 36 : 28, isMobile ? 140 : 110)
    const delayRemaining = laneIndex === 0 ? 0 : nextDelayPattern[index % nextDelayPattern.length]

    const safePadding = 16
    const maxVisibleX = Math.max(safePadding, containerWidth - width - safePadding)
    const visibleX = Math.min(
      maxVisibleX,
      Math.max(safePadding, randomBetween(containerWidth * 0.12, containerWidth * 0.6)),
    )

    const x = laneIndex === 0 ? visibleX : cursorByLane[lane]
    cursorByLane[lane] = Math.max(x + width + gap, containerWidth + randomBetween(80, 220))
    return { id: p.id, lane, y, x, width, speed, paused: false, delayRemaining, tier: p.tier }
  })

  states.forEach((state) => {
    const el = itemEls.get(state.id)
    if (!el) return
    applyPosition(el, state)
  })

  stop()
  rafId = window.requestAnimationFrame(tick)
}

const applyPosition = (el: HTMLElement, state: ItemState) => {
  el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
  const capsule = el.querySelector<HTMLElement>('.partner-capsule')
  if (capsule) {
    const shadowOffset = Math.round(Math.min(12, Math.max(4, state.speed * 0.08)))
    capsule.style.setProperty('--shadow-x', `${shadowOffset}px`)
  }
}

const restartLogoFade = (id: string) => {
  const el = itemEls.get(id)
  const logo = el?.querySelector<HTMLElement>('.partner-capsule-logo')
  if (!logo) return
  logo.style.animation = 'none'
  void logo.offsetHeight
  logo.style.animation = ''
}

const tick = (ts: number) => {
  if (!import.meta.client) return
  if (reducedMotion.value) return
  if (!containerEl.value) return
  const containerWidth = Math.max(1, layoutWidth)
  const dt = lastTs === 0 ? 0 : Math.min(0.05, (ts - lastTs) / 1000)
  lastTs = ts

  const laneEnds = new Map<number, number>()
  states.forEach((state) => {
    const end = state.x + state.width
    laneEnds.set(state.lane, Math.max(laneEnds.get(state.lane) ?? -Infinity, end))
  })

  const resetBuffer = 140
  states.forEach((state) => {
    const el = itemEls.get(state.id)
    if (!el) return

    if (state.delayRemaining > 0) {
      state.delayRemaining = Math.max(0, state.delayRemaining - dt)
      applyPosition(el, state)
      return
    }

    if (!state.paused) {
      state.x -= state.speed * dt
    }

    const isOut = state.x + state.width < -resetBuffer
    if (isOut) {
      const laneEnd = laneEnds.get(state.lane) ?? containerWidth
      const isCore = state.tier === 'core'
      const baseGap = isCore ? 92 : 64
      const jitter = randomBetween(-18, 28)
      const gap = Math.max(44, baseGap + jitter)
      state.x = Math.max(containerWidth + 40, laneEnd + gap)
      laneEnds.set(state.lane, state.x + state.width)
      restartLogoFade(state.id)
    }

    applyPosition(el, state)
  })

  rafId = window.requestAnimationFrame(tick)
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const hueFromName = (value: string) => {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  return hash % 360
}

const hueFromColor = (color: string) => {
  const hex = color.trim().replace('#', '')
  if (!/^[0-9a-fA-F]{3,8}$/.test(hex)) return hueFromName(color)
  const raw = hex.length === 3 ? hex.split('').map((ch) => ch + ch).join('') : hex.slice(0, 6)
  const r = parseInt(raw.slice(0, 2), 16) / 255
  const g = parseInt(raw.slice(2, 4), 16) / 255
  const b = parseInt(raw.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  if (delta === 0) return 0

  let hue = 0
  if (max === r) hue = ((g - b) / delta) % 6
  else if (max === g) hue = (b - r) / delta + 2
  else hue = (r - g) / delta + 4
  return Math.round(hue * 60 + (hue < 0 ? 360 : 0))
}

onMounted(() => {
  if (!import.meta.client) return
  measureReducedMotion()
  scheduleInit()

  const container = containerEl.value
  if (!container || typeof ResizeObserver === 'undefined') return

  resizeObserver = new ResizeObserver(() => scheduleInit())
  resizeObserver.observe(container)
})

watch(
  () => normalizedPartners.value.map((p) => `${p.id}:${p.name}:${p.tier}:${p.href ?? ''}`).join('|'),
  () => {
    if (!import.meta.client) return
    scheduleInit()
  },
  { flush: 'post' },
)

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  resizeObserver = null
  layoutWidth = 0
  if (reducedMotionMedia && reducedMotionHandler) {
    reducedMotionMedia.removeEventListener?.('change', reducedMotionHandler)
  }
  reducedMotionMedia = null
  reducedMotionHandler = null
  itemEls.clear()
  states = []
})
</script>

<style scoped>
.partner-capsule-item {
  will-change: transform;
}

.partner-capsule {
  width: clamp(220px, 80vw, 420px);
  transform-origin: center;
  box-shadow: calc(var(--shadow-x, 8px) * 1) 10px 24px rgba(0, 0, 0, 0.2);
}

.partner-capsule-logo {
  opacity: 0;
  animation: partner-logo-fade 800ms ease-out both;
}

.partner-capsule-item[data-paused] .partner-capsule {
  transform: scale(1.03);
  box-shadow: calc(var(--shadow-x, 8px) * 1) 14px 34px rgba(0, 0, 0, 0.28);
}

@media (min-width: 640px) {
  .partner-capsule {
    width: auto;
    max-width: 420px;
  }
}

@keyframes partner-logo-fade {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
