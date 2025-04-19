# @core/preferences

一个用于管理应用程序主题和偏好设置的包。

## 特性

- 🌓 支持亮色/暗色主题切换
- 📱 支持默认/紧凑布局切换
- 🔄 支持跟随系统主题
- 💾 支持主题持久化
- 🎨 支持自定义主题配置
- 🛠 提供丰富的主题工具函数

## 安装

```bash
pnpm add @core/preferences
```

## 使用方法

### 基础用法

```tsx
import { ThemeProvider } from '@core/preferences'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

### 自定义初始主题

```tsx
import { ThemeProvider } from '@core/preferences'

const customTheme = {
  mode: 'light',
  layout: 'default',
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
}

function App() {
  return (
    <ThemeProvider initialTheme={customTheme}>
      <YourApp />
    </ThemeProvider>
  )
}
```

### 使用主题 Hook

```tsx
import { useTheme } from '@core/preferences'

function ThemeToggle() {
  const { theme, toggleMode, toggleLayout } = useTheme()

  return (
    <div>
      <button type="button" onClick={toggleMode}>
        当前主题:
        {' '}
        {theme.mode === 'light' ? '亮色' : '暗色'}
      </button>
      <button type="button" onClick={toggleLayout}>
        当前布局:
        {' '}
        {theme.layout === 'default' ? '默认' : '紧凑'}
      </button>
    </div>
  )
}
```

### 更新主题配置

```tsx
import { useTheme } from '@core/preferences'

function ThemeCustomizer() {
  const { updateTheme } = useTheme()

  const handleColorChange = (color: string) => {
    updateTheme({
      token: {
        colorPrimary: color,
      },
    })
  }

  return (
    <input
      type="color"
      onChange={e => handleColorChange(e.target.value)}
    />
  )
}
```

## API

### ThemeProvider

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialTheme | PreferencesThemeConfig | defaultTheme | 初始主题配置 |
| followSystem | boolean | true | 是否跟随系统主题 |

### useTheme

返回一个对象，包含以下属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| theme | PreferencesThemeConfig | 当前主题配置 |
| toggleMode | () => void | 切换主题模式（亮色/暗色） |
| toggleLayout | () => void | 切换布局模式（默认/紧凑） |
| updateTheme | (theme: Partial<PreferencesThemeConfig>) => void | 更新主题配置 |

### 工具函数

```tsx
import {
  getPresetTheme,
  getSystemTheme,
  isSystemDarkMode,
  mergeThemes,
  validateTheme,
} from '@core/preferences'
```

| 函数 | 说明 |
|------|------|
| validateTheme | 验证主题配置是否有效 |
| mergeThemes | 合并两个主题配置 |
| getPresetTheme | 获取预设主题配置 |
| isSystemDarkMode | 检查系统是否为暗色模式 |
| getSystemTheme | 获取当前系统主题配置 |

## 类型定义

```typescript
type ThemeMode = 'light' | 'dark'
type ThemeLayout = 'default' | 'compact'

interface PreferencesThemeConfig extends Omit<ThemeConfig, 'algorithm'> {
  mode: ThemeMode
  layout: ThemeLayout
  token?: ThemeConfig['token']
  components?: ThemeConfig['components']
}
```

## 注意事项

1. 确保在应用的根组件中使用 `ThemeProvider`
2. 主题配置会被持久化到 localStorage
3. 如果启用了 `followSystem`，系统主题变化时会自动切换主题
4. 自定义主题时注意保持与 Ant Design 的主题 token 兼容
