import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { createFromIconfontCN } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

// 1. 定义预设的在线脚本 URL 数组
const PRESET_ONLINE_SCRIPT_URLS: string[] = [
  '//at.alicdn.com/t/c/font_4899183_p8x14sr7z1.js', // 替换成你的 URL
]

// 3. 从 Props 接口移除 onlineScriptUrls
export interface IconFontProps extends Partial<Omit<CustomIconComponentProps, 'type'>> {
  name: string
  size?: number
  color?: string
  // onlineScriptUrls?: string | string[] // 不再需要此 prop
}

const iconModules = import.meta.glob('./fonts/*.js')

// 2. 修改 getIconScriptUrls 以始终包含预设 URL
async function getIconScriptUrls(): Promise<string[]> {
  const localUrls: string[] = []
  for (const path in iconModules) {
    // 保持之前的本地 URL 获取逻辑（需要验证和调整）
    await iconModules[path]()
    try {
      const resourceUrl = new URL(path.replace('.js', ''), import.meta.url).href
      localUrls.push(resourceUrl)
    }
    catch (e) {
      console.error(`Failed to create URL for local icon module: ${path}`, e)
    }
  }

  // 将本地 URL 与预设的在线 URL 合并
  const finalUrls = [...localUrls, ...PRESET_ONLINE_SCRIPT_URLS]

  // 去重
  return [...new Set(finalUrls)]
}

export const IconFont: React.FC<IconFontProps> = ({
  name,
  size = 24,
  color,
  style,
  className,
  // onlineScriptUrls, // 移除 prop 的接收
  ...rest
}) => {
  const [IconComponent, setIconComponent] = useState<ReturnType<typeof createFromIconfontCN> | null>(null)

  useEffect(() => {
    // 不再需要传递参数给 getIconScriptUrls
    getIconScriptUrls().then((urls) => {
      if (urls && urls.length > 0) {
        // 注意：这里每次都会基于合并后的 URL 列表创建 Icon 组件
        // 如果 PRESET_ONLINE_SCRIPT_URLS 不变，且本地文件不变，理论上 urls 列表也是固定的
        // createFromIconfontCN 内部可能有缓存机制，但频繁调用仍需注意性能
        setIconComponent(() => createFromIconfontCN({ scriptUrl: urls }))
      }
      else {
        setIconComponent(null)
        console.warn('IconFont: No valid script URLs found (local or preset online).')
      }
    }).catch((error) => {
      console.error('Failed to load icon scripts:', error)
      setIconComponent(null)
    })
    // 4. 更新 useEffect 依赖项，现在它不依赖外部 prop 了
    // 如果本地文件列表是静态的（构建时确定），依赖项数组可以为空 []
    // 如果本地文件列表可能动态变化（不太常见），则需要找到合适的依赖项
  }, []) // 依赖项数组现在为空

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
