import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

// 使用懒加载优化性能
const Layout = lazy(() => import('@/layouts'))
const Home = lazy(() => import('@/views/projectHome'))
const NotFound = lazy(() => import('@/views/404'))
const Login = lazy(() => import('@/views/login'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]
