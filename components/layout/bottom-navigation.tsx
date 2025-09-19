"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { useLanguage } from "@/components/providers/language-provider"
import { Home, Info, Users, Star, Phone, User, Settings, BarChart3, Briefcase } from "lucide-react"

interface BottomNavigationProps {
  activeFeature?: string
  onFeatureSelect?: (feature: string) => void
}

export function BottomNavigation({ activeFeature, onFeatureSelect }: BottomNavigationProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(activeFeature || "dashboard")

  // Don't render navigation for visitors/unauthenticated users
  if (!user || user.role === "visitor") {
    return null
  }

  // For authenticated users with roles - show only dashboard
  const authenticatedNavItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      icon: <Home className="w-5 h-5" />,
      onClick: () => {
        setActiveTab("dashboard")
        onFeatureSelect?.("")
      },
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-30 transition-all duration-300">
      <div className="flex items-center justify-center py-3">
        {authenticatedNavItems.map((item) => (
          <Button
            key={item.id}
            variant="default"
            size="lg"
            className="flex items-center space-x-3 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={item.onClick}
          >
            <div className="transition-transform duration-200">
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}
