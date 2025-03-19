import Header from '@/components/Header'
import { Layout as AntdLayout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const { Content, Footer } = AntdLayout

const Layout: React.FC = () => {
  return (
    <AntdLayout className="min-h-screen">
      <Header />
      <Content className="p-6">
        <Outlet />
      </Content>
      <Footer className="text-center">Footer</Footer>
    </AntdLayout>
  )
}

export default Layout
