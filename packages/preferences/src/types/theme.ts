import type { ThemeConfig as AntdThemeConfig } from 'antd'

export type ThemeMode = 'light' | 'dark'
export type ThemeLayout = 'default' | 'compact'

export interface PreferencesThemeConfig {
  mode: ThemeMode
  layout: ThemeLayout
  token: {
    motion?: {
      duration?: number
    }
    borderRadius?: number
    colorPrimary?: string
    colorBgContainer?: string
    colorBgElevated?: string
    colorBgLayout?: string
    colorBgBase?: string
    colorText?: string
    colorTextSecondary?: string
    colorBorder?: string
    colorBorderSecondary?: string
    colorSuccess?: string
    colorWarning?: string
    colorError?: string
    colorInfo?: string
    colorTextBase?: string
    colorBgMask?: string
    boxShadow?: string
    boxShadowSecondary?: string
    fontSize?: number
    wireframe?: boolean
  }
  components?: {
    Button?: {
      controlHeight?: number
      paddingContentHorizontal?: number
      colorBgContainer?: string
      colorBgContainerDisabled?: string
      colorText?: string
      colorTextDisabled?: string
    }
    Input?: {
      controlHeight?: number
      paddingContentHorizontal?: number
      colorBgContainer?: string
      colorBorder?: string
      colorText?: string
      colorTextPlaceholder?: string
      colorTextDisabled?: string
    }
    Card?: {
      colorBgContainer?: string
      colorBorderSecondary?: string
      boxShadow?: string
    }
    [key: string]: Record<string, any> | undefined
  }
}

export interface ThemeContextType {
  theme: PreferencesThemeConfig
  setTheme: (theme: PreferencesThemeConfig) => void
  toggleMode: () => void
  toggleLayout: () => void
  updateTheme: (theme: Partial<PreferencesThemeConfig>) => void
}

// 预设主题类型
export type ThemePreset = 'default' | 'dark' | 'custom'

// 主题配置验证
export interface ThemeValidationResult {
  isValid: boolean
  errors: string[]
}

// 主题迁移
export interface ThemeMigrationOptions {
  version: string
  force?: boolean
}

// 主题配置
export interface ThemeConfig {
  mode: ThemeMode
  layout: ThemeLayout
  token?: {
    motion?: {
      duration?: number
    }
  } & AntdThemeConfig['token']
  components?: AntdThemeConfig['components']
}
