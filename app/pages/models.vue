<template>
  <section class="models-stage relative h-screen w-full overflow-hidden">
    <!-- Background Image - Fixed to cover entire viewport including nav and footer -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        :style="{ backgroundImage: `url(${activeItem?.backgroundImage || '/images/models/default-bg.jpg'})` }"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex h-full w-full pt-16">
      <!-- Left Side - Text Content -->
      <div class="flex w-full flex-col justify-center px-8 md:w-2/5 md:px-12 lg:px-20">
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 100 } }"
          :key="activeIndex"
          class="max-w-lg"
        >
          <h1 class="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {{ activeItem?.title }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-white/80 md:mt-6 md:text-lg">
            {{ activeItem?.description }}
          </p>

          <!-- Bullets -->
          <ul v-if="activeItem?.bullets?.length" class="mt-6 space-y-2">
            <li
              v-for="(bullet, idx) in activeItem.bullets"
              :key="idx"
              class="flex items-start gap-2 text-sm text-white/70 md:text-base"
            >
              <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/50" />
              {{ bullet }}
            </li>
          </ul>

          <!-- CTA Button -->
          <button
            class="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 md:mt-10 md:px-8 md:py-4 md:text-base"
          >
            <span>{{ t('sections.models.createButton') }}</span>
            <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
          </button>
        </div>
      </div>

      <!-- Right Side - Card Carousel -->
      <div class="hidden w-3/5 items-center justify-center md:flex">
        <div class="relative h-[70vh] w-full max-w-3xl">
          <!-- Carousel Cards -->
          <div
            v-for="(item, idx) in carouselItems"
            :key="item.id"
            class="absolute cursor-pointer transition-all duration-500 ease-out"
            :style="getCardStyle(idx)"
            @click="switchItemByIndex(idx)"
          >
            <div
              class="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300"
              :class="[
                idx === activeIndex ? 'ring-2 ring-white/30' : '',
                idx !== activeIndex ? 'hover:scale-[1.02]' : ''
              ]"
              :style="getCardDimensions(idx)"
            >
              <!-- Card Image Placeholder -->
              <div
                class="h-full w-full bg-gradient-to-br from-slate-700 to-slate-900"
                :style="{ backgroundImage: `url(${item.cardImage || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
              >
                <!-- Placeholder content when no image -->
                <div class="flex h-full w-full items-center justify-center">
                  <component
                    :is="item.icon"
                    class="h-16 w-16 text-white/30 md:h-20 md:w-20"
                  />
                </div>
              </div>

              <!-- Card Overlay for non-active cards -->
              <div
                v-if="idx !== activeIndex"
                class="absolute inset-0 bg-black/20 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Card Display -->
    <div class="absolute inset-x-0 bottom-32 flex items-center justify-center px-4 md:hidden">
      <div
        class="relative h-48 w-64 overflow-hidden rounded-2xl shadow-2xl"
      >
        <div
          class="h-full w-full bg-gradient-to-br from-slate-700 to-slate-900"
          :style="{ backgroundImage: `url(${activeItem?.cardImage || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <div class="flex h-full w-full items-center justify-center">
            <component
              :is="activeItem?.icon"
              class="h-12 w-12 text-white/30"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 md:bottom-12">
      <button
        type="button"
        class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 md:h-14 md:w-14"
        :disabled="activeIndex === 0"
        @click="prevItem"
        aria-label="Previous item"
      >
        <ChevronLeft class="h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5 md:h-6 md:w-6" />
      </button>

      <button
        type="button"
        class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 md:h-14 md:w-14"
        :disabled="activeIndex === carouselItems.length - 1"
        @click="nextItem"
        aria-label="Next item"
      >
        <ChevronRight class="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 md:h-6 md:w-6" />
      </button>
    </div>

    <!-- Navigation Dots (Mobile) -->
    <div class="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:hidden">
      <button
        v-for="(_, idx) in carouselItems"
        :key="idx"
        type="button"
        class="h-2 rounded-full transition-all duration-300"
        :class="idx === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'"
        @click="switchItemByIndex(idx)"
        :aria-label="`Go to slide ${idx + 1}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { ArrowRight, AudioLines, ChevronLeft, ChevronRight, Globe, Languages, Layers, SlidersHorizontal } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

definePageMeta({
  layout: 'fullscreen',
})

const { t } = useI18n()
const { siteName } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.models.title')} - ${siteName.value}`),
  description: computed(() => t('sections.models.description')),
})

