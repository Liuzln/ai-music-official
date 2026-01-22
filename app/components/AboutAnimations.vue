<template>
  <div ref="wrapper" class="about-experience-wrapper relative w-full overflow-x-hidden bg-slate-50 dark:bg-slate-900 -mt-[61px] pt-[61px]">
    <!-- Navigation Dots -->
    <nav
      class="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center rounded-full border border-slate-900/10 bg-white/60 px-1 py-2 shadow-lg backdrop-blur-md dark:border-white/20 dark:bg-white/10 md:flex"
      :aria-label="t('about.nav.ariaLabel')"
    >
      <button
        v-for="(item, idx) in navItems"
        :key="item.id"
        type="button"
        class="group p-2"
        :aria-label="t(item.labelKey)"
        :title="t(item.labelKey)"
        :aria-current="idx === activeSectionIndex ? 'true' : 'false'"
        @click="scrollToSection(idx)"
      >
        <span
          class="block w-2 rounded-full transition-all duration-300"
          :class="
            idx === activeSectionIndex
              ? 'h-8 bg-slate-900 dark:bg-white'
              : 'h-2 bg-slate-900/30 group-hover:bg-slate-900/50 dark:bg-white/40 dark:group-hover:bg-white/70'
          "
        />
      </button>
    </nav>

    <!-- Section 1: Hero / Parallax -->
    <section class="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center" :data-color="sectionColors.hero">
      <!-- Layers for Parallax -->
       <div class="layer character absolute inset-0 flex items-center justify-center pointer-events-none">
          <!-- Abstract Character Representation -->
          <div class="relative w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#F4A4A4] rounded-full opacity-90 blur-3xl translate-y-20"></div>
          <div class="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] bg-[#FFD700] rounded-full opacity-60 blur-2xl -translate-x-20 -translate-y-20"></div>
       </div>
       
       <!-- Clouds / Foreground -->
       <div class="layer cloud-front absolute inset-x-0 bottom-0 h-1/3 md:h-1/2 bg-slate-900/5 backdrop-blur-sm border-t border-slate-900/10 rounded-t-[50%] transform translate-y-1/4 scale-110 dark:bg-white/10 dark:border-white/20"></div>
       
       <div class="layer text-content relative z-10 text-center px-4 max-w-4xl mx-auto">
         <h1 class="hero-title text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6 opacity-0">
           {{ title }}
         </h1>
         <p class="description-text text-lg md:text-2xl font-medium text-slate-800 dark:text-slate-200 opacity-0 leading-relaxed">
           {{ description }}
         </p>
       </div>
       
       <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </section>

    <!-- Section 2: Horizontal Scroll / Commercial Cases -->
    <section class="team-section relative h-screen w-full overflow-hidden flex flex-col justify-center" :data-color="sectionColors.cases">
      <div class="absolute top-10 left-4 md:top-20 md:left-20 z-10">
        <h2
          class="team-title text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase opacity-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
        >
          {{ t('about.cases.title') }}
        </h2>
      </div>
      
      <div ref="cardsContainer" class="cards-container flex items-center gap-10 md:gap-20 px-10 md:px-20 w-fit h-full pt-20">
        
        <div 
            v-for="(c, idx) in commercialCases" 
            :key="c.id"
            class="team-card w-[85vw] md:w-[600px] h-[65vh] md:h-[70vh] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between flex-shrink-0 relative shadow-2xl border transition-colors duration-500"
            :class="
              idx % 2 === 0
                ? 'bg-white/75 text-slate-900 border-slate-900/10 dark:bg-[#1a1a1a] dark:text-white dark:border-white/10'
                : 'bg-[#FAD0C4] text-slate-900 border-black/5'
            "
        >
             <div 
                class="absolute top-8 right-8 px-6 py-2 rounded-full font-black text-xl shadow-lg transform hover:scale-110 transition-transform"
                :class="idx % 2 === 0 ? 'bg-[#F0F0F0] text-black rotate-12' : 'bg-[#1a1a1a] text-white -rotate-6'"
            >
                #{{ idx + 1 }}
             </div>
             
             <div class="mt-8 flex-1 flex flex-col">
               <div class="mb-6">
                  <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 hover:rotate-3 hover:scale-110 mb-4"
                     :class="idx % 2 === 0 ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'"
                  >
                    <component :is="c.icon" class="h-7 w-7" />
                  </span>
                  <h3 class="text-4xl md:text-5xl font-black mb-2 tracking-tighter">{{ c.title }}</h3>
               </div>
               
               <div class="w-20 h-2 rounded-full mb-6" :class="idx % 2 === 0 ? 'bg-indigo-500' : 'bg-pink-500'"></div>
               
               <p
                 class="text-lg md:text-xl leading-relaxed font-light mb-8"
                 :class="idx % 2 === 0 ? 'text-slate-700 dark:text-gray-300' : 'text-slate-700'"
               >
                 {{ c.description }}
               </p>

               <div class="grid grid-cols-2 gap-3 mt-auto">
                    <div
                      v-for="(m, mIdx) in c.metrics"
                      :key="`${c.id}-metric-${mIdx}`"
                      class="rounded-2xl p-3 backdrop-blur-sm"
                      :class="idx % 2 === 0 ? 'bg-slate-900/5 dark:bg-white/10' : 'bg-white/40'"
                    >
                      <div class="text-xs opacity-70 mb-1">{{ m.label }}</div>
                      <div class="text-lg font-bold">{{ m.value }}</div>
                    </div>
                </div>
             </div>
             
             <p
               class="mt-6 text-xs opacity-60 font-mono border-t pt-4"
               :class="idx % 2 === 0 ? 'border-slate-900/10 dark:border-white/20' : 'border-black/10'"
             >
                {{ c.note }}
             </p>
        </div>
        
        <!-- Placeholder for extra scroll space -->
        <div class="w-20 flex-shrink-0"></div>
      </div>
    </section>

    <!-- Section 3: Awards & Partners -->
    <section class="awards-section relative min-h-screen w-full py-24 px-4" :data-color="sectionColors.awards">
      <div class="pointer-events-none absolute inset-0 opacity-50">
        <div class="absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(16,185,129,0.14),transparent_55%)]"></div>
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent dark:via-white/10"></div>
      </div>

      <div class="relative mx-auto w-full max-w-6xl">
        <header class="awards-header mx-auto mb-14 max-w-3xl text-center">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wider text-slate-700 shadow-sm shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <Trophy class="h-4 w-4 text-yellow-500" />
            <span>{{ t('about.awards.title') }}</span>
          </div>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {{ t('about.awards.title') }}
          </h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-300/80 leading-relaxed">
            {{ t('about.awards.description') }}
          </p>
        </header>

        <div class="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(a, idx) in awards"
            :key="a.id"
            class="award-card group relative overflow-hidden rounded-3xl border border-slate-900/10 bg-white/75 shadow-sm shadow-black/5 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100/80 dark:bg-slate-900/50">
              <div class="absolute left-4 top-4 z-10 flex items-center gap-2">
                <span
                  v-if="awardYear(a)"
                  class="rounded-full border border-slate-900/10 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
                >
                  {{ awardYear(a) }}
                </span>
                <span
                  class="rounded-full border border-slate-900/10 bg-white/80 px-2.5 py-1 text-[11px] font-mono text-slate-700 backdrop-blur dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
                >
                  #{{ idx + 1 }}
                </span>
              </div>

              <img
                v-if="a.image"
                :src="a.image"
                :alt="a.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full flex-col items-center justify-center gap-3">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/15 text-yellow-500">
                  <Trophy class="h-7 w-7" />
                </div>
                <span class="text-xs text-slate-600 dark:text-slate-400 font-mono border border-slate-900/10 dark:border-slate-700 px-2 py-1 rounded">
                  {{ t('about.awards.noImage') }}
                </span>
              </div>

              <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.15),transparent_60%)]"></div>
            </div>

            <div class="p-7">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {{ a.title }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-300/80">
                {{ a.subtitle }}
              </p>
            </div>
          </article>
        </div>

        <div class="gov-card rounded-3xl border border-slate-900/10 bg-white/70 p-8 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/5">
          <div class="flex items-start gap-4 mb-6">
            <div class="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-300">
              <Building2 class="h-6 w-6" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('about.government.title') }}</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300/80">{{ t('about.government.description') }}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="badge in governmentBadges"
              :key="badge"
              class="px-4 py-2 rounded-full bg-slate-900/5 text-slate-700 text-sm border border-slate-900/10 hover:bg-slate-900/10 transition-colors cursor-default dark:bg-slate-700/50 dark:text-slate-200 dark:border-white/10 dark:hover:bg-white/10"
            >
              {{ badge }}
            </span>
          </div>
        </div>

        <div class="partners-section mt-14 border-t border-slate-900/10 pt-12 dark:border-white/10">
          <div class="partners-header flex items-center gap-4 mb-3">
            <div class="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-300">
              <Handshake class="h-6 w-6" />
            </div>
            <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{{ t('about.partners.title') }}</h3>
          </div>
          <p class="mb-6 text-sm md:text-base text-slate-600 dark:text-slate-300/80">
            {{ t('about.partners.description') }}
          </p>
          <div class="partners-stream relative left-1/2 w-screen -translate-x-1/2">
            <PartnerCapsuleStream :partners="partners || []" aria-label="Partners stream" :framed="false" />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Footer / Contact -->
    <section
      class="footer-section relative h-screen w-full flex items-center justify-center text-slate-900 dark:text-white overflow-hidden"
      :data-color="sectionColors.contact"
    >
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div class="star absolute top-[20%] left-[20%] w-2 h-2 bg-slate-900/40 rounded-full animate-pulse dark:bg-white"></div>
        <div class="star absolute top-[50%] right-[30%] w-3 h-3 bg-slate-900/40 rounded-full animate-pulse delay-75 dark:bg-white"></div>
        <div class="star absolute bottom-[30%] left-[40%] w-2 h-2 bg-slate-900/40 rounded-full animate-pulse delay-150 dark:bg-white"></div>
      </div>

      <div class="text-center z-10 px-4 w-full max-w-4xl">
        <h2 class="contact-title text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter opacity-0">
          {{ t('about.contact.title') }}
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8 mt-12 text-left">
            <!-- Email -->
            <div class="contact-card bg-white/70 backdrop-blur-md border border-slate-900/10 rounded-3xl p-8 hover:bg-white transition-colors dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 opacity-0">
                <div class="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                    <Mail class="h-6 w-6" />
                    <span class="font-bold tracking-wider text-sm uppercase">{{ t('contact.actions.email') }}</span>
                </div>
                <div class="text-2xl font-medium text-slate-900 dark:text-white break-all mb-6">
                    {{ contactEmail || t('contact.email.placeholder') }}
                </div>
                <button 
                    @click="$emit('copy-contact', 'email')"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors dark:text-white/60 dark:hover:text-white"
                >
                    <Copy class="h-4 w-4" />
                    {{ t('contact.actions.copyEmail') }}
                </button>
            </div>

            <!-- WeChat -->
            <div class="contact-card bg-white/70 backdrop-blur-md border border-slate-900/10 rounded-3xl p-8 hover:bg-white transition-colors dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 opacity-0">
                <div class="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                    <QrCode class="h-6 w-6" />
                    <span class="font-bold tracking-wider text-sm uppercase">{{ t('contact.wechat.label') }}</span>
                </div>
                 <div class="flex gap-6">
                    <div class="flex-1">
                        <div class="text-2xl font-medium text-slate-900 dark:text-white mb-6">
                            {{ contactWeChat || t('contact.wechat.placeholder') }}
                        </div>
                        <button 
                             @click="$emit('copy-contact', 'wechat')"
                            class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors dark:text-white/60 dark:hover:text-white"
                        >
                            <Copy class="h-4 w-4" />
                            {{ t('contact.actions.copyWeChat') }}
                        </button>
                    </div>
                    <div class="w-24 h-24 bg-white p-2 rounded-xl shrink-0" v-if="contactWeChatQr">
                        <img :src="contactWeChatQr" :alt="t('contact.wechat.qrAlt')" class="w-full h-full object-cover" />
                    </div>
                    <div class="w-24 h-24 bg-slate-900/5 rounded-xl shrink-0 flex items-center justify-center text-xs text-slate-500 dark:bg-white/10 dark:text-white/40" v-else>
                        {{ t('contact.wechat.noQr') }}
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
    Mail, Trophy, Building2, Handshake, Copy, QrCode 
} from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

