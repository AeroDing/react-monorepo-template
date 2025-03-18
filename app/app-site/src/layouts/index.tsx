import { Layout as AntdLayout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const { Header, Content, Footer } = AntdLayout

const Layout: React.FC = () => {
  return (
    <AntdLayout className="min-h-screen">
      <Header className="bg-white">Header</Header>
      <Content className="p-6">
        <Outlet />
      </Content>
      <Footer className="text-center">Footer</Footer>
    </AntdLayout>
  )
}

export default Layout
