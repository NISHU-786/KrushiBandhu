"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { FarmerDashboard } from "./farmer-dashboard"
import { GovtOfficialDashboard } from "./govt-official-dashboard"
import { MiddlemanDashboard } from "./middleman-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { VisitorLanding } from "./visitor-landing"
import { CropPrediction } from "@/components/features/crop-prediction"
import { CropRecommendations } from "@/components/features/crop-recommendations"
import { DiseaseIdentification } from "@/components/features/disease-identification"
import { MandiPrices } from "@/components/features/mandi-prices"
import { LoanCalculator } from "@/components/features/loan-calculator"
import { LoanNullifyCalculator } from "@/components/features/loan-nullify-calculator"
import { ProfileManagement } from "@/components/features/profile-management"

export function LandingPage() {
  const { user } = useAuth()
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  // If a feature is active, render it full-screen without header
  if (activeFeature) {
    switch (activeFeature) {
      case "crop-prediction":
        return <CropPrediction onBack={() => setActiveFeature(null)} />
      case "crop-recommendations":
        return <CropRecommendations onBack={() => setActiveFeature(null)} />
      case "disease-scan":
        return <DiseaseIdentification onBack={() => setActiveFeature(null)} />
      case "mandi-prices":
        return <MandiPrices onBack={() => setActiveFeature(null)} />
      case "loan-calculator":
        return <LoanCalculator onBack={() => setActiveFeature(null)} />
      case "loan-nullify":
        return <LoanNullifyCalculator onBack={() => setActiveFeature(null)} />
      case "profile":
        return <ProfileManagement onBack={() => setActiveFeature(null)} />
      default:
        break
    }
  }

  // NO HEADER HERE - content only
  if (!user || user.role === "visitor") {
    return <VisitorLanding />
  }

  switch (user.role) {
    case "farmer":
      return <FarmerDashboard onFeatureSelect={setActiveFeature} />
    case "govt_official":
      return <GovtOfficialDashboard onFeatureSelect={setActiveFeature} />
    case "middleman":
      return <MiddlemanDashboard onFeatureSelect={setActiveFeature} />
    case "admin":
      return <AdminDashboard onFeatureSelect={setActiveFeature} />
    default:
      return <VisitorLanding />
  }
}
