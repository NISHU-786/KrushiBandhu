"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { Languages, ChevronDown, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { 
      code: "en" as const, 
      name: "English", 
      nativeName: "English",
      flag: "🇺🇸"
    },
    { 
      code: "hi" as const, 
      name: "Hindi", 
      nativeName: "हिंदी",
      flag: "🇮🇳"
    },
    { 
      code: "od" as const, 
      name: "Odia", 
      nativeName: "ଓଡିଆ",
      flag: "🇮🇳"
    },
    { 
      code: "kn" as const, 
      name: "Kannada", 
      nativeName: "ಕನ್ನಡ",
      flag: "🇮🇳"
    },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      return () => document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }

  const handleLanguageChange = (langCode: typeof language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent, langCode?: typeof language) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (langCode) {
        handleLanguageChange(langCode)
      } else {
        handleToggle(e as any)
      }
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-3 py-2 h-9 bg-white/60 hover:bg-white hover:shadow-md border border-gray-200/50 rounded-lg transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        aria-label="Select Language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="w-4 h-4 text-gray-600 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          <span className="text-base leading-none">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline whitespace-nowrap">{currentLanguage?.nativeName}</span>
        </span>
        <ChevronDown 
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div 
            className="absolute right-0 top-full w-56 bg-white/95 backdrop-blur-xl shadow-xl border border-gray-200/50 rounded-xl p-2 mt-2 z-50"
            role="menu"
            aria-orientation="vertical"
            style={{
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="space-y-1">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  onKeyDown={(e) => handleKeyDown(e, lang.code)}
                  className={`w-full cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset ${
                    language === lang.code 
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold shadow-sm ring-1 ring-green-200" 
                      : "hover:bg-gray-50 text-gray-700 focus:bg-gray-50"
                  }`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={language === lang.code ? 'true' : 'false'}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg flex-shrink-0 leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-tight">{lang.nativeName}</span>
                      <span className="text-xs text-gray-500 leading-tight">{lang.name}</span>
                    </div>
                  </div>
                  {language === lang.code && (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <div className="px-3 py-2">
                <p className="text-xs text-gray-500 text-center">
                  Choose your preferred language
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}