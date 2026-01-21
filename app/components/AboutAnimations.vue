<template>
  <div ref="wrapper" class="about-experience-wrapper relative w-full bg-slate-50 dark:bg-slate-900">
    <!-- Section 1: Hero / Parallax -->
    <section class="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center" data-color="#FF8F3F">
      <!-- Layers for Parallax -->
       <div class="layer character absolute inset-0 flex items-center justify-center pointer-events-none">
          <!-- Abstract Character Representation -->
          <div class="relative w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#F4A4A4] rounded-full opacity-90 blur-3xl translate-y-20"></div>
          <div class="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] bg-[#FFD700] rounded-full opacity-60 blur-2xl -translate-x-20 -translate-y-20"></div>
       </div>
       
       <!-- Clouds / Foreground -->
       <div class="layer cloud-front absolute inset-x-0 bottom-0 h-1/3 md:h-1/2 bg-white/10 backdrop-blur-sm border-t border-white/20 rounded-t-[50%] transform translate-y-1/4 scale-110"></div>
       
       <div class="layer text-content relative z-10 text-center px-4 max-w-4xl mx-auto">
         <h1 class="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
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
    <section class="team-section relative h-screen w-full overflow-hidden flex flex-col justify-center" data-color="#FF6B00">
      <div class="absolute top-10 left-4 md:top-20 md:left-20 z-10">
        <h2 class="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Commercial Cases</h2>
      </div>
      
      <div ref="cardsContainer" class="cards-container flex items-center gap-10 md:gap-20 px-10 md:px-20 w-fit h-full pt-20">
        
        <div 
            v-for="(c, idx) in commercialCases" 
            :key="c.id"
            class="team-card w-[85vw] md:w-[600px] h-[65vh] md:h-[70vh] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between flex-shrink-0 relative shadow-2xl border transition-colors duration-500"
            :class="idx % 2 === 0 ? 'bg-[#1a1a1a] text-white border-white/10' : 'bg-[#FAD0C4] text-slate-900 border-black/5'"
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
               
               <p class="text-lg md:text-xl leading-relaxed font-light mb-8" :class="idx % 2 === 0 ? 'text-gray-300' : 'text-slate-700'">
                 {{ c.description }}
               </p>

               <div class="grid grid-cols-2 gap-3 mt-auto">
                    <div
                      v-for="(m, mIdx) in c.metrics"
                      :key="`${c.id}-metric-${mIdx}`"
                      class="rounded-2xl p-3 backdrop-blur-sm"
                      :class="idx % 2 === 0 ? 'bg-white/10' : 'bg-white/40'"
                    >
                      <div class="text-xs opacity-70 mb-1">{{ m.label }}</div>
                      <div class="text-lg font-bold">{{ m.value }}</div>
                    </div>
                </div>
             </div>
             
             <p class="mt-6 text-xs opacity-60 font-mono border-t pt-4" :class="idx % 2 === 0 ? 'border-white/20' : 'border-black/10'">
                {{ c.note }}
             </p>
        </div>
        
        <!-- Placeholder for extra scroll space -->
        <div class="w-20 flex-shrink-0"></div>
      </div>
    </section>

    <!-- Section 3: Awards & Partners -->
    <section class="awards-section relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4" data-color="#0F172A">
        <div class="max-w-6xl w-full">
            <!-- Awards -->
             <div class="mb-20">
                 <h2 class="text-3xl md:text-5xl font-black text-white mb-12 text-center">AWARDS & RECOGNITION</h2>
                 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="a in awards" :key="a.id" class="glass-card group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors">
                        <div class="aspect-[4/3] bg-slate-900/50 flex items-center justify-center relative overflow-hidden">
                             <img v-if="a.image" :src="a.image" :alt="a.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                             <div v-else class="flex flex-col items-center gap-3">
                                <Trophy class="h-8 w-8 text-yellow-500" />
                                <span class="text-xs text-slate-400 font-mono border border-slate-700 px-2 py-1 rounded">No Image</span>
                             </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-white mb-1">{{ a.title }}</h3>
                            <p class="text-sm text-slate-400">{{ a.subtitle }}</p>
                        </div>
                    </div>
                 </div>
             </div>

             <!-- Partners & Gov -->
             <div class="grid lg:grid-cols-2 gap-10">
                 <!-- Government -->
                 <div class="bg-slate-800/30 rounded-3xl p-8 border border-slate-700/50">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Building2 class="h-6 w-6" />
                        </div>
                        <h3 class="text-2xl font-bold text-white">Government</h3>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <span v-for="badge in governmentBadges" :key="badge" class="px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm border border-slate-600 hover:bg-slate-700 transition-colors cursor-default">
                            {{ badge }}
                        </span>
                    </div>
                 </div>

                 <!-- Partners -->
                 <div class="bg-slate-800/30 rounded-3xl p-8 border border-slate-700/50">
                     <div class="flex items-center gap-4 mb-6">
                        <div class="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Handshake class="h-6 w-6" />
                        </div>
                        <h3 class="text-2xl font-bold text-white">Partners</h3>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div v-for="p in partners" :key="p.name" class="p-3 text-center rounded-xl bg-slate-900/40 text-slate-400 text-sm font-medium border border-slate-700/30">
                            {{ p.name }}
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    </section>

    <!-- Section 4: Footer / Contact -->
    <section class="footer-section relative h-screen w-full flex items-center justify-center text-white overflow-hidden" data-color="#000000">
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div class="star absolute top-[20%] left-[20%] w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div class="star absolute top-[50%] right-[30%] w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
        <div class="star absolute bottom-[30%] left-[40%] w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
      </div>

      <div class="text-center z-10 px-4 w-full max-w-4xl">
        <h2 class="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
          GET IN TOUCH
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8 mt-12 text-left">
            <!-- Email -->
            <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <div class="flex items-center gap-3 mb-4 text-emerald-400">
                    <Mail class="h-6 w-6" />
                    <span class="font-bold tracking-wider text-sm uppercase">Email Us</span>
                </div>
                <div class="text-2xl font-medium text-white break-all mb-6">
                    {{ contactEmail || 'hello@example.com' }}
                </div>
                <button 
                    @click="$emit('copy-contact', 'email')"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                >
                    <Copy class="h-4 w-4" />
                    Copy Email Address
                </button>
            </div>

            <!-- WeChat -->
            <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <div class="flex items-center gap-3 mb-4 text-emerald-400">
                    <QrCode class="h-6 w-6" />
                    <span class="font-bold tracking-wider text-sm uppercase">WeChat</span>
                </div>
                 <div class="flex gap-6">
                    <div class="flex-1">
                        <div class="text-2xl font-medium text-white mb-6">
                            {{ contactWeChat || 'WeChatID' }}
                        </div>
                        <button 
                             @click="$emit('copy-contact', 'wechat')"
                            class="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                        >
                            <Copy class="h-4 w-4" />
                            Copy WeChat ID
                        </button>
                    </div>
                    <div class="w-24 h-24 bg-white p-2 rounded-xl shrink-0" v-if="contactWeChatQr">
                        <img :src="contactWeChatQr" alt="QR" class="w-full h-full object-cover" />
                    </div>
                    <div class="w-24 h-24 bg-white/10 rounded-xl shrink-0 flex items-center justify-center text-xs text-white/40" v-else>
                        No QR
                    </div>
                 </div>
            </div>
        </div>
        
        <!-- Fun Character Graphic Placeholder -->
        <div class="mt-20 relative h-48 w-full max-w-lg mx-auto hidden md:block opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
           <div class="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full blur-2xl"></div> 
           <div class="absolute bottom-0 right-0 w-40 h-40 bg-fuchsia-500 rounded-full blur-2xl"></div> 
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
    Globe, Mail, Linkedin, Instagram, 
    Trophy, Building2, Handshake, Copy, QrCode 
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
    name: string
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

const wrapper = ref<HTMLElement | null>(null)
const cardsContainer = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(async () => {
  // Wait for next tick to ensure DOM is fully rendered
  await nextTick()
  
  ctx = gsap.context(() => {
    // 0. Initial Reveal
    gsap.fromTo(".description-text", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
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
      const color = section.getAttribute('data-color')
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to(wrapper.value, { backgroundColor: color, duration: 0.5, overwrite: 'auto' }),
        onEnterBack: () => gsap.to(wrapper.value, { backgroundColor: color, duration: 0.5, overwrite: 'auto' }),
      })
    })
    
    // Set initial color
    if (sections.length > 0) {
       gsap.set(wrapper.value, { backgroundColor: sections[0].getAttribute('data-color') })
    }

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

  }, wrapper.value!)
})

onBeforeUnmount(() => {
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