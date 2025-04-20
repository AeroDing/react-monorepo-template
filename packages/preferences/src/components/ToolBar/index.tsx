import {
  CompressOutlined,
  ExpandOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import { Button, Space, theme, Tooltip } from 'antd'
import React, { useMemo } from 'react'
import { useTheme } from '../../context/ThemeProvider'
import { IconFont } from '../../icons/IconFont'

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
  const { theme: preferences, toggleMode, toggleLayout } = useTheme()
  const { token } = theme.useToken()

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

  return (
    <div
      className={`flex items-center gap-2 rounded-full p-2 transition-all duration-300 ${className}`}
      style={toolbarStyle}
    >
      <Space>
        <Button
          type="text"
          icon={<IconFont name="theme" size={16} color={token.colorPrimary} />}
          onClick={toggleMode}
        />

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
