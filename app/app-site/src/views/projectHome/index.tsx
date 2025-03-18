import { FloatButton, Typography } from 'antd'
import React from 'react'

const { Title } = Typography

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <Title level={1} className="text-center mb-8">
        欢迎使用 React Monorepo Template
      </Title>
      <div className="max-w-4xl mx-auto">
        <Title level={2} className="mb-4">
          快速开始
        </Title>
        <Typography.Paragraph>
          这是一个基于 React + TypeScript + Ant Design 的单体应用模板，
          使用 pnpm workspace 实现 monorepo 工程化管理。
        </Typography.Paragraph>
        <Title level={2} className="mb-4">
          主要特性
        </Title>
        <Typography.Paragraph>
          <ul className="list-disc pl-8">
            <li>基于 React 18 + TypeScript 4</li>
            <li>使用 Ant Design 5.0 组件库</li>
            <li>采用 Vite 作为构建工具</li>
            <li>支持 monorepo 工程化管理</li>
            <li>内置路由权限控制</li>
            <li>统一的代码规范配置</li>
          </ul>
        </Typography.Paragraph>
      </div>
      <FloatButton />
    </div>
  )
}

export default Home
