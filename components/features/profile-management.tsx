"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type UserRole } from "@/components/auth/auth-provider"
import { useLanguage } from "@/components/providers/language-provider"
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Edit3,
  Save,
  Mail,
  Shield,
  Languages,
  Camera,
  Bell,
  Eye,
  Lock,
  Smartphone,
  Settings,
  Briefcase,
  Tractor,
  Building2,
  Crown,
  CheckCircle,
  Star,
  Activity,
} from "lucide-react"

interface ProfileManagementProps {
  onBack?: () => void
}

export function ProfileManagement({ onBack }: ProfileManagementProps) {
  const { user, updateProfile, isLoading } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // BULLETPROOF BACK BUTTON HANDLER
  const handleGoBack = () => {
    console.log("🔄 Back button clicked!")
    
    try {
      // Method 1: Try the passed onBack prop
      if (onBack && typeof onBack === 'function') {
        console.log("✅ Using passed onBack function")
        onBack()
        return
      }

      // Method 2: Try to dispatch a custom event
      if (typeof window !== 'undefined') {
        console.log("🔄 Trying custom event dispatch")
        const backEvent = new CustomEvent('navigateBack', { detail: 'profileManagement' })
        window.dispatchEvent(backEvent)
        
        // Give it a moment to process
        setTimeout(() => {
          // Method 3: Try browser history
          console.log("🔄 Trying browser history.back()")
          window.history.back()
        }, 100)
      }
    } catch (error) {
      console.error("❌ Back button error:", error)
      // Method 4: Force reload to dashboard (last resort)
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard' // Adjust this path as needed
      }
    }
  }

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    location: user?.location || "",
    farmSize: user?.role === "farmer" ? "5 acres" : "",
    cropTypes: user?.role === "farmer" ? "Rice, Wheat" : "",
    farmingExperience: user?.role === "farmer" ? "10 years" : "",
    department: user?.role === "govt_official" ? "Agriculture Department" : "",
    designation: user?.role === "govt_official" ? "Agricultural Officer" : "",
    jurisdiction: user?.role === "govt_official" ? "Bhubaneswar District" : "",
    businessName: user?.role === "middleman" ? "Patel Trading Co." : "",
    licenseNumber: user?.role === "middleman" ? "MT-2024-001" : "",
    tradingExperience: user?.role === "middleman" ? "8 years" : "",
    adminLevel: user?.role === "admin" ? "Super Admin" : "",
    permissions: user?.role === "admin" ? "Full Access" : "",
  })

  const [preferences, setPreferences] = useState({
    notifications: {
      weather: true,
      prices: true,
      schemes: user?.role === "farmer",
      alerts: true,
      reports: user?.role === "govt_official" || user?.role === "admin",
    },
    privacy: {
      profileVisible: true,
      contactVisible: user?.role !== "admin",
      locationVisible: true,
    },
  })

  const handleSave = async () => {
    const success = await updateProfile({
      ...formData,
      preferences,
    } as any)
    
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      location: user?.location || "",
      farmSize: user?.role === "farmer" ? "5 acres" : "",
      cropTypes: user?.role === "farmer" ? "Rice, Wheat" : "",
      farmingExperience: user?.role === "farmer" ? "10 years" : "",
      department: user?.role === "govt_official" ? "Agriculture Department" : "",
      designation: user?.role === "govt_official" ? "Agricultural Officer" : "",
      jurisdiction: user?.role === "govt_official" ? "Bhubaneswar District" : "",
      businessName: user?.role === "middleman" ? "Patel Trading Co." : "",
      licenseNumber: user?.role === "middleman" ? "MT-2024-001" : "",
      tradingExperience: user?.role === "middleman" ? "8 years" : "",
      adminLevel: user?.role === "admin" ? "Super Admin" : "",
      permissions: user?.role === "admin" ? "Full Access" : "",
    })
    setIsEditing(false)
  }

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case "farmer":
        return {
          color: "bg-green-600 text-white",
          bgColor: "bg-green-50",
          gradient: "from-green-50 to-emerald-50",
          accent: "text-green-600",
          buttonColor: "bg-green-600 hover:bg-green-700",
        }
      case "govt_official":
        return {
          color: "bg-blue-600 text-white",
          bgColor: "bg-blue-50",
          gradient: "from-blue-50 to-indigo-50",
          accent: "text-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        }
      case "middleman":
        return {
          color: "bg-orange-600 text-white",
          bgColor: "bg-orange-50",
          gradient: "from-orange-50 to-amber-50",
          accent: "text-orange-600",
          buttonColor: "bg-orange-600 hover:bg-orange-700",
        }
      case "admin":
        return {
          color: "bg-purple-600 text-white",
          bgColor: "bg-purple-50",
          gradient: "from-purple-50 to-violet-50",
          accent: "text-purple-600",
          buttonColor: "bg-purple-600 hover:bg-purple-700",
        }
      default:
        return {
          color: "bg-gray-600 text-white",
          bgColor: "bg-gray-50",
          gradient: "from-gray-50 to-slate-50",
          accent: "text-gray-600",
          buttonColor: "bg-gray-600 hover:bg-gray-700",
        }
    }
  }

  if (!user) return null

  const roleConfig = getRoleConfig(user.role)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 pb-20">
      {/* Header */}
      <div className={`bg-gradient-to-br ${roleConfig.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* GREEN BACK TO DASHBOARD BUTTON - SAME AS OTHER COMPONENTS */}
            <button
              onClick={handleGoBack}
              className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative">
                <Avatar className="w-32 h-32 shadow-2xl ring-8 ring-white/50">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-4xl font-bold bg-white text-gray-800">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {user.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge className={`${roleConfig.color} font-semibold px-4 py-2 text-sm shadow-lg`}>
                    {user.role === "farmer" && <Tractor className="w-4 h-4 mr-2" />}
                    {user.role === "govt_official" && <Building2 className="w-4 h-4 mr-2" />}
                    {user.role === "middleman" && <Briefcase className="w-4 h-4 mr-2" />}
                    {user.role === "admin" && <Crown className="w-4 h-4 mr-2" />}
                    {t(user.role)}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 border-green-300 text-green-700 font-semibold px-4 py-2 shadow-lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verified Member
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 border-blue-300 text-blue-700 font-semibold px-4 py-2 shadow-lg">
                    <Activity className="w-4 h-4 mr-2" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center bg-white/60 px-3 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Joined 2024</span>
                  </div>
                  <div className="flex items-center bg-white/60 px-3 py-2 rounded-lg">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{user.location || "Bhubaneswar"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-gray-900 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 font-semibold"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className={`${roleConfig.buttonColor} shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 font-semibold`}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* FIXED: Updated TabsList with proper text color for active state */}
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-xl rounded-2xl p-2 border-0 h-14">
              <TabsTrigger
                value="personal"
                className="font-semibold rounded-xl transition-all duration-300 text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg h-10"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="font-semibold rounded-xl transition-all duration-300 text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg h-10"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="font-semibold rounded-xl transition-all duration-300 text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg h-10"
              >
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-8">
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <User className="w-6 h-6 mr-3 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-semibold text-sm">Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 text-gray-900 font-medium"
                        />
                      ) : (
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                          <User className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="font-semibold text-gray-900">{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-700 font-semibold text-sm">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 text-gray-900 font-medium"
                        />
                      ) : (
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                          <Phone className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="font-semibold text-gray-900">{user.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-700 font-semibold text-sm">Email Address</Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 text-gray-900 font-medium"
                        />
                      ) : (
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                          <Mail className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="font-semibold text-gray-900">{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-700 font-semibold text-sm">Location</Label>
                      {isEditing ? (
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 text-gray-900 font-medium"
                        />
                      ) : (
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                          <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="font-semibold text-gray-900">{user.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-8">
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Languages className="w-6 h-6 mr-3 text-indigo-600" />
                    Language & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-gray-900 font-semibold text-lg mb-4 block">Language Preference</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { code: "en", name: "English", flag: "🇺🇸" },
                          { code: "hi", name: "हिंदी", flag: "🇮🇳" },
                          { code: "od", name: "ଓଡିଆ", flag: "🇮🇳" },
                          { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
                        ].map((lang) => (
                          <Button
                            key={lang.code}
                            variant={language === lang.code ? "default" : "outline"}
                            onClick={() => setLanguage(lang.code as any)}
                            className={`h-16 flex flex-col gap-1 ${
                              language === lang.code 
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl" 
                                : "bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl text-gray-700"
                            } transition-all duration-300 rounded-2xl border-0`}
                          >
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="text-sm font-semibold">{lang.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <Label className="text-gray-900 font-semibold text-lg">Notification Settings</Label>
                      <div className="space-y-4">
                        {[
                          { key: 'weather', label: 'Weather Alerts', desc: 'Get notified about weather changes' },
                          { key: 'prices', label: 'Price Updates', desc: 'Market price notifications' },
                          { key: 'alerts', label: 'System Alerts', desc: 'Important system notifications' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div>
                              <Label className="font-semibold text-gray-900">{item.label}</Label>
                              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                            </div>
                            <Switch
                              checked={preferences.notifications[item.key as keyof typeof preferences.notifications]}
                              onCheckedChange={(checked) => {
                                setPreferences({
                                  ...preferences,
                                  notifications: { ...preferences.notifications, [item.key]: checked },
                                })
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-8">
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-red-600" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {[
                    { icon: Lock, label: 'Change Password', desc: 'Update your account password' },
                    { icon: Smartphone, label: 'Two-Factor Authentication', desc: 'Add extra security to your account' },
                    { icon: Clock, label: 'Login History', desc: 'View your recent login activity' },
                    { icon: Eye, label: 'Privacy Settings', desc: 'Control who can see your information' },
                  ].map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full h-16 justify-start bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0 p-6"
                    >
                      <item.icon className="w-6 h-6 mr-4 text-gray-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* KEYBOARD SHORTCUT LISTENER */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        onKeyDown={(e) => {
          if (e.key === 'Escape' || (e.ctrlKey && e.key === 'Backspace')) {
            e.preventDefault()
            handleGoBack()
          }
        }}
        tabIndex={0}
      />
    </main>
  )
}
