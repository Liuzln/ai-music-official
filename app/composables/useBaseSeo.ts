import { computed, unref, type Ref } from 'vue'
import { useOfficialSiteConfig } from './useOfficialSiteConfig'

type MaybeRef<T> = T | Ref<T>

type BaseSeoOptions = {
  title?: MaybeRef<string>
  description?: MaybeRef<string>
  keywords?: MaybeRef<string>
}

export const useBaseSeo = (options: BaseSeoOptions = {}) => {
  const { locale, t } = useI18n()
  const route = useRoute()

  const { siteName, siteUrl, ogImage } = useOfficialSiteConfig()

  const fallbackTitle = computed(() => t('meta.title', { siteName }))
  const fallbackDescription = computed(() => t('meta.description', { siteName }))
  const fallbackKeywords = computed(() => t('meta.keywords'))

  const title = computed(() => unref(options.title) || fallbackTitle.value)
  const description = computed(() => unref(options.description) || fallbackDescription.value)
  const keywords = computed(() => unref(options.keywords) || fallbackKeywords.value)

  const absoluteOgImage = computed(() => {
    try {
      return new URL(ogImage.value, siteUrl.value).toString()
    } catch {
      return ogImage.value
    }
  })

  const canonicalUrl = computed(() => {
    try {
      return new URL(route.path, siteUrl.value).toString()
    } catch {
      return siteUrl.value
    }
  })

  useHead(() => {
    return {
      htmlAttrs: { lang: locale.value },
      title: title.value,
      meta: [
        { name: 'description', content: description.value, key: 'description' },
        { name: 'keywords', content: keywords.value, key: 'keywords' },
        { property: 'og:title', content: title.value, key: 'og:title' },
        { property: 'og:description', content: description.value, key: 'og:description' },
        { property: 'og:type', content: 'website', key: 'og:type' },
        { property: 'og:url', content: canonicalUrl.value, key: 'og:url' },
        { property: 'og:image', content: absoluteOgImage.value, key: 'og:image' },
        { name: 'twitter:card', content: 'summary_large_image', key: 'twitter:card' },
        { name: 'twitter:title', content: title.value, key: 'twitter:title' },
        { name: 'twitter:description', content: description.value, key: 'twitter:description' },
        { name: 'twitter:image', content: absoluteOgImage.value, key: 'twitter:image' },
      ],
      link: [{ rel: 'canonical', href: canonicalUrl.value }],
    }
  })

  useSchemaOrg([
    defineOrganization({
      name: siteName.value,
      url: siteUrl.value,
    }),
    defineWebSite({
      name: siteName.value,
      url: siteUrl.value,
    }),
    defineWebPage({
      name: title.value,
      description: description.value,
      url: canonicalUrl.value,
    }),
  ])
}