interface Metric {
    label: string
    value: string
}

interface Case {
    id: string
    title: string
    description: string
    note: string
    metrics: Metric[]
    icon: any
}

interface Award {
    id: string
    title: string
    subtitle: string
    image: string
}

interface Partner {
    id?: string
    name: string
    tier?: 'core' | 'standard'
    href?: string
    color?: string
}

const props = defineProps<{
  title?: string
  description?: string
  siteName?: string
  commercialCases?: Case[]
  awards?: Award[]
  governmentBadges?: string[]
  partners?: Partner[]
  contactEmail?: string
  contactWeChat?: string
  contactWeChatQr?: string
}>()

defineEmits<{
    (e: 'copy-contact', target: 'wechat' | 'email'): void
}>()

const { t } = useI18n()
const { resolved: resolvedTheme } = useThemeMode()
const isDark = computed(() => resolvedTheme.value === 'dark')

const awardYear = (award: Pick<Award, 'subtitle'>) => {
  const subtitle = award?.subtitle ?? ''
  const match = subtitle.match(/(19|20)\d{2}/)
  return match?.[0] ?? ''
}

const sectionColors = computed(() => ({
  hero: '#FF8F3F',
  cases: '#FF6B00',
  awards: isDark.value ? '#0F172A' : '#F8FAFC',
  contact: isDark.value ? '#000000' : '#F1F5F9',
}))

