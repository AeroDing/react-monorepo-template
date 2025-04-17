import React from 'react'

// 定义 Icon 组件的 Props 接口
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string // 图标名称，格式应为 'icon-xxx'，例如 'icon-home'
}

// 定义 SVG 组件的类型
type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>

// 定义 SVG 模块的类型，包含一个默认导出的 SVG 组件
interface SvgModule {
  default: SvgComponent
}

// 使用 Vite 的 glob 导入功能动态加载所有 SVG 文件
// 配置为急切加载（eager: true）并添加查询参数 '?react' 以支持 React 组件
const svgModules = import.meta.glob<SvgModule>(
  ['./svg/*.svg'],
  {
    eager: true,
    query: '?react',
  },
)

// 存储所有图标的映射表，键为图标名称，值为对应的 SVG 组件
const icons: Record<string, SvgComponent> = {}

// 遍历所有导入的 SVG 模块
Object.keys(svgModules).forEach((path) => {
  // 从文件路径中提取图标名称（例如，从 './svg/home.svg' 提取 'home'）
  const match = path.match(/\/([^/]+)\.svg$/)
  if (match && match[1]) {
    const iconName = `icon-${match[1]}` // 生成标准化的图标名称，例如 'icon-home'
    // 将 SVG 模块的默认导出（即 SVG 组件）存储到映射表中
    icons[iconName] = svgModules[path].default
  }
})

// Icon 组件：根据名称渲染对应的 SVG 图标
export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  // 从映射表中获取对应名称的 SVG 组件
  const SvgComponent = icons[name]

  // 如果未找到对应的图标，打印警告并返回 null
  if (!SvgComponent) {
    console.warn(`[图标] 未找到名称为 "${name}" 的图标。`)
    return null
  }

  // 渲染 SVG 组件，并将剩余的 props 传递给它
  return <SvgComponent {...props} />
}
