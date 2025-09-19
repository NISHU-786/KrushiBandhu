"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth/auth-provider"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import {
  Users,
  Database,
  Key,
  Settings,
  BarChart3,
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Activity,
  User,
  LogOut,
  Clock,
  CheckCircle,
  AlertTriangle,
  Crown,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

interface AdminDashboardProps {
  onFeatureSelect: (feature: string) => void
}

export function AdminDashboard({ onFeatureSelect }: AdminDashboardProps) {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const systemStats = [
    {
      title: "Total Users",
      value: "12,847",
      unit: "",
      confidence: 99,
      status: "excellent",
      icon: <Users className="w-5 h-5" />,
      description: "Registered platform users",
      trend: "+234",
      trendColor: "text-green-600",
    },
    {
      title: "API Calls Today",
      value: "45,230",
      unit: "",
      confidence: 98,
      status: "excellent",
      icon: <Activity className="w-5 h-5" />,
      description: "System API requests today",
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      title: "ML Predictions",
      value: "8,456",
      unit: "",
      confidence: 87,
      status: "good",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "AI model predictions made",
      trend: "+5.2%",
      trendColor: "text-green-600",
    },
    {
      title: "System Uptime",
      value: "99.9",
      unit: "%",
      confidence: 100,
      status: "excellent",
      icon: <Shield className="w-5 h-5" />,
      description: "Platform availability (24h)",
      trend: "24h",
      trendColor: "text-green-600",
    },
  ]

  const users = [
    { id: 1, name: "Ravi Kumar", role: "Farmer", status: "Active", district: "Cuttack", lastLogin: "2 hours ago" },
    { id: 2, name: "Dr. Priya Singh", role: "Govt Official", status: "Active", district: "Bhubaneswar", lastLogin: "1 day ago" },
    { id: 3, name: "Suresh Patel", role: "Middleman", status: "Inactive", district: "Puri", lastLogin: "1 week ago" },
    { id: 4, name: "Anita Sharma", role: "Farmer", status: "Active", district: "Berhampur", lastLogin: "30 mins ago" },
  ]

  const mlModels = [
    { name: "Crop Yield Predictor", version: "v2.1.3", accuracy: "87.2%", status: "Active", lastUpdated: "2 days ago" },
    { name: "Disease Classifier", version: "v1.8.1", accuracy: "92.5%", status: "Active", lastUpdated: "1 week ago" },
    { name: "Price Forecaster", version: "v3.0.2", accuracy: "84.7%", status: "Training", lastUpdated: "3 hours ago" },
    { name: "Weather Analyzer", version: "v1.5.0", accuracy: "89.1%", status: "Active", lastUpdated: "5 days ago" },
  ]

  const recentActivities = [
    {
      title: "New farmer registration",
      description: "Ravi Kumar from Cuttack joined the platform",
      time: "2 min ago",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    {
      title: "ML model updated",
      description: "Disease Classifier v1.8.1 deployed successfully",
      time: "1 hour ago",
      icon: <Database className="w-4 h-4 text-blue-500" />,
    },
    {
      title: "System backup completed",
      description: "Daily database backup completed successfully",
      time: "3 hours ago",
      icon: <Shield className="w-4 h-4 text-purple-500" />,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-700 bg-emerald-50 border border-emerald-200"
      case "good":
        return "text-blue-700 bg-blue-50 border border-blue-200"
      case "warning":
        return "text-amber-700 bg-amber-50 border border-amber-200"
      case "danger":
        return "text-red-700 bg-red-50 border border-red-200"
      default:
        return "text-gray-700 bg-gray-50 border border-gray-200"
    }
  }

  return (
    <>
      <main className="flex-1 pb-20 bg-gray-50/30">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Admin Dashboard 👑
                </h1>
                <p className="text-gray-600">
                  System management and platform administration • {new Date().toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFeatureSelect("profile")}
                  className="bg-white/80 hover:bg-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Admin Info Card */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500 rounded-xl">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {user?.adminLevel || "Super Admin"}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Shield className="w-4 h-4 mr-1" />
                        {user?.permissions || "Full System Access"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <Activity className="w-4 h-4 inline mr-1" />
                      Monitoring Active
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* System Stats - Enhanced Design */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <Card key={index} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  {/* Confidence Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(stat.status)} text-xs font-semibold px-2.5 py-1`}>
                      {stat.confidence}% reliable
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                      <div className="text-purple-600">{stat.icon}</div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      {stat.title}
                    </h3>

                    {/* Value with Trend */}
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                        {stat.unit && <span className="text-lg text-gray-600 ml-1">{stat.unit}</span>}
                      </div>
                      <span className={`text-xs font-semibold ${stat.trendColor} bg-gray-50 px-2 py-1 rounded-full`}>
                        {stat.trend}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4">{stat.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Reliability</span>
                        <span>{stat.confidence}%</span>
                      </div>
                      <Progress value={stat.confidence} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "users", label: "User Management", icon: Users },
                { id: "models", label: "ML Models", icon: Database },
                { id: "apis", label: "API Management", icon: Key },
                { id: "settings", label: "System Settings", icon: Settings },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="mb-2 hover:scale-105 transition-transform duration-200"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-gray-900">
                      <Activity className="w-5 h-5 mr-3 text-green-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">{activity.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-600">{activity.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-gray-900">
                      <Shield className="w-5 h-5 mr-3 text-blue-600" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: "Database Performance", status: "Excellent", color: "bg-green-100 text-green-700" },
                        { label: "API Response Time", status: "Fast", color: "bg-green-100 text-green-700" },
                        { label: "ML Model Accuracy", status: "Good", color: "bg-yellow-100 text-yellow-700" },
                        { label: "Storage Usage", status: "67% Used", color: "bg-blue-100 text-blue-700" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-900">{item.label}</span>
                          <Badge className={item.color}>{item.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users by name, role, or district..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Users
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>

                <Card className="shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium text-gray-900">Name</th>
                            <th className="text-left p-3 font-medium text-gray-900">Role</th>
                            <th className="text-left p-3 font-medium text-gray-900">District</th>
                            <th className="text-left p-3 font-medium text-gray-900">Status</th>
                            <th className="text-left p-3 font-medium text-gray-900">Last Login</th>
                            <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                              <td className="p-3 font-medium text-gray-900">{user.name}</td>
                              <td className="p-3">
                                <Badge variant="outline" className="bg-white">{user.role}</Badge>
                              </td>
                              <td className="p-3 text-gray-600">{user.district}</td>
                              <td className="p-3">
                                <Badge
                                  className={
                                    user.status === "Active"
                                      ? "bg-green-100 text-green-700 border border-green-200"
                                      : "bg-gray-100 text-gray-700 border border-gray-200"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-gray-500">{user.lastLogin}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="ghost" className="p-2">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="p-2">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="p-2 text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "models" && (
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle>ML Model Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mlModels.map((model, index) => (
                      <Card key={index} className="border hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">{model.name}</h3>
                            <Badge
                              className={
                                model.status === "Active"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : model.status === "Training"
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                              }
                            >
                              {model.status}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Version:</span>
                              <span className="font-medium text-gray-900">{model.version}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Accuracy:</span>
                              <span className="font-medium text-gray-900">{model.accuracy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Updated:</span>
                              <span className="font-medium text-gray-900">{model.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Upload className="w-4 h-4 mr-2" />
                              Update
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      
      <BottomNavigation activeFeature="" onFeatureSelect={onFeatureSelect} />
    </>
  )
}
