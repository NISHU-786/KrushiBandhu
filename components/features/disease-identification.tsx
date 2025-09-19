"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Camera,
  Upload,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Eye,
  Leaf,
  Bug,
  Droplets,
  Shield,
  Scan,
  Zap,
  Target,
  Award,
} from "lucide-react"

interface DiseaseIdentificationProps {
  onBack?: () => void
}

interface DiseaseResult {
  disease: string
  confidence: number
  severity: "low" | "medium" | "high"
  description: string
  symptoms: string[]
  causes: string[]
  treatments: {
    organic: string[]
    chemical: string[]
    preventive: string[]
  }
  affectedArea: number
  spreadRisk: number
  actionRequired: string
}

export function DiseaseIdentification({ onBack }: DiseaseIdentificationProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("capture")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [diseaseResult, setDiseaseResult] = useState<DiseaseResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        const backEvent = new CustomEvent('navigateBack', { detail: 'diseaseIdentification' })
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    // For demo, we'll use a placeholder
    setUploadedImage("/diseased-crop-leaf-with-brown-spots.jpg")
  }

  const handleAnalyzeImage = async () => {
    if (!uploadedImage) return

    setIsLoading(true)
    setActiveTab("analysis")

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Mock disease identification result
    const mockResult: DiseaseResult = {
      disease: "Brown Spot Disease (Rice)",
      confidence: 89,
      severity: "medium",
      description:
        "Brown spot is a fungal disease caused by Bipolaris oryzae that affects rice plants, causing brown lesions on leaves and reducing photosynthesis.",
      symptoms: [
        "Small brown spots on leaves",
        "Spots have yellow halos around them", 
        "Lesions may merge to form larger patches",
        "Premature leaf drying and yellowing",
        "Reduced grain filling capacity",
      ],
      causes: [
        "High humidity and moisture conditions",
        "Poor air circulation in field",
        "Nutrient deficiency (especially potassium)",
        "Infected seeds or crop residue",
        "Favorable temperature range (25-30°C)",
      ],
      treatments: {
        organic: [
          "Apply neem oil spray (5ml/liter water)",
          "Use Trichoderma viride bio-fungicide",
          "Spray cow urine solution (1:10 ratio)",
          "Apply compost to improve soil health",
        ],
        chemical: [
          "Spray Propiconazole 25% EC (1ml/liter)",
          "Use Carbendazim 50% WP (1g/liter)",
          "Apply Mancozeb 75% WP (2g/liter)",
          "Alternate between different fungicides",
        ],
        preventive: [
          "Use certified disease-free seeds",
          "Maintain proper plant spacing",
          "Ensure good drainage in fields",
          "Remove infected plant debris",
          "Apply balanced fertilizers regularly",
        ],
      },
      affectedArea: 25,
      spreadRisk: 70,
      actionRequired: "Immediate treatment recommended within 2-3 days",
    }

    setDiseaseResult(mockResult)
    setIsLoading(false)
    setActiveTab("results")
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="w-4 h-4" />
      case "medium":
        return <AlertTriangle className="w-4 h-4" />
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
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
                <Scan className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI Disease Identifier
                </h1>
                <p className="text-sm text-gray-600">Smart crop disease diagnosis & treatment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm h-11">
            <TabsTrigger value="capture" disabled={isLoading} className="data-[state=active]:bg-white text-sm">
              <Camera className="w-4 h-4 mr-2" />
              Capture Image
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={!uploadedImage && !isLoading} className="data-[state=active]:bg-white text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!diseaseResult} className="data-[state=active]:bg-white text-sm">
              <Award className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture" className="space-y-6 mt-6">
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Camera className="w-5 h-5 mr-2 text-green-600" />
                  Upload Plant Image for Analysis
                </h3>
              </div>
              <CardContent className="p-6">
                {!uploadedImage ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50/50">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto">
                          <Camera className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-800">Take or Upload Photo</h3>
                          <p className="text-gray-600 text-sm max-w-md mx-auto">
                            Capture a clear image of the affected plant parts for accurate AI-powered diagnosis
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button 
                            onClick={handleCameraCapture} 
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Take Photo
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <Card className="bg-blue-50/80 border-blue-200/50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center text-blue-800">
                          <Eye className="w-4 h-4 mr-2" />
                          Tips for Better AI Analysis
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1.5">
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            Take photos in bright, natural light
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            Focus on diseased leaves or plant parts
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            Avoid blurry or poorly lit images
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            Include multiple affected areas if possible
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            Keep camera steady and close to plant
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative max-w-md mx-auto">
                      <img
                        src={uploadedImage}
                        alt="Uploaded plant"
                        className="w-full rounded-xl shadow-lg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button 
                        onClick={handleAnalyzeImage} 
                        size="lg" 
                        className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg"
                      >
                        <Scan className="w-5 h-5 mr-2" />
                        Analyze Disease with AI
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-10 text-center">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      AI is Analyzing Plant Disease
                    </h3>
                    <p className="text-gray-600">
                      Our advanced computer vision is examining symptoms and identifying potential diseases...
                    </p>
                  </div>
                  <div className="space-y-3 max-w-sm mx-auto">
                    <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-lg">
                      <span>Processing image quality</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-blue-50 p-3 rounded-lg">
                      <span>Detecting plant features</span>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-orange-50 p-3 rounded-lg">
                      <span>Identifying disease patterns</span>
                      <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg text-gray-500">
                      <span>Generating treatment plan</span>
                      <div className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            {diseaseResult && (
              <>
                {/* Main Result Card */}
                <Card className="shadow-lg bg-gradient-to-br from-red-50 to-orange-50 border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center text-xl font-bold">
                        <Bug className="w-6 h-6 mr-2" />
                        Disease Identified
                      </h3>
                      <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-white/30">
                        {diseaseResult.confidence}% Confident
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-red-600 mb-3">{diseaseResult.disease}</h2>
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <Badge className={`px-3 py-1 border ${getSeverityColor(diseaseResult.severity)}`}>
                          {getSeverityIcon(diseaseResult.severity)}
                          <span className="ml-1 capitalize">{diseaseResult.severity} Severity</span>
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                          {diseaseResult.actionRequired}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{diseaseResult.affectedArea}%</div>
                        <div className="text-xs text-gray-600 mb-2">Affected Area</div>
                        <Progress value={diseaseResult.affectedArea} className="h-1.5" />
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="text-2xl font-bold text-red-600 mb-1">{diseaseResult.spreadRisk}%</div>
                        <div className="text-xs text-gray-600 mb-2">Spread Risk</div>
                        <Progress value={diseaseResult.spreadRisk} className="h-1.5" />
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{diseaseResult.confidence}%</div>
                        <div className="text-xs text-gray-600 mb-2">AI Confidence</div>
                        <Progress value={diseaseResult.confidence} className="h-1.5" />
                      </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-gray-700">{diseaseResult.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Symptoms and Causes */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
                      <h3 className="flex items-center text-lg font-semibold text-gray-800">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        Symptoms Observed
                      </h3>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {diseaseResult.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start space-x-3 p-2 bg-orange-50 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                      <h3 className="flex items-center text-lg font-semibold text-gray-800">
                        <Bug className="w-5 h-5 mr-2 text-red-600" />
                        Possible Causes
                      </h3>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {diseaseResult.causes.map((cause, index) => (
                          <li key={index} className="flex items-start space-x-3 p-2 bg-red-50 rounded-lg">
                            <Bug className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Treatment Options */}
                <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Treatment Recommendations
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <Tabs defaultValue="organic" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                        <TabsTrigger value="organic" className="text-sm">Organic Treatment</TabsTrigger>
                        <TabsTrigger value="chemical" className="text-sm">Chemical Treatment</TabsTrigger>
                        <TabsTrigger value="preventive" className="text-sm">Prevention</TabsTrigger>
                      </TabsList>

                      <TabsContent value="organic" className="mt-4">
                        <ul className="space-y-3">
                          {diseaseResult.treatments.organic.map((treatment, index) => (
                            <li key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{treatment}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>

                      <TabsContent value="chemical" className="mt-4">
                        <ul className="space-y-3">
                          {diseaseResult.treatments.chemical.map((treatment, index) => (
                            <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                              <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{treatment}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-xs text-orange-700 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Always follow label instructions and safety precautions when using chemical treatments.
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="preventive" className="mt-4">
                        <ul className="space-y-3">
                          {diseaseResult.treatments.preventive.map((prevention, index) => (
                            <li key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                              <Shield className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{prevention}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setUploadedImage(null)
                      setDiseaseResult(null)
                      setActiveTab("capture")
                    }}
                    className="px-6 py-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    Scan Another Plant
                  </Button>
                  <Button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Save Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-6 py-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    Get Expert Help
                  </Button>
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
