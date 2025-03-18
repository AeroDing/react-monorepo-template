import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requireAuth = false }) => {
  const location = useLocation()
  const isAuthenticated = localStorage.getItem('token') // 这里根据实际情况修改认证判断逻辑

  if (requireAuth && !isAuthenticated) {
    // 需要认证但未登录，重定向到登录页
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated && location.pathname === '/login') {
    // 已登录用户访问登录页，重定向到首页
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default RouteGuard
