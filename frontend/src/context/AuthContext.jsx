import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  async function checkAuthStatus() {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setLoading(false)
        return
      }
      
      const response = await api.post('/auth/refresh')
      setUser(response.data.user)
      localStorage.setItem('accessToken', response.data.token)
    } catch (err) {
      setUser(null)
      localStorage.removeItem('accessToken')
    } finally {
      setLoading(false)
    }
  }

  async function login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password })
      setUser(response.data.user)
      localStorage.setItem('accessToken', response.data.token)
      return response.data
    } catch (err) {
      setUser(null)
      localStorage.removeItem('accessToken')
      throw err
    }
  }

  async function register(username, password) {
    try {
      const response = await api.post('/auth/register', { username, password })
      setUser(response.data.user)
      localStorage.setItem('accessToken', response.data.token)
      return response.data
    } catch (err) {
      setUser(null)
      localStorage.removeItem('accessToken')
      throw err
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      localStorage.removeItem('accessToken')
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    isLoggedIn: !!user,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}