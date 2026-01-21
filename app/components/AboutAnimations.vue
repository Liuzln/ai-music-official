<template>
  <section ref="sceneContainer" class="scene-container relative h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
    <!-- Background Overlay for color transition -->
    <div class="background-overlay absolute inset-0 bg-indigo-50 dark:bg-slate-800 opacity-0"></div>
    
    <!-- The Mask Container (Sheep Head / Window) -->
    <!-- Using SVG clipPath for the masking effect -->
    <div class="mask-wrapper absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <clipPath id="sheep-mask" clipPathUnits="objectBoundingBox">
            <!-- A simplified cloud/sheep shape -->
            <path d="M0.5,0.2 C0.6,0.2 0.7,0.25 0.75,0.35 C0.85,0.35 0.9,0.45 0.9,0.55 C0.9,0.65 0.8,0.75 0.7,0.75 C0.6,0.85 0.4,0.85 0.3,0.75 C0.2,0.75 0.1,0.65 0.1,0.55 C0.1,0.45 0.15,0.35 0.25,0.35 C0.3,0.25 0.4,0.2 0.5,0.2 Z" />
          </clipPath>
        </defs>
      </svg>
      
      <!-- The element that gets masked -->
      <!-- We scale this container up/down. Its content (the inner image) moves for parallax -->
      <div class="masked-content-container absolute inset-0 flex items-center justify-center" style="clip-path: url(#sheep-mask);">
        <div class="content-inside relative w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600">
          <!-- Inner content (Image or Pattern) -->
          <div class="inner-image absolute inset-0 flex items-center justify-center opacity-80">
             <!-- Placeholder pattern -->
             <div class="grid grid-cols-6 gap-4 p-4 transform rotate-12 scale-150">
               <div v-for="n in 24" :key="n" class="w-32 h-32 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center text-4xl">
                 🐑
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Text Layer -->
    <div class="text-layer absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
      <div class="title-container">
        <h1 class="text-5xl md:text-8xl font-black text-slate-900 dark:text-white text-center tracking-tighter">
          {{ title }}
        </h1>
      </div>
      
      <div class="cards-container mt-12 flex flex-col md:flex-row gap-6">
        <div class="info-card card-1 translate-y-20 opacity-0 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xl border border-white/20 dark:border-slate-700 max-w-sm">
          <p class="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200">
            {{ description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-30">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
  title?: string
  description?: string
}>()

const sceneContainer = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneContainer.value,
        start: "top top",
        end: "+=2000", // Scroll distance
        scrub: 1, // Smooth scrubbing
        pin: true, // Pin the container
        // markers: true, // Debug markers
      }
    })

    // 1. Background Color Transition
    tl.to(".background-overlay", { 
      opacity: 1, 
      duration: 1 
    })

    // 2. Mask Animation (Scale up/down)
    // Removed opacity: 0 to ensure it's visible initially
    .from(".masked-content-container", {
      scale: 0.8, 
      rotation: -5,
      duration: 1.5,
      ease: "power2.out"
    }, "<") // Start at same time

    // 3. Inner Content Parallax
    // Move the content inside the mask opposite to scroll direction or at different speed
    .to(".inner-image", {
      y: -100,
      rotation: -12, // Counter-rotate to stabilize or add effect
      scale: 1.2,
      ease: "none",
      duration: 2
    }, "<")

    // 4. Text Reveal
    // Title is initially visible, we move it slightly or fade it as we scroll
    .to(".title-container", {
      y: -50,
      scale: 0.95,
      duration: 1
    }, "<")
    
    // The info card appears as we scroll
    .to(".card-1", {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.5")

  }, sceneContainer.value!)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
.scene-container {
  /* Ensure it takes full viewport */
  height: 100vh;
}
</style>
