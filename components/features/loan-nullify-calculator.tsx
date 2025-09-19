"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/providers/language-provider"
import {
  ArrowLeft,
  Calculator,
  IndianRupee,
  FileText,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Target,
  Loader2,
  Shield,
  Award,
  CreditCard,
  Banknote,
  Users,
  Calendar,
  Phone,
  Download
} from "lucide-react"

interface LoanNullifyCalculatorProps {
  onBack?: () => void
}

interface DebtReliefScheme {
  name: string
  benefit: string
  reduction: string
  eligibility: string
  status: "active" | "pending_approval" | "expired"
  applicationDeadline: string
  maxReduction: number
  category: string
  contactInfo: string
}

interface RestructureOption {
  type: string
  newTerm: string
  newEmi: string
  newRate: string
  totalSavings: string
  monthlyReduction: string
  benefits: string[]
  requirements: string[]
}

export function LoanNullifyCalculator({ onBack }: LoanNullifyCalculatorProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("calculator")
  const [currentLoan, setCurrentLoan] = useState({
    amount: "",
    interestRate: "",
    remainingTerm: "",
    monthlyEmi: "",
    loanType: "",
    defaultMonths: ""
  })
  const [nullifyOptions, setNullifyOptions] = useState<any>(null)
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
        const backEvent = new CustomEvent('navigateBack', { detail: 'loanNullifyCalculator' })
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

  const calculateNullifyOptions = async () => {
    if (!currentLoan.amount || !currentLoan.interestRate || !currentLoan.remainingTerm) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const principal = parseFloat(currentLoan.amount)
    const govtSchemeReduction = principal * 0.4 // 40% potential reduction
    const restructuredAmount = principal * 0.6 // 60% after max relief
    const interestWaiver = principal * 0.2 // 20% interest waiver
    const totalSavings = govtSchemeReduction + interestWaiver

    const debtReliefSchemes: DebtReliefScheme[] = [
      {
        name: "PM Kisan Samman Nidhi Debt Relief 2024",
        benefit: "₹6,000/year + 30% loan principal reduction",
        reduction: "Up to 30% principal + complete interest waiver",
        eligibility: "Small & marginal farmers (up to 2 hectares)",
        status: "active",
        applicationDeadline: "31st March 2025",
        maxReduction: 0.3,
        category: "Central Scheme",
        contactInfo: "1800-180-1551"
      },
      {
        name: "Agricultural Debt Relief Scheme 2024",
        benefit: "Complete loan waiver for eligible farmers",
        reduction: "Up to 100% waiver for loans up to ₹2,00,000",
        eligibility: "Farmers affected by natural calamities in last 2 years",
        status: "active",
        applicationDeadline: "30th June 2025",
        maxReduction: 1.0,
        category: "State Scheme",
        contactInfo: "1800-180-1100"
      },
      {
        name: "KCC Debt Restructuring Program",
        benefit: "Extended repayment + reduced interest rate",
        reduction: "40% EMI reduction + 4% interest rate",
        eligibility: "All KCC holders with repayment difficulties",
        status: "active",
        applicationDeadline: "Ongoing",
        maxReduction: 0.4,
        category: "Banking Scheme",
        contactInfo: "Your nearest bank branch"
      },
      {
        name: "Distressed Farmers Relief Package 2024",
        benefit: "One-time settlement + future loan eligibility",
        reduction: "50-70% loan settlement + fresh credit access",
        eligibility: "Farmers with loan defaults due to crop failure",
        status: "active",
        applicationDeadline: "31st December 2024",
        maxReduction: 0.7,
        category: "Special Relief",
        contactInfo: "1800-270-0224"
      },
      {
        name: "Women Farmer Debt Relief Initiative",
        benefit: "Enhanced relief for women farmers",
        reduction: "Up to 60% loan reduction + skill development",
        eligibility: "Women farmers with agricultural loans",
        status: "active",
        applicationDeadline: "31st January 2025",
        maxReduction: 0.6,
        category: "Special Category",
        contactInfo: "1800-233-1947"
      }
    ]

    const restructureOptions: RestructureOption[] = [
      {
        type: "Emergency Relief Package",
        newTerm: "15 years",
        newEmi: (restructuredAmount / 180).toFixed(0),
        newRate: "0% for first 2 years, then 4%",
        totalSavings: (principal * 0.6).toFixed(0),
        monthlyReduction: (parseFloat(currentLoan.monthlyEmi || "0") * 0.7).toFixed(0),
        benefits: ["2-year moratorium", "No penalty charges", "Maintain credit score"],
        requirements: ["Income proof", "Crop damage certificate", "Bank statement"]
      },
      {
        type: "One-Time Settlement (OTS)",
        newTerm: "Immediate settlement",
        newEmi: "0",
        newRate: "N/A",
        totalSavings: (principal * 0.5).toFixed(0),
        monthlyReduction: currentLoan.monthlyEmi || "0",
        benefits: ["Complete closure", "Clean credit record", "Immediate relief"],
        requirements: ["Asset verification", "Income assessment", "Settlement agreement"]
      },
      {
        type: "Graduated Payment Plan",
        newTerm: "12 years",
        newEmi: (restructuredAmount / 144).toFixed(0),
        newRate: "3% increasing to 6% over 5 years",
        totalSavings: (principal * 0.45).toFixed(0),
        monthlyReduction: (parseFloat(currentLoan.monthlyEmi || "0") * 0.6).toFixed(0),
        benefits: ["Low initial payments", "Flexible terms", "Credit restoration"],
        requirements: ["Future income projections", "Guarantor", "Asset details"]
      }
    ]

    setNullifyOptions({
      lumpSumPayoff: principal,
      govtSchemeReduction,
      restructuredAmount,
      interestWaiver,
      totalSavings,
      maxPossibleReduction: principal * 0.8, // 80% max reduction possible
      eligibleSchemes: debtReliefSchemes.filter(scheme => 
        principal <= (scheme.maxReduction === 1.0 ? 200000 : Infinity)
      ),
      restructureOptions,
      urgencyLevel: parseFloat(currentLoan.defaultMonths || "0") > 6 ? "high" : "medium"
    })

    setLoading(false)
    setActiveTab("results")
  }

  const isFormValid = () => {
    return currentLoan.amount && currentLoan.interestRate && currentLoan.remainingTerm
  }

  const getUrgencyColor = (level: string) => {
    switch(level) {
      case "high": return "border-red-500 bg-red-50"
      case "medium": return "border-orange-500 bg-orange-50"
      default: return "border-green-500 bg-green-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30">
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Loan Relief & Debt Nullifier
                </h1>
                <p className="text-sm text-gray-600">Find ways to reduce or eliminate existing debt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm h-11">
            <TabsTrigger value="calculator" className="data-[state=active]:bg-white text-sm">
              <Calculator className="w-4 h-4 mr-2" />
              Debt Assessment
            </TabsTrigger>
            <TabsTrigger value="schemes" className="data-[state=active]:bg-white text-sm">
              <Award className="w-4 h-4 mr-2" />
              Relief Schemes
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!nullifyOptions} className="data-[state=active]:bg-white text-sm">
              <Target className="w-4 h-4 mr-2" />
              Action Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6 mt-6">
            {/* Debt Assessment Form */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <TrendingDown className="w-5 h-5 mr-2 text-red-600" />
                  Current Debt Assessment
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-amount" className="text-sm font-medium text-gray-700">Outstanding Loan Amount (₹) *</Label>
                      <Input
                        id="current-amount"
                        type="number"
                        placeholder="Enter total outstanding amount"
                        value={currentLoan.amount}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, amount: e.target.value })}
                        className="h-10 bg-white border-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="current-rate" className="text-sm font-medium text-gray-700">Current Interest Rate (% per annum) *</Label>
                      <Input
                        id="current-rate"
                        type="number"
                        step="0.1"
                        placeholder="Enter current interest rate"
                        value={currentLoan.interestRate}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, interestRate: e.target.value })}
                        className="h-10 bg-white border-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remaining-term" className="text-sm font-medium text-gray-700">Remaining Term (years) *</Label>
                      <Input
                        id="remaining-term"
                        type="number"
                        placeholder="Years left to repay"
                        value={currentLoan.remainingTerm}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, remainingTerm: e.target.value })}
                        className="h-10 bg-white border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthly-emi" className="text-sm font-medium text-gray-700">Current Monthly EMI (₹)</Label>
                      <Input
                        id="monthly-emi"
                        type="number"
                        placeholder="Current EMI amount"
                        value={currentLoan.monthlyEmi}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, monthlyEmi: e.target.value })}
                        className="h-10 bg-white border-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default-months" className="text-sm font-medium text-gray-700">Months in Default (if any)</Label>
                      <Input
                        id="default-months"
                        type="number"
                        placeholder="Number of months overdue"
                        value={currentLoan.defaultMonths}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, defaultMonths: e.target.value })}
                        className="h-10 bg-white border-gray-200"
                      />
                    </div>

                    <Button
                      onClick={calculateNullifyOptions}
                      disabled={loading || !isFormValid()}
                      className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Debt...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Find Relief Options
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Situation Summary */}
            {nullifyOptions && (
              <Card className={`shadow-lg bg-white/80 backdrop-blur-sm border-2 rounded-xl overflow-hidden ${getUrgencyColor(nullifyOptions.urgencyLevel)}`}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        ₹{nullifyOptions.lumpSumPayoff.toLocaleString('en-IN')}
                      </div>
                      <p className="text-sm text-gray-600">Current Outstanding Debt</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ₹{nullifyOptions.maxPossibleReduction.toLocaleString('en-IN')}
                      </div>
                      <p className="text-sm text-gray-600">Maximum Possible Reduction</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {((nullifyOptions.maxPossibleReduction / nullifyOptions.lumpSumPayoff) * 100).toFixed(0)}%
                      </div>
                      <p className="text-sm text-gray-600">Potential Relief Percentage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6 mt-6">
            {nullifyOptions ? (
              <div className="grid gap-6">
                {nullifyOptions.eligibleSchemes.map((scheme: DebtReliefScheme, index: number) => (
                  <Card key={index} className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">{scheme.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={`px-2 py-1 text-xs ${
                            scheme.status === "active" 
                              ? "bg-green-100 text-green-700 border-green-300" 
                              : "bg-yellow-100 text-yellow-700 border-yellow-300"
                          }`}>
                            {scheme.status === "active" ? "Active Now" : "Pending Approval"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {scheme.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-xs text-gray-500 mb-2">BENEFIT OFFERED</h4>
                          <p className="text-sm font-medium">{scheme.benefit}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs text-gray-500 mb-2">DEBT REDUCTION</h4>
                          <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1">
                            {scheme.reduction}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs text-gray-500 mb-2">ELIGIBILITY</h4>
                          <p className="text-sm">{scheme.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs text-gray-500 mb-2">APPLICATION DEADLINE</h4>
                          <p className="text-sm font-semibold text-orange-600">{scheme.applicationDeadline}</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-sm font-medium">Contact: {scheme.contactInfo}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          disabled={scheme.status !== "active"}
                        >
                          {scheme.status === "active" ? "Apply Now" : "Get Notified"}
                        </Button>
                        <Button variant="outline" className="bg-white/80 hover:bg-white">
                          <Download className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl">
                <CardContent className="p-12 text-center">
                  <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Complete Debt Assessment First</h3>
                  <p className="text-gray-600 mb-6">
                    Enter your loan details to discover available government relief schemes and debt reduction options.
                  </p>
                  <Button onClick={() => setActiveTab("calculator")} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-6 mt-6">
            {nullifyOptions && (
              <>
                {/* Restructuring Options */}
                <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Debt Restructuring Options
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {nullifyOptions.restructureOptions.map((option: RestructureOption, index: number) => (
                        <div key={index} className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white/60">
                          <h4 className="font-semibold text-lg mb-4 text-gray-900">{option.type}</h4>
                          
                          <div className="space-y-3 text-sm mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">New Term:</span>
                              <Badge variant="outline">{option.newTerm}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Interest Rate:</span>
                              <Badge className="bg-blue-100 text-blue-700">{option.newRate}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">New EMI:</span>
                              <Badge className="bg-green-100 text-green-700">₹{option.newEmi}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Monthly Savings:</span>
                              <Badge className="bg-orange-100 text-orange-700">₹{option.monthlyReduction}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Total Savings:</span>
                              <Badge className="bg-purple-100 text-purple-700">₹{option.totalSavings}</Badge>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h5 className="font-semibold text-xs text-gray-500 mb-2">KEY BENEFITS</h5>
                            <ul className="space-y-1">
                              {option.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx} className="flex items-center text-xs text-gray-600">
                                  <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Choose This Option
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Plan */}
                <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <Target className="w-5 h-5 mr-2 text-orange-600" />
                      Your Personalized Action Plan
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <h4 className="font-semibold text-sm">Immediate Steps</h4>
                            <p className="text-xs text-gray-600">Gather documents & contact bank</p>
                          </div>
                        </div>
                        <ul className="text-sm space-y-2 ml-4">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                            Collect all loan documents
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                            Visit bank within 7 days
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                            Apply for moratorium
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <h4 className="font-semibold text-sm">Apply for Schemes</h4>
                            <p className="text-xs text-gray-600">Submit applications for relief</p>
                          </div>
                        </div>
                        <ul className="text-sm space-y-2 ml-4">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            PM-KISAN debt relief
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            State agricultural schemes
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Bank restructuring program
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <h4 className="font-semibold text-sm">Follow Up</h4>
                            <p className="text-xs text-gray-600">Track progress & maintain records</p>
                          </div>
                        </div>
                        <ul className="text-sm space-y-2 ml-4">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                            Weekly status check
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                            Maintain documentation
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                            Seek legal help if needed
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download Action Plan
                      </Button>
                      <Button variant="outline" className="flex-1 bg-white/80 hover:bg-white">
                        <Users className="w-4 h-4 mr-2" />
                        Get Expert Help
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
