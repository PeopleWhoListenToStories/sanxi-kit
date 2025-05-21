import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  user: any | null
  organization: {}
  organizations: any[]
  wikiList: any[]
  setUser: (user: any) => void
  setToken: (token: string) => void
  logout: () => void
  setOrganization: (organizations: any) => void
  setOrganizations: (organizations: any[]) => void
  setWikiList: (wikiList: any[]) => void
  getToken: () => string | null
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      organization: {},
      organizations: [],
      wikiList: [],
      setUser: (user) => set({user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      logout: () => set({ token: null, user: null, isAuthenticated: false, organizations: [], wikiList: [] }),
      setOrganizations: (organizations) => set({ organizations }),
      setOrganization: (organization) => set({ organization }),
      setWikiList: (wikiList) => set({ wikiList }),
    }),
    {
      name: 'auth-storage'
    }
  )
)