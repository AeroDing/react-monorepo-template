import { UserRole } from '@/router/routes'
import { useRoleStore } from '@/store/roleStore'
import { Select } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { currentRole, setRole } = useRoleStore()
  const navigate = useNavigate()

  const handleRoleChange = (value: UserRole): void => {
    setRole(value)
    // 切换角色时重定向到对应的首页
    if (value === UserRole.USER) {
      navigate('/projectList')
    }
    else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex justify-between items-center px-6">
      <div className="text-lg font-bold">React Monorepo Template</div>
      <Select
        value={currentRole}
        onChange={handleRoleChange}
        className="w-32"
        options={[
          { label: '用户模式', value: UserRole.USER },
          { label: '管理模式', value: UserRole.ADMIN },
        ]}
      />
    </div>
  )
}

export default Header
