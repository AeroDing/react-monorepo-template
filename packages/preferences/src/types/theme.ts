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

export interface BuiltinThemePreset {
  color: string
  type: string
  darkPrimaryColor?: string
  primaryColor?: string
}

export const BUILT_IN_THEME_PRESETS: BuiltinThemePreset[] = [
  {
    color: 'hsl(212 100% 45%)',
    type: 'default',
  },
  {
    color: 'hsl(245 82% 67%)',
    type: 'violet',
  },
  {
    color: 'hsl(347 77% 60%)',
    type: 'pink',
  },
  {
    color: 'hsl(42 84% 61%)',
    type: 'yellow',
  },
  {
    color: 'hsl(231 98% 65%)',
    type: 'sky-blue',
  },
  {
    color: 'hsl(161 90% 43%)',
    type: 'green',
  },
  {
    color: 'hsl(240 5% 26%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'zinc',
  },
  {
    color: 'hsl(181 84% 32%)',
    type: 'deep-green',
  },
  {
    color: 'hsl(211 91% 39%)',
    type: 'deep-blue',
  },
  {
    color: 'hsl(18 89% 40%)',
    type: 'orange',
  },
  {
    color: 'hsl(0 75% 42%)',
    type: 'rose',
  },
  {
    color: 'hsl(0 0% 25%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'neutral',
  },
  {
    color: 'hsl(215 25% 27%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'slate',
  },
  {
    color: 'hsl(217 19% 27%)',
    darkPrimaryColor: 'hsl(0 0% 98%)',
    primaryColor: 'hsl(240 5.9% 10%)',
    type: 'gray',
  },
  {
    color: '',
    type: 'custom',
  },
]
