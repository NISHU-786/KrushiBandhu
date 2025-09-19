"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Calendar,
  TrendingUp,
  DollarSign,
  Droplets,
  ArrowLeft,
  Star,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Beaker,
  Thermometer,
  Cloud,
  Award,
  Target,
  Lightbulb,
  BarChart3,
  Zap
} from "lucide-react"

interface CropRecommendationsProps {
  onBack?: () => void
}

interface CropRecommendation {
  crop: string
  suitabilityScore: number
  expectedYield: number
  profitPotential: number
  waterRequirement: string
  growthPeriod: string
  marketDemand: string
  advantages: string[]
  challenges: string[]
  bestPractices: string[]
  fertilizerRecommendation: string
  seasonalSuitability: string[]
}

export function CropRecommendations({ onBack }: CropRecommendationsProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("input")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    soil_color: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    rainfall: "",
    temperature: "",
    fertilizer: "",
  })
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])

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
        const backEvent = new CustomEvent('navigateBack', { detail: 'cropRecommendations' })
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

  // States and Districts data (same as other components)
  const statesData: { [key: string]: string[] } = {
    "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    "Karnataka": ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
  }

  const soilColors = [
    { value: "black", label: "Black Soil (କଳା ମାଟି)" },
    { value: "red", label: "Red Soil (ଲାଲ ମାଟି)" },
    { value: "brown", label: "Brown Soil (ବାଦାମୀ ମାଟି)" },
    { value: "yellow", label: "Yellow Soil (ହଳଦିଆ ମାଟି)" },
    { value: "grey", label: "Grey Soil (ଧୂସର ମାଟି)" },
    { value: "white", label: "White Soil (ଧଳା ମାଟି)" },
  ]

  const fertilizers = [
    { value: "urea", label: "Urea (ୟୁରିଆ)" },
    { value: "dap", label: "DAP - Di-ammonium Phosphate" },
    { value: "mop", label: "MOP - Muriate of Potash" },
    { value: "ssp", label: "SSP - Single Super Phosphate" },
    { value: "magnesium_sulfate", label: "Magnesium Sulfate (ମ୍ୟାଗ୍ନେସିୟମ୍ ସଲଫେଟ୍)" },
    { value: "calcium_chloride", label: "Calcium Chloride (କ୍ୟାଲସିୟମ୍ କ୍ଲୋରାଇଡ୍)" },
    { value: "potassium_chloride", label: "Potassium Chloride (ପୋଟାସିୟମ୍ କ୍ଲୋରାଇଡ୍)" },
    { value: "ammonium_sulfate", label: "Ammonium Sulfate (ଆମୋନିୟମ୍ ସଲଫେଟ୍)" },
    { value: "zinc_sulfate", label: "Zinc Sulfate (ଜିଙ୍କ ସଲଫେଟ୍)" },
    { value: "ferrous_sulfate", label: "Ferrous Sulfate (ଫେରସ୍ ସଲଫେଟ୍)" },
    { value: "npk", label: "NPK Complex (19-19-19)" },
    { value: "organic_compost", label: "Organic Compost (ଜୈବିକ ଖତ)" }
  ]

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

  const handleGetRecommendations = async () => {
    setIsLoading(true)
    setActiveTab("loading")

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Mock recommendations based on input data
    const mockRecommendations: CropRecommendation[] = [
      {
        crop: "Rice (ধান/ଧାନ)",
        suitabilityScore: 94,
        expectedYield: 3.2,
        profitPotential: 88,
        waterRequirement: "High (1200-1500mm)",
        growthPeriod: "120-150 days",
        marketDemand: "Very High",
        advantages: [
          `Excellent match for ${formData.soil_color} soil in ${formData.district}`,
          `Optimal pH range (${formData.ph}) for rice cultivation`,
          `High rainfall (${formData.rainfall}mm) suits paddy requirements`,
          `Current NPK levels support good growth`,
          `Strong market demand in your region`
        ],
        challenges: [
          "Requires consistent water management",
          "Pest pressure during monsoon season",
          "Labor-intensive transplanting and harvesting",
          "Storage challenges during harvest season"
        ],
        bestPractices: [
          `Use ${formData.fertilizer} as recommended for your soil type`,
          "Implement System of Rice Intensification (SRI) method",
          "Apply zinc sulfate if deficiency symptoms appear",
          "Monitor for blast and brown spot diseases",
          "Maintain 2-5cm standing water during vegetative stage"
        ],
        fertilizerRecommendation: `Based on your NPK levels: Apply ${formData.fertilizer} at transplanting + additional potash`,
        seasonalSuitability: ["Kharif (Monsoon)", "Boro (Late Rabi)"]
      },
      {
        crop: "Maize (ভুট্টা/ମକା)",
        suitabilityScore: 86,
        expectedYield: 2.8,
        profitPotential: 82,
        waterRequirement: "Medium (600-800mm)",
        growthPeriod: "90-120 days",
        marketDemand: "High",
        advantages: [
          `Good adaptation to ${formData.soil_color} soil conditions`,
          `Temperature range (${formData.temperature}°C) favorable for maize`,
          `Moderate water requirement suits your rainfall pattern`,
          `Short duration crop allows multiple cropping`,
          `Growing demand for poultry feed and processing`
        ],
        challenges: [
          "Susceptible to fall armyworm attack",
          "Requires good drainage during heavy rains",
          "Market price fluctuations",
          "Post-harvest drying challenges"
        ],
        bestPractices: [
          `Apply ${formData.fertilizer} in split doses for better efficiency`,
          "Use certified hybrid seeds for higher yields",
          "Implement integrated pest management for fall armyworm",
          "Ensure proper plant population (75,000 plants/hectare)",
          "Harvest at proper moisture content (20-25%)"
        ],
        fertilizerRecommendation: `Recommended: 120kg N + 60kg P2O5 + 40kg K2O per hectare`,
        seasonalSuitability: ["Kharif", "Rabi", "Summer"]
      },
      {
        crop: "Groundnut (চিনাবাদাম/ମୁଗଫଳି)",
        suitabilityScore: 79,
        expectedYield: 1.8,
        profitPotential: 85,
        waterRequirement: "Medium (500-750mm)",
        growthPeriod: "100-130 days",
        marketDemand: "Very High",
        advantages: [
          `Well-suited for ${formData.soil_color} soil with good drainage`,
          `pH level (${formData.ph}) is ideal for groundnut cultivation`,
          `High oil content varieties fetch premium prices`,
          `Nitrogen fixation improves soil fertility`,
          `Multiple uses: oil, food, and cattle feed`
        ],
        challenges: [
          "Susceptible to aflatoxin contamination",
          "Requires careful water management",
          "Pest attacks (thrips, leaf miner)",
          "Weather dependency during maturity"
        ],
        bestPractices: [
          `Use gypsum along with ${formData.fertilizer} for better pod filling`,
          "Treat seeds with Rhizobium culture for nitrogen fixation",
          "Maintain proper plant spacing (30cm x 10cm)",
          "Apply calcium during pod development stage",
          "Harvest when leaves turn yellow and pods are mature"
        ],
        fertilizerRecommendation: `Apply 20kg N + 60kg P2O5 + 40kg K2O + 400kg gypsum per hectare`,
        seasonalSuitability: ["Kharif", "Rabi"]
      },
      {
        crop: "Sugarcane (আখ/ଆଖୁ)",
        suitabilityScore: 72,
        expectedYield: 68,
        profitPotential: 75,
        waterRequirement: "Very High (1800-2500mm)",
        growthPeriod: "12-18 months",
        marketDemand: "High",
        advantages: [
          `${formData.soil_color} soil provides good base for sugarcane`,
          `High rainfall (${formData.rainfall}mm) supports good growth`,
          `Long-term crop with assured income`,
          `Government support and MSP available`,
          `Multiple harvests from single planting`
        ],
        challenges: [
          "Very high water requirement",
          "Long gestation period",
          "High initial investment",
          "Labor-intensive crop",
          "Transport costs to sugar mills"
        ],
        bestPractices: [
          `Apply ${formData.fertilizer} in multiple splits throughout the season`,
          "Use drip irrigation for water-use efficiency",
          "Plant disease-free seed cane",
          "Implement integrated nutrient management",
          "Regular earthing up and intercultural operations"
        ],
        fertilizerRecommendation: `Apply 280kg N + 90kg P2O5 + 90kg K2O per hectare in splits`,
        seasonalSuitability: ["Adsali (Pre-monsoon)", "Suru (Monsoon)"]
      }
    ]

    // Sort by suitability score
    const sortedRecommendations = mockRecommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    
    setRecommendations(sortedRecommendations)
    setIsLoading(false)
    setActiveTab("results")
  }

  const isFormValid = () => {
    return (
      formData.state &&
      formData.district &&
      formData.soil_color &&
      formData.nitrogen &&
      formData.phosphorus &&
      formData.potassium &&
      formData.ph &&
      formData.rainfall &&
      formData.temperature &&
      formData.fertilizer
    )
  }

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200"
    if (score >= 70) return "text-orange-600 bg-orange-50 border-orange-200"
    return "text-red-600 bg-red-50 border-red-200"
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
                  AI Crop Recommender
                </h1>
                <p className="text-sm text-gray-600">Find the perfect crops for your soil & climate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm h-11">
            <TabsTrigger value="input" disabled={isLoading} className="data-[state=active]:bg-white text-sm">
              <Beaker className="w-4 h-4 mr-2" />
              Soil Analysis
            </TabsTrigger>
            <TabsTrigger value="loading" disabled={!isLoading && recommendations.length === 0} className="data-[state=active]:bg-white text-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="results" disabled={recommendations.length === 0} className="data-[state=active]:bg-white text-sm">
              <Award className="w-4 h-4 mr-2" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6 mt-6">
            {/* Location Information */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location Information
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                        {selectedState && statesData[selectedState]?.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Analysis */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Beaker className="w-5 h-5 mr-2 text-green-600" />
                  Soil Analysis Data
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soil_color" className="text-sm font-medium text-gray-700">Soil Color *</Label>
                    <Select value={formData.soil_color} onValueChange={(value) => handleInputChange("soil_color", value)}>
                      <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-green-400">
                        <SelectValue placeholder="Select soil color" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilColors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nitrogen" className="text-sm font-medium text-gray-700">Nitrogen (N) ppm *</Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      placeholder="e.g., 280"
                      value={formData.nitrogen}
                      onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phosphorus" className="text-sm font-medium text-gray-700">Phosphorus (P) ppm *</Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.phosphorus}
                      onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="potassium" className="text-sm font-medium text-gray-700">Potassium (K) ppm *</Label>
                    <Input
                      id="potassium"
                      type="number"
                      placeholder="e.g., 320"
                      value={formData.potassium}
                      onChange={(e) => handleInputChange("potassium", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
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
                      className="h-10 bg-white border-gray-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fertilizer" className="text-sm font-medium text-gray-700">Available Fertilizer *</Label>
                    <Select value={formData.fertilizer} onValueChange={(value) => handleInputChange("fertilizer", value)}>
                      <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-green-400">
                        <SelectValue placeholder="Select fertilizer" />
                      </SelectTrigger>
                      <SelectContent>
                        {fertilizers.map((fert) => (
                          <SelectItem key={fert.value} value={fert.value}>
                            {fert.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Climate Data */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Cloud className="w-5 h-5 mr-2 text-orange-600" />
                  Climate Conditions
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rainfall" className="text-sm font-medium text-gray-700 flex items-center">
                      <Droplets className="w-4 h-4 mr-1" />
                      Rainfall (mm) *
                    </Label>
                    <Input
                      id="rainfall"
                      type="number"
                      placeholder="e.g., 1200"
                      value={formData.rainfall}
                      onChange={(e) => handleInputChange("rainfall", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="text-sm font-medium text-gray-700 flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" />
                      Temperature (°C) *
                    </Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 28.5"
                      value={formData.temperature}
                      onChange={(e) => handleInputChange("temperature", e.target.value)}
                      className="h-10 bg-white border-gray-200 focus:border-orange-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={handleGetRecommendations} 
                disabled={!isFormValid() || isLoading} 
                size="lg" 
                className="px-12 py-4 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 mr-3" />
                    Get AI Recommendations
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="loading" className="space-y-6 mt-6">
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="space-y-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      AI is Analyzing Your Farm Conditions
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Processing soil data, climate patterns, and regional crop performance...
                    </p>
                  </div>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex items-center justify-between text-sm bg-green-50 p-4 rounded-lg">
                      <span>Analyzing soil composition & nutrients</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-blue-50 p-4 rounded-lg">
                      <span>Processing climate data</span>
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-orange-50 p-4 rounded-lg">
                      <span>Matching optimal crop varieties</span>
                      <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-4 rounded-lg text-gray-500">
                      <span>Calculating profitability & recommendations</span>
                      <div className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center text-xl font-bold text-gray-900">
                      <Sprout className="w-6 h-6 mr-3 text-green-600" />
                      {rec.crop}
                      {index === 0 && <Badge className="ml-3 bg-green-100 text-green-700 border-green-300">Top Match</Badge>}
                    </h3>
                    <Badge className={`px-3 py-2 text-lg border ${getSuitabilityColor(rec.suitabilityScore)}`}>
                      {rec.suitabilityScore}% Match
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{rec.expectedYield} t/ha</div>
                      <div className="text-xs text-gray-600">Expected Yield</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{rec.profitPotential}%</div>
                      <div className="text-xs text-gray-600">Profit Potential</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <Droplets className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-purple-600">{rec.waterRequirement}</div>
                      <div className="text-xs text-gray-600">Water Need</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-orange-600">{rec.growthPeriod}</div>
                      <div className="text-xs text-gray-600">Growth Period</div>
                    </div>
                  </div>

                  {/* Fertilizer Recommendation */}
                  <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Beaker className="w-4 h-4 mr-2" />
                      Fertilizer Recommendation
                    </h4>
                    <p className="text-sm text-blue-700">{rec.fertilizerRecommendation}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Key Advantages
                      </h4>
                      <ul className="space-y-2">
                        {rec.advantages.map((advantage, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <Star className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Potential Challenges
                      </h4>
                      <ul className="space-y-2">
                        {rec.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <AlertTriangle className="w-3 h-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Best Practices
                      </h4>
                      <ul className="space-y-2">
                        {rec.bestPractices.map((practice, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {practice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                      Detailed Guide
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      Start Cultivation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center space-x-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("input")} 
                className="px-8 py-3 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                Modify Inputs
              </Button>
              <Button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Save Recommendations
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                Share Results
              </Button>
            </div>
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
