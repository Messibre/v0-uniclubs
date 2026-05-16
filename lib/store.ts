import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEMO_USERS, MOCK_CLUBS, type DemoUser } from '@/lib/mock-data'

// ===================== AUTH STORE =====================
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: 'student' | 'officer' | 'admin'
  badges: string[]
  joinedClubs: string[]
  managedClubs: string[]
  major?: string | null
  studentId?: string | null
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
  setDemoUser: (user: DemoUser) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Check demo credentials
        if (email === 'admin@aau.edu.et' && password === 'Admin@1234') {
          const demoUser = DEMO_USERS.admin
          set({
            user: {
              id: demoUser.id,
              firstName: demoUser.firstName,
              lastName: demoUser.lastName,
              email: demoUser.email,
              avatar: demoUser.avatar,
              role: demoUser.role,
              badges: demoUser.badges,
              joinedClubs: demoUser.joinedClubs,
              managedClubs: demoUser.managedClubs,
              major: demoUser.major,
              studentId: demoUser.studentId,
            },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } else if (email === 'abebe.kebede@aau.edu.et' && password === 'Abebe123') {
          const demoUser = DEMO_USERS.student
          set({
            user: {
              id: demoUser.id,
              firstName: demoUser.firstName,
              lastName: demoUser.lastName,
              email: demoUser.email,
              avatar: demoUser.avatar,
              role: demoUser.role,
              badges: demoUser.badges,
              joinedClubs: demoUser.joinedClubs,
              managedClubs: demoUser.managedClubs,
              major: demoUser.major,
              studentId: demoUser.studentId,
            },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } else if (email === 'senait.negash@aau.edu.et' && password === 'Senait123') {
          const demoUser = DEMO_USERS.officer
          set({
            user: {
              id: demoUser.id,
              firstName: demoUser.firstName,
              lastName: demoUser.lastName,
              email: demoUser.email,
              avatar: demoUser.avatar,
              role: demoUser.role,
              badges: demoUser.badges,
              joinedClubs: demoUser.joinedClubs,
              managedClubs: demoUser.managedClubs,
              major: demoUser.major,
              studentId: demoUser.studentId,
            },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } else if (email && password && password.length >= 6) {
          // Accept any valid-looking credentials for demo as student
          const demoUser = DEMO_USERS.student
          set({
            user: {
              id: demoUser.id,
              firstName: email.split('@')[0],
              lastName: '',
              email,
              avatar: demoUser.avatar,
              role: 'student',
              badges: [],
              joinedClubs: [],
              managedClubs: [],
            },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } else {
          set({
            error: 'Invalid credentials. Please check your email and password.',
            isLoading: false,
          })
          return false
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },
      
      clearError: () => {
        set({ error: null })
      },
      
      setDemoUser: (demoUser: DemoUser) => {
        set({
          user: {
            id: demoUser.id,
            firstName: demoUser.firstName,
            lastName: demoUser.lastName,
            email: demoUser.email,
            avatar: demoUser.avatar,
            role: demoUser.role,
            badges: demoUser.badges,
            joinedClubs: demoUser.joinedClubs,
            managedClubs: demoUser.managedClubs,
            major: demoUser.major,
            studentId: demoUser.studentId,
          },
          isAuthenticated: true,
          error: null,
        })
      },
    }),
    {
      name: 'uniclubs-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

// ===================== DEMO STORE =====================
type DemoRole = 'student' | 'officer' | 'admin'

interface DemoState {
  isDemoMode: boolean
  currentRole: DemoRole
  setDemoMode: (enabled: boolean) => void
  switchRole: (role: DemoRole) => void
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      isDemoMode: false,
      currentRole: 'student',
      
      setDemoMode: (enabled: boolean) => {
        set({ isDemoMode: enabled })
        if (enabled) {
          // Auto-login as student when demo mode is enabled
          const demoUser = DEMO_USERS.student
          useAuthStore.getState().setDemoUser(demoUser)
        }
      },
      
      switchRole: (role: DemoRole) => {
        set({ currentRole: role, isDemoMode: true })
        const demoUser = DEMO_USERS[role]
        useAuthStore.getState().setDemoUser(demoUser)
      },
    }),
    {
      name: 'uniclubs-demo',
    }
  )
)
