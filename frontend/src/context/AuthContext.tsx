import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { api } from '../lib/api'

type AuthResponse = {
  token: string
  username: string
  roles: string[]
}

export type AuthState = {
  username: string
  roles: string[]
  token: string
}

export type AuthContextType = {
  user: AuthState | null
  isAdmin: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')
    const username = Cookies.get('username')
    const roles = Cookies.get('roles')
    if (token && username && roles) {
      setUser({ token, username, roles: JSON.parse(roles) })
    }
  }, [])

  const isAdmin = useMemo(() => user?.roles?.includes('ADMIN') ?? false, [user])

  async function login(username: string, password: string) {
    const { data } = await api.post<AuthResponse>('/auth/login', { username, password })
    Cookies.set('token', data.token)
    Cookies.set('username', data.username)
    Cookies.set('roles', JSON.stringify(data.roles))
    setUser({ token: data.token, username: data.username, roles: data.roles })
  }

  async function register(username: string, email: string, password: string) {
    await api.post('/auth/register', { username, email, password })
  }

  function logout() {
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('roles')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
