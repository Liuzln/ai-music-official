export type ThemeMode = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const THEME_MODE_COOKIE = 'theme-mode'

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark'
}

export function useThemeMode() {
  const mode = useCookie<ThemeMode>(THEME_MODE_COOKIE, {
    default: () => 'system',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  if (!isThemeMode(mode.value)) {
    mode.value = 'system'
  }

  const systemPrefersDark = useState<boolean>('systemPrefersDark', () => false)

  const resolved = computed<ResolvedTheme>(() => {
    if (mode.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return mode.value
  })

  const setMode = (nextMode: ThemeMode) => {
    mode.value = nextMode
  }

  const cycleMode = () => {
    mode.value = mode.value === 'system' ? 'light' : mode.value === 'light' ? 'dark' : 'system'
  }

  return { mode, resolved, systemPrefersDark, setMode, cycleMode }
}

