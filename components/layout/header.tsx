"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth/auth-provider"
import { useLanguage } from "@/components/providers/language-provider"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { LoginModal } from "@/components/auth/login-modal"
import { Bell, LogOut, User, Menu, ChevronDown, Settings, DollarSign, Home } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  scrollToSection?: (sectionId: string) => void
  showPricing?: boolean
}

export function Header({ scrollToSection, showPricing = false }: HeaderProps) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const roleEmojis = {
    farmer: "🌾",
    govt_official: "🏛️",
    middleman: "🤝",
    admin: "👑",
    visitor: "👤",
  } as const

  // Navigation links - only show pricing if showPricing is true
  const navLinks = [
    { id: "about", label: t("About"), isExternal: false },
    { id: "success", label: t("Stories"), isExternal: false },
    { id: "pricing", label: t("Pricing"), isExternal: true },
    { id: "contact", label: t("Contact"), isExternal: false },
  ]

  const handleNavClick = (sectionId: string, isExternal: boolean) => {
    if (isExternal && sectionId === "pricing") {
      // Navigate to pricing page
      router.push("/pricing")
      setShowMobileMenu(false)
      return
    }

    // For other sections, use scrollToSection
    if (scrollToSection) {
      scrollToSection(sectionId)
      setShowMobileMenu(false)
    }
  }

  const handleLogout = () => {
    logout()
    setShowMobileMenu(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-xl border-b border-gray-200/30 shadow-sm">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative w-100 h-100 sm:w-100 sm:h-100">
              <Image 
                src="/Krushi-bandhu-logo.png" 
                alt="KrushiBandhu Logo" 
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 96px, 112px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Visitor Navigation */}
            {!user && (
              <>
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    variant="ghost"
                    onClick={() => handleNavClick(link.id, link.isExternal)}
                    className={`text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 font-medium px-4 py-2 rounded-lg backdrop-blur-sm ${
                      link.id === "pricing" ? "flex items-center" : ""
                    }`}
                  >
                    {link.id === "pricing" && <DollarSign className="w-4 h-4 mr-2" />}
                    {link.label}
                  </Button>
                ))}
                <div className="h-6 w-px bg-gray-300/70 mx-2" aria-hidden="true" />
                <LanguageSwitcher />
                <Button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {t("login")}
                </Button>
              </>
            )}

            {/* Authenticated User Navigation */}
            {user && (
              <>
                <LanguageSwitcher />
                
                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  className="relative text-gray-600 hover:text-green-600 hover:bg-green-50/80 p-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  aria-label={`${t("notifications")} (3 new)`}
                >
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-white rounded-full">
                    3
                  </Badge>
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 bg-gray-50/80 hover:bg-gray-100/80 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                    >
                      <span className="text-lg flex-shrink-0">{roleEmojis[user.role as keyof typeof roleEmojis] || roleEmojis.visitor}</span>
                      <span className="font-semibold max-w-[120px] truncate text-gray-700">
                        {user.name}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role.replace("_", " ")}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      {t("profile")}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      {t("settings")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 p-2 rounded-lg backdrop-blur-sm"
              aria-label="Toggle mobile menu"
              aria-expanded={showMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200/30 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-2">
              {/* Visitor Mobile Navigation */}
              {!user && (
                <>
                  {navLinks.map((link) => (
                    <Button
                      key={link.id}
                      variant="ghost"
                      onClick={() => handleNavClick(link.id, link.isExternal)}
                      className={`w-full justify-start text-gray-700 hover:text-green-600 hover:bg-green-50/80 px-4 py-3 rounded-lg font-medium backdrop-blur-sm ${
                        link.id === "pricing" ? "flex items-center" : ""
                      }`}
                    >
                      {link.id === "pricing" && <DollarSign className="w-4 h-4 mr-2" />}
                      {link.label}
                    </Button>
                  ))}
                  <div className="py-2">
                    <LanguageSwitcher />
                  </div>
                  <Button 
                    onClick={() => {
                      setShowLoginModal(true)
                      setShowMobileMenu(false)
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg"
                  >
                    {t("login")}
                  </Button>
                </>
              )}

              {/* Authenticated User Mobile Navigation */}
              {user && (
                <>
                  <div className="py-2">
                    <LanguageSwitcher />
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-gray-700 hover:bg-gray-100/80 px-4 py-3 rounded-lg backdrop-blur-sm"
                  >
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 mr-3" />
                      <span className="font-medium">{t("notifications")}</span>
                    </div>
                    <Badge className="h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                      3
                    </Badge>
                  </Button>

                  {/* User Info */}
                  <div className="px-4 py-4 bg-gray-50/80 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl flex-shrink-0">{roleEmojis[user.role as keyof typeof roleEmojis] || roleEmojis.visitor}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-sm text-gray-600 capitalize truncate">
                          {user.role.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile User Actions */}
                  <div className="space-y-1 pt-2 border-t border-gray-200/50">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-gray-100/80 px-4 py-3 rounded-lg"
                    >
                      <User className="w-5 h-5 mr-3" />
                      {t("profile")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-gray-100/80 px-4 py-3 rounded-lg"
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      {t("settings")}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 px-4 py-3 rounded-lg"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      {t("logout")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}