const wrapper = ref<HTMLElement | null>(null)
const cardsContainer = ref<HTMLElement | null>(null)
const activeSectionIndex = ref(0)
let ctx: gsap.Context

const navItems = [
  { id: 'hero', selector: '.hero-section', labelKey: 'about.nav.intro' },
  { id: 'cases', selector: '.team-section', labelKey: 'about.cases.title' },
  { id: 'awards', selector: '.awards-section', labelKey: 'about.nav.awardsPartners' },
  { id: 'contact', selector: '.footer-section', labelKey: 'sections.contact.title' },
] as const

const getHeaderOffset = () => {
  if (!import.meta.client) return 0
  const header = document.querySelector('header')
  if (!(header instanceof HTMLElement)) return 0
  return Math.ceil(header.getBoundingClientRect().height)
}

const scrollToSection = (index: number) => {
  if (!import.meta.client) return
  syncSectionElements()
  const item = navItems[index]
  if (!item) return

  const el =
    sectionElements.value[index] ??
    ((wrapper.value?.querySelector(item.selector) as HTMLElement | null) ?? (document.querySelector(item.selector) as HTMLElement | null))
  if (!el) return

  const headerOffset = getHeaderOffset()
  const targetTop = window.scrollY + el.getBoundingClientRect().top - headerOffset
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
  activeSectionIndex.value = index
}

