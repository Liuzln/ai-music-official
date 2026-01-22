<template>
  <div v-if="icpBeian" ref="root" class="fixed inset-x-0 bottom-0 z-40">
    <div class="mx-auto max-w-6xl px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3">
      <div class="flex items-center justify-center px-16">
        <a
          :href="icpBeianLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-2 text-xs text-slate-600 shadow-sm backdrop-blur transition-colors hover:text-slate-900 dark:border-slate-800/70 dark:bg-slate-950/75 dark:text-slate-300 dark:hover:text-slate-100"
        >
          <span class="shrink-0">ICP备案号：</span>
          <span class="truncate font-medium tabular-nums">{{ icpBeian }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { icpBeian, icpBeianLink } = useOfficialSiteConfig()

const root = ref<HTMLElement | null>(null)

let resizeObserver: ResizeObserver | null = null
const stopObserve = () => {
  resizeObserver?.disconnect()
  resizeObserver = null
}

const setOffsetVar = (value: string) => {
  document.documentElement.style.setProperty('--icp-beian-offset', value)
}

const updateOffset = () => {
  const el = root.value
  if (!el) return
  const height = Math.ceil(el.getBoundingClientRect().height)
  setOffsetVar(`${height}px`)
}

onMounted(() => {
  if (!import.meta.client) return

  watch(
    icpBeian,
    async (value) => {
      stopObserve()

      if (!value) {
        setOffsetVar('0px')
        return
      }

      await nextTick()
      updateOffset()

      resizeObserver = new ResizeObserver(() => updateOffset())
      if (root.value) resizeObserver.observe(root.value)
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  stopObserve()
  setOffsetVar('0px')
})
</script>
