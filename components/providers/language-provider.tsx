"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi" | "od" | "kn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    about: "About Us",
    allUsers: "All Users",
    successStory: "Success Story",
    contact: "Contact Info",
    login: "Login",
    logout: "Logout",
    profile: "Profile",

    // Hero Section
    welcome: "Welcome to KrushiBandhu",
    tagline: "AI-Powered Agricultural Assistant for Indian Farmers",
    description: "Empowering farmers with intelligent crop predictions, disease identification, and real-time market insights",
    getStarted: "Get Started",
    getStartedFree: "Get Started Free",
    learnMore: "Learn More",
    nowAvailableOdisha: "Now Available in Odisha & Expanding Across India",
    farmingCompanion: "Your AI Farming Companion",

    // Stats
    activeFarmers: "Active Farmers",
    districtsCovered: "Districts Covered",
    cropTypes: "Crop Types",
    accuracyRate: "Accuracy Rate",

    // Features Section
    featuresTitle: "Powerful Features for Modern Farming",
    featuresSubtitle: "Everything you need to make informed agricultural decisions in one intelligent platform",
    aiPredictions: "AI-Powered Predictions",
    aiPredictionsDesc: "Get accurate crop yield predictions using advanced machine learning models trained on local data.",
    diseaseTitle: "Disease Diagnosis",
    diseaseTitleDesc: "Instantly identify crop diseases by uploading photos and receive treatment recommendations.",
    realtimePrices: "Real-time Mandi Prices",
    realtimePricesDesc: "Stay updated with live market prices from local and district mandis across India.",
    govtSchemes: "Government Schemes",
    govtSchemesDesc: "Check eligibility for loan waivers and government agricultural schemes.",
    mobileFirst: "Mobile-First Design",
    mobileFirstDesc: "Optimized for smartphones with offline capabilities and voice support.",
    multilingualTitle: "Multilingual Support",
    multilingualDesc: "Available in English, Hindi, Odia, and Kannada with audio playback for better accessibility.",

    // User Types Section
    userTypesTitle: "Built for Everyone in Agriculture",
    userTypesSubtitle: "Tailored experiences for different roles in the agricultural ecosystem",
    farmers: "Farmers",
    govtOfficials: "Government Officials",
    middlemen: "Middlemen",
    farmersDesc: "Access all AI tools for better farming decisions",
    govtOfficialsDesc: "Monitor regional agricultural data and trends",
    middlemenDesc: "Stay informed about market prices and trends",
    
    // Features for different user types
    cropPrediction: "Crop Prediction",
    diseaseDetection: "Disease Detection",
    mandiPrices: "Mandi Prices",
    loanCalculator: "Loan Calculator",
    regionalAnalytics: "Regional Analytics",
    diseaseOutbreaks: "Disease Outbreaks",
    priceValidation: "Price Validation",
    policyInsights: "Policy Insights",
    liveMandiPrices: "Live Mandi Prices",
    marketTrends: "Market Trends",
    tradingInsights: "Trading Insights",
    priceAlerts: "Price Alerts",

    // About Section
    aboutKrushiBandhu: "About KrushiBandhu",
    aboutSubtitle: "A prototype platform exploring the future of AI-powered agriculture in India",
    ourVision: "Our Vision",
    ourVisionDesc: "KrushiBandhu is an innovative prototype designed to explore how artificial intelligence can revolutionize farming practices in India. We're experimenting with cutting-edge technology to create solutions that could transform agricultural decision-making.",
    whatWeBuilding: "What We're Building",
    whatWeBuildingDesc: "Our prototype platform integrates AI-powered crop predictions, disease detection, real-time market data, and government scheme information into a single, user-friendly interface designed specifically for Indian farmers and agricultural stakeholders.",
    innovation: "Innovation",
    innovationDesc: "Exploring AI potential in agriculture",
    research: "Research",
    researchDesc: "Testing solutions for real farming challenges",
    keyFeaturesDevelopment: "Key Features in Development",
    aiAnalytics: "AI-Powered Analytics",
    aiAnalyticsDesc: "Machine learning models for crop yield prediction and optimization",
    mobileDesign: "Mobile-First Design",
    mobileDesignDesc: "Optimized for smartphones with offline capabilities",
    languageSupport: "Multilingual Support",
    languageSupportDesc: "Available in local languages with voice assistance",

    // Team Section
    meetTeam: "Meet Our Development Team",
    teamDesc: "A dedicated team of experts working on this innovative agricultural prototype",

    // Success Stories
    successStoriesTitle: "Farmer Success Stories",
    successStoriesSubtitle: "Real farmers testing our prototype with promising results",
    joinTestProgram: "Join Our Test Program",

    // Contact Section
    getInTouch: "Get in Touch",
    contactSubtitle: "Interested in testing our prototype? Reach out to our team",
    email: "Email",
    phone: "Phone",
    location: "Location",
    responseTime: "Response within 24 hours",
    officeHours: "Mon-Fri 9 AM - 6 PM",
    officeLocation: "Bhubaneswar, Odisha\nIndia",
    joinBetaTesting: "Join Beta Testing",

    // CTA Section
    ctaTitle: "Ready to Explore the Future of Farming?",
    ctaSubtitle: "Join our prototype testing program and help shape the future of AI-powered agriculture in India.",
    startTestingNow: "Start Testing Now",
    freeToTest: "Free to Test",
    dataProtected: "Data Protected",
    support24x7: "24/7 Support",

    // Common Actions
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
    calculate: "Calculate",
    reset: "Reset",

    // Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",

    // Languages
    english: "English",
    hindi: "Hindi",
    odia: "Odia",
    kannada: "Kannada",
    selectLanguage: "Select Language",
    chooseLanguage: "Choose your preferred language",
  },
  
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    About: "हमारे बारे में",
    Stories: "सफलता की कहानी",
    Contact: "संपर्क जानकारी",
    login: "लॉगिन",
    logout: "लॉगआउट",
    profile: "प्रोफाइल",

    // Hero Section
    welcome: "कृषिबंधु में आपका स्वागत है",
    tagline: "भारतीय किसानों के लिए AI-संचालित कृषि सहायक",
    description: "बुद्धिमान फसल पूर्वानुमान, रोग पहचान और वास्तविक समय बाजार अंतर्दृष्टि के साथ किसानों को सशक्त बनाना",
    getStarted: "शुरू करें",
    getStartedFree: "मुफ्त में शुरू करें",
    learnMore: "और जानें",
    nowAvailableOdisha: "अब ओडिशा में उपलब्ध और भारत भर में विस्तार",
    farmingCompanion: "आपका AI खेती साथी",

    // Stats
    activeFarmers: "सक्रिय किसान",
    districtsCovered: "कवर किए गए जिले",
    cropTypes: "फसल के प्रकार",
    accuracyRate: "सटीकता दर",

    // Features Section
    featuresTitle: "आधुनिक खेती के लिए शक्तिशाली सुविधाएं",
    featuresSubtitle: "एक बुद्धिमान प्लेटफॉर्म में सूचित कृषि निर्णय लेने के लिए आवश्यक सब कुछ",
    aiPredictions: "AI-संचालित पूर्वानुमान",
    aiPredictionsDesc: "स्थानीय डेटा पर प्रशिक्षित उन्नत मशीन लर्निंग मॉडल का उपयोग करके सटीक फसल उत्पादन पूर्वानुमान प्राप्त करें।",
    diseaseTitle: "रोग निदान",
    diseaseTitleDesc: "फोटो अपलोड करके तुरंत फसल रोगों की पहचान करें और उपचार की सिफारिशें प्राप्त करें।",
    realtimePrices: "रियल-टाइम मंडी भाव",
    realtimePricesDesc: "भारत भर के स्थानीय और जिला मंडियों से लाइव बाजार भावों के साथ अपडेट रहें।",
    govtSchemes: "सरकारी योजनाएं",
    govtSchemesDesc: "ऋण माफी और सरकारी कृषि योजनाओं के लिए पात्रता की जांच करें।",
    mobileFirst: "मोबाइल-फर्स्ट डिज़ाइन",
    mobileFirstDesc: "ऑफलाइन क्षमताओं और वॉयस सपोर्ट के साथ स्मार्टफोन के लिए अनुकूलित।",
    multilingualTitle: "बहुभाषी समर्थन",
    multilingualDesc: "बेहतर पहुंच के लिए ऑडियो प्लेबैक के साथ अंग्रेजी, हिंदी, ओडिया और कन्नड़ में उपलब्ध।",

    // User Types Section
    userTypesTitle: "कृषि में सभी के लिए निर्मित",
    userTypesSubtitle: "कृषि पारिस्थितिकी तंत्र में विभिन्न भूमिकाओं के लिए अनुकूलित अनुभव",
    farmers: "किसान",
    govtOfficials: "सरकारी अधिकारी",
    middlemen: "बिचौलिए",
    farmersDesc: "बेहतर खेती के निर्णयों के लिए सभी AI उपकरणों तक पहुंच",
    govtOfficialsDesc: "क्षेत्रीय कृषि डेटा और रुझानों की निगरानी करें",
    middlemenDesc: "बाजार की कीमतों और रुझानों के बारे में सूचित रहें",
    
    // Features for different user types
    cropPrediction: "फसल पूर्वानुमान",
    diseaseDetection: "रोग पहचान",
    mandiPrices: "मंडी भाव",
    loanCalculator: "ऋण कैलकुलेटर",
    regionalAnalytics: "क्षेत्रीय विश्लेषण",
    diseaseOutbreaks: "रोग प्रकोप",
    priceValidation: "मूल्य सत्यापन",
    policyInsights: "नीति अंतर्दृष्टि",
    liveMandiPrices: "लाइव मंडी भाव",
    marketTrends: "बाजार के रुझान",
    tradingInsights: "व्यापारिक अंतर्दृष्टि",
    priceAlerts: "मूल्य अलर्ट",

    // About Section
    aboutKrushiBandhu: "कृषिबंधु के बारे में",
    aboutSubtitle: "भारत में AI-संचालित कृषि के भविष्य की खोज करने वाला एक प्रोटोटाइप प्लेटफॉर्म",
    ourVision: "हमारा दृष्टिकोण",
    ourVisionDesc: "कृषिबंधु एक नवाचार प्रोटोटाइप है जो यह खोजने के लिए डिज़ाइन किया गया है कि कैसे आर्टिफिशियल इंटेलिजेंस भारत में खेती की प्रथाओं में क्रांति ला सकती है। हम कृषि निर्णय लेने को बदलने वाले समाधान बनाने के लिए अत्याधुनिक तकनीक के साथ प्रयोग कर रहे हैं।",
    whatWeBuilding: "हम क्या बना रहे हैं",
    whatWeBuildingDesc: "हमारा प्रोटोटाइप प्लेटफॉर्म AI-संचालित फसल पूर्वानुमान, रोग पहचान, रियल-टाइम मार्केट डेटा, और सरकारी योजना की जानकारी को एक एकल, उपयोगकर्ता-अनुकूल इंटरफेस में एकीकृत करता है जो विशेष रूप से भारतीय किसानों और कृषि हितधारकों के लिए डिज़ाइन किया गया है।",
    innovation: "नवाचार",
    innovationDesc: "कृषि में AI की क्षमता की खोज",
    research: "अनुसंधान",
    researchDesc: "वास्तविक खेती की चुनौतियों के लिए समाधान का परीक्षण",
    keyFeaturesDevelopment: "विकास में मुख्य सुविधाएं",
    aiAnalytics: "AI-संचालित एनालिटिक्स",
    aiAnalyticsDesc: "फसल उत्पादन पूर्वानुमान और अनुकूलन के लिए मशीन लर्निंग मॉडल",
    mobileDesign: "मोबाइल-फर्स्ट डिज़ाइन",
    mobileDesignDesc: "ऑफलाइन क्षमताओं के साथ स्मार्टफोन के लिए अनुकूलित",
    languageSupport: "बहुभाषी समर्थन",
    languageSupportDesc: "वॉयस असिस्टेंस के साथ स्थानीय भाषाओं में उपलब्ध",

    // Team Section
    meetTeam: "हमारी विकास टीम से मिलें",
    teamDesc: "इस नवाचार कृषि प्रोटोटाइप पर काम करने वाले विशेषज्ञों की एक समर्पित टीम",

    // Success Stories
    successStoriesTitle: "किसान सफलता की कहानियां",
    successStoriesSubtitle: "वास्तविक किसान हमारे प्रोटोटाइप का परीक्षण आशाजनक परिणामों के साथ कर रहे हैं",
    joinTestProgram: "हमारे परीक्षण कार्यक्रम में शामिल हों",

    // Contact Section
    getInTouch: "संपर्क में रहें",
    contactSubtitle: "हमारे प्रोटोटाइप का परीक्षण करने में रुचि है? हमारी टीम तक पहुंचें",
    email: "ईमेल",
    phone: "फोन",
    location: "स्थान",
    responseTime: "24 घंटे के भीतर प्रतिक्रिया",
    officeHours: "सोम-शुक्र सुबह 9 से शाम 6 बजे तक",
    officeLocation: "भुवनेश्वर, ओडिशा\nभारत",
    joinBetaTesting: "बीटा टेस्टिंग में शामिल हों",

    // CTA Section
    ctaTitle: "खेती के भविष्य की खोज करने के लिए तैयार हैं?",
    ctaSubtitle: "हमारे प्रोटोटाइप परीक्षण कार्यक्रम में शामिल हों और भारत में AI-संचालित कृषि के भविष्य को आकार देने में मदद करें।",
    startTestingNow: "अब परीक्षण शुरू करें",
    freeToTest: "परीक्षण के लिए निःशुल्क",
    dataProtected: "डेटा सुरक्षित",
    support24x7: "24/7 सहायता",

    // Common Actions
    loading: "लोड हो रहा है...",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    search: "खोजें",
    filter: "फिल्टर",
    export: "निर्यात",
    import: "आयात",
    calculate: "गणना करें",
    reset: "रीसेट",

    // Status
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    pending: "लंबित",
    completed: "पूर्ण",

    // Languages
    english: "अंग्रेजी",
    hindi: "हिंदी",
    odia: "ओडिया",
    kannada: "कन्नड़",
    selectLanguage: "भाषा चुनें",
    chooseLanguage: "अपनी पसंदीदा भाषा चुनें",
  },
  
  od: {
    // Navigation
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    About: "ଆମ ବିଷୟରେ",
    Stories: "ସଫଳତାର କାହାଣୀ",
    Contact: "ଯୋଗାଯୋଗ ସୂଚନା",
    login: "ଲଗଇନ",
    logout: "ଲଗଆଉଟ",
    profile: "ପ୍ରୋଫାଇଲ",

    // Hero Section
    welcome: "କୃଷିବନ୍ଧୁରେ ସ୍ୱାଗତ",
    tagline: "ଭାରତୀୟ କୃଷକଙ୍କ ପାଇଁ AI-ଚାଳିତ କୃଷି ସହାୟକ",
    description: "ବୁଦ୍ଧିମାନ ଫସଲ ପୂର୍ବାନୁମାନ, ରୋଗ ଚିହ୍ନଟ ଏବଂ ରିଅଲ-ଟାଇମ ବଜାର ସୂଚନା ସହିତ କୃଷକମାନଙ୍କୁ ସଶକ୍ତ କରିବା",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    getStartedFree: "ମାଗଣାରେ ଆରମ୍ଭ କରନ୍ତୁ",
    learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",
    nowAvailableOdisha: "ବର୍ତ୍ତମାନ ଓଡିଶାରେ ଉପଲବ୍ଧ ଏବଂ ଭାରତରେ ବିସ୍ତୃତ",
    farmingCompanion: "ଆପଣଙ୍କ AI କୃଷି ସାଥୀ",

    // Stats
    activeFarmers: "ସକ୍ରିୟ କୃଷକ",
    districtsCovered: "କଭର୍ଡ ଜିଲ୍ଲା",
    cropTypes: "ଫସଲର ପ୍ରକାର",
    accuracyRate: "ସଠିକତା ହାର",

    // Features Section
    featuresTitle: "ଆଧୁନିକ କୃଷି ପାଇଁ ଶକ୍ତିଶାଳୀ ବୈଶିଷ୍ଟ୍ୟ",
    featuresSubtitle: "ଏକ ବୁଦ୍ଧିମାନ ପ୍ଲାଟଫର୍ମରେ ସୂଚିତ କୃଷି ନିଷ୍ପତ୍ତି ନେବା ପାଇଁ ଆବଶ୍ୟକ ସବୁକିଛି",
    aiPredictions: "AI-ଚାଳିତ ପୂର୍ବାନୁମାନ",
    aiPredictionsDesc: "ସ୍ଥାନୀୟ ତଥ୍ୟରେ ତାଲିମପ୍ରାପ୍ତ ଉନ୍ନତ ମେସିନ ଲର୍ନିଂ ମଡେଲ ବ୍ୟବହାର କରି ସଠିକ ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ।",
    diseaseTitle: "ରୋଗ ନିର୍ଣୟ",
    diseaseTitleDesc: "ଫଟୋ ଅପଲୋଡ କରି ତୁରନ୍ତ ଫସଲ ରୋଗ ଚିହ୍ନଟ କରନ୍ତୁ ଏବଂ ଚିକିତ୍ସା ସୁପାରିଶ ପାଆନ୍ତୁ।",
    realtimePrices: "ରିଅଲ-ଟାଇମ ମଣ୍ଡି ଦର",
    realtimePricesDesc: "ଭାରତର ସ୍ଥାନୀୟ ଏବଂ ଜିଲ୍ଲା ମଣ୍ଡିରୁ ଲାଇଭ ବଜାର ଦର ସହିତ ଅପଡେଟ ରୁହନ୍ତୁ।",
    govtSchemes: "ସରକାରୀ ଯୋଜନା",
    govtSchemesDesc: "ଋଣ ମାଫି ଏବଂ ସରକାରୀ କୃଷି ଯୋଜନା ପାଇଁ ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ।",
    mobileFirst: "ମୋବାଇଲ-ଫର୍ଷ୍ଟ ଡିଜାଇନ",
    mobileFirstDesc: "ଅଫଲାଇନ କ୍ଷମତା ଏବଂ ଭଏସ ସପୋର୍ଟ ସହିତ ସ୍ମାର୍ଟଫୋନ ପାଇଁ ଅପ୍ଟିମାଇଜ।",
    multilingualTitle: "ବହୁଭାଷିକ ସମର୍ଥନ",
    multilingualDesc: "ଉନ୍ନତ ଅଭିଗମ୍ୟତା ପାଇଁ ଅଡିଓ ପ୍ଲେବ୍ୟାକ ସହିତ ଇଂରାଜୀ, ହିନ୍ଦୀ, ଓଡିଆ ଏବଂ କନ୍ନଡରେ ଉପଲବ୍ଧ।",

    // User Types Section
    userTypesTitle: "କୃଷିରେ ସମସ୍ତଙ୍କ ପାଇଁ ନିର୍ମିତ",
    userTypesSubtitle: "କୃଷି ପରିବେଶ ପ୍ରଣାଳୀରେ ବିଭିନ୍ନ ଭୂମିକା ପାଇଁ ଅନୁକୂଳିତ ଅଭିଜ୍ଞତା",
    farmers: "କୃଷକ",
    govtOfficials: "ସରକାରୀ ଅଧିକାରୀ",
    middlemen: "ମଧ୍ୟସ୍ଥ",
    farmersDesc: "ଉନ୍ନତ କୃଷି ନିଷ୍ପତ୍ତି ପାଇଁ ସମସ୍ତ AI ଉପକରଣକୁ ପ୍ରବେଶ",
    govtOfficialsDesc: "ଆଞ୍ଚଳିକ କୃଷି ତଥ୍ୟ ଏବଂ ଧାରାକୁ ନିରୀକ୍ଷଣ କରନ୍ତୁ",
    middlemenDesc: "ବଜାର ମୂଲ୍ୟ ଏବଂ ଧାରା ବିଷୟରେ ସୂଚିତ ରୁହନ୍ତୁ",
    
    // Features for different user types
    cropPrediction: "ଫସଲ ପୂର୍ବାନୁମାନ",
    diseaseDetection: "ରୋଗ ଚିହ୍ନଟ",
    mandiPrices: "ମଣ୍ଡି ଦର",
    loanCalculator: "ଋଣ ଗଣନାକାରୀ",
    regionalAnalytics: "ଆଞ୍ଚଳିକ ବିଶ୍ଳେଷଣ",
    diseaseOutbreaks: "ରୋଗ ପ୍ରକୋପ",
    priceValidation: "ମୂଲ୍ୟ ସତ୍ୟାପନ",
    policyInsights: "ନୀତି ଅନ୍ତର୍ଦୃଷ୍ଟି",
    liveMandiPrices: "ଲାଇଭ ମଣ୍ଡି ଦର",
    marketTrends: "ବଜାର ଧାରା",
    tradingInsights: "ବାଣିଜ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି",
    priceAlerts: "ମୂଲ୍ୟ ସତର୍କତା",

    // About Section
    aboutKrushiBandhu: "କୃଷିବନ୍ଧୁ ବିଷୟରେ",
    aboutSubtitle: "ଭାରତରେ AI-ଚାଳିତ କୃଷିର ଭବିଷ୍ୟତ ଅନୁସନ୍ଧାନ କରୁଥିବା ଏକ ପ୍ରୋଟୋଟାଇପ ପ୍ଲାଟଫର୍ମ",
    ourVision: "ଆମର ଦର୍ଶନ",
    ourVisionDesc: "କୃଷିବନ୍ଧୁ ହେଉଛି ଏକ ନବାଚାର ପ୍ରୋଟୋଟାଇପ ଯାହା କୃତ୍ରିମ ବୁଦ୍ଧିମତା କିପରି ଭାରତରେ କୃଷି ପ୍ରଥାରେ ବିପ୍ଳବ ଆଣିପାରିବ ତାହା ଅନୁସନ୍ଧାନ କରିବା ପାଇଁ ଡିଜାଇନ କରାଯାଇଛି। ଆମେ କୃଷି ନିଷ୍ପତ୍ତି ନେବାକୁ ପରିବର୍ତ୍ତନ କରିପାରେ ଏପରି ସମାଧାନ ସୃଷ୍ଟି ପାଇଁ ଅତ୍ୟାଧୁନିକ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ସହିତ ପରୀକ୍ଷା କରୁଛୁ।",
    whatWeBuilding: "ଆମେ କ'ଣ ନିର୍ମାଣ କରୁଛୁ",
    whatWeBuildingDesc: "ଆମର ପ୍ରୋଟୋଟାଇପ ପ୍ଲାଟଫର୍ମ AI-ଚାଳିତ ଫସଲ ପୂର୍ବାନୁମାନ, ରୋଗ ଚିହ୍ନଟ, ରିଅଲ-ଟାଇମ ମାର୍କେଟ ତଥ୍ୟ, ଏବଂ ସରକାରୀ ଯୋଜନା ସୂଚନାକୁ ଏକ ଏକକ, ଉପଯୋଗକର୍ତ୍ତା-ବାନ୍ଧବ ଇଣ୍ଟରଫେସରେ ଏକୀକୃତ କରେ ଯାହା ବିଶେଷ ଭାବରେ ଭାରତୀୟ କୃଷକ ଏବଂ କୃଷି ହିତାଧିକାରୀଙ୍କ ପାଇଁ ଡିଜାଇନ କରାଯାଇଛି।",
    innovation: "ନବାଚାର",
    innovationDesc: "କୃଷିରେ AI ର ସମ୍ଭାବନା ଅନୁସନ୍ଧାନ",
    research: "ଗବେଷଣା",
    researchDesc: "ପ୍ରକୃତ କୃଷି ଚ୍ୟାଲେଞ୍ଜ ପାଇଁ ସମାଧାନ ପରୀକ୍ଷା",
    keyFeaturesDevelopment: "ବିକାଶରେ ମୁଖ୍ୟ ବୈଶିଷ୍ଟ୍ୟ",
    aiAnalytics: "AI-ଚାଳିତ ବିଶ୍ଳେଷଣ",
    aiAnalyticsDesc: "ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ଏବଂ ଅପ୍ଟିମାଇଜେସନ ପାଇଁ ମେସିନ ଲର୍ନିଂ ମଡେଲ",
    mobileDesign: "ମୋବାଇଲ-ଫର୍ଷ୍ଟ ଡିଜାଇନ",
    mobileDesignDesc: "ଅଫଲାଇନ କ୍ଷମତା ସହିତ ସ୍ମାର୍ଟଫୋନ ପାଇଁ ଅପ୍ଟିମାଇଜ",
    languageSupport: "ବହୁଭାଷିକ ସମର୍ଥନ",
    languageSupportDesc: "ଭଏସ ସହାୟତା ସହିତ ସ୍ଥାନୀୟ ଭାଷାରେ ଉପଲବ୍ଧ",

    // Team Section
    meetTeam: "ଆମର ବିକାଶ ଦଳଙ୍କୁ ଭେଟନ୍ତୁ",
    teamDesc: "ଏହି ନବାଚାର କୃଷି ପ୍ରୋଟୋଟାଇପରେ କାମ କରୁଥିବା ବିଶେଷଜ୍ଞମାନଙ୍କର ଏକ ଉତ୍ସର୍ଗୀକୃତ ଦଳ",

    // Success Stories
    successStoriesTitle: "କୃଷକ ସଫଳତାର କାହାଣୀ",
    successStoriesSubtitle: "ବାସ୍ତବ କୃଷକମାନେ ଆଶାଜନକ ଫଳାଫଳ ସହିତ ଆମର ପ୍ରୋଟୋଟାଇପ ପରୀକ୍ଷା କରୁଛନ୍ତି",
    joinTestProgram: "ଆମର ପରୀକ୍ଷା କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗଦାନ କରନ୍ତୁ",

    // Contact Section
    getInTouch: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    contactSubtitle: "ଆମର ପ୍ରୋଟୋଟାଇପ ପରୀକ୍ଷା କରିବାକୁ ଆଗ୍ରହୀ? ଆମ ଦଳଙ୍କୁ ପହଞ୍ଚନ୍ତୁ",
    email: "ଇମେଲ",
    phone: "ଫୋନ",
    location: "ସ୍ଥାନ",
    responseTime: "24 ଘଣ୍ଟା ମଧ୍ୟରେ ଉତ୍ତର",
    officeHours: "ସୋମ-ଶୁକ୍ର ସକାଳ 9ଟାରୁ ସନ୍ଧ୍ୟା 6ଟା",
    officeLocation: "ଭୁବନେଶ୍ୱର, ଓଡିଶା\nଭାରତ",
    joinBetaTesting: "ବେଟା ପରୀକ୍ଷାରେ ଯୋଗଦାନ କରନ୍ତୁ",

    // CTA Section
    ctaTitle: "କୃଷିର ଭବିଷ୍ୟତ ଅନୁସନ୍ଧାନ ପାଇଁ ପ୍ରସ୍ତୁତ?",
    ctaSubtitle: "ଆମର ପ୍ରୋଟୋଟାଇପ ପରୀକ୍ଷା କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗଦାନ କରନ୍ତୁ ଏବଂ ଭାରତରେ AI-ଚାଳିତ କୃଷିର ଭବିଷ୍ୟତ ଗଠନ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ।",
    startTestingNow: "ବର୍ତ୍ତମାନ ପରୀକ୍ଷା ଆରମ୍ଭ କରନ୍ତୁ",
    freeToTest: "ପରୀକ୍ଷା ପାଇଁ ମାଗଣା",
    dataProtected: "ତଥ୍ୟ ସୁରକ୍ଷିତ",
    support24x7: "24/7 ସହାୟତା",

    // Common Actions
    loading: "ଲୋଡ ହେଉଛି...",
    submit: "ଦାଖଲ କରନ୍ତୁ",
    cancel: "ବାତିଲ କରନ୍ତୁ",
    save: "ସେଭ କରନ୍ତୁ",
    edit: "ସମ୍ପାଦନା",
    delete: "ଡିଲିଟ",
    search: "ଖୋଜନ୍ତୁ",
    filter: "ଫିଲ୍ଟର",
    export: "ଏକ୍ସପୋର୍ଟ",
    import: "ଇମ୍ପୋର୍ଟ",
    calculate: "ଗଣନା କରନ୍ତୁ",
    reset: "ରିସେଟ",

    // Status
    active: "ସକ୍ରିୟ",
    inactive: "ନିଷ୍କ୍ରିୟ",
    pending: "ବିଚାରାଧୀନ",
    completed: "ସମ୍ପୂର୍ଣ୍ଣ",

    // Languages
    english: "ଇଂରାଜୀ",
    hindi: "ହିନ୍ଦୀ",
    odia: "ଓଡିଆ",
    kannada: "କନ୍ନଡ",
    selectLanguage: "ଭାଷା ଚୟନ କରନ୍ତୁ",
    chooseLanguage: "ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ",
  },
  
  kn: {
    // Navigation
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    About: "ನಮ್ಮ ಬಗ್ಗೆ",
    Stories: "ಕಥೆಗಳು",
    Contact: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
    login: "ಲಾಗಿನ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    profile: "ಪ್ರೊಫೈಲ್",

    // Hero Section
    welcome: "ಕೃಷಿಬಂಧುಗೆ ಸ್ವಾಗತ",
    tagline: "ಭಾರತೀಯ ರೈತರಿಗಾಗಿ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಾಯಕ",
    description: "ಬುದ್ಧಿವಂತ ಬೆಳೆ ಮುನ್ನೋಟಗಳು, ರೋಗ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    getStartedFree: "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ",
    learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    nowAvailableOdisha: "ಈಗ ಒಡಿಶಾದಲ್ಲಿ ಲಭ್ಯವಿದೆ ಮತ್ತು ಭಾರತದಾದ್ಯಂತ ವಿಸ್ತರಿಸುತ್ತಿದೆ",
    farmingCompanion: "ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಚರ",

    // Stats
    activeFarmers: "ಸಕ್ರಿಯ ರೈತರು",
    districtsCovered: "ಆವರಿಸಿದ ಜಿಲ್ಲೆಗಳು",
    cropTypes: "ಬೆಳೆ ಪ್ರಕಾರಗಳು",
    accuracyRate: "ನಿಖರತೆಯ ಪ್ರಮಾಣ",

    // Features Section
    featuresTitle: "ಆಧುನಿಕ ಕೃಷಿಗಾಗಿ ಶಕ್ತಿಶಾಲಿ ವೈಶಿಷ್ಟ್ಯಗಳು",
    featuresSubtitle: "ಒಂದು ಬುದ್ಧಿವಂತ ವೇದಿಕೆಯಲ್ಲಿ ತಿಳುವಳಿಕೆಯುಳ್ಳ ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲವೂ",
    aiPredictions: "AI-ಚಾಲಿತ ಮುನ್ನೋಟಗಳು",
    aiPredictionsDesc: "ಸ್ಥಳೀಯ ಡೇಟಾದಲ್ಲಿ ತರಬೇತಿ ಪಡೆದ ಸುಧಾರಿತ ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿಗಳನ್ನು ಬಳಸಿಕೊಂಡು ನಿಖರವಾದ ಬೆಳೆ ಇಳುವರಿ ಮುನ್ನೋಟಗಳನ್ನು ಪಡೆಯಿರಿ।",
    diseaseTitle: "ರೋಗ ನಿರ್ಣಯ",
    diseaseTitleDesc: "ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಮೂಲಕ ತಕ್ಷಣವೇ ಬೆಳೆ ರೋಗಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ।",
    realtimePrices: "ನೈಜ-ಸಮಯದ ಮಂಡಿ ಬೆಲೆಗಳು",
    realtimePricesDesc: "ಭಾರತದಾದ್ಯಂತ ಸ್ಥಳೀಯ ಮತ್ತು ಜಿಲ್ಲಾ ಮಂಡಿಗಳಿಂದ ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳೊಂದಿಗೆ ನವೀಕೃತವಾಗಿರಿ।",
    govtSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    govtSchemesDesc: "ಸಾಲ ಮನ್ನಾ ಮತ್ತು ಸರ್ಕಾರಿ ಕೃಷಿ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ।",
    mobileFirst: "ಮೊಬೈಲ್-ಮೊದಲ ವಿನ್ಯಾಸ",
    mobileFirstDesc: "ಆಫ್‌ಲೈನ್ ಸಾಮರ್ಥ್ಯಗಳು ಮತ್ತು ಧ್ವನಿ ಬೆಂಬಲದೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್‌ಫೋನ್‌ಗಳಿಗಾಗಿ ಅತ್ಯುತ್ತಮಗೊಳಿಸಲಾಗಿದೆ।",
    multilingualTitle: "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
    multilingualDesc: "ಉತ್ತಮ ಪ್ರವೇಶಕ್ಕಾಗಿ ಆಡಿಯೋ ಪ್ಲೇಬ್ಯಾಕ್‌ನೊಂದಿಗೆ ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಒಡಿಯಾ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿದೆ।",

    // User Types Section
    userTypesTitle: "ಕೃಷಿಯಲ್ಲಿ ಎಲ್ಲರಿಗೂ ನಿರ್ಮಿಸಲಾಗಿದೆ",
    userTypesSubtitle: "ಕೃಷಿ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ವಿವಿಧ ಪಾತ್ರಗಳಿಗೆ ಅನುಕೂಲಿತ ಅನುಭವಗಳು",
    farmers: "ರೈತರು",
    govtOfficials: "ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳು",
    middlemen: "ಮಧ್ಯವರ್ತಿಗಳು",
    farmersDesc: "ಉತ್ತಮ ಕೃಷಿ ನಿರ್ಧಾರಗಳಿಗಾಗಿ ಎಲ್ಲಾ AI ಸಾಧನಗಳಿಗೆ ಪ್ರವೇಶ",
    govtOfficialsDesc: "ಪ್ರಾದೇಶಿಕ ಕೃಷಿ ಡೇಟಾ ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
    middlemenDesc: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳ ಬಗ್ಗೆ ತಿಳುವಳಿಕೆಯಿಂದಿರಿ",
    
    // Features for different user types
    cropPrediction: "ಬೆಳೆ ಮುನ್ನೋಟ",
    diseaseDetection: "ರೋಗ ಗುರುತಿಸುವಿಕೆ",
    mandiPrices: "ಮಂಡಿ ಬೆಲೆಗಳು",
    loanCalculator: "ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    regionalAnalytics: "ಪ್ರಾದೇಶಿಕ ವಿಶ್ಲೇಷಣೆ",
    diseaseOutbreaks: "ರೋಗ ಏಕಾಏಕಿ",
    priceValidation: "ಬೆಲೆ ಮೌಲ್ಯೀಕರಣ",
    policyInsights: "ನೀತಿ ಒಳನೋಟಗಳು",
    liveMandiPrices: "ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು",
    marketTrends: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು",
    tradingInsights: "ವ್ಯಾಪಾರ ಒಳನೋಟಗಳು",
    priceAlerts: "ಬೆಲೆ ಎಚ್ಚರಿಕೆಗಳು",

    // About Section
    aboutKrushiBandhu: "ಕೃಷಿಬಂಧು ಬಗ್ಗೆ",
    aboutSubtitle: "ಭಾರತದಲ್ಲಿ AI-ಚಾಲಿತ ಕೃಷಿಯ ಭವಿಷ್ಯವನ್ನು ಅನ್ವೇಷಿಸುವ ಮೂಲಮಾದರಿ ವೇದಿಕೆ",
    ourVision: "ನಮ್ಮ ದೃಷ್ಟಿ",
    ourVisionDesc: "ಕೃಷಿಬಂಧು ಕೃತ್ರಿಮ ಬುದ್ಧಿಮತ್ತೆ ಭಾರತದಲ್ಲಿ ಕೃಷಿ ಅಭ್ಯಾಸಗಳಲ್ಲಿ ಹೇಗೆ ಕ್ರಾಂತಿ ತರಬಹುದು ಎಂಬುದನ್ನು ಅನ್ವೇಷಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ನವೀನ ಮೂಲಮಾದರಿಯಾಗಿದೆ. ಕೃಷಿ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವಿಕೆಯನ್ನು ಪರಿವರ್ತಿಸಬಹುದಾದ ಪರಿಹಾರಗಳನ್ನು ರಚಿಸಲು ನಾವು ಅತ್ಯಾಧುನಿಕ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಪ್ರಯೋಗಿಸುತ್ತಿದ್ದೇವೆ।",
    whatWeBuilding: "ನಾವು ಏನನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ",
    whatWeBuildingDesc: "ನಮ್ಮ ಮೂಲಮಾದರಿ ವೇದಿಕೆಯು AI-ಚಾಲಿತ ಬೆಳೆ ಮುನ್ನೋಟಗಳು, ರೋಗ ಪತ್ತೆಹಚ್ಚುವಿಕೆ, ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಡೇಟಾ, ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಮಾಹಿತಿಯನ್ನು ಏಕ, ಬಳಕೆದಾರ-ಸ್ನೇಹಿ ಇಂಟರ್‌ಫೇಸ್‌ನಲ್ಲಿ ಸಂಯೋಜಿಸುತ್ತದೆ ಇದು ವಿಶೇಷವಾಗಿ ಭಾರತೀಯ ರೈತರು ಮತ್ತು ಕೃಷಿ ಮಧ್ಯಸ್ಥಗಾರರಿಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ।",
    innovation: "ನವೀನತೆ",
    innovationDesc: "ಕೃಷಿಯಲ್ಲಿ AI ಸಂಭಾವ್ಯತೆಯ ಅನ್ವೇಷಣೆ",
    research: "ಸಂಶೋಧನೆ",
    researchDesc: "ನೈಜ ಕೃಷಿ ಸವಾಲುಗಳಿಗೆ ಪರಿಹಾರಗಳ ಪರೀಕ್ಷೆ",
    keyFeaturesDevelopment: "ಅಭಿವೃದ್ಧಿಯಲ್ಲಿರುವ ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    aiAnalytics: "AI-ಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ",
    aiAnalyticsDesc: "ಬೆಳೆ ಇಳುವರಿ ಮುನ್ನೋಟ ಮತ್ತು ಅತ್ಯುತ್ತಮಗೊಳಿಸುವಿಕೆಗಾಗಿ ಯಂತ್ರ ಕಲಿಕೆ ಮಾದರಿಗಳು",
    mobileDesign: "ಮೊಬೈಲ್-ಮೊದಲ ವಿನ್ಯಾಸ",
    mobileDesignDesc: "ಆಫ್‌ಲೈನ್ ಸಾಮರ್ಥ್ಯಗಳೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್‌ಫೋನ್‌ಗಳಿಗೆ ಅನುಕೂಲಗೊಳಿಸಲಾಗಿದೆ",
    languageSupport: "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
    languageSupportDesc: "ಧ್ವನಿ ಸಹಾಯದೊಂದಿಗೆ ಸ್ಥಳೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ",

    // Team Section
    meetTeam: "ನಮ್ಮ ಅಭಿವೃದ್ಧಿ ತಂಡವನ್ನು ಭೇಟಿ ಮಾಡಿ",
    teamDesc: "ಈ ನವೀನ ಕೃಷಿ ಮೂಲಮಾದರಿಯಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿರುವ ಪರಿಣಿತರ ಸಮರ್ಪಿತ ತಂಡ",

    // Success Stories
    successStoriesTitle: "ರೈತರ ಯಶಸ್ಸಿನ ಕಥೆಗಳು",
    successStoriesSubtitle: "ನೈಜ ರೈತರು ನಮ್ಮ ಮೂಲಮಾದರಿಯನ್ನು ಭರವಸೆಯ ಫಲಿತಾಂಶಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸುತ್ತಿದ್ದಾರೆ",
    joinTestProgram: "ನಮ್ಮ ಪರೀಕ್ಷಾ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಸೇರಿ",

    // Contact Section
    getInTouch: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    contactSubtitle: "ನಮ್ಮ ಮೂಲಮಾದರಿಯನ್ನು ಪರೀಕ್ಷಿಸಲು ಆಸಕ್ತಿ ಇದೆಯೇ? ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    location: "ಸ್ಥಳ",
    responseTime: "24 ಗಂಟೆಗಳಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ",
    officeHours: "ಸೋಮ-ಶುಕ್ರ ಬೆಳಿಗ್ಗೆ 9 ರಿಂದ ಸಂಜೆ 6 ವರೆಗೆ",
    officeLocation: "ಭುವನೇಶ್ವರ, ಒಡಿಶಾ\nಭಾರತ",
    joinBetaTesting: "ಬೀಟಾ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಸೇರಿ",

    // CTA Section
    ctaTitle: "ಕೃಷಿಯ ಭವಿಷ್ಯವನ್ನು ಅನ್ವೇಷಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    ctaSubtitle: "ನಮ್ಮ ಮೂಲಮಾದರಿ ಪರೀಕ್ಷಾ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಸೇರಿ ಮತ್ತು ಭಾರತದಲ್ಲಿ AI-ಚಾಲಿತ ಕೃಷಿಯ ಭವಿಷ್ಯವನ್ನು ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡಿ।",
    startTestingNow: "ಈಗ ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    freeToTest: "ಪರೀಕ್ಷೆಗೆ ಉಚಿತ",
    dataProtected: "ಡೇಟಾ ಸುರಕ್ಷಿತ",
    support24x7: "24/7 ಬೆಂಬಲ",

    // Common Actions
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    submit: "ಸಲ್ಲಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    save: "ಉಳಿಸಿ",
    edit: "ಸಂಪಾದಿಸಿ",
    delete: "ಅಳಿಸಿ",
    search: "ಹುಡುಕಿ",
    filter: "ಫಿಲ್ಟರ್",
    export: "ರಫ್ತು",
    import: "ಆಮದು",
    calculate: "ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ",
    reset: "ಮರುಹೊಂದಿಸಿ",

    // Status
    active: "ಸಕ್ರಿಯ",
    inactive: "ನಿಷ್ಕ್ರಿಯ",
    pending: "ಬಾಕಿ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",

    // Languages
    english: "ಇಂಗ್ಲಿಷ್",
    hindi: "ಹಿಂದಿ",
    odia: "ಒಡಿಯಾ",
    kannada: "ಕನ್ನಡ",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    chooseLanguage: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
} as const

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("krushib andhu-language") as Language
    if (savedLanguage && ["en", "hi", "od", "kn"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    console.log("Setting language to:", lang) // Debug log
    setLanguage(lang)
    localStorage.setItem("krushib andhu-language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[typeof language]]
    return translation || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
