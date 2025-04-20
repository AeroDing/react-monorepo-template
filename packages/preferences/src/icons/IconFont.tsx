import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { createFromIconfontCN } from '@ant-design/icons'
import React, { useState } from 'react'

// 1. 定义预设的在线脚本 URL 数组
const PRESET_ONLINE_SCRIPT_URLS: string[] = [
  '//at.alicdn.com/t/c/font_4899668_i6fjv7tb6xj.js', // 替换成你的 URL
]

// 3. 从 Props 接口移除 onlineScriptUrls
export interface IconFontProps extends Partial<Omit<CustomIconComponentProps, 'type'>> {
  name: string
  size?: number
  color?: string
  // onlineScriptUrls?: string | string[] // 不再需要此 prop
}

export const IconFont: React.FC<IconFontProps> = ({
  name,
  size = 24,
  color,
  style,
  className,
  ...rest
}) => {
  // 直接使用 PRESET_ONLINE_SCRIPT_URLS 初始化 IconComponent
  // 注意：如果 PRESET_ONLINE_SCRIPT_URLS 为空，需要处理
  const [IconComponent] = useState(() => {
    if (PRESET_ONLINE_SCRIPT_URLS && PRESET_ONLINE_SCRIPT_URLS.length > 0) {
      // 使用 Set 去重，虽然这里只有一个数组，但保持良好实践
      const uniqueUrls = [...new Set(PRESET_ONLINE_SCRIPT_URLS)]
      return createFromIconfontCN({ scriptUrl: uniqueUrls })
    }
    else {
      console.warn('IconFont: No preset online script URLs provided.')
      return null
    }
  })

  if (!IconComponent)
    return null

  return (
    <IconComponent
      type={`icon-${name}`}
      style={{ fontSize: size, color, ...style }}
      className={className}
      {...rest}
    />
  )
}
