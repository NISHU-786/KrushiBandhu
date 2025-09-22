"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  Sparkles, 
  Leaf, 
  CheckCircle2,
  X,
  ArrowRight,
  Users,
  Crown,
  Star,
  ShieldCheck
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export default function Pricing() {
  const { t } = useLanguage()
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "BEEJ (Seed)",
      subtitle: "Perfect for small farmers",
      price: "Free",
      originalPrice: null,
      yearlyPrice: "Free",
      color: "from-green-50 via-green-50 to-emerald-100",
      borderColor: "border-green-200",
      accent: "text-green-700",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      badge: null, // Removed badge
      badgeColor: "bg-green-100 text-green-800 border-green-300",
      features: [
        { name: "Basic yield prediction", included: true },
        { name: "Local mandi prices", included: true },
        { name: "1 crop suggestion", included: true },
        { name: "FAQ chatbot", included: true },
        { name: "Disease detection", included: false },
        { name: "Loan calculator", included: false },
      ],
      button: "Get Started",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white",
      popular: false, // No longer popular
    },
    {
      name: "PAUDHA (Plant)",
      subtitle: "For growing operations",
      price: isAnnual ? "₹199" : "₹249",
      originalPrice: isAnnual ? "₹249" : null,
      yearlyPrice: "₹199",
      color: "from-blue-50 via-blue-50 to-indigo-100",
      borderColor: "border-blue-200",
      accent: "text-blue-700",
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      badge: "Most Popular", // Made this most popular
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      features: [
        { name: "Everything in BEEJ", included: true },
        { name: "Multi-crop prediction", included: true },
        { name: "Disease detection (10 images)", included: true },
        { name: "State mandi prices", included: true },
        { name: "Basic loan checker", included: true },
        { name: "Voice chatbot", included: true },
      ],
      button: "Subscribe Now",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true, // Now this is popular
    },
    {
      name: "FASAL (Harvest)",
      subtitle: "For commercial farming",
      price: isAnnual ? "₹399" : "₹499",
      originalPrice: isAnnual ? "₹499" : null,
      yearlyPrice: "₹399",
      color: "from-purple-50 via-purple-50 to-violet-100",
      borderColor: "border-purple-200",
      accent: "text-purple-700",
      icon: <Crown className="w-6 h-6 text-purple-600" />,
      badge: "Best Value",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      features: [
        { name: "Everything in PAUDHA", included: true },
        { name: "Advanced yield + profit analysis", included: true },
        { name: "Unlimited disease detection", included: true },
        { name: "National mandi prices + trends", included: true },
        { name: "Smart loan calculator", included: true },
        { name: "24/7 chatbot + SMS alerts", included: true },
        { name: "Expert support", included: true },
        { name: "Priority customer service", included: true },
      ],
      button: "Subscribe Now",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      popular: false,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 px-4 py-8">
      {/* Header Section - Compressed */}
      <section className="container mx-auto max-w-5xl text-center mb-12">
        <Badge variant="secondary" className="mb-4 text-xs px-4 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          Simple Seasonal Plans
        </Badge>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          From seed to harvest, choose the perfect plan for your farming journey.
        </p>

        {/* Seasonal Toggle - Updated */}
        <div className="flex items-center justify-center space-x-3 mb-8 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 inline-flex">
          <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Single Season
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-green-600"
          />
          <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            4 Seasons Bundle
          </span>
          <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1 ml-2 border-green-200">
            Save 20%
          </Badge>
        </div>
      </section>

      {/* Pricing Cards - Compressed */}
      <section className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Card 
              key={plan.name} 
              className={`
                relative shadow-lg hover:shadow-xl transition-all duration-300 
                border-2 ${plan.borderColor}
                bg-gradient-to-br ${plan.color} 
                hover:-translate-y-2 group rounded-2xl overflow-hidden
                ${plan.popular ? 'scale-102 ring-2 ring-blue-200/50' : ''}
              `}
            >
              {/* Popular Badge - Compressed */}
              {plan.badge && (
                <div className="absolute -top-0 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${plan.badgeColor} px-3 py-0.5 text-xs font-semibold border rounded-b-lg shadow-sm`}>
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8 pb-4 text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                    {plan.icon}
                  </div>
                </div>
                
                <CardTitle className={`text-xl font-bold mb-1 ${plan.accent}`}>
                  {plan.name}
                </CardTitle>
                
                <p className="text-xs text-gray-600 mb-4">{plan.subtitle}</p>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {plan.price !== "Free" && (
                    <p className="text-xs text-gray-600">
                      per season (3 months) • {isAnnual ? "4 seasons bundle" : "one-time payment"}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pb-6 px-6">
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      {feature.included ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="sm" 
                  className={`w-full font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 
                    ${plan.buttonStyle} shadow-md hover:shadow-lg group-hover:scale-105 
                    flex items-center justify-center space-x-2`}
                >
                  <span className="text-sm">{plan.button}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Signals - Compressed */}
      <section className="container mx-auto max-w-3xl mt-12 text-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200/50">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex items-center space-x-2 text-green-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-semibold text-sm">30-day money back</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Users className="w-5 h-5" />
              <span className="font-semibold text-sm">10,000+ farmers</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            Join thousands of farmers already using KrushiBandhu to maximize their harvest and profits.
          </p>
        </div>
      </section>

      {/* FAQ Section - Compressed */}
      <section className="container mx-auto max-w-2xl mt-12">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {[
            {
              q: "What does one season include?",
              a: "One season covers 3 months of complete access to all features in your chosen plan."
            },
            {
              q: "Can I switch plans during a season?",
              a: "Yes, you can upgrade your plan anytime. The difference will be prorated for the remaining season."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, debit cards, UPI, and net banking."
            }
          ].map((faq, index) => (
            <Card key={index} className="border border-gray-200/50 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">{faq.q}</h4>
                <p className="text-gray-600 text-xs">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
