"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth, type UserRole } from "./auth-provider"
import { useLanguage } from "@/components/providers/language-provider"
import { Loader2, Smartphone, Shield, Users, Crown, ArrowLeft, CheckCircle } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  showAdminOnly?: boolean // New prop to show only admin login
}

export function LoginModal({ isOpen, onClose, showAdminOnly = false }: LoginModalProps) {
  const { login, isLoading } = useAuth()
  const { t } = useLanguage()
  const [selectedRole, setSelectedRole] = useState<UserRole>("farmer")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [govtId, setGovtId] = useState("")
  const [password, setPassword] = useState("")
  const [step, setStep] = useState<"role" | "credentials" | "otp">("role")

  const roleConfig = {
    farmer: {
      icon: "🌾",
      title: t("farmers"),
      description: "Access crop predictions, disease diagnosis, and mandi prices",
      authMethod: "OTP Login",
      gradient: "from-green-50 via-emerald-50 to-green-50",
      iconBg: "bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700",
      accentColor: "text-green-700",
    },
    govt_official: {
      icon: "🏛️",
      title: t("govtOfficials"),
      description: "Monitor regional data and validate agricultural information",
      authMethod: "Government Credentials",
      gradient: "from-blue-50 via-indigo-50 to-blue-50",
      iconBg: "bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      accentColor: "text-blue-700",
    },
    middleman: {
      icon: "🤝",
      title: t("middlemen"),
      description: "Access real-time mandi prices and trading information",
      authMethod: "Basic Authentication",
      gradient: "from-orange-50 via-amber-50 to-orange-50",
      iconBg: "bg-orange-100",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      accentColor: "text-orange-700",
    },
    admin: {
      icon: "👑",
      title: "Administrator",
      description: "Full system access and user management",
      authMethod: "Admin Credentials",
      gradient: "from-purple-50 via-violet-50 to-purple-50",
      iconBg: "bg-purple-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      accentColor: "text-purple-700",
    },
  }

  // Filter roles based on showAdminOnly prop
  const availableRoles = showAdminOnly 
    ? { admin: roleConfig.admin } 
    : { farmer: roleConfig.farmer, govt_official: roleConfig.govt_official, middleman: roleConfig.middleman }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep("credentials")
  }

  const handleCredentialsSubmit = async () => {
    if (selectedRole === "farmer" && phone) {
      setStep("otp")
      return
    }

    const success = await login({
      role: selectedRole,
      phone: selectedRole === "farmer" ? phone : undefined,
      otp: selectedRole === "farmer" ? otp : undefined,
      govtId: selectedRole === "govt_official" ? govtId : undefined,
      password: selectedRole !== "farmer" ? password : undefined,
    })

    if (success) {
      onClose()
      resetForm()
    }
  }

  const handleOtpSubmit = async () => {
    const success = await login({
      role: selectedRole,
      phone,
      otp,
    })

    if (success) {
      onClose()
      resetForm()
    }
  }

  const resetForm = () => {
    setStep("role")
    setPhone("")
    setOtp("")
    setGovtId("")
    setPassword("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-0 shadow-md bg-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-green-50/30 to-emerald-50/50"></div>
        <div className="relative z-10 p-5">
          <DialogHeader className="text-center mb-5">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {step === "role" && (showAdminOnly ? "Admin Access" : t("welcome"))}
              {step === "credentials" && "Sign In"}
              {step === "otp" && "Verify OTP"}
            </DialogTitle>
            {step === "role" && (
              <p className="text-gray-600 text-sm mt-2">
                {showAdminOnly ? "Administrator login access" : "Choose your role to access the platform"}
              </p>
            )}
          </DialogHeader>

          {step === "role" && (
            <div className="space-y-5">
              {showAdminOnly ? (
                // Admin only - single card, centered
                <div className="flex justify-center">
                  <Card
                    className={`group cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-gradient-to-br ${roleConfig.admin.gradient} border-0 overflow-hidden w-64`}
                    onClick={() => handleRoleSelect("admin")}
                  >
                    <CardContent className="p-6 text-center relative">
                      <div className="absolute inset-0 bg-white/60"></div>
                      <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-xl ${roleConfig.admin.iconBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                          <span className="text-3xl">{roleConfig.admin.icon}</span>
                        </div>
                        <h3 className={`font-bold text-lg mb-3 ${roleConfig.admin.accentColor}`}>{roleConfig.admin.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{roleConfig.admin.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // Normal roles - 3 in a row
                <div className="grid grid-cols-3 gap-3">
                  {(Object.entries(availableRoles) as [UserRole, typeof roleConfig.farmer][]).map(([role, config]) => (
                    <Card
                      key={role}
                      className={`group cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-gradient-to-br ${config.gradient} border-0 overflow-hidden`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      <CardContent className="p-3 text-center relative">
                        <div className="absolute inset-0 bg-white/60"></div>
                        <div className="relative z-10">
                          <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                            <span className="text-lg">{config.icon}</span>
                          </div>
                          <h3 className={`font-bold text-xs mb-1 ${config.accentColor}`}>{config.title}</h3>
                          <p className="text-[10px] text-gray-600 leading-relaxed">{config.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === "credentials" && (
            <div className="space-y-5">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-xl ${roleConfig[selectedRole].iconBg} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <span className="text-3xl">{roleConfig[selectedRole].icon}</span>
                </div>
                <h3 className={`font-bold text-lg mb-2 ${roleConfig[selectedRole].accentColor}`}>{roleConfig[selectedRole].title}</h3>
                <p className="text-sm text-gray-600">{roleConfig[selectedRole].authMethod}</p>
              </div>

              <div className="space-y-4">
                {selectedRole === "farmer" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 h-11 px-4 border-2 border-gray-200 focus:border-green-500 rounded-xl transition-colors duration-200"
                      />
                    </div>
                    <Button
                      onClick={handleCredentialsSubmit}
                      className={`w-full h-11 ${roleConfig[selectedRole].buttonColor} shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold`}
                      disabled={!phone || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Smartphone className="w-4 h-4 mr-2" />
                      )}
                      Send OTP
                    </Button>
                  </div>
                )}

                {selectedRole === "govt_official" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="govtId" className="text-gray-700 font-medium">Government ID</Label>
                      <Input
                        id="govtId"
                        placeholder="Enter your government ID"
                        value={govtId}
                        onChange={(e) => setGovtId(e.target.value)}
                        className="mt-2 h-11 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 h-11 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors duration-200"
                      />
                    </div>
                    <Button
                      onClick={handleCredentialsSubmit}
                      className={`w-full h-11 ${roleConfig[selectedRole].buttonColor} shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold`}
                      disabled={!govtId || !password || isLoading}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
                      Login
                    </Button>
                  </div>
                )}

                {(selectedRole === "middleman" || selectedRole === "admin") && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        value={govtId}
                        onChange={(e) => setGovtId(e.target.value)}
                        className="mt-2 h-11 px-4 border-2 border-gray-200 focus:border-orange-500 rounded-xl transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 h-11 px-4 border-2 border-gray-200 focus:border-orange-500 rounded-xl transition-colors duration-200"
                      />
                    </div>
                    <Button
                      onClick={handleCredentialsSubmit}
                      className={`w-full h-11 ${roleConfig[selectedRole].buttonColor} shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold`}
                      disabled={!govtId || !password || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : selectedRole === "admin" ? (
                        <Crown className="w-4 h-4 mr-2" />
                      ) : (
                        <Users className="w-4 h-4 mr-2" />
                      )}
                      Login
                    </Button>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => setStep("role")} 
                  className="w-full h-11 border-2 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Role Selection
                </Button>
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="font-bold text-lg text-green-700 mb-2">Verify OTP</h3>
                <p className="text-sm text-gray-600">We've sent a 6-digit code to <span className="font-semibold">{phone}</span></p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="text-gray-700 font-medium">OTP</Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-2 h-11 px-4 text-center text-lg tracking-widest font-bold border-2 border-gray-200 focus:border-green-500 rounded-xl transition-colors duration-200"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={handleOtpSubmit}
                  className="w-full h-11 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Verify & Sign In
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => setStep("credentials")} 
                  className="w-full h-11 border-2 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
