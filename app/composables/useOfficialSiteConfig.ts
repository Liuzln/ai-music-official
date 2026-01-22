export const useOfficialSiteConfig = () => {
  const config = useRuntimeConfig()

  const siteName = computed(() => (config.public.siteName as string) || 'AI Music')
  const siteUrl = computed(() => (config.public.siteUrl as string) || 'http://localhost:3000')
  const ogImage = computed(() => (config.public.ogImage as string) || '/og-image.svg')

  const rawAppUrl = computed(() => (config.public.appUrl as string) || '/about#contact')
  const isExternalAppUrl = computed(() => /^https?:\/\//i.test(rawAppUrl.value))
  const isHashAppUrl = computed(() => rawAppUrl.value.startsWith('#'))

  const contactEmail = computed(() => (config.public.contactEmail as string) || '')
  const contactWeChat = computed(() => (config.public.contactWeChat as string) || '')
  const contactWeChatQr = computed(() => (config.public.contactWeChatQr as string) || '')

  const icpBeian = computed(() => (config.public.icpBeian as string) || '')
  const icpBeianLink = computed(() => (config.public.icpBeianLink as string) || 'https://beian.miit.gov.cn/')
  const previewAudioUrl = computed(() => (config.public.previewAudioUrl as string) || '')

  return {
    siteName,
    siteUrl,
    ogImage,
    appUrl: rawAppUrl,
    isExternalAppUrl,
    isHashAppUrl,
    contactEmail,
    contactWeChat,
    contactWeChatQr,
    icpBeian,
    icpBeianLink,
    previewAudioUrl,
  }
}
