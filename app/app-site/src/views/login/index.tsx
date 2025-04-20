import { routerUtils } from '@/router/utils'
import { ToolBar } from '@core/preferences'
import { Button, Card, Form, Input, theme, Typography } from 'antd'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

interface LoginForm {
  username: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginForm>()
  const { token } = theme.useToken()

  const handleSubmit = async (_values: LoginForm): Promise<void> => {
    // 模拟登录成功后获取token
    const token = 'mock-token'
    // 将token存储到localStorage中
    localStorage.setItem('token', token)

    // 获取之前保存的重定向地址，如果没有则跳转到项目列表页
    const params = new URLSearchParams(window.location.search)
    const redirectTo = params.get('redirect') || '/projectList'
    routerUtils.navigateWithParams(navigate, redirectTo)
  }

  const containerStyle = useMemo(() => ({
    background: token.colorBgLayout,
  }), [token])

  const rightSideStyle = useMemo(() => ({
    background: token.colorBgContainer,
    borderLeft: `1px solid ${token.colorBorderSecondary}`,
  }), [token])

  return (
    <div
      className="min-h-screen flex relative transition-colors duration-300"
      style={containerStyle}
    >
      {/* 工具栏 */}
      <ToolBar className="absolute top-4 right-4 z-10" />

      {/* 左侧区域 */}
      <div
        className="w-2/3 flex flex-col items-center justify-center transition-all duration-300"
      >
        <div className="text-center">
          <Icon name="icon-login-logo" className="w-100 h-100" />
          <Title
            level={2}
            style={{
              marginBottom: token.marginLG,
            }}
          >
            AI智能管理系统
          </Title>
          <p
            className="mt-2 text-lg"
            style={{ color: token.colorTextSecondary, }}
          >
            高效赋能企业，智能驱动决策，助力业务全面升级
          </p>
        </div>
      </div>

      {/* 右侧区域 */}
      <div
        className="w-1/3 flex items-center justify-center px-10 transition-all duration-300"
        style={rightSideStyle}
      >
        <Card
          className="w-96 transition-all duration-300"
        >
          <Title
            level={2}
            className="text-center"
            style={{
              marginBottom: token.marginXL,
            }}
          >
            欢迎登录
            <IconFont name="hashiqi" size={16} />
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                placeholder="请输入用户名"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: token.marginLG }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
