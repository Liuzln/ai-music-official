import { computed, unref, type Ref } from 'vue'
import { defaultLocale, messages, type Locale } from '~/i18n/messages'

type Primitive = string | number
type MaybeRef<T> = T | Ref<T>
type Params = Record<string, MaybeRef<Primitive>>

const normalizeLocale = (value: string | null | undefined): Locale => {
  if (!value) return defaultLocale
  const lower = value.toLowerCase()
  if (lower.startsWith('en')) return 'en'
  if (lower.startsWith('zh')) return 'zh-CN'
  return defaultLocale
}

const detectLocale = (): Locale => {
  if (import.meta.server) {
    const headers = useRequestHeaders(['accept-language'])
    const acceptLanguage = headers['accept-language']
    if (!acceptLanguage) return defaultLocale
    const first = acceptLanguage.split(',')[0]?.trim()
    return normalizeLocale(first)
  }

  if (import.meta.client) {
    return normalizeLocale(navigator.language)
  }

  return defaultLocale
}

const getByPath = (input: unknown, path: string): unknown => {
  if (!input) return undefined
  const parts = path.split('.').filter(Boolean)
  let current: unknown = input

  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }

  return current
}

export const useI18n = () => {
  const initialLocale = useState<Locale>('i18n:locale', () => detectLocale())
  const localeCookie = useCookie<string>('locale', { default: () => initialLocale.value, sameSite: 'lax' })

  const locale = computed<Locale>({
    get: () => normalizeLocale(localeCookie.value ?? initialLocale.value),
    set: (value) => {
      const normalized = normalizeLocale(value)
      localeCookie.value = normalized
      initialLocale.value = normalized
    },
  })

  const activeMessages = computed(() => messages[locale.value] ?? messages[defaultLocale])

  const t = (key: string, params?: Params): string => {
    const value = getByPath(activeMessages.value, key)
    if (typeof value !== 'string') return key
    if (!params) return value

    return value.replace(/{(\w+)}/g, (_, name: string) => {
      const replacement = params[name]
      if (replacement == null) return `{${name}}`
      return String(unref(replacement))
    })
  }

  const setLocale = (next: Locale) => {
    locale.value = next
  }

  return {
    locale,
    locales: Object.keys(messages) as Locale[],
    t,
    setLocale,
  }
}
