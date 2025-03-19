import { routerUtils } from '@/router/utils'
import { one } from 'aero-utils'
import { Button, Card, Form, Input, Typography } from 'antd'
import React from 'react'
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {one}
      <Card className="w-96 shadow-lg">
        <Title level={2} className="text-center mb-8">
          登录
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
  )
}

export default Login