const sectionElements = ref<(HTMLElement | null)[]>([])

const syncSectionElements = () => {
  if (!wrapper.value) return
  sectionElements.value = navItems.map((item) => (wrapper.value?.querySelector(item.selector) as HTMLElement | null) ?? null)
}

let navUpdateRaf: number | null = null
const scheduleActiveSectionIndexUpdate = () => {
  if (!import.meta.client) return
  if (navUpdateRaf != null) return

  navUpdateRaf = window.requestAnimationFrame(() => {
    navUpdateRaf = null
    updateActiveSectionIndex()
  })
}

const updateActiveSectionIndex = () => {
  if (!import.meta.client) return
  syncSectionElements()
  const headerOffset = getHeaderOffset()
  const centerLine = headerOffset + (window.innerHeight - headerOffset) * 0.5

  let nextIndex = 0
  sectionElements.value.forEach((el, index) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top <= centerLine) nextIndex = index
  })

  activeSectionIndex.value = nextIndex
}

const applyWrapperColorForActiveSection = () => {
  if (!import.meta.client) return
  const root = wrapper.value
  if (!root) return
  const el = sectionElements.value[activeSectionIndex.value]
  const color = el?.getAttribute?.('data-color')
  if (!color) return
  gsap.to(root, { backgroundColor: color, duration: 0.2, overwrite: 'auto' })
}

