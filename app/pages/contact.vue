<template>
  <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
    <div
      v-motion
      :initial="cardInitial"
      :visibleOnce="cardVisibleOnce(0)"
      class="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-6 py-10 text-white md:px-10"
    >
      <div class="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
            {{ t('sections.contact.title') }}
          </h1>
          <p class="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
            {{ t('sections.contact.description', { siteName }) }}
          </p>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="!contactWeChat"
              @click="copyContact('wechat')"
            >
              <Copy class="h-4 w-4" />
              {{ copyWeChatText }}
            </button>
            <a
              :href="mailtoLink"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/15"
              :class="!contactEmail ? 'pointer-events-none opacity-60' : ''"
              :aria-disabled="!contactEmail"
            >
              <Mail class="h-4 w-4" />
              {{ t('contact.actions.email') }}
            </a>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div class="flex items-center gap-2 text-sm font-semibold">
              <QrCode class="h-4 w-4" />
              {{ t('contact.wechat.label') }}
            </div>
            <div class="mt-2 text-sm text-white/90">
              {{ contactWeChat || t('contact.wechat.placeholder') }}
            </div>

            <div class="mt-4 overflow-hidden rounded-xl border border-white/20 bg-white/5">
              <img
                v-if="contactWeChatQr"
                :src="contactWeChatQr"
                :alt="t('contact.wechat.qrAlt')"
                class="h-32 w-full object-cover"
                loading="lazy"
              />
              <div v-else class="flex h-32 items-center justify-center text-xs text-white/70">
                {{ t('contact.wechat.qrPlaceholder') }}
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div class="flex items-center gap-2 text-sm font-semibold">
              <Mail class="h-4 w-4" />
              {{ t('contact.email.label') }}
            </div>
            <div class="mt-2 text-sm text-white/90">
              {{ contactEmail || t('contact.email.placeholder') }}
            </div>

            <button
              type="button"
              class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="!contactEmail"
              @click="copyContact('email')"
            >
              <Copy class="h-4 w-4" />
              {{ copyEmailText }}
            </button>
          </div>
        </div>
      </div>

      <p class="mt-6 text-xs leading-relaxed text-white/75">
        {{ t('sections.contact.note') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Copy, Mail, QrCode } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { t } = useI18n()
const { siteName, contactEmail, contactWeChat, contactWeChatQr } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.contact.title')} - ${siteName.value}`),
  description: computed(() => t('sections.contact.description', { siteName })),
})

const { cardInitial, cardVisibleOnce } = useLandingMotion()

const mailtoLink = computed(() => {
  if (!contactEmail.value) return '#'
  return `mailto:${contactEmail.value}`
})

type CopyTarget = 'wechat' | 'email'
const copiedTarget = ref<CopyTarget | null>(null)
let copyResetTimer: number | null = null

const copyWeChatText = computed(() =>
  copiedTarget.value === 'wechat' ? t('contact.actions.copied') : t('contact.actions.copyWeChat'),
)
const copyEmailText = computed(() =>
  copiedTarget.value === 'email' ? t('contact.actions.copied') : t('contact.actions.copyEmail'),
)

const writeClipboard = async (text: string) => {
  if (!import.meta.client) return false

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', 'true')
      textarea.style.position = 'fixed'
      textarea.style.top = '0'
      textarea.style.left = '0'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      return ok
    } catch {
      return false
    }
  }
}

const copyContact = async (target: CopyTarget) => {
  const text = target === 'wechat' ? contactWeChat.value : contactEmail.value
  if (!text) return

  const ok = await writeClipboard(text)
  if (!ok) return

  copiedTarget.value = target
  if (copyResetTimer != null) window.clearTimeout(copyResetTimer)
  copyResetTimer = window.setTimeout(() => {
    copiedTarget.value = null
    copyResetTimer = null
  }, 1500)
}

onBeforeUnmount(() => {
  if (copyResetTimer != null) {
    window.clearTimeout(copyResetTimer)
    copyResetTimer = null
  }
})
</script>
