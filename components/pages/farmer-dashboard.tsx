"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth/auth-provider"
import { ChatBot } from "@/components/features/chatbot"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { User } from "lucide-react"
import {
  TrendingUp,
  Sprout,
  Camera,
  DollarSign,
  Calculator,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  ArrowRight,
  TrendingDown,
  LogOut,
  Shield,
  BarChart3,
} from "lucide-react"

interface FarmerDashboardProps {
  onFeatureSelect: (feature: string) => void
}

export function FarmerDashboard({ onFeatureSelect }: FarmerDashboardProps) {
  const { user, logout } = useAuth()
  const [showChatBot, setShowChatBot] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Mock data for dashboard
  const weatherData = {
    temperature: 28,
    humidity: 75,
    rainfall: 12,
    condition: "Partly Cloudy",
  }

  const quickStats = [
    {
      title: "Crop Yield Prediction",
      value: "2.8",
      unit: "tons/ha",
      confidence: 87,
      status: "good",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Expected rice yield this season",
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      title: "Disease Risk",
      value: "Low",
      unit: "",
      confidence: 92,
      status: "good",
      icon: <Sprout className="w-5 h-5" />,
      description: "Current crop health status",
      trend: "Stable",
      trendColor: "text-blue-600",
    },
    {
      title: "Market Price",
      value: "₹2,150",
      confidence: 95,
      status: "excellent",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Today's rice price in local mandi",
      trend: "+₹50",
      trendColor: "text-green-600",
    },
    {
      title: "Loan Eligibility",
      value: "Eligible",
      unit: "",
      confidence: 100,
      status: "excellent",
      icon: <CheckCircle className="w-5 h-5" />,
      description: "Government loan waiver status",
      trend: "Active",
      trendColor: "text-green-600",
    },
  ]

  // Updated Quick Actions with proper order and farmer-friendly descriptions
  const quickActions = [
    {
      title: "Crop Yield Predictor",
      description: "Get AI predictions for how much crop you'll harvest based on your soil, weather & farming methods",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-blue-500",
      onClick: () => onFeatureSelect("crop-prediction"),
    },
    {
      title: "Crop Disease Diagnosis",
      description: "Take a photo of diseased plants to instantly identify problems & get treatment recommendations",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-green-500",
      onClick: () => onFeatureSelect("disease-scan"),
    },
    {
      title: "Crop Recommendations",
      description: "Discover the best crops to grow on your land based on soil type, climate & market demand",
      icon: <Sprout className="w-6 h-6" />,
      color: "bg-teal-500",
      onClick: () => onFeatureSelect("crop-recommendations"),
    },
    {
      title: "Smart Loan Calculator",
      description: "Calculate EMI for new agricultural loans & explore government schemes with better interest rates",
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-purple-500",
      onClick: () => onFeatureSelect("loan-calculator"),
    },
    {
      title: "Smart Loan Nullify Calculator",
      description: "Find ways to reduce or completely waive your existing farm loans through government relief programs",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-red-500",
      onClick: () => onFeatureSelect("loan-nullify"),
    },
    {
      title: "Mandi Prices",
      description: "Check live market rates for all crops across different mandis to get the best selling price",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-orange-500",
      onClick: () => onFeatureSelect("mandi-prices"),
    },
  ]

  const recentActivities = [
    {
      title: "Disease scan completed",
      description: "Healthy tomato plants detected",
      time: "2 hours ago",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    {
      title: "Price alert triggered",
      description: "Rice price increased by ₹50/quintal",
      time: "5 hours ago",
      icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
    },
    {
      title: "Weather update",
      description: "Rain expected in next 3 days",
      time: "1 day ago",
      icon: <Droplets className="w-4 h-4 text-blue-400" />,
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
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Welcome back, {user?.name?.split(" ")[0]}! 🌾
                </h1>
                <p className="text-gray-600">
                  Here's your farming dashboard for today • {new Date().toLocaleDateString("en-IN")}
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

            {/* Weather Card */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500 rounded-xl">
                      <Sun className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{weatherData.condition}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user?.location || "Your Location"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                      <span className="flex items-center">
                        <Droplets className="w-3 h-3 mr-1" />
                        {weatherData.humidity}%
                      </span>
                      <span className="flex items-center">
                        <Thermometer className="w-3 h-3 mr-1" />
                        {weatherData.rainfall}mm
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Stats - COMPLETELY REDESIGNED */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <Card key={index} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  {/* Confidence Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(stat.status)} text-xs font-semibold px-2.5 py-1`}>
                      {stat.confidence}% confident
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                      <div className="text-green-600">{stat.icon}</div>
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
                        <span>Accuracy</span>
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

        {/* Enhanced Quick Actions with Better Layout */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Smart Farming Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white border-0 shadow-md"
                  onClick={action.onClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center flex-shrink-0 text-white hover:scale-105 transition-transform duration-200`}
                      >
                        {action.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base text-gray-900 mb-2 leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="outline" size="sm" className="group">
                View All 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
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

        {/* Tips & Recommendations */}
        <section className="px-4 py-8 bg-white/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <Sprout className="w-5 h-5 mr-3 text-green-600" />
                    Crop Care Tip
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    With the upcoming rain, consider applying organic fertilizer to your rice fields. This will help
                    improve nutrient absorption and boost crop health.
                  </p>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900">
                    <AlertTriangle className="w-5 h-5 mr-3 text-orange-600" />
                    Weather Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Heavy rainfall expected in the next 3 days. Ensure proper drainage in your fields to prevent
                    waterlogging and protect your crops.
                  </p>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Button */}
      <Button
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-lg z-40 bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
        onClick={() => setShowChatBot(true)}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      <BottomNavigation activeFeature="" onFeatureSelect={onFeatureSelect} />

      {/* ChatBot Modal */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </>
  )
}
