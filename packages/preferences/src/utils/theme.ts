import type { PreferencesThemeConfig, ThemeValidationResult } from '../types/theme'
import { darkTheme } from '../themes/dark'
import { defaultTheme } from '../themes/default'

export function validateTheme(theme: PreferencesThemeConfig): ThemeValidationResult {
  const errors: string[] = []

  if (!['light', 'dark'].includes(theme.mode)) {
    errors.push('Invalid theme mode')
  }

  if (!['default', 'compact'].includes(theme.layout)) {
    errors.push('Invalid theme layout')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function mergeThemes(base: PreferencesThemeConfig, override: Partial<PreferencesThemeConfig>): PreferencesThemeConfig {
  return {
    ...base,
    ...override,
    token: override.token
      ? {
          ...base.token,
          ...override.token,
        }
      : base.token,
    components: override.components
      ? {
          ...base.components,
          ...override.components,
        }
      : base.components,
  }
}

export function getPresetTheme(preset: 'default' | 'dark'): PreferencesThemeConfig {
  return preset === 'dark' ? darkTheme : defaultTheme
}

export function isSystemDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function getSystemTheme(): PreferencesThemeConfig {
  return isSystemDarkMode() ? darkTheme : defaultTheme
}
