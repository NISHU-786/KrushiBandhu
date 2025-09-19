"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Calendar, 
  RefreshCw, 
  Bell, 
  BarChart3,
  IndianRupee,
  Target,
  Award,
  Activity,
  DollarSign,
  Zap
} from "lucide-react"

interface MandiPricesProps {
  onBack?: () => void
}

interface PriceData {
  commodity: string
  market: string
  district: string
  price: number
  unit: string
  change: number
  changePercent: number
  lastUpdated: string
  trend: "up" | "down" | "stable"
  quality: string
  category: string
}

interface MarketTrend {
  commodity: string
  weeklyChange: number
  monthlyChange: number
  yearlyChange: number
  forecast: "bullish" | "bearish" | "stable"
  volume: number
  avgPrice: number
}

export function MandiPrices({ onBack }: MandiPricesProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("current")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedCommodity, setSelectedCommodity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

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
        const backEvent = new CustomEvent('navigateBack', { detail: 'mandiPrices' })
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

  // Comprehensive mock price data with all major crops
  const [priceData, setPriceData] = useState<PriceData[]>([
    // Cereals
    { commodity: "Rice (Paddy)", market: "Bhubaneswar Mandi", district: "Khordha", price: 2150, unit: "quintal", change: 50, changePercent: 2.4, lastUpdated: "2 hours ago", trend: "up", quality: "FAQ", category: "Cereals" },
    { commodity: "Wheat", market: "Cuttack Mandi", district: "Cuttack", price: 2300, unit: "quintal", change: -25, changePercent: -1.1, lastUpdated: "1 hour ago", trend: "down", quality: "Good", category: "Cereals" },
    { commodity: "Maize", market: "Berhampur Mandi", district: "Ganjam", price: 1850, unit: "quintal", change: 75, changePercent: 4.2, lastUpdated: "1 hour ago", trend: "up", quality: "FAQ", category: "Cereals" },
    { commodity: "Barley", market: "Balasore Mandi", district: "Balasore", price: 1680, unit: "quintal", change: 30, changePercent: 1.8, lastUpdated: "3 hours ago", trend: "up", quality: "Good", category: "Cereals" },
    { commodity: "Bajra (Pearl Millet)", market: "Sambalpur Mandi", district: "Sambalpur", price: 1950, unit: "quintal", change: 45, changePercent: 2.4, lastUpdated: "2 hours ago", trend: "up", quality: "Average", category: "Cereals" },
    { commodity: "Jowar (Sorghum)", market: "Rourkela Mandi", district: "Sundargarh", price: 1720, unit: "quintal", change: 20, changePercent: 1.2, lastUpdated: "4 hours ago", trend: "up", quality: "Good", category: "Cereals" },
    { commodity: "Ragi (Finger Millet)", market: "Jeypore Mandi", district: "Koraput", price: 3200, unit: "quintal", change: 100, changePercent: 3.2, lastUpdated: "2 hours ago", trend: "up", quality: "FAQ", category: "Cereals" },

    // Pulses
    { commodity: "Arhar (Tur Dal)", market: "Rourkela Mandi", district: "Sundargarh", price: 6200, unit: "quintal", change: -100, changePercent: -1.6, lastUpdated: "2 hours ago", trend: "down", quality: "Good", category: "Pulses" },
    { commodity: "Moong Dal", market: "Bhubaneswar Mandi", district: "Khordha", price: 7500, unit: "quintal", change: 150, changePercent: 2.0, lastUpdated: "1 hour ago", trend: "up", quality: "FAQ", category: "Pulses" },
    { commodity: "Urad Dal", market: "Cuttack Mandi", district: "Cuttack", price: 6800, unit: "quintal", change: 80, changePercent: 1.2, lastUpdated: "3 hours ago", trend: "up", quality: "Good", category: "Pulses" },
    { commodity: "Chana (Chickpea)", market: "Berhampur Mandi", district: "Ganjam", price: 5400, unit: "quintal", change: -50, changePercent: -0.9, lastUpdated: "2 hours ago", trend: "down", quality: "Average", category: "Pulses" },
    { commodity: "Masur (Lentil)", market: "Balasore Mandi", district: "Balasore", price: 5800, unit: "quintal", change: 75, changePercent: 1.3, lastUpdated: "4 hours ago", trend: "up", quality: "Good", category: "Pulses" },
    { commodity: "Rajma (Kidney Bean)", market: "Sambalpur Mandi", district: "Sambalpur", price: 8200, unit: "quintal", change: 200, changePercent: 2.5, lastUpdated: "3 hours ago", trend: "up", quality: "FAQ", category: "Pulses" },

    // Cash Crops
    { commodity: "Cotton", market: "Sambalpur Mandi", district: "Sambalpur", price: 5800, unit: "quintal", change: 0, changePercent: 0, lastUpdated: "4 hours ago", trend: "stable", quality: "Good", category: "Cash Crops" },
    { commodity: "Sugarcane", market: "Balasore Mandi", district: "Balasore", price: 350, unit: "quintal", change: 10, changePercent: 2.9, lastUpdated: "3 hours ago", trend: "up", quality: "Average", category: "Cash Crops" },
    { commodity: "Jute", market: "Cuttack Mandi", district: "Cuttack", price: 4200, unit: "quintal", change: 120, changePercent: 2.9, lastUpdated: "2 hours ago", trend: "up", quality: "Good", category: "Cash Crops" },
    { commodity: "Tobacco", market: "Berhampur Mandi", district: "Ganjam", price: 15000, unit: "quintal", change: -300, changePercent: -2.0, lastUpdated: "5 hours ago", trend: "down", quality: "FAQ", category: "Cash Crops" },

    // Oilseeds
    { commodity: "Groundnut", market: "Bhubaneswar Mandi", district: "Khordha", price: 5200, unit: "quintal", change: 180, changePercent: 3.6, lastUpdated: "1 hour ago", trend: "up", quality: "Good", category: "Oilseeds" },
    { commodity: "Sunflower", market: "Sambalpur Mandi", district: "Sambalpur", price: 6400, unit: "quintal", change: 150, changePercent: 2.4, lastUpdated: "2 hours ago", trend: "up", quality: "FAQ", category: "Oilseeds" },
    { commodity: "Sesame (Til)", market: "Rourkela Mandi", district: "Sundargarh", price: 8500, unit: "quintal", change: 200, changePercent: 2.4, lastUpdated: "3 hours ago", trend: "up", quality: "Average", category: "Oilseeds" },
    { commodity: "Mustard", market: "Balasore Mandi", district: "Balasore", price: 5800, unit: "quintal", change: 100, changePercent: 1.8, lastUpdated: "4 hours ago", trend: "up", quality: "Good", category: "Oilseeds" },
    { commodity: "Castor", market: "Berhampur Mandi", district: "Ganjam", price: 5600, unit: "quintal", change: 90, changePercent: 1.6, lastUpdated: "2 hours ago", trend: "up", quality: "FAQ", category: "Oilseeds" },

    // Spices
    { commodity: "Turmeric", market: "Jeypore Mandi", district: "Koraput", price: 8200, unit: "quintal", change: 250, changePercent: 3.1, lastUpdated: "1 hour ago", trend: "up", quality: "FAQ", category: "Spices" },
    { commodity: "Coriander", market: "Cuttack Mandi", district: "Cuttack", price: 12000, unit: "quintal", change: 300, changePercent: 2.6, lastUpdated: "3 hours ago", trend: "up", quality: "Good", category: "Spices" },
    { commodity: "Cumin", market: "Sambalpur Mandi", district: "Sambalpur", price: 25000, unit: "quintal", change: 500, changePercent: 2.0, lastUpdated: "4 hours ago", trend: "up", quality: "FAQ", category: "Spices" },
    { commodity: "Fenugreek", market: "Bhubaneswar Mandi", district: "Khordha", price: 8500, unit: "quintal", change: 150, changePercent: 1.8, lastUpdated: "2 hours ago", trend: "up", quality: "Good", category: "Spices" },
    { commodity: "Black Pepper", market: "Berhampur Mandi", district: "Ganjam", price: 45000, unit: "quintal", change: -1000, changePercent: -2.2, lastUpdated: "5 hours ago", trend: "down", quality: "FAQ", category: "Spices" },

    // Vegetables
    { commodity: "Onion", market: "Cuttack Mandi", district: "Cuttack", price: 2800, unit: "quintal", change: 200, changePercent: 7.7, lastUpdated: "1 hour ago", trend: "up", quality: "Good", category: "Vegetables" },
    { commodity: "Potato", market: "Bhubaneswar Mandi", district: "Khordha", price: 2200, unit: "quintal", change: 150, changePercent: 7.3, lastUpdated: "2 hours ago", trend: "up", quality: "Average", category: "Vegetables" },
    { commodity: "Tomato", market: "Berhampur Mandi", district: "Ganjam", price: 3500, unit: "quintal", change: -500, changePercent: -12.5, lastUpdated: "1 hour ago", trend: "down", quality: "Good", category: "Vegetables" },
    { commodity: "Cabbage", market: "Balasore Mandi", district: "Balasore", price: 1200, unit: "quintal", change: 100, changePercent: 9.1, lastUpdated: "3 hours ago", trend: "up", quality: "FAQ", category: "Vegetables" },
    { commodity: "Cauliflower", market: "Sambalpur Mandi", district: "Sambalpur", price: 1800, unit: "quintal", change: 150, changePercent: 9.1, lastUpdated: "2 hours ago", trend: "up", quality: "Good", category: "Vegetables" },

    // Fruits
    { commodity: "Mango", market: "Cuttack Mandi", district: "Cuttack", price: 4500, unit: "quintal", change: 200, changePercent: 4.7, lastUpdated: "2 hours ago", trend: "up", quality: "FAQ", category: "Fruits" },
    { commodity: "Banana", market: "Bhubaneswar Mandi", district: "Khordha", price: 2800, unit: "quintal", change: 100, changePercent: 3.7, lastUpdated: "1 hour ago", trend: "up", quality: "Good", category: "Fruits" },
    { commodity: "Orange", market: "Berhampur Mandi", district: "Ganjam", price: 3200, unit: "quintal", change: 80, changePercent: 2.6, lastUpdated: "3 hours ago", trend: "up", quality: "Average", category: "Fruits" },
    { commodity: "Apple", market: "Rourkela Mandi", district: "Sundargarh", price: 8500, unit: "quintal", change: -200, changePercent: -2.3, lastUpdated: "4 hours ago", trend: "down", quality: "FAQ", category: "Fruits" },
  ])

  const marketTrends: MarketTrend[] = [
    { commodity: "Rice", weeklyChange: 3.2, monthlyChange: 8.5, yearlyChange: 15.2, forecast: "bullish", volume: 1250, avgPrice: 2150 },
    { commodity: "Wheat", weeklyChange: -1.8, monthlyChange: 2.1, yearlyChange: 12.8, forecast: "stable", volume: 980, avgPrice: 2300 },
    { commodity: "Sugarcane", weeklyChange: 2.1, monthlyChange: 5.4, yearlyChange: 18.9, forecast: "bullish", volume: 2100, avgPrice: 350 },
    { commodity: "Cotton", weeklyChange: 0.5, monthlyChange: -1.2, yearlyChange: 8.7, forecast: "stable", volume: 750, avgPrice: 5800 },
    { commodity: "Groundnut", weeklyChange: 4.1, monthlyChange: 12.3, yearlyChange: 22.1, forecast: "bullish", volume: 850, avgPrice: 5200 },
    { commodity: "Turmeric", weeklyChange: 3.8, monthlyChange: 15.2, yearlyChange: 28.5, forecast: "bullish", volume: 650, avgPrice: 8200 },
    { commodity: "Maize", weeklyChange: 2.8, monthlyChange: 9.1, yearlyChange: 16.4, forecast: "bullish", volume: 1100, avgPrice: 1850 },
    { commodity: "Arhar Dal", weeklyChange: -2.1, monthlyChange: 3.4, yearlyChange: 14.7, forecast: "stable", volume: 420, avgPrice: 6200 },
  ]

  const districts = ["All Districts", "Khordha", "Cuttack", "Balasore", "Sambalpur", "Ganjam", "Sundargarh", "Koraput"]
  const commodities = ["All Commodities", "Rice (Paddy)", "Wheat", "Maize", "Cotton", "Sugarcane", "Groundnut", "Turmeric", "Arhar (Tur Dal)", "Onion", "Potato"]
  const categories = ["All Categories", "Cereals", "Pulses", "Cash Crops", "Oilseeds", "Spices", "Vegetables", "Fruits"]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastRefresh(new Date())
    setIsRefreshing(false)
  }

  const filteredPrices = priceData.filter((item) => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) || item.market.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "all" || item.district === selectedDistrict
    const matchesCommodity = selectedCommodity === "all" || item.commodity === selectedCommodity
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesDistrict && matchesCommodity && matchesCategory
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50 border-green-200"
      case "down":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getForecastColor = (forecast: string) => {
    switch (forecast) {
      case "bullish":
        return "text-green-600 bg-green-50 border-green-200"
      case "bearish":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-blue-50/20 to-emerald-50/30">
      {/* CLEAN HEADER WITH SINGLE GREEN BACK BUTTON */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* SINGLE GREEN BACK BUTTON */}
              <button
                onClick={handleGoBack}
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Dashboard</span>
              </button>

              {/* TITLE AND ICON RIGHT AFTER BACK BUTTON */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Live Mandi Prices
                  </h1>
                  <p className="text-sm text-gray-600">Real-time market rates across India</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/60"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/60"
              >
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm h-11">
            <TabsTrigger value="current" className="data-[state=active]:bg-white text-sm">
              <DollarSign className="w-4 h-4 mr-2" />
              Current Prices
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-white text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Market Trends
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-white text-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Price Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6 mt-6">
            {/* Enhanced Filters */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Search className="w-5 h-5 mr-2 text-blue-600" />
                  Search & Filter Markets
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search commodity or market..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 bg-white border-gray-200"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-10 bg-white border-gray-200">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category === "All Categories" ? "all" : category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="h-10 bg-white border-gray-200">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district === "All Districts" ? "all" : district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                    <SelectTrigger className="h-10 bg-white border-gray-200">
                      <SelectValue placeholder="Select Commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      {commodities.map((commodity) => (
                        <SelectItem key={commodity} value={commodity === "All Commodities" ? "all" : commodity}>
                          {commodity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                  <span>{filteredPrices.length} markets found</span>
                </div>
              </CardContent>
            </Card>

            {/* Price Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrices.map((item, index) => (
                <Card key={index} className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{item.commodity}</h3>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.market}
                          </div>
                        </div>
                        <Badge className={`px-2 py-1 text-xs border ${getTrendColor(item.trend)}`}>
                          {getTrendIcon(item.trend)}
                          <span className="ml-1">
                            {item.changePercent > 0 ? "+" : ""}
                            {item.changePercent}%
                          </span>
                        </Badge>
                      </div>

                      <div className="text-center py-2">
                        <div className="text-2xl font-bold text-green-600">₹{item.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per {item.unit}</div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Change:</span>
                          <span className={item.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                            {item.change >= 0 ? "+" : ""}₹{item.change}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Quality:</span>
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            {item.quality}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="text-xs font-medium text-blue-600">{item.category}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {item.lastUpdated}
                          </span>
                          <span>{item.district}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPrices.length === 0 && (
              <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl">
                <CardContent className="p-10 text-center">
                  <div className="text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketTrends.map((trend, index) => (
                <Card key={index} className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl">
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{trend.commodity}</h3>
                        <Badge className={`px-2 py-1 text-xs border ${getForecastColor(trend.forecast)}`}>
                          {trend.forecast}
                        </Badge>
                      </div>

                      <div className="text-center py-2">
                        <div className="text-2xl font-bold text-blue-600">₹{trend.avgPrice.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Average Price</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Weekly:</span>
                          <span className={`font-medium ${trend.weeklyChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {trend.weeklyChange >= 0 ? "+" : ""}{trend.weeklyChange}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Monthly:</span>
                          <span className={`font-medium ${trend.monthlyChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {trend.monthlyChange >= 0 ? "+" : ""}{trend.monthlyChange}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Yearly:</span>
                          <span className={`font-medium ${trend.yearlyChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {trend.yearlyChange >= 0 ? "+" : ""}{trend.yearlyChange}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Volume:</span>
                          <span className="font-medium text-gray-900">{trend.volume} tons</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            {/* Market Summary */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Market Analysis Dashboard
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-xs text-gray-600">Active Markets</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">35</div>
                    <div className="text-xs text-gray-600">Commodity Types</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">78%</div>
                    <div className="text-xs text-gray-600">Price Increase</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">₹2.4L</div>
                    <div className="text-xs text-gray-600">Avg Daily Volume</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-green-600">Top Performing Commodities</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Onion</span>
                        <span className="text-sm font-bold text-green-600">+7.7%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Potato</span>
                        <span className="text-sm font-bold text-green-600">+7.3%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Maize</span>
                        <span className="text-sm font-bold text-green-600">+4.2%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Groundnut</span>
                        <span className="text-sm font-bold text-green-600">+3.6%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Turmeric</span>
                        <span className="text-sm font-bold text-green-600">+3.1%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-blue-600">Market Insights</h4>
                    <div className="space-y-4 text-sm text-gray-700">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="flex items-center">
                          <Target className="w-4 h-4 mr-2 text-blue-600" />
                          Rice prices showing upward trend due to increased demand during festive season
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-orange-600" />
                          Vegetable prices volatile due to seasonal weather changes
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="flex items-center">
                          <Award className="w-4 h-4 mr-2 text-green-600" />
                          Spice market showing strong bullish trend with turmeric leading gains
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="flex items-center">
                          <Activity className="w-4 h-4 mr-2 text-purple-600" />
                          Overall market sentiment remains positive across major agricultural commodities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
    </div>
  )
}
