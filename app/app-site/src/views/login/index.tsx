import { routerUtils } from '@/router/utils'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

interface LoginForm {
  username: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginForm>()

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

  return (
    <div className="min-h-screen flex">
      {/* 左侧区域 */}
      <div className="w-2/3 flex flex-col items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100">
        <Icon name="icon-login-logo" className="w-100 h-100 mb-8" />
        <div className="text-center">
          <Title level={2}>AI智能管理系统</Title>
          <p className="text-gray-500 mt-2">
            高效赋能企业，智能驱动决策，助力业务全面升级
          </p>
        </div>
      </div>
      {/* 右侧区域 */}
      <div className="w-1/3 flex items-center justify-center px-10">
        <Card className="w-96 shadow-lg">
          <Title level={2} className="text-center mb-8">
            欢迎登录
            <IconFont name="hashiqi" />
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
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
