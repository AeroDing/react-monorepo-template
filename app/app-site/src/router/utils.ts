import type { NavigateFunction } from 'react-router-dom'

/**
 * 路由跳转工具函数
 */
export const routerUtils = {
  /**
   * 带参数的路由跳转
   * @param navigate - 路由跳转函数
   * @param path - 目标路径
   * @param params - 路由参数
   */
  navigateWithParams: (
    navigate: NavigateFunction,
    path: string,
    params: Record<string, string>,
  ): void => {
    const searchParams = new URLSearchParams(params)
    navigate(`${path}?${searchParams.toString()}`)
  },

  /**
   * 返回上一页
   * @param navigate - 路由跳转函数
   */
  goBack: (navigate: NavigateFunction): void => {
    navigate(-1)
  },

  /**
   * 重定向到登录页
   * @param navigate - 路由跳转函数
   * @param from - 来源路径，登录后跳回
   */
  redirectToLogin: (navigate: NavigateFunction, from?: string): void => {
    if (from) {
      const params = new URLSearchParams({ redirect: from })
      navigate(`/login?${params.toString()}`)
    }
    else {
      navigate('/login')
    }
  },
}