onMounted(async () => {
  // Wait for next tick to ensure DOM is fully rendered
  await nextTick()
  
  syncSectionElements()
  window.addEventListener('scroll', scheduleActiveSectionIndexUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveSectionIndexUpdate, { passive: true })

  ctx = gsap.context(() => {
    // 0. Initial Reveal
    gsap.fromTo(".hero-title", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
    gsap.fromTo(
      ".description-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: "power2.out" },
    )

    // 1. Parallax Effect for Hero
    gsap.to(".layer.cloud-front", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })

    gsap.to(".layer.text-content", {
      yPercent: 50,
      scale: 0.9,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })

    // 2. Background Color Morphing
    const sections = gsap.utils.toArray('section[data-color]') as HTMLElement[]
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          const color = section.getAttribute('data-color')
          if (!color) return
          gsap.to(wrapper.value, { backgroundColor: color, duration: 0.5, overwrite: 'auto' })
        },
        onEnterBack: () => {
          const color = section.getAttribute('data-color')
          if (!color) return
          gsap.to(wrapper.value, { backgroundColor: color, duration: 0.5, overwrite: 'auto' })
        },
      })
    })
    
    // Set initial color
    if (sections.length > 0) {
       gsap.set(wrapper.value, { backgroundColor: sections[0].getAttribute('data-color') })
    }

    // Active Section Tracking (for navigation dots)
    ScrollTrigger.create({
      trigger: wrapper.value,
      start: "top top",
      end: "bottom bottom",
      onUpdate: () => updateActiveSectionIndex(),
      onRefresh: () => {
        syncSectionElements()
        updateActiveSectionIndex()
      },
    })

    // 3. Horizontal Scroll for Team Section
    if (cardsContainer.value) {
      const container = cardsContainer.value
      // Calculate how much we need to scroll: total width - viewport width
      const getScrollAmount = () => -(container.scrollWidth - window.innerWidth)
      
      const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none"
      })

      ScrollTrigger.create({
        trigger: ".team-section",
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth + 200}`, // Add some padding
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      })
      
      // Animate cards entry
      const cards = gsap.utils.toArray('.team-card')
      cards.forEach((card: any, i) => {
         gsap.from(card, {
           y: 100,
           opacity: 0,
           duration: 1,
           scrollTrigger: {
             trigger: ".team-section",
             start: "top center",
             toggleActions: "play none none reverse"
           },
           delay: i * 0.2
       })
      })
    }

    // 4. Scroll reveal for key sections
    gsap.fromTo(
      ".team-title",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.from(
      ".awards-header",
      {
        opacity: 0,
        y: 22,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".awards-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.from(
      ".award-card",
      {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".awards-section",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".gov-card",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gov-card",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".gov-card span",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: ".gov-card",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".partners-header",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".partners-stream",
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".contact-title",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".contact-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Pinning modifies layout; refresh so later sections calculate correct start/end.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      updateActiveSectionIndex()
    })

  }, wrapper.value!)

  updateActiveSectionIndex()
})

watch(resolvedTheme, async () => {
  if (!import.meta.client) return
  await nextTick()
  syncSectionElements()
  updateActiveSectionIndex()
  applyWrapperColorForActiveSection()
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', scheduleActiveSectionIndexUpdate)
    window.removeEventListener('resize', scheduleActiveSectionIndexUpdate)
    if (navUpdateRaf != null) {
      window.cancelAnimationFrame(navUpdateRaf)
      navUpdateRaf = null
    }
  }
  ctx?.revert()
})
</script>

<style scoped>
.about-experience-wrapper {
  transition: background-color 0.5s ease;
}

.cards-container {
  scrollbar-width: none;
}
.cards-container::-webkit-scrollbar {
  display: none;
}
</style>
