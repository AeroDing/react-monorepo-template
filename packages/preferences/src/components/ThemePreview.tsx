import type { PreferencesThemeConfig } from '../types/theme'
import { Button, Card, Space, Typography } from 'antd'
import React from 'react'
import { useTheme } from '../context/ThemeProvider'

const { Text } = Typography

export interface ThemePreviewProps {
  theme: PreferencesThemeConfig
  title?: string
  onClick?: () => void
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  theme,
  title,
  onClick,
}) => {
  const { theme: currentTheme } = useTheme()
  const isActive = currentTheme.mode === theme.mode && currentTheme.layout === theme.layout

  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        width: 200,
        cursor: onClick ? 'pointer' : 'default',
        border: isActive ? '2px solid #1677ff' : undefined,
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {title && <Text strong>{title}</Text>}
        <div
          style={{
            padding: 12,
            background: theme.mode === 'dark' ? '#141414' : '#ffffff',
            borderRadius: 6,
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" size={theme.layout === 'compact' ? 'small' : 'middle'}>
              Primary Button
            </Button>
            <Button size={theme.layout === 'compact' ? 'small' : 'middle'}>
              Default Button
            </Button>
          </Space>
        </div>
        <Space>
          <Text type="secondary">
            Mode:
            {theme.mode}
          </Text>
          <Text type="secondary">
            Layout:
            {theme.layout}
          </Text>
        </Space>
      </Space>
    </Card>
  )
}
