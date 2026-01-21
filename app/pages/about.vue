<template>
  <div>
    <AboutAnimations 
      :title="t('sections.about.title')"
      :description="t('sections.about.description')"
      :site-name="siteName"
      :commercial-cases="commercialCases"
      :awards="awards"
      :government-badges="governmentBadges"
      :partners="partners"
      :contact-email="contactEmail"
      :contact-we-chat="contactWeChat"
      :contact-we-chat-qr="contactWeChatQr"
      @copy-contact="copyContact"
    />
  </div>
</template>

<script setup lang="ts">
import { Clapperboard, Megaphone, ShoppingBag } from 'lucide-vue-next'
import { useOfficialSiteConfig } from '../composables/useOfficialSiteConfig'

const { t } = useI18n()
const { siteName, contactEmail, contactWeChat, contactWeChatQr } = useOfficialSiteConfig()

useBaseSeo({
  title: computed(() => `${t('sections.about.title')} - ${siteName.value}`),
  description: computed(() => t('sections.about.description')),
})

// Copy Logic
type CopyTarget = 'wechat' | 'email'
const copiedTarget = ref<CopyTarget | null>(null)
let copyResetTimer: number | null = null

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

  // Ideally show a toast here, but currently just state tracking
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

// Data Definitions
const commercialCaseData = [
  {
    id: 'shortDrama',
    titleKey: 'about.cases.items.shortDrama.title',
    descriptionKey: 'about.cases.items.shortDrama.description',
    noteKey: 'about.cases.items.shortDrama.note',
    metrics: [
      { labelKey: 'about.cases.items.shortDrama.metrics.0.label', valueKey: 'about.cases.items.shortDrama.metrics.0.value' },
      { labelKey: 'about.cases.items.shortDrama.metrics.1.label', valueKey: 'about.cases.items.shortDrama.metrics.1.value' },
    ],
    icon: Clapperboard,
  },
  {
    id: 'ads',
    titleKey: 'about.cases.items.ads.title',
    descriptionKey: 'about.cases.items.ads.description',
    noteKey: 'about.cases.items.ads.note',
    metrics: [
      { labelKey: 'about.cases.items.ads.metrics.0.label', valueKey: 'about.cases.items.ads.metrics.0.value' },
      { labelKey: 'about.cases.items.ads.metrics.1.label', valueKey: 'about.cases.items.ads.metrics.1.value' },
    ],
    icon: Megaphone,
  },
  {
    id: 'ecommerce',
    titleKey: 'about.cases.items.ecommerce.title',
    descriptionKey: 'about.cases.items.ecommerce.description',
    noteKey: 'about.cases.items.ecommerce.note',
    metrics: [
      { labelKey: 'about.cases.items.ecommerce.metrics.0.label', valueKey: 'about.cases.items.ecommerce.metrics.0.value' },
      { labelKey: 'about.cases.items.ecommerce.metrics.1.label', valueKey: 'about.cases.items.ecommerce.metrics.1.value' },
    ],
    icon: ShoppingBag,
  },
] as const

const commercialCases = computed(() =>
  commercialCaseData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    note: t(item.noteKey),
    metrics: item.metrics.map((metric) => ({
      label: t(metric.labelKey),
      value: t(metric.valueKey),
    })),
    icon: item.icon,
  })),
)

const awardData = [
  { id: 'award-1', titleKey: 'about.awards.items.0.title', subtitleKey: 'about.awards.items.0.subtitle', image: '' },
  { id: 'award-2', titleKey: 'about.awards.items.1.title', subtitleKey: 'about.awards.items.1.subtitle', image: '' },
  { id: 'award-3', titleKey: 'about.awards.items.2.title', subtitleKey: 'about.awards.items.2.subtitle', image: '' },
  { id: 'award-4', titleKey: 'about.awards.items.3.title', subtitleKey: 'about.awards.items.3.subtitle', image: '' },
  { id: 'award-5', titleKey: 'about.awards.items.4.title', subtitleKey: 'about.awards.items.4.subtitle', image: '' },
  { id: 'award-6', titleKey: 'about.awards.items.5.title', subtitleKey: 'about.awards.items.5.subtitle', image: '' },
] as const

const awards = computed(() =>
  awardData.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    subtitle: t(item.subtitleKey),
    image: item.image,
  })),
)

const governmentBadgeKeys = [
  'about.government.badges.0',
  'about.government.badges.1',
  'about.government.badges.2',
  'about.government.badges.3',
] as const

const governmentBadges = computed(() => governmentBadgeKeys.map((key) => t(key)))

const partnerKeys = [
  'about.partners.items.0',
  'about.partners.items.1',
  'about.partners.items.2',
  'about.partners.items.3',
  'about.partners.items.4',
  'about.partners.items.5',
] as const

const partners = computed(() => partnerKeys.map((key) => ({ name: t(key) })))
</script>
