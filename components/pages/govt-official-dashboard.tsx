"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import {
  TrendingUp,
  AlertTriangle,
  Shield,
  MapPin,
  BarChart3,
  Users,
  FileText,
  Download,
  Eye,
  User,
  LogOut,
  Activity,
  CheckCircle,
  Clock,
  Building2,
} from "lucide-react"
import { useState } from "react"

interface GovtOfficialDashboardProps {
  onFeatureSelect: (feature: string) => void
}

export function GovtOfficialDashboard({ onFeatureSelect }: GovtOfficialDashboardProps) {
  const { user, logout } = useAuth()
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts")

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const districts = ["All Districts", "Cuttack", "Bhubaneswar", "Puri", "Berhampur", "Sambalpur"]
  
  const overviewStats = [
    {
      title: "Active Farmers",
      value: "12,847",
      unit: "",
      confidence: 98,
      status: "excellent",
      icon: <Users className="w-5 h-5" />,
      description: "Registered farmers in region",
      trend: "+234",
      trendColor: "text-green-600",
    },
    {
      title: "Crop Area",
      value: "45,230",
      unit: "Ha",
      confidence: 95,
      status: "excellent",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Total cultivated area",
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      title: "Average Yield",
      value: "3.2",
      unit: "t/Ha",
      confidence: 87,
      status: "good",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Regional average yield",
      trend: "+0.5",
      trendColor: "text-green-600",
    },
    {
      title: "Active Alerts",
      value: "3",
      unit: "",
      confidence: 100,
      status: "warning",
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Requires immediate attention",
      trend: "High",
      trendColor: "text-red-600",
    },
  ]

  const alerts = [
    { type: "Disease", location: "Cuttack", severity: "High", crop: "Rice", bgColor: "bg-red-50" },
    { type: "Weather", location: "Puri", severity: "Medium", crop: "Wheat", bgColor: "bg-yellow-50" },
    { type: "Price", location: "Berhampur", severity: "Low", crop: "Sugarcane", bgColor: "bg-green-50" },
  ]

  const recentActivities = [
    {
      title: "New scheme launched",
      description: "PM-KISAN payment processed for 8,234 farmers",
      time: "1 hour ago",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Disease alert triggered",
      description: "Blast disease detected in Cuttack rice fields",
      time: "3 hours ago",
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
    },
    {
      title: "Market report generated",
      description: "Weekly price analysis for 24 mandis completed",
      time: "1 day ago",
      icon: <BarChart3 className="w-4 h-4 text-blue-500" />,
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
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Government Dashboard 🏛️
                </h1>
                <p className="text-gray-600">
                  Regional agricultural monitoring and policy management • {new Date().toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFeatureSelect("profile")}
                  className="bg-white/80 hover:bg-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
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

            {/* Quick Info Card */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500 rounded-xl">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {user?.designation || "Agricultural Officer"}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user?.jurisdiction || "Bhubaneswar District"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{selectedDistrict}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <Activity className="w-4 h-4 inline mr-1" />
                      Active Region
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Overview Stats - Enhanced Design */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Regional Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <Card key={index} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  {/* Confidence Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(stat.status)} text-xs font-semibold px-2.5 py-1`}>
                      {stat.confidence}% accurate
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                      <div className="text-blue-600">{stat.icon}</div>
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
                        <span>Data Accuracy</span>
                        <span>{stat.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${stat.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Management Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <TrendingUp className="w-5 h-5 mr-3 text-emerald-600" />
                    Regional Crop Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Monitor crop yield predictions, soil health patterns, and weather impact analysis across districts.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">87% ML Accuracy</Badge>
                    <Badge className="bg-emerald-100 text-emerald-700">+5.2% Yield</Badge>
                  </div>
                  <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <AlertTriangle className="w-5 h-5 mr-3 text-amber-600" />
                    Disease Outbreak Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Real-time disease tracking, outbreak prediction, and intervention planning with heatmap visualization.
                  </p>
                  <div className="space-y-2 mb-4">
                    {alerts.map((alert, index) => (
                      <div key={index} className={`flex items-center justify-between text-xs p-2 rounded-lg ${alert.bgColor}`}>
                        <span className="font-medium">
                          {alert.location} - {alert.crop}
                        </span>
                        <Badge
                          className={
                            alert.severity === "High"
                              ? "bg-red-100 text-red-700"
                              : alert.severity === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Heatmap
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <Shield className="w-5 h-5 mr-3 text-blue-600" />
                    Mandi Price Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Validate market prices, detect anomalies, and ensure fair pricing across all mandis in the region.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-green-50 text-green-700">95% Verified</Badge>
                    <Badge className="bg-blue-100 text-blue-700">24 Mandis</Badge>
                  </div>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Price Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <Card className="shadow-md">
              <CardContent className="p-0">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className={`p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200 ${
                      index !== recentActivities.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900">{activity.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Policy & Reports */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy & Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <FileText className="w-5 h-5 mr-3 text-purple-600" />
                    Policy & Schemes Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">PM-KISAN Scheme</p>
                        <p className="text-xs text-gray-600">8,234 beneficiaries</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border border-green-200">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Crop Insurance</p>
                        <p className="text-xs text-gray-600">5,678 enrolled</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Ongoing</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Soil Health Cards</p>
                        <p className="text-xs text-gray-600">12,456 issued</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 border border-purple-200">Processing</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <Download className="w-5 h-5 mr-3 text-indigo-600" />
                    Reports & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Monthly Crop Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Disease Outbreak Summary
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Market Price Analysis
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Farmer Welfare Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <BottomNavigation activeFeature="" onFeatureSelect={onFeatureSelect} />
    </>
  )
}
