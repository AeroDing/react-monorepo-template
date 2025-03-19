import { UserRole } from '@/router/routes'
import { create } from 'zustand'

interface RoleState {
  currentRole: UserRole
  setRole: (role: UserRole) => void
}

export const useRoleStore = create<RoleState>(set => ({
  currentRole: UserRole.USER,
  setRole: role => set({ currentRole: role }),
}))
