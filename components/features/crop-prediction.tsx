"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Sprout,
  MapPin,
  Droplets,
  Thermometer,
  Wind,
  Cloud,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
  TrendingUp,
  Calendar,
  Beaker,
  IndianRupee,
  Target,
  Lightbulb,
  Award,
} from "lucide-react"

interface CropPredictionProps {
  onBack?: () => void
}

interface PredictionResult {
  predictedYield: number
  confidence: number
  qualityGrade: string
  profitability: {
    expectedRevenue: number
    estimatedCost: number
    netProfit: number
    roi: number
  }
  recommendations: string[]
  weatherImpact: number
  soilSuitability: number
  riskLevel: "Low" | "Medium" | "High"
}

export function CropPrediction({ onBack }: CropPredictionProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("input")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [formData, setFormData] = useState({
    year: new Date().getFullYear().toString(),
    state: "",
    district: "",
    crop: "",
    area_ha: "",
    total_n_kg: "",
    total_p_kg: "",
    total_k_kg: "",
    temperature_c: "",
    humidity_percent: "",
    ph: "",
    rainfall_mm: "",
    wind_speed_m_s: "",
  })
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

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
        const backEvent = new CustomEvent('navigateBack', { detail: 'cropPrediction' })
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

  // States and Districts data
  const statesData = {
    "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    "Karnataka": ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
  }

  const cropOptions = [
    { value: "rice", label: "Rice (ଧାନ)" },
    { value: "wheat", label: "Wheat (ଗହମ)" },
    { value: "sugarcane", label: "Sugarcane (ଆଖୁ)" },
    { value: "cotton", label: "Cotton (କପା)" },
    { value: "maize", label: "Maize (ମକା)" },
    { value: "turmeric", label: "Turmeric (ହଳଦୀ)" },
    { value: "groundnut", label: "Groundnut (ମୁଗଫଳି)" },
    { value: "black_gram", label: "Black Gram (ମୂଗ)" },
    { value: "ragi", label: "Ragi (ମଣୁଆ)" },
    { value: "arhar", label: "Arhar (ହରଡ଼)" },
  ]

  const yearOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i + 1)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    if (field === "state") {
      setSelectedState(value)
      setSelectedDistrict("")
      setFormData((prev) => ({ ...prev, district: "" }))
    }
    
    if (field === "district") {
      setSelectedDistrict(value)
    }
  }

  const handlePrediction = async () => {
    setIsLoading(true)
    setActiveTab("loading")

    // Simulate AI prediction process
    await new Promise((resolve) => setTimeout(resolve, 4000))

    const mockResult: PredictionResult = {
      predictedYield: parseFloat((Math.random() * 2 + 2.5).toFixed(2)),
      confidence: Math.floor(Math.random() * 10) + 88,
      qualityGrade: Math.random() > 0.3 ? "Grade A" : "Grade B",
      profitability: {
        expectedRevenue: Math.floor(Math.random() * 20000) + 50000,
        estimatedCost: Math.floor(Math.random() * 10000) + 25000,
        netProfit: 0,
        roi: 0,
      },
      recommendations: [
        `Apply ${formData.total_n_kg}kg Nitrogen as per soil test`,
        `Maintain soil pH between 6.0-7.0 (current: ${formData.ph})`,
        `Ensure proper drainage during monsoon season`,
        `Use disease-resistant varieties for better yield`,
        `Monitor temperature fluctuations during flowering`,
      ],
      weatherImpact: Math.floor(Math.random() * 20) + 80,
      soilSuitability: Math.floor(Math.random() * 15) + 85,
      riskLevel: Math.random() > 0.7 ? "Low" : Math.random() > 0.4 ? "Medium" : "High",
    }

    mockResult.profitability.netProfit = mockResult.profitability.expectedRevenue - mockResult.profitability.estimatedCost
    mockResult.profitability.roi = ((mockResult.profitability.netProfit / mockResult.profitability.estimatedCost) * 100)

    setPredictionResult(mockResult)
    setIsLoading(false)
    setActiveTab("results")
  }

  const isFormValid = () => {
    return (
      formData.year &&
      formData.state &&
      formData.district &&
      formData.crop &&
      formData.area_ha &&
      formData.total_n_kg &&
      formData.total_p_kg &&
      formData.total_k_kg &&
      formData.temperature_c &&
      formData.humidity_percent &&
      formData.ph &&
      formData.rainfall_mm &&
      formData.wind_speed_m_s
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-blue-50/20 to-emerald-50/30">
      {/* CLEAN HEADER WITH SINGLE GREEN BACK BUTTON */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
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
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Smart Crop Yield Predictor
                </h1>
                <p className="text-sm text-gray-600">AI-powered predictions for better farming</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm h-11">
            <TabsTrigger value="input" disabled={isLoading} className="data-[state=active]:bg-white text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Input Data
            </TabsTrigger>
            <TabsTrigger value="loading" disabled={!isLoading && !predictionResult} className="data-[state=active]:bg-white text-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!predictionResult} className="data-[state=active]:bg-white text-sm">
              <Award className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6 mt-6">
            {/* Location & Basic Info */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location & Basic Information
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-medium text-gray-700">Year *</Label>
                    <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                      <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-blue-400">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-blue-400">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(statesData).map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-medium text-gray-700">District *</Label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(value) => handleInputChange("district", value)}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-blue-400">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedState && statesData[selectedState as keyof typeof statesData]?.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crop" className="text-sm font-medium text-gray-700">Crop Type *</Label>
                    <Select value={formData.crop} onValueChange={(value) => handleInputChange("crop", value)}>
                      <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-blue-400">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropOptions.map((crop) => (
                          <SelectItem key={crop.value} value={crop.value}>
                            {crop.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field & Nutrients */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Beaker className="w-5 h-5 mr-2 text-green-600" />
                  Field Area & Nutrients
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area_ha" className="text-sm font-medium text-gray-700">Area (Hectares) *</Label>
                    <Input
                      id="area_ha"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      value={formData.area_ha}
                      onChange={(e) => handleInputChange("area_ha", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_n_kg" className="text-sm font-medium text-gray-700">Nitrogen (kg) *</Label>
                    <Input
                      id="total_n_kg"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.total_n_kg}
                      onChange={(e) => handleInputChange("total_n_kg", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_p_kg" className="text-sm font-medium text-gray-700">Phosphorus (kg) *</Label>
                    <Input
                      id="total_p_kg"
                      type="number"
                      placeholder="e.g., 60"
                      value={formData.total_p_kg}
                      onChange={(e) => handleInputChange("total_p_kg", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_k_kg" className="text-sm font-medium text-gray-700">Potassium (kg) *</Label>
                    <Input
                      id="total_k_kg"
                      type="number"
                      placeholder="e.g., 40"
                      value={formData.total_k_kg}
                      onChange={(e) => handleInputChange("total_k_kg", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Soil */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Cloud className="w-5 h-5 mr-2 text-orange-600" />
                  Weather & Soil Conditions
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature_c" className="text-sm font-medium text-gray-700 flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" />
                      Temperature (°C) *
                    </Label>
                    <Input
                      id="temperature_c"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 28.5"
                      value={formData.temperature_c}
                      onChange={(e) => handleInputChange("temperature_c", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity_percent" className="text-sm font-medium text-gray-700 flex items-center">
                      <Droplets className="w-4 h-4 mr-1" />
                      Humidity (%) *
                    </Label>
                    <Input
                      id="humidity_percent"
                      type="number"
                      placeholder="e.g., 75"
                      value={formData.humidity_percent}
                      onChange={(e) => handleInputChange("humidity_percent", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ph" className="text-sm font-medium text-gray-700">Soil pH *</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 6.5"
                      value={formData.ph}
                      onChange={(e) => handleInputChange("ph", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rainfall_mm" className="text-sm font-medium text-gray-700 flex items-center">
                      <Cloud className="w-4 h-4 mr-1" />
                      Rainfall (mm) *
                    </Label>
                    <Input
                      id="rainfall_mm"
                      type="number"
                      placeholder="e.g., 1200"
                      value={formData.rainfall_mm}
                      onChange={(e) => handleInputChange("rainfall_mm", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wind_speed_m_s" className="text-sm font-medium text-gray-700 flex items-center">
                      <Wind className="w-4 h-4 mr-1" />
                      Wind Speed (m/s) *
                    </Label>
                    <Input
                      id="wind_speed_m_s"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      value={formData.wind_speed_m_s}
                      onChange={(e) => handleInputChange("wind_speed_m_s", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <button 
                onClick={handlePrediction} 
                disabled={!isFormValid()} 
                className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg text-white font-medium"
              >
                <BarChart3 className="w-5 h-5 mr-2 inline" />
                Generate AI Prediction
              </button>
            </div>
          </TabsContent>

          <TabsContent value="loading" className="space-y-6 mt-6">
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-10 text-center">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      AI is Analyzing Your Farm Data
                    </h3>
                    <p className="text-gray-600">
                      Our advanced algorithms are processing weather patterns, soil conditions, and crop data...
                    </p>
                  </div>
                  <div className="space-y-3 max-w-sm mx-auto">
                    <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-lg">
                      <span>Processing location data</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-blue-50 p-3 rounded-lg">
                      <span>Analyzing soil nutrients</span>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-orange-50 p-3 rounded-lg">
                      <span>Evaluating weather impact</span>
                      <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg text-gray-500">
                      <span>Generating recommendations</span>
                      <div className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            {predictionResult && (
              <>
                {/* Main Results Card */}
                <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center text-xl font-bold">
                        <TrendingUp className="w-6 h-6 mr-2" />
                        Your Crop Yield Prediction
                      </h3>
                      <Badge className="px-3 py-1 bg-white/20 text-white border-white/30">
                        {predictionResult.confidence}% Confident
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {predictionResult.predictedYield} tons/hectare
                      </div>
                      <div className="text-lg text-gray-700 mb-2">
                        Expected yield for {cropOptions.find((c) => c.value === formData.crop)?.label}
                      </div>
                      <Badge className="px-3 py-1 border border-gray-200">
                        Quality: {predictionResult.qualityGrade}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{predictionResult.weatherImpact}%</div>
                        <div className="text-xs text-gray-600 mb-2">Weather Favorability</div>
                        <Progress value={predictionResult.weatherImpact} className="h-1.5" />
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="text-2xl font-bold text-green-600 mb-1">{predictionResult.soilSuitability}%</div>
                        <div className="text-xs text-gray-600 mb-2">Soil Suitability</div>
                        <Progress value={predictionResult.soilSuitability} className="h-1.5" />
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                        <div className={`text-2xl font-bold mb-1 ${
                          predictionResult.riskLevel === "Low" ? "text-green-600" :
                          predictionResult.riskLevel === "Medium" ? "text-orange-600" : "text-red-600"
                        }`}>
                          {predictionResult.riskLevel}
                        </div>
                        <div className="text-xs text-gray-600">Risk Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profitability Analysis */}
                <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
                      Profitability Analysis
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          ₹{predictionResult.profitability.expectedRevenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Expected Revenue</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-xl">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          ₹{predictionResult.profitability.estimatedCost.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Estimated Cost</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          ₹{predictionResult.profitability.netProfit.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Net Profit</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {predictionResult.profitability.roi.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">Return on Investment</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <Lightbulb className="w-5 h-5 mr-2 text-orange-600" />
                      Expert Recommendations for Better Yield
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid gap-3">
                      {predictionResult.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                          <div className="p-1.5 bg-orange-100 rounded-lg flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm mb-1">Tip {index + 1}</h4>
                            <p className="text-gray-700 text-sm">{rec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setActiveTab("input")} 
                    className="px-6 py-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-lg transition-all duration-300"
                  >
                    Modify Inputs
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300">
                    Save Report
                  </button>
                  <button className="px-6 py-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-lg transition-all duration-300">
                    Share Results
                  </button>
                </div>
              </>
            )}
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
