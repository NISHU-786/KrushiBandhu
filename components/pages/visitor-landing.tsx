"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoginModal } from "@/components/auth/login-modal"
import { useLanguage } from "@/components/providers/language-provider"
import { 
  Sprout, 
  Brain, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  Target,
  Award,
  Users,
  Mail,
  Phone,
  MapPin,
  Star,
  Quote,
  Clock,
  Zap,
  Heart,
  MessageSquare,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Leaf,
  Crown
} from "lucide-react"
import Image from "next/image"

interface VisitorLandingProps {
  scrollToSection?: (sectionId: string) => void
}

export function VisitorLanding({ scrollToSection }: VisitorLandingProps) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const { t } = useLanguage()

  // Refs for sections
  const aboutRef = useRef<HTMLElement>(null)
  const successRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Handle scroll to sections
  const handleScrollToSection = (sectionId: string) => {
    let element: HTMLElement | null = null
    
    switch (sectionId) {
      case 'about':
        element = aboutRef.current
        break
      case 'success':
        element = successRef.current
        break
      case 'contact':
        element = contactRef.current
        break
    }
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Set up the scroll handler
  if (scrollToSection) {
    scrollToSection = handleScrollToSection
  }

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: t("aiPredictions"),
      description: t("aiPredictionsDesc"),
    },
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: t("diseaseTitle"),
      description: t("diseaseTitleDesc"),
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: t("realtimePrices"),
      description: t("realtimePricesDesc"),
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: t("govtSchemes"),
      description: t("govtSchemesDesc"),
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      title: t("mobileFirst"),
      description: t("mobileFirstDesc"),
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: t("multilingualTitle"),
      description: t("multilingualDesc"),
    },
  ]

  const userTypes = [
    {
      emoji: "🌾",
      title: t("farmers"),
      description: t("farmersDesc"),
      features: [t("cropPrediction"), t("diseaseDetection"), t("mandiPrices"), t("loanCalculator")],
      gradient: "from-green-50 to-emerald-50",
      accentColor: "text-green-700",
    },
    {
      emoji: "🏛️",
      title: t("govtOfficials"),
      description: t("govtOfficialsDesc"),
      features: [t("regionalAnalytics"), t("diseaseOutbreaks"), t("priceValidation"), t("policyInsights")],
      gradient: "from-blue-50 to-indigo-50",
      accentColor: "text-blue-700",
    },
    {
      emoji: "🤝",
      title: t("middlemen"),
      description: t("middlemenDesc"),
      features: [t("liveMandiPrices"), t("marketTrends"), t("tradingInsights"), t("priceAlerts")],
      gradient: "from-orange-50 to-amber-50",
      accentColor: "text-orange-700",
    },
  ]

  const successStories = [
    {
      name: "Rajesh Kumar",
      location: "Cuttack, Odisha",
      story: "Increased crop yield by 40% using AI predictions and smart farming techniques. The disease detection feature helped me save my rice crop from blast disease.",
      image: "/3.jpg",
      rating: 5,
      crop: "Rice",
      improvement: "+40% yield",
    },
    {
      name: "Priya Sharma", 
      location: "Bhubaneswar, Odisha",
      story: "Government schemes helped me start my organic farming business successfully. I got ₹2 lakh loan at just 4% interest rate through the platform.",
      image: "/2.jpg",
      rating: 5,
      crop: "Organic Vegetables",
      improvement: "₹2L loan approved",
    },
    {
      name: "Suresh Patel",
      location: "Puri, Odisha", 
      story: "Real-time market prices helped me get better rates for my produce. I now sell directly to mandis and earn 25% more than before.",
      image: "/1.jpg",
      rating: 5,
      crop: "Groundnut",
      improvement: "+25% income",
    },
  ]

  const stats = [
    { number: "25,000+", label: t("activeFarmers"), icon: <Users className="w-8 h-8 text-blue-600" /> },
    { number: "30+", label: t("districtsCovered"), icon: <MapPin className="w-8 h-8 text-green-600" /> },
    { number: "50+", label: t("cropTypes"), icon: <Leaf className="w-8 h-8 text-emerald-600" /> },
    { number: "95%", label: t("accuracyRate"), icon: <Target className="w-8 h-8 text-purple-600" /> },
  ]

  const teamMembers = [
    {
      name: "PRAGATI YADURE",
      role: "Frontend Developer",
      image: "/PRG.png",
      expertise: "React & Next.js",
    },
    {
      name: "BHOOMICA HULGUR",
      role: "Frontend Developer",
      image: "/B.png",
      expertise: "React & TailwindCSS",
    },
    {
      name: "PRANAV RAO K",
      role: "AI/ML Engineer, UI/UX Designer",
      image: "/PR.png",
      expertise: "Machine Learning & Design",
    },
    {
      name: "NISHCHITH R",
      role: "Backend Developer",
      image: "/N.jpg",
      expertise: "Node.js & Databases",
    },
    {
      name: "ANISHA RAVICHANDRAN",
      role: "Frontend Developer & Designer",
      image: "/An.jpg",
      expertise: "React & Figma",
    },
    {
      name: "RAKSHITHA KUDUR",
      role: "BACKEND DEVELOPER",
      image: "/R.png",
      expertise: "Chatbot & APIs",
    },
  ]

  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-green-600/5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <Badge 
              variant="secondary" 
              className="mb-8 text-sm px-6 py-3 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              🚀 {t("nowAvailableOdisha")}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {t("welcome")}
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-green-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                {t("farmingCompanion")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t("tagline")} - {t("description")}
            </p>
            
            {/* Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => setShowLoginModal(true)} 
                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                {t("getStartedFree")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleScrollToSection('about')}
                className="text-lg px-10 py-6 bg-white/80 backdrop-blur-sm border-2 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                {t("learnMore")}
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("featuresTitle")}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t("featuresSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="group shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="pb-4 pt-8">
                    <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-center text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* User Types Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("userTypesTitle")}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                {t("userTypesSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {userTypes.map((type, index) => (
                <Card 
                  key={index} 
                  className="group text-center shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2 rounded-2xl overflow-hidden"
                >
                  <CardHeader className={`pb-4 pt-8 bg-gradient-to-br ${type.gradient} relative`}>
                    <div className="absolute inset-0 bg-white/60"></div>
                    <div className="relative z-10">
                      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {type.emoji}
                      </div>
                      <CardTitle className={`text-2xl font-bold mb-3 ${type.accentColor}`}>
                        {type.title}
                      </CardTitle>
                      <p className="text-gray-700 leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-8 pt-6">
                    <ul className="space-y-3">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section ref={aboutRef} id="about" className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("aboutKrushiBandhu")}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t("aboutSubtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("ourVision")}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("ourVisionDesc")}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("whatWeBuilding")}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("whatWeBuildingDesc")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border-0">
                    <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">{t("innovation")}</h4>
                    <p className="text-sm text-gray-600">{t("innovationDesc")}</p>
                  </Card>
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border-0">
                    <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">{t("research")}</h4>
                    <p className="text-sm text-gray-600">{t("researchDesc")}</p>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{t("keyFeaturesDevelopment")}</h3>
                
                <div className="space-y-4">
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-0">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-2xl flex-shrink-0">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t("aiAnalytics")}</h4>
                        <p className="text-sm text-gray-600">{t("aiAnalyticsDesc")}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-0">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 rounded-2xl flex-shrink-0">
                        <Smartphone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t("mobileDesign")}</h4>
                        <p className="text-sm text-gray-600">{t("mobileDesignDesc")}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-0">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 rounded-2xl flex-shrink-0">
                        <Globe className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t("languageSupport")}</h4>
                        <p className="text-sm text-gray-600">{t("languageSupportDesc")}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Team Section - 6 members in single row */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t("meetTeam")}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("teamDesc")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 p-4 text-center border-0 hover:-translate-y-2">
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">{member.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{member.role}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.expertise}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section - 3 stories with hover scale effect */}
        <section ref={successRef} id="success" className="py-24 px-4 bg-gradient-to-br from-green-50 to-emerald-50/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("successStoriesTitle")}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                {t("successStoriesSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {successStories.map((story, index) => (
                <Card 
                  key={index} 
                  className="group shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white hover:-translate-y-2 hover:scale-105 rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex justify-center mb-3">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="flex justify-center gap-2 mb-4">
                        <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                          {story.crop}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                          {story.improvement}
                        </Badge>
                      </div>
                    </div>
                    
                    <Quote className="w-6 h-6 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 italic mb-6 leading-relaxed text-center text-sm">
                      "{story.story}"
                    </p>
                    
                    <div className="border-t pt-4 text-center">
                      <h4 className="font-semibold text-gray-900">{story.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center justify-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {story.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button 
                size="lg"
                onClick={() => setShowLoginModal(true)}
                className="text-lg px-10 py-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                {t("joinTestProgram")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Info Section - Compressed */}
        <section ref={contactRef} id="contact" className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("getInTouch")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("contactSubtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-0 text-center">
                <div className="p-4 bg-blue-100 rounded-2xl w-fit mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{t("email")}</h3>
                <p className="text-gray-700 font-semibold">support@krushib andhu.com</p>
                <Badge variant="outline" className="mt-3 text-xs bg-green-50 border-green-200 text-green-700">
                  <Clock className="w-3 h-3 mr-1" />
                  {t("responseTime")}
                </Badge>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-0 text-center">
                <div className="p-4 bg-green-100 rounded-2xl w-fit mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{t("phone")}</h3>
                <p className="text-gray-700 font-semibold">+91 98765 43210</p>
                <Badge variant="outline" className="mt-3 text-xs bg-blue-50 border-blue-200 text-blue-700">
                  {t("officeHours")}
                </Badge>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-0 text-center">
                <div className="p-4 bg-purple-100 rounded-2xl w-fit mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{t("location")}</h3>
                <p className="text-gray-700 text-sm">
                  {t("officeLocation")}
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowLoginModal(true)}
                className="text-lg px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                {t("joinBetaTesting")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-600 via-emerald-600 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            
            <Button 
              size="lg" 
              onClick={() => setShowLoginModal(true)} 
              className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full font-semibold"
            >
              {t("startTestingNow")} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <Heart className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">{t("freeToTest")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">{t("dataProtected")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">{t("support24x7")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Access Section - NEW */}
        <section className="py-8 px-4 bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Crown className="w-4 h-4" />
                <span className="text-sm">System Administration</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdminModal(true)}
                className="text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 text-xs px-6 py-2"
              >
                <Shield className="w-3 h-3 mr-2" />
                Administrator Access
              </Button>
              
              <p className="text-xs text-gray-500">
                Restricted access for system administrators only
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Login Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <LoginModal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)} 
        showAdminOnly={true} 
      />
    </>
  )
}

export default VisitorLanding
