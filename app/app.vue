<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const prefersReducedMotion = () =>
  import.meta.client && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)

const pageTransition = {
  name: 'page',
  mode: 'out-in',
  css: false,
  onLeave(el: Element, done: () => void) {
    if (prefersReducedMotion()) {
      done()
      return
    }
    
    gsap.to(el, {
      opacity: 0,
      y: -10,
      filter: 'blur(4px)',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: done
    })
  },
  onEnter(el: Element, done: () => void) {
    if (prefersReducedMotion()) {
      done()
      return
    }

    gsap.fromTo(el,
      {
        opacity: 0,
        y: 10,
        filter: 'blur(4px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        onComplete: done
      }
    )
  },
} as const
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
