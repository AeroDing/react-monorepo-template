import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout.tsx'
import Home from './pages/Home.tsx'

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
