"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { Header } from "@/components/layout/header"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import Pricing from "@/components/features/pricing"
import { useAuth } from "@/components/auth/auth-provider"

function PricingContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Header showPricing={false} />
      <Pricing />
      {(!user || user.role === "visitor") && <BottomNavigation />}
    </div>
  )
}

export default function PricingPage() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <PricingContent />
      </AuthProvider>
    </LanguageProvider>
  )
}
