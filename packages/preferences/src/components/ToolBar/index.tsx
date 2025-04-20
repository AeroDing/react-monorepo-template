import {
  CompressOutlined,
  ExpandOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import { Button, Space, theme, Tooltip } from 'antd'
import React, { useMemo, useState } from 'react'
import { useTheme } from '../../context/ThemeProvider'
import { IconFont } from '../../icons/IconFont'
import { BUILT_IN_THEME_PRESETS } from '../../types/theme'

export interface ToolBarProps {
  className?: string
  style?: React.CSSProperties
  onLanguageChange?: () => void
}

export const ToolBar: React.FC<ToolBarProps> = ({
  className,
  style,
  onLanguageChange,
}) => {
  const { theme: preferences, toggleMode, toggleLayout, updateTheme } = useTheme()
  const { token } = theme.useToken()
  const [showThemePresets, setShowThemePresets] = useState(false)

  const toolbarStyle = useMemo(() => ({
    backgroundColor: preferences.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.25)'
      : 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${preferences.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.08)'}`,
    ...style,
  }), [preferences.mode, style])

  const buttonStyle = useMemo(() => ({
    'color': preferences.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
    '&:hover': {
      color: token.colorPrimary,
      backgroundColor: preferences.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)',
    },
  }), [preferences.mode, token.colorPrimary])

  const handleThemeChange = (color: string): void => {
    updateTheme({
      token: {
        ...preferences.token,
        colorPrimary: color,
      },
    })
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-full p-2 transition-all duration-300 ${className}`}
      style={toolbarStyle}
    >
      <Space>
        <div
          className="relative group"
          onMouseEnter={() => setShowThemePresets(true)}
          onMouseLeave={() => setShowThemePresets(false)}
        >
          <Button
            type="text"
            className="theme-button"
            icon={<IconFont name="theme" size={16} color={token.colorPrimary} />}
            style={buttonStyle}
          />
          <div
            className={`absolute right-0 top-1/2 flex items-center gap-2 origin-right -translate-y-1/2 transition-all duration-300 bg-white/5 backdrop-blur-md rounded-full p-2 shadow-lg ${showThemePresets
              ? 'opacity-100 visible scale-x-100 translate-x-10'
              : 'opacity-0 invisible scale-x-0 translate-x-0'
            }`}
          >
            {BUILT_IN_THEME_PRESETS.slice(0, 6).map(preset => (
              <Tooltip key={preset.type} title={preset.type}>
                <button
                  className="w-5 h-5 rounded-full border-2 border-white/10 cursor-pointer transition-transform duration-300 hover:scale-110 hover:border-white/30 shadow-sm"
                  style={{ backgroundColor: preset.color }}
                  onClick={() => handleThemeChange(preset.color)}
                />
              </Tooltip>
            ))}
          </div>
        </div>

        <Tooltip title={`切换到${preferences.mode === 'light' ? '暗色' : '亮色'}主题`}>
          <Button
            type="text"
            icon={preferences.mode === 'dark' ? <IconFont name="solar" size={16} /> : <IconFont name="moon" size={16} />}
            onClick={toggleMode}
            style={buttonStyle}
            className="transition-colors duration-300"
          />
        </Tooltip>

        <Tooltip title={`切换到${preferences.layout === 'default' ? '紧凑' : '默认'}布局`}>
          <Button
            type="text"
            icon={preferences.layout === 'default' ? <CompressOutlined /> : <ExpandOutlined />}
            onClick={toggleLayout}
            style={buttonStyle}
            className="transition-colors duration-300"
          />
        </Tooltip>

        {onLanguageChange && (
          <Tooltip title="切换语言">
            <Button
              type="text"
              icon={<TranslationOutlined />}
              onClick={onLanguageChange}
              style={buttonStyle}
              className="transition-colors duration-300"
            />
          </Tooltip>
        )}
      </Space>
    </div>
  )
}
