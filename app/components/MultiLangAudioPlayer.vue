<template>
  <div>
    <AudioPreviewCard
      ref="audioPlayerRef"
      :title="title"
      :prompt="prompt"
      :style-label="styleLabel"
      :duration-label="durationLabel"
      :export-label="exportLabel"
      :style-value="styleValue"
      :duration-value="durationValue"
      :export-value="exportValue"
      :play-label="playLabel"
      :pause-label="pauseLabel"
      :waveform-label="waveformLabel"
      :src="currentAudioUrl"
      @update:analyser="handleAnalyserUpdate"
      @update:is-playing="handleIsPlayingUpdate"
    >
      <template v-if="tracks.length > 0" #waveform="{ analyser: slotAnalyser, isPlaying: slotIsPlaying, waveformColor, waveformInactiveColor }">
        <MultiLangTrackSelector
          :tracks="tracks"
          :active-lang="activeLang"
          :analyser="slotAnalyser"
          :is-playing="slotIsPlaying"
          :active-color="waveformColor"
          :inactive-color="waveformInactiveColor"
          @hover="handleLangHover"
        />
      </template>
    </AudioPreviewCard>
  </div>
</template>

<script setup lang="ts">
import type { LangTrack } from './MultiLangTrackSelector.vue'

const props = withDefaults(
  defineProps<{
    title: string
    prompt: string
    styleLabel: string
    durationLabel: string
    exportLabel: string
    styleValue: string
    durationValue: string
    exportValue: string
    playLabel?: string
    pauseLabel?: string
    waveformLabel?: string
    trackSelectorLabel?: string
    tracks: LangTrack[]
    defaultLang?: string
    syncWithSiteLocale?: boolean
  }>(),
  {
    playLabel: '试听',
    pauseLabel: '暂停',
    waveformLabel: '音频波形',
    trackSelectorLabel: '语言切换',
    defaultLang: '',
    syncWithSiteLocale: false,
  },
)

const emit = defineEmits<{
  'lang-change': [lang: string]
}>()

const audioPlayerRef = ref<InstanceType<typeof AudioPreviewCard> | null>(null)

const activeLang = ref(props.defaultLang || (props.tracks[0]?.lang ?? ''))
const playerAnalyser = shallowRef<AnalyserNode | null>(null)
const playerIsPlaying = ref(false)

const currentTrack = computed(() =>
  props.tracks.find((t) => t.lang === activeLang.value),
)

const currentAudioUrl = computed(() => currentTrack.value?.audioUrl ?? '')

const handleAnalyserUpdate = (analyser: AnalyserNode | null) => {
  playerAnalyser.value = analyser
}

const handleIsPlayingUpdate = (isPlaying: boolean) => {
  playerIsPlaying.value = isPlaying
}

let switchDebounceTimer: ReturnType<typeof setTimeout> | null = null

const handleLangHover = (lang: string) => {
  if (switchDebounceTimer) {
    clearTimeout(switchDebounceTimer)
  }

  switchDebounceTimer = setTimeout(async () => {
    if (lang === activeLang.value) return

    const track = props.tracks.find((t) => t.lang === lang)
    if (!track) return

    const player = audioPlayerRef.value
    if (player && track.audioUrl) {
      await player.switchAudio(track.audioUrl)
    }

    activeLang.value = lang
    emit('lang-change', lang)
  }, 150)
}

watch(
  () => props.tracks,
  (newTracks) => {
    if (newTracks.length > 0 && !activeLang.value) {
      activeLang.value = newTracks[0].lang
    }
    if (newTracks.length > 0 && !newTracks.find((t) => t.lang === activeLang.value)) {
      activeLang.value = newTracks[0].lang
    }
  },
  { immediate: true },
)

watch(
  () => props.defaultLang,
  (newDefaultLang) => {
    if (newDefaultLang && props.tracks.find((t) => t.lang === newDefaultLang)) {
      activeLang.value = newDefaultLang
    }
  },
)

onBeforeUnmount(() => {
  if (switchDebounceTimer) {
    clearTimeout(switchDebounceTimer)
  }
})

defineExpose({
  activeLang,
  switchToLang: handleLangHover,
})
</script>
