import type { ThemeConfig } from 'antd'
import type { PreferencesThemeConfig, ThemeContextType } from '../types/theme'
import { theme as antdTheme, ConfigProvider } from 'antd'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { darkTheme } from '../themes/dark'
import { defaultTheme } from '../themes/default'
import { loadTheme, saveTheme } from '../utils/storage'
import { mergeThemes } from '../utils/theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function useSystemTheme(): 'light' | 'dark' {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent): void => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return systemTheme
}

export interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme?: PreferencesThemeConfig
  followSystem?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = defaultTheme,
  followSystem = true,
}) => {
  const systemTheme = useSystemTheme()
  const [theme, setTheme] = useState<PreferencesThemeConfig>(() => {
    const savedTheme = loadTheme()
    return savedTheme || initialTheme
  })

  useEffect(() => {
    if (followSystem) {
      const systemBasedTheme = systemTheme === 'dark' ? darkTheme : defaultTheme
      setTheme(prev => mergeThemes(prev, systemBasedTheme))
    }
  }, [followSystem, systemTheme])

  const toggleMode = (): void => {
    setTheme((prev) => {
      const baseTheme = prev.mode === 'light' ? darkTheme : defaultTheme
      const newTheme = mergeThemes(prev, baseTheme)
      saveTheme(newTheme)
      return newTheme
    })
  }

  const toggleLayout = (): void => {
    setTheme((prev) => {
      const newTheme = mergeThemes(prev, {
        layout: prev.layout === 'default' ? 'compact' : 'default',
      })
      saveTheme(newTheme)
      return newTheme
    })
  }

  const updateTheme = (newTheme: Partial<PreferencesThemeConfig>): void => {
    setTheme((prev) => {
      const updatedTheme = mergeThemes(prev, newTheme)
      saveTheme(updatedTheme)
      return updatedTheme
    })
  }

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleMode,
      toggleLayout,
      updateTheme,
    }),
    [theme],
  )

  const themeConfig = useMemo<ThemeConfig>(() => {
    const { mode, layout } = theme
    return {
      token: {
        colorPrimary: theme.token?.colorPrimary,
        borderRadius: theme.token?.borderRadius,
        colorBgContainer: theme.token?.colorBgContainer,
        motion: true, // 禁用组件内置动画，使用自定义动画
      },
      components: theme.components,
      algorithm:
        mode === 'dark'
          ? layout === 'compact'
            ? [antdTheme.darkAlgorithm, antdTheme.compactAlgorithm]
            : [antdTheme.darkAlgorithm]
          : layout === 'compact'
            ? [antdTheme.defaultAlgorithm, antdTheme.compactAlgorithm]
            : [antdTheme.defaultAlgorithm],
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
