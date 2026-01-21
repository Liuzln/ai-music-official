type TiltOptions = {
  maxDeg: number
  disabled: boolean
}

type TiltState = {
  frame: number | null
  pointerX: number
  pointerY: number
  opts: TiltOptions
  prefersReducedMotion: boolean
  media: MediaQueryList | null
  onEnter: (event: PointerEvent) => void
  onMove: (event: PointerEvent) => void
  onLeave: () => void
  onMediaChange: ((event: MediaQueryListEvent) => void) | null
}

const tiltStateKey = '__nuxtTiltState__'

function getOptions(binding: { value?: unknown }): TiltOptions {
  const value = binding.value
  if (typeof value === 'number' && Number.isFinite(value)) return { maxDeg: value, disabled: false }
  if (value && typeof value === 'object' && 'maxDeg' in (value as any)) {
    const maxDeg = (value as any).maxDeg
    const disabled = Boolean((value as any).disabled)
    if (typeof maxDeg === 'number' && Number.isFinite(maxDeg)) return { maxDeg, disabled }
    return { maxDeg: 10, disabled }
  }
  if (value && typeof value === 'object' && 'disabled' in (value as any)) {
    return { maxDeg: 10, disabled: Boolean((value as any).disabled) }
  }
  return { maxDeg: 10, disabled: false }
}

function isMousePointer(event: PointerEvent) {
  return event.pointerType === 'mouse' || event.pointerType === ''
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tilt', {
    mounted(el, binding) {
      const element = el as HTMLElement & Record<string, unknown>
      const opts = getOptions(binding)

      const state: TiltState = {
        frame: null,
        pointerX: 0,
        pointerY: 0,
        opts,
        prefersReducedMotion: false,
        media: null,
        onEnter: () => {},
        onMove: () => {},
        onLeave: () => {},
        onMediaChange: null,
      }

      const update = () => {
        state.frame = null
        if (state.opts.disabled) return
        if (state.prefersReducedMotion) return

        const rect = element.getBoundingClientRect()
        const x = state.pointerX - rect.left
        const y = state.pointerY - rect.top
        const px = Math.min(1, Math.max(0, x / rect.width))
        const py = Math.min(1, Math.max(0, y / rect.height))

        const nx = (px - 0.5) * 2
        const ny = (py - 0.5) * 2

        element.style.setProperty('--tilt-rx', `${(-ny * state.opts.maxDeg).toFixed(2)}deg`)
        element.style.setProperty('--tilt-ry', `${(nx * state.opts.maxDeg).toFixed(2)}deg`)
      }

      const schedule = () => {
        if (state.frame != null) return
        state.frame = requestAnimationFrame(update)
      }

      state.onEnter = (event: PointerEvent) => {
        if (!isMousePointer(event)) return
        if (state.opts.disabled) return
        if (state.prefersReducedMotion) return

        element.classList.add('is-tilting')
        state.pointerX = event.clientX
        state.pointerY = event.clientY
        schedule()
      }

      state.onMove = (event: PointerEvent) => {
        if (!isMousePointer(event)) return
        if (state.opts.disabled) return
        if (state.prefersReducedMotion) return

        state.pointerX = event.clientX
        state.pointerY = event.clientY
        schedule()
      }

      state.onLeave = () => {
        element.classList.remove('is-tilting')
        element.style.setProperty('--tilt-rx', '0deg')
        element.style.setProperty('--tilt-ry', '0deg')

        if (state.frame != null) {
          cancelAnimationFrame(state.frame)
          state.frame = null
        }
      }

      element.style.setProperty('--tilt-rx', '0deg')
      element.style.setProperty('--tilt-ry', '0deg')

      state.media = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null
      state.prefersReducedMotion = state.media?.matches ?? false
      state.onMediaChange = (event: MediaQueryListEvent) => {
        state.prefersReducedMotion = event.matches
        if (state.prefersReducedMotion) state.onLeave()
      }
      state.media?.addEventListener?.('change', state.onMediaChange)

      element.addEventListener('pointerenter', state.onEnter)
      element.addEventListener('pointermove', state.onMove)
      element.addEventListener('pointerleave', state.onLeave)

      element[tiltStateKey] = state
    },
    updated(el, binding) {
      const element = el as HTMLElement & Record<string, unknown>
      const state = element[tiltStateKey] as TiltState | undefined
      if (!state) return

      state.opts = getOptions(binding)
      if (state.opts.disabled) state.onLeave()
    },
    unmounted(el) {
      const element = el as HTMLElement & Record<string, unknown>
      const state = element[tiltStateKey] as TiltState | undefined
      if (!state) return

      element.removeEventListener('pointerenter', state.onEnter)
      element.removeEventListener('pointermove', state.onMove)
      element.removeEventListener('pointerleave', state.onLeave)

      state.media?.removeEventListener?.('change', state.onMediaChange as any)

      if (state.frame != null) cancelAnimationFrame(state.frame)
      delete element[tiltStateKey]
    },
  })
})
