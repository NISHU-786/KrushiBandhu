"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { Header } from "@/components/layout/header"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { LandingPage } from "@/components/pages/landing-page"
import { useAuth } from "@/components/auth/auth-provider"

function AppContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LandingPage />
      {(!user || user.role === "visitor") && <BottomNavigation />}
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  )
}
