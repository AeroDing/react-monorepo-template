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
/**
 * 获取预设主题配置
 * @param preset - 预设主题配置
 * @returns 预设主题配置
 */
export function getPresetTheme(preset: 'default' | 'dark'): PreferencesThemeConfig {
  return preset === 'dark' ? darkTheme : defaultTheme
}

/**
 * 检查系统是否为暗色模式
 * @returns 是否为暗色模式
 */
export function isSystemDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 获取当前系统主题配置
 * @returns 当前系统主题配置
 */
export function getSystemTheme(): PreferencesThemeConfig {
  return isSystemDarkMode() ? darkTheme : defaultTheme
}