// --- Data Definition ---

type CarouselItemModel = {
  id: string
  title: string
  description: string
  label?: string
  bullets: string[]
  icon: Component
  backgroundImage: string
  cardImage: string
}

const localeModelData = [
  {
    id: 'thai',
    titleKey: 'models.items.thai.title',
    descriptionKey: 'models.items.thai.description',
    bulletKeys: ['models.items.thai.bullets.0', 'models.items.thai.bullets.1', 'models.items.thai.bullets.2'],
    icon: Languages,
    backgroundImage: '/images/models/thai-bg.jpg',
    cardImage: '/images/models/thai-card.jpg',
  },
  {
    id: 'khmer',
    titleKey: 'models.items.khmer.title',
    descriptionKey: 'models.items.khmer.description',
    bulletKeys: ['models.items.khmer.bullets.0', 'models.items.khmer.bullets.1', 'models.items.khmer.bullets.2'],
    icon: AudioLines,
    backgroundImage: '/images/models/khmer-bg.jpg',
    cardImage: '/images/models/khmer-card.jpg',
  },
] as const

const modelAdvantageData = [
  {
    id: 'corpus',
    titleKey: 'models.advantages.corpus.title',
    descriptionKey: 'models.advantages.corpus.description',
    icon: Globe,
    backgroundImage: '/images/models/corpus-bg.jpg',
    cardImage: '/images/models/corpus-card.jpg',
  },
  {
    id: 'control',
    titleKey: 'models.advantages.control.title',
    descriptionKey: 'models.advantages.control.description',
    icon: SlidersHorizontal,
    backgroundImage: '/images/models/control-bg.jpg',
    cardImage: '/images/models/control-card.jpg',
  },
  {
    id: 'voiceover',
    titleKey: 'models.advantages.voiceover.title',
    descriptionKey: 'models.advantages.voiceover.description',
    icon: AudioLines,
    backgroundImage: '/images/models/voiceover-bg.jpg',
    cardImage: '/images/models/voiceover-card.jpg',
  },
  {
    id: 'delivery',
    titleKey: 'models.advantages.delivery.title',
    descriptionKey: 'models.advantages.delivery.description',
    icon: Layers,
    backgroundImage: '/images/models/delivery-bg.jpg',
    cardImage: '/images/models/delivery-card.jpg',
  },
] as const

const carouselItems = computed<CarouselItemModel[]>(() => {
  const models = localeModelData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    label: 'Language',
    bullets: item.bulletKeys.map((key) => t(key)),
    icon: item.icon,
    backgroundImage: item.backgroundImage,
    cardImage: item.cardImage,
  }))

  const advantages = modelAdvantageData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    label: 'Feature',
    bullets: [],
    icon: item.icon,
    backgroundImage: item.backgroundImage,
    cardImage: item.cardImage,
  }))

  return [...models, ...advantages]
})

// --- Carousel Logic ---

const activeIndex = ref(0)
const activeItem = computed(() => carouselItems.value[activeIndex.value])

// Card positioning styles
const getCardStyle = (index: number) => {
  const offset = index - activeIndex.value
  const absOffset = Math.abs(offset)

  // Position calculations
  const baseX = 50 // Center percentage
  const xOffset = offset * 25 // Horizontal spacing between cards

  // Scale and opacity
  const scale = Math.max(0.6, 1 - absOffset * 0.15)
  const opacity = absOffset === 0 ? 1 : Math.max(0.4, 1 - absOffset * 0.3)
  const zIndex = 10 - absOffset

  // Only show cards within range
  const isVisible = absOffset <= 2

  return {
    left: `${baseX + xOffset}%`,
    top: '50%',
    transform: `translate(-50%, -50%) scale(${scale})`,
    opacity: isVisible ? opacity : 0,
    zIndex,
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
    visibility: (isVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
  }
}

// Card dimensions based on position
const getCardDimensions = (index: number) => {
  const isActive = index === activeIndex.value
  return {
    width: isActive ? '320px' : '240px',
    height: isActive ? '420px' : '320px',
  }
}

const switchItemByIndex = (index: number) => {
  if (index >= 0 && index < carouselItems.value.length) {
    activeIndex.value = index
  }
}

const prevItem = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--
  }
}

const nextItem = () => {
  if (activeIndex.value < carouselItems.value.length - 1) {
    activeIndex.value++
  }
}

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevItem()
    } else if (e.key === 'ArrowRight') {
      nextItem()
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.models-stage {
  perspective: 1000px;
}
</style>
