<template>
  <button
    type="button"
    class="tilt-wrapper absolute left-1/2 top-1/2 h-[55vh] max-h-[500px] min-h-[350px] w-[min(85vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-0 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
    :class="active ? 'cursor-default' : 'cursor-pointer'"
    :style="cardStyle"
    @click="onSelect"
  >
    <div
      v-tilt="{ disabled: !active }"
      class="glass-card flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
      :class="[
        active ? 'preview-tilt ring-1 ring-inset ring-indigo-500/30' : '',
        active ? '' : 'hover:bg-white/40 dark:hover:bg-slate-800/40',
      ]"
    >
      <div class="flex w-full flex-col items-center text-center">
        <span
          class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg transition-transform duration-300 dark:from-slate-700 dark:to-slate-800 md:mb-6 md:h-16 md:w-16"
          :class="{ 'scale-110 shadow-indigo-500/20': active }"
        >
          <component :is="icon" class="h-7 w-7 md:h-8 md:w-8" />
        </span>

        <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 md:text-xl">
          {{ title }}
        </h2>

        <span
          v-if="pill"
          class="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 md:text-xs"
        >
          {{ pill }}
        </span>

        <p class="mt-4 line-clamp-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 md:line-clamp-3 md:text-sm">
          {{ description }}
        </p>
      </div>

      <div class="w-full space-y-4">
        <div
          class="flex justify-center transition-all duration-300"
          :class="active ? 'opacity-100 transform-none' : 'pointer-events-none translate-y-4 opacity-0'"
        >
          <div
            class="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95 md:h-14 md:w-14"
            @click.stop="emit('toggle-play')"
          >
            <span v-if="playing && active" class="absolute inset-0 animate-ping rounded-full bg-indigo-500 opacity-20"></span>
            <component :is="playing && active ? Pause : Play" class="ml-0.5 h-5 w-5 fill-current md:h-6 md:w-6" />
          </div>
        </div>

        <div v-if="active && visibleTags.length" class="flex flex-wrap justify-center gap-2 opacity-80">
          <span
            v-for="tag in visibleTags"
            :key="tag"
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
          >
            {{ tagPrefix }}{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Component, StyleValue } from 'vue'
import { Pause, Play } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    icon: Component
    title: string
    description: string
    pill?: string
    tags?: string[]
    tagVariant?: 'bullet' | 'hash'
    maxTags?: number
    active?: boolean
    playing?: boolean
    cardStyle?: StyleValue
  }>(),
  {
    pill: '',
    tags: () => [],
    tagVariant: 'bullet',
    maxTags: 3,
    active: false,
    playing: false,
  },
)

const emit = defineEmits<{
  (event: 'select'): void
  (event: 'toggle-play'): void
}>()

const visibleTags = computed(() => props.tags.slice(0, props.maxTags))
const tagPrefix = computed(() => (props.tagVariant === 'hash' ? '#' : '• '))

const onSelect = () => {
  if (props.active) return
  emit('select')
}
</script>
