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
    // TODO: 实现登录逻辑
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
