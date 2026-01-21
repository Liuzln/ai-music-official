<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
let gsapApi: any | null = null

const loadGsap = async () => {
  if (gsapApi) return gsapApi
  const mod = await import('gsap')
  gsapApi = (mod as any).gsap ?? (mod as any).default ?? mod
  return gsapApi
}

const prefersReducedMotion = () =>
  import.meta.client && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)

const pageTransition = {
  mode: 'out-in',
  css: false,
  onBeforeEnter(el: Element) {
    const node = el as HTMLElement
    node.style.opacity = '0'
    node.style.transform = 'translate3d(0, 12px, 0) scale(0.99)'
    node.style.willChange = 'transform, opacity'
  },
  async onEnter(el: Element, done: () => void) {
    if (!import.meta.client || prefersReducedMotion()) {
      const node = el as HTMLElement
      node.style.opacity = '1'
      node.style.transform = ''
      node.style.willChange = ''
      done()
      return
    }

    const gsap = await loadGsap().catch(() => null)
    if (!gsap) {
      done()
      return
    }

    gsap.killTweensOf(el)
    let doneCalled = false
    const safeDone = () => {
      if (doneCalled) return
      doneCalled = true
      gsap.set(el, { clearProps: 'willChange' })
      done()
    }

    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.38,
      ease: 'power3.out',
      onComplete: safeDone,
      onInterrupt: safeDone,
      overwrite: 'auto',
    })
  },
  onBeforeLeave(el: Element) {
    const node = el as HTMLElement
    node.style.willChange = 'transform, opacity'
  },
  async onLeave(el: Element, done: () => void) {
    if (!import.meta.client || prefersReducedMotion()) {
      done()
      return
    }

    const gsap = await loadGsap().catch(() => null)
    if (!gsap) {
      done()
      return
    }

    gsap.killTweensOf(el)
    let doneCalled = false
    const safeDone = () => {
      if (doneCalled) return
      doneCalled = true
      gsap.set(el, { clearProps: 'willChange' })
      done()
    }

    gsap.to(el, {
      opacity: 0,
      y: -10,
      scale: 0.99,
      duration: 0.22,
      ease: 'power2.inOut',
      onComplete: safeDone,
      onInterrupt: safeDone,
      overwrite: 'auto',
    })
  },
} as const
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
