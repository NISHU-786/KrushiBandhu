"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth/auth-provider"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import {
  DollarSign,
  MessageCircle,
  User,
  TrendingUp,
  Package,
  Truck,
  LogOut,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  MapPin,
  Building2,
  ArrowRight,
  Activity,
  Briefcase,
} from "lucide-react"
import { useState } from "react"

interface MiddlemanDashboardProps {
  onFeatureSelect: (feature: string) => void
}

export function MiddlemanDashboard({ onFeatureSelect }: MiddlemanDashboardProps) {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // HANDLE VIEW PRICES CLICK
  const handleViewPricesClick = () => {
    console.log("🔄 Navigating to mandi prices...")
    onFeatureSelect("mandi-prices")
  }

  const tradingStats = [
    {
      title: "Today's Trades",
      value: "₹2.4",
      unit: "L",
      confidence: 98,
      status: "excellent",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Total trading volume today",
      trend: "+18%",
      trendColor: "text-green-600",
    },
    {
      title: "Active Orders",
      value: "23",
      unit: "",
      confidence: 95,
      status: "excellent",
      icon: <Package className="w-5 h-5" />,
      description: "Pending order confirmations",
      trend: "+5",
      trendColor: "text-green-600",
    },
    {
      title: "Deliveries",
      value: "12",
      unit: "",
      confidence: 87,
      status: "good",
      icon: <Truck className="w-5 h-5" />,
      description: "Completed deliveries today",
      trend: "+2",
      trendColor: "text-green-600",
    },
    {
      title: "Profit Margin",
      value: "8.5",
      unit: "%",
      confidence: 92,
      status: "excellent",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Current profit margin",
      trend: "+0.5%",
      trendColor: "text-green-600",
    },
  ]

  const marketPrices = [
    {
      commodity: "Rice (Basmati)",
      location: "Cuttack Mandi",
      price: "₹2,150/qt",
      change: "+₹50",
      changeColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      commodity: "Wheat",
      location: "Bhubaneswar Mandi",
      price: "₹1,850/qt",
      change: "-₹25",
      changeColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      commodity: "Sugarcane",
      location: "Berhampur Mandi",
      price: "₹350/qt",
      change: "+₹15",
      changeColor: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  const recentActivities = [
    {
      title: "Large order confirmed",
      description: "₹85,000 rice order from Cuttack confirmed",
      time: "30 mins ago",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Price alert triggered",
      description: "Wheat prices dropped below threshold",
      time: "2 hours ago",
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    },
    {
      title: "Delivery completed",
      description: "12 quintal rice delivered to Puri market",
      time: "4 hours ago",
      icon: <Truck className="w-4 h-4 text-blue-500" />,
    },
  ]

  const marketInsights = [
    {
      title: "Market Trend",
      content: "Rice prices expected to rise by 3-5% next week due to increased demand from urban markets.",
      type: "bullish",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Trading Opportunity",
      content: "Consider bulk purchasing wheat before monsoon season starts in two weeks.",
      type: "opportunity",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Market Warning",
      content: "Sugarcane supply may be affected by weather conditions in coastal districts.",
      type: "warning",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
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
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Welcome back, {user?.name?.split(" ")[0]}! 🤝
                </h1>
                <p className="text-gray-600">
                  Real-time market insights and trading information • {new Date().toLocaleDateString("en-IN")}
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

            {/* Business Info Card */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-500 rounded-xl">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {user?.businessName || "Patel Trading Co."}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Building2 className="w-4 h-4 mr-1" />
                        License: {user?.licenseNumber || "MT-2024-001"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">8+ Years</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <Activity className="w-4 h-4 inline mr-1" />
                      Trading Experience
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Features */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <DollarSign className="w-5 h-5 mr-3 text-green-600" />
                    Live Mandi Prices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Access real-time commodity prices from all major mandis in your region.
                  </p>
                  <div className="space-y-3 mb-4">
                    {marketPrices.map((item, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${item.bgColor}`}>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{item.commodity}</p>
                          <p className="text-xs text-gray-600">{item.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{item.price}</p>
                          <p className={`text-xs font-semibold ${item.changeColor}`}>{item.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      Updated 2 min ago
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={handleViewPricesClick}
                      className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View All Prices
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <MessageCircle className="w-5 h-5 mr-3 text-blue-600" />
                    Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    AI-powered market analysis and trading recommendations.
                  </p>
                  <div className="space-y-3 mb-4">
                    {marketInsights.map((insight, index) => (
                      <div key={index} className={`p-3 rounded-lg ${insight.bgColor}`}>
                        <p className={`text-sm font-semibold ${insight.textColor}`}>{insight.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{insight.content}</p>
                      </div>
                    ))}
                  </div>
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                    AI Powered
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="flex justify-center">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <BarChart3 className="w-5 h-5 mr-3 text-purple-600" />
                    Real Time Mandi Prices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    View detailed analytics of your mandi prices and market trends.
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleViewPricesClick}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Prices
                  </Button>
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
