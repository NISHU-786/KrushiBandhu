"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/providers/language-provider"
import { 
  ArrowLeft, 
  Calculator, 
  IndianRupee, 
  Calendar, 
  Percent, 
  FileText, 
  CheckCircle,
  Loader2,
  Building2,
  CreditCard,
  Target,
  Award,
  TrendingUp,
  AlertCircle,
  Info,
  Banknote
} from "lucide-react"

interface LoanCalculatorProps {
  onBack?: () => void
}

interface LoanScheme {
  name: string
  rate: string
  maxAmount: string
  description: string
  category: string
  eligibility: string[]
  benefits: string[]
}

interface CalculationResults {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principalPercentage: number
  interestPercentage: number
  eligibleSchemes: LoanScheme[]
}

export function LoanCalculator({ onBack }: LoanCalculatorProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("calculate")
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [loanType, setLoanType] = useState("")
  const [cropType, setCropType] = useState("")
  const [results, setResults] = useState<CalculationResults | null>(null)
  const [loading, setLoading] = useState(false)

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
        const backEvent = new CustomEvent('navigateBack', { detail: 'loanCalculator' })
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

  const loanTypes = [
    { value: "crop", label: "Crop Loan (फसली ऋण)" },
    { value: "equipment", label: "Equipment Loan (उपकरण ऋण)" },
    { value: "land", label: "Land Purchase Loan (भूमि खरीद ऋण)" },
    { value: "dairy", label: "Dairy Loan (डेयरी ऋण)" },
    { value: "poultry", label: "Poultry Loan (मुर्गी पालन ऋण)" },
    { value: "fisheries", label: "Fisheries Loan (मत्स्य पालन ऋण)" },
  ]

  const cropTypes = [
    { value: "food_grains", label: "Food Grains (अनाज)" },
    { value: "cash_crops", label: "Cash Crops (नकदी फसलें)" },
    { value: "horticulture", label: "Horticulture (बागवानी)" },
    { value: "spices", label: "Spices (मसाले)" },
    { value: "oilseeds", label: "Oilseeds (तिलहन)" },
  ]

  const governmentSchemes: LoanScheme[] = [
    {
      name: "PM-KISAN Credit Card",
      rate: "7.0%",
      maxAmount: "₹3,00,000",
      description: "Short-term credit for crop cultivation and post-harvest expenses",
      category: "Crop Loan",
      eligibility: ["Small & marginal farmers", "Valid land documents", "Aadhar card mandatory"],
      benefits: ["No collateral required", "Flexible repayment", "Interest subvention available"]
    },
    {
      name: "Crop Loan Scheme",
      rate: "4.0%",
      maxAmount: "₹1,60,000",
      description: "Subsidized loans for seasonal crop cultivation",
      category: "Crop Loan",
      eligibility: ["Farmers with valid land records", "Crop insurance mandatory", "No previous loan defaults"],
      benefits: ["Interest subvention up to 3%", "Quick processing", "Minimal documentation"]
    },
    {
      name: "Agricultural Term Loan",
      rate: "8.5%",
      maxAmount: "₹25,00,000",
      description: "Long-term loans for farm development and equipment purchase",
      category: "Equipment Loan",
      eligibility: ["Land ownership documents", "Income proof", "Project report for high-value loans"],
      benefits: ["Up to 10-year repayment", "Moratorium period available", "Collateral-free up to ₹1.6 lakh"]
    },
    {
      name: "Dairy Development Scheme",
      rate: "6.5%",
      maxAmount: "₹5,00,000",
      description: "Loans for dairy farming and milk processing units",
      category: "Dairy Loan",
      eligibility: ["Dairy farming experience", "Valid veterinary certificate", "Land for cattle shed"],
      benefits: ["Government subsidy available", "Technical support", "Market linkage assistance"]
    },
    {
      name: "Fisheries Development Loan",
      rate: "7.5%",
      maxAmount: "₹2,00,000",
      description: "Credit for fish farming and aquaculture development",
      category: "Fisheries Loan",
      eligibility: ["Water body ownership/lease", "Technical training certificate", "Environmental clearance"],
      benefits: ["Subsidy on fish feed", "Insurance coverage", "Technical guidance"]
    },
    {
      name: "Poultry Venture Capital",
      rate: "9.0%",
      maxAmount: "₹10,00,000",
      description: "Investment support for poultry farming and processing",
      category: "Poultry Loan",
      eligibility: ["Poultry farming training", "Suitable land availability", "Market study report"],
      benefits: ["Flexible repayment schedule", "Disease insurance", "Buy-back guarantee"]
    }
  ]

  const calculateLoan = async () => {
    if (!loanAmount || !interestRate || !loanTerm) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const months = parseInt(loanTerm) * 12

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    // Filter eligible schemes based on loan type and amount
    const eligibleSchemes = governmentSchemes.filter(scheme => {
      const maxAmountNum = parseInt(scheme.maxAmount.replace(/[₹,]/g, ''))
      return principal <= maxAmountNum
    })

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principalPercentage: (principal / totalPayment) * 100,
      interestPercentage: (totalInterest / totalPayment) * 100,
      eligibleSchemes
    })

    setLoading(false)
    setActiveTab("results")
  }

  const isFormValid = () => {
    return loanAmount && interestRate && loanTerm && parseFloat(loanAmount) > 0 && parseFloat(interestRate) > 0 && parseInt(loanTerm) > 0
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
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Smart Loan Calculator
                </h1>
                <p className="text-sm text-gray-600">Calculate EMI & explore government schemes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm h-11">
            <TabsTrigger value="calculate" className="data-[state=active]:bg-white text-sm">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate EMI
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!results} className="data-[state=active]:bg-white text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="schemes" className="data-[state=active]:bg-white text-sm">
              <Award className="w-4 h-4 mr-2" />
              Schemes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculate" className="space-y-6 mt-6">
            {/* Loan Calculator Form */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  Loan Calculator
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanType" className="text-sm font-medium text-gray-700">Loan Type *</Label>
                      <Select value={loanType} onValueChange={setLoanType}>
                        <SelectTrigger className="h-10 bg-white border-gray-200">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cropType" className="text-sm font-medium text-gray-700">Crop Type (if applicable)</Label>
                      <Select value={cropType} onValueChange={setCropType} disabled={loanType !== "crop"}>
                        <SelectTrigger className="h-10 bg-white border-gray-200">
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cropTypes.map((crop) => (
                            <SelectItem key={crop.value} value={crop.value}>
                              {crop.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-sm font-medium text-gray-700">Loan Amount (₹) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="h-10 bg-white border-gray-200"
                      />
                      {loanAmount && (
                        <p className="text-xs text-gray-500">
                          Amount in words: ₹{parseFloat(loanAmount).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate" className="text-sm font-medium text-gray-700">Interest Rate (% per annum) *</Label>
                      <Input
                        id="rate"
                        type="number"
                        step="0.1"
                        placeholder="Enter interest rate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="h-10 bg-white border-gray-200"
                      />
                      <div className="flex items-center text-xs text-blue-600">
                        <Info className="w-3 h-3 mr-1" />
                        Current market rate: 7-12% for agricultural loans
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="term" className="text-sm font-medium text-gray-700">Loan Term (years) *</Label>
                      <Input
                        id="term"
                        type="number"
                        placeholder="Enter loan term"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="h-10 bg-white border-gray-200"
                      />
                    </div>

                    <Button
                      onClick={calculateLoan}
                      disabled={loading || !isFormValid()}
                      className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate EMI
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Loan Tips */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <Target className="w-5 h-5 mr-2 text-orange-600" />
                  Loan Tips for Farmers
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-sm mb-1">Documentation</h4>
                    <p className="text-xs text-gray-600">Keep land records, Aadhar, and income proof ready</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                    <h4 className="font-semibold text-sm mb-1">Credit Score</h4>
                    <p className="text-xs text-gray-600">Maintain good credit history for better rates</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mb-2" />
                    <h4 className="font-semibold text-sm mb-1">Insurance</h4>
                    <p className="text-xs text-gray-600">Consider crop insurance for loan security</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            {results && (
              <>
                {/* EMI Results */}
                <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center text-xl font-bold">
                        <IndianRupee className="w-6 h-6 mr-2" />
                        Loan Calculation Results
                      </h3>
                      <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-white/30">
                        {loanTerm} Year Term
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                        <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                        <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                        <p className="text-3xl font-bold text-blue-600">₹{results.monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                        <Banknote className="w-8 h-8 mx-auto mb-3 text-green-600" />
                        <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                        <p className="text-3xl font-bold text-green-600">₹{results.totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                        <Percent className="w-8 h-8 mx-auto mb-3 text-orange-600" />
                        <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                        <p className="text-3xl font-bold text-orange-600">₹{results.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-4 text-gray-800">Payment Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Principal Amount</span>
                          <span className="font-medium">₹{parseFloat(loanAmount).toLocaleString('en-IN')}</span>
                        </div>
                        <Progress value={results.principalPercentage} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Interest Amount</span>
                          <span className="font-medium text-orange-600">₹{results.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <Progress value={results.interestPercentage} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Eligible Schemes */}
                <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <Award className="w-5 h-5 mr-2 text-purple-600" />
                      Eligible Government Schemes ({results.eligibleSchemes.length} found)
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.eligibleSchemes.map((scheme, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-sm">{scheme.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {scheme.category}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3">{scheme.description}</p>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Interest Rate:</span>
                              <Badge className="bg-green-100 text-green-700 border-green-300">
                                {scheme.rate}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Max Amount:</span>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                                {scheme.maxAmount}
                              </Badge>
                            </div>
                          </div>
                          
                          <Button size="sm" className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            Apply Now
                          </Button>
                        </div>
                      ))}
                    </div>

                    {results.eligibleSchemes.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No Eligible Schemes Found</h3>
                        <p className="text-sm">Try reducing the loan amount or check other loan categories.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {governmentSchemes.map((scheme, index) => (
                <Card key={index} className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{scheme.name}</h3>
                      <Badge className="bg-indigo-100 text-indigo-700 text-xs">
                        {scheme.rate}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600">{scheme.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Max Amount:</span>
                          <span className="font-semibold text-green-600">{scheme.maxAmount}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Category:</span>
                          <Badge variant="outline" className="text-xs">
                            {scheme.category}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-xs mb-2 text-gray-800">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {scheme.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white">
                        <FileText className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
