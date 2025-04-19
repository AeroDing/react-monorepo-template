// import { ConfigProvider } from 'antd'
// import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts'

const App: React.FC = () => {
  return (
    // <ConfigProvider locale={zhCN}>
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
    // </ConfigProvider>
  )
}

export default App
