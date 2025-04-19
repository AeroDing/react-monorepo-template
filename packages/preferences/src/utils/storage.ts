import type { PreferencesThemeConfig } from '../types/theme'
import { validateTheme } from './theme'

const THEME_STORAGE_KEY = 'app-theme-preferences'

export function saveTheme(theme: PreferencesThemeConfig): void {
  try {
    const validation = validateTheme(theme)
    if (!validation.isValid) {
      throw new Error(`Invalid theme configuration: ${validation.errors.join(', ')}`)
    }
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
  }
  catch (error) {
    console.error('Failed to save theme preferences:', error)
  }
}

export function loadTheme(): PreferencesThemeConfig | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (!stored)
      return null

    const theme = JSON.parse(stored) as PreferencesThemeConfig
    const validation = validateTheme(theme)

    if (!validation.isValid) {
      console.warn('Invalid stored theme:', validation.errors)
      localStorage.removeItem(THEME_STORAGE_KEY)
      return null
    }

    return theme
  }
  catch (error) {
    console.error('Failed to load theme preferences:', error)
    return null
  }
}

export function clearTheme(): void {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY)
  }
  catch (error) {
    console.error('Failed to clear theme preferences:', error)
  }
}
