import type { RouteObject } from 'react-router-dom'
import RouteGuard from '@/router/RouteGuard'
import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// 创建加载组件
function LoadingComponent(): React.ReactElement {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Spin size="large" />
    </div>
  )
}

// 创建懒加载包装器
function lazyLoad(
  factory: () => Promise<{ default: React.ComponentType<any> }>,
  requireAuth = true,
): React.ReactElement {
  const Component = lazy(factory)
  const LazyComponent = (
    <Suspense fallback={<LoadingComponent />}>
      <Component />
    </Suspense>
  )

  return <RouteGuard requireAuth={requireAuth}>{LazyComponent}</RouteGuard>
}

// 预加载关键路由组件
Promise.all([
  import('@/layouts'),
  import('@/views/projectList'),
  import('@/views/login'),
  import('@/views/404'),
]).catch(console.error)

// 用户路由
export const userRoutes: RouteObject[] = [
  {
    path: 'projectList',
    element: lazyLoad(() => import('@/views/projectList'), true),
  },
]

// 管理员路由
export const adminRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: lazyLoad(() => import('@/views/admin/dashboard'), true),
  },
  {
    path: 'userManagement',
    element: lazyLoad(() => import('@/views/admin/userManagement'), true),
  },
]

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: lazyLoad(() => import('@/views/login'), false),
  },
  {
    path: '/',
    element: lazyLoad(() => import('@/layouts'), true),
    children: [
      {
        index: true,
        element: <Navigate to="/projectList" replace />,
      },
      ...userRoutes,
      ...adminRoutes,
    ],
  },
  {
    path: '*',
    element: lazyLoad(() => import('@/views/404'), false),
  },
]
