"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
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
} from "lucide-react"

interface ProfileSectionProps {
  onBack: () => void
}

export function ProfileSection({ onBack }: ProfileSectionProps) {
  const { user, updateProfile, isLoading } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    location: user?.location || "",
  })

  const handleSave = async () => {
    const success = await updateProfile(formData)
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
    })
    setIsEditing(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "farmer":
        return "bg-green-100 text-green-700"
      case "govt_official":
        return "bg-blue-100 text-blue-700"
      case "middleman":
        return "bg-orange-100 text-orange-700"
      case "admin":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (!user) return null

  return (
    <main className="flex-1 pb-20">
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("dashboard")}
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t("profile")}</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">{t("personalInfo")}</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="leaf-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-indigo-600" />
                      {t("personalInfo")}
                    </CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        {t("edit")}
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          {t("cancel")}
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={isLoading}>
                          {isLoading ? (
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          {t("save")}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <Badge className={getRoleColor(user.role)}>{t(user.role)}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(user.joinedDate || "").toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        Last login {new Date(user.lastLogin || "").toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-muted rounded-md">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          {user.name}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phoneNumber")}</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-muted rounded-md">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          {user.phone}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-muted rounded-md">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {user.email}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">{t("location")}</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-muted rounded-md">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="leaf-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Languages className="w-5 h-5 mr-2 text-indigo-600" />
                    {t("language")} Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label>Select your preferred language</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { code: "en", name: "English", nativeName: "English" },
                        { code: "hi", name: "Hindi", nativeName: "हिंदी" },
                        { code: "od", name: "Odia", nativeName: "ଓଡିଆ" },
                        { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
                      ].map((lang) => (
                        <Button
                          key={lang.code}
                          variant={language === lang.code ? "default" : "outline"}
                          className="justify-start h-auto p-4"
                          onClick={() => setLanguage(lang.code as any)}
                        >
                          <div className="text-left">
                            <div className="font-medium">{lang.nativeName}</div>
                            <div className="text-sm text-muted-foreground">{lang.name}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="leaf-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    {t("changePassword")}
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Login History
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
