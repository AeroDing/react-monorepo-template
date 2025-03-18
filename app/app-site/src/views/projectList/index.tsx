import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Pagination, Row, Space, Tag, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography

// 模拟数据
const mockProjects = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `项目 ${i + 1}`,
  description: `这是项目 ${i + 1} 的描述信息，项目包含了一些基本功能和特性...`,
  status: ['进行中', '已完成', '规划中'][i % 3],
  createTime: '2024-03-20',
}))

const ProjectList: React.FC = () => {
  const [_, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!mb-0">项目列表</Title>
        <Space>
          <Input.Search
            placeholder="搜索项目"
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 250 }}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button type="primary">新建项目</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {mockProjects.map(project => (
          <Col xs={24} sm={12} lg={8} xl={6} key={project.id}>
            <Card
              hoverable
              actions={[
                <EyeOutlined key="view" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Card.Meta
                title={project.name}
                description={(
                  <div>
                    <p className="text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <Tag color={
                        project.status === '进行中'
                          ? 'processing'
                          : project.status === '已完成' ? 'success' : 'default'
                      }
                      >
                        {project.status}
                      </Tag>
                      <span className="text-gray-400 text-sm">{project.createTime}</span>
                    </div>
                  </div>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={100}
          pageSize={pageSize}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default ProjectList
