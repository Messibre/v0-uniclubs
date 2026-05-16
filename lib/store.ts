import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_USER, MOCK_CLUBS } from '@/lib/mock-data'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
  badges: string[]
  clubs: typeof MOCK_CLUBS
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
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
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Demo credentials check
        if (email === 'admin@aau.edu.et' && password === 'Admin@1234') {
          set({
            user: { ...MOCK_USER, role: 'admin', email },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } else if (email === 'abebe@aau.edu.et' && password === 'Abebe123') {
          set({
            user: { ...MOCK_USER, email },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } else if (email && password && password.length >= 6) {
          // Accept any valid-looking credentials for demo
          set({
            user: { ...MOCK_USER, email, firstName: email.split('@')[0] },
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
    }),
    {
      name: 'uniclubs-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
