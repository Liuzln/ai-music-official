type ThemePublicConfig = {
  accentPrimary?: string
  accentSecondary?: string
  accentPrimaryDark?: string
  accentSecondaryDark?: string
  themeColorLight?: string
  themeColorDark?: string
}

function setMetaThemeColor(color: string) {
  if (!color) return

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }
  meta.content = color
}

export default defineNuxtPlugin(() => {
  const { mode, resolved, systemPrefersDark } = useThemeMode()
  const runtimeConfig = useRuntimeConfig()
  const themeConfig = (runtimeConfig.public.theme || {}) as ThemePublicConfig

  const media = window.matchMedia?.('(prefers-color-scheme: dark)')
  if (media) {
    systemPrefersDark.value = media.matches
    media.addEventListener('change', (event) => {
      systemPrefersDark.value = event.matches
    })
  }

  const apply = () => {
    const root = document.documentElement
    const isDark = resolved.value === 'dark'

    root.classList.toggle('dark', isDark)
    root.dataset.theme = isDark ? 'dark' : 'light'
    root.dataset.themeMode = mode.value

    const accentPrimary = isDark ? themeConfig.accentPrimaryDark : themeConfig.accentPrimary
    const accentSecondary = isDark ? themeConfig.accentSecondaryDark : themeConfig.accentSecondary

    if (accentPrimary) root.style.setProperty('--accent-primary', accentPrimary)
    if (accentSecondary) root.style.setProperty('--accent-secondary', accentSecondary)

    const themeColor = isDark ? themeConfig.themeColorDark : themeConfig.themeColorLight
    if (themeColor) setMetaThemeColor(themeColor)
  }

  watch([mode, resolved], apply, { immediate: true })
})

