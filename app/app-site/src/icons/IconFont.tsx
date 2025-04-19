import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { createFromIconfontCN } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

export interface IconFontProps extends Partial<Omit<CustomIconComponentProps, 'type'>> {
  name: string
  size?: number
  color?: string
}

const iconModules = import.meta.glob('./fonts/*.js')

async function getIconScriptUrls(): Promise<string[]> {
  const urls: string[] = []
  for (const path in iconModules) {
    await iconModules[path]()
    const url = new URL(path, import.meta.url).href
    urls.push(url)
  }
  return urls
}

export const IconFont: React.FC<IconFontProps> = ({
  name,
  size = 24,
  color,
  style,
  className,
  ...rest
}) => {
  const [IconComponent, setIconComponent] = useState<any>(null)

  useEffect(() => {
    getIconScriptUrls().then((urls) => {
      setIconComponent(createFromIconfontCN({ scriptUrl: urls }))
    })
  }, [])

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
