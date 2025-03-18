import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requireAuth = false }) => {
  const location = useLocation()

  // 使用 useMemo 缓存认证状态的初始值
  const initialAuthState = useMemo(() => {
    const token = localStorage.getItem('token')
    return !!token
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const newAuthState = !!token
    if (isAuthenticated !== newAuthState) {
      setIsAuthenticated(newAuthState)
    }
  }, [location.pathname, isAuthenticated])

  // 使用 useMemo 缓存重定向组件，避免不必要的重新渲染
  const redirectComponent = useMemo(() => {
    if (requireAuth && !isAuthenticated) {
      return (
        <Navigate
          to="/login"
          state={{ from: location.pathname }}
          replace
        />
      )
    }

    if (isAuthenticated && location.pathname === '/login') {
      const from = location.state?.from || '/'
      return <Navigate to={from} replace />
    }

    return null
  }, [requireAuth, isAuthenticated, location.pathname, location.state])

  if (redirectComponent) {
    return redirectComponent
  }

  return <>{children}</>
}

export default RouteGuard
