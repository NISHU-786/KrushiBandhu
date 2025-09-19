"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "visitor" | "farmer" | "govt_official" | "middleman" | "admin"

export interface User {
  id: string
  
  name: string
  role: UserRole
  phone?: string
  email?: string
  location?: string
  language: "en" | "hi" | "od" | "kn"
  avatar?: string
  adminLevel?: string
  permissions?: string[]
  jurisdiction?: string
  designation?: string
  joinedDate?: string
  businessName?: string
  licenseNumber?: string
  lastLogin?: string
}



interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  isLoading: boolean
  switchLanguage: (lang: "en" | "hi" | "od" | "kn") => void
}

interface LoginCredentials {
  phone?: string
  otp?: string
  govtId?: string
  password?: string
  role: UserRole
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("krishibandu_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call with loading animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name:
        credentials.role === "farmer"
          ? "Ramesh Kumar"
          : credentials.role === "govt_official"
            ? "Dr. Priya Sharma"
            : credentials.role === "middleman"
              ? "Suresh Patel"
              : credentials.role === "admin"
                ? "Admin User"
                : "Visitor",
      role: credentials.role,
      phone: credentials.phone || "+91 9876543210",
      email: `${credentials.role}@krishibandu.com`,
      location: "Bhubaneswar, Odisha",
      language: "en",
      avatar: `/placeholder.svg?height=100&width=100&text=${credentials.role}`,
      joinedDate: "2024-01-15",
      lastLogin: new Date().toISOString(),
    }

    setUser(mockUser)
    localStorage.setItem("krishibandu_user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("krishibandu_user", JSON.stringify(updatedUser))

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("krishibandu_user")
  }

  const switchLanguage = (lang: "en" | "hi" | "od" | "kn") => {
    if (user) {
      const updatedUser = { ...user, language: lang }
      setUser(updatedUser)
      localStorage.setItem("krishibandu_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading, switchLanguage }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
