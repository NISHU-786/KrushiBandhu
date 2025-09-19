"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth/auth-provider"
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  X,
  MessageCircle,
  Minimize2
} from "lucide-react"

interface ChatBotProps {
  onClose: () => void
}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  isTyping?: boolean
}

export function ChatBot({ onClose }: ChatBotProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: `Hi ${user?.name?.split(" ")[0]}! I'm KrishiBandu AI, your farming assistant.

I can help you with:
• Crop disease detection
• Weather forecasts  
• Market prices
• Government schemes
• Fertilizer advice

How can I help you today?`,
      timestamp: new Date(),
      suggestions: ["Check crop diseases", "Weather forecast", "Market prices"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      type: "bot",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => prev.filter(msg => msg.id !== "typing"))
      
      const botResponse = generateBotResponse(content.trim())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const generateBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("disease") || input.includes("pest")) {
      return {
        content: `I can help identify crop diseases using AI!

Upload a photo of your affected plants:
• Take clear photos of leaves
• Our AI scans for common diseases
• Get instant diagnosis and treatment

Supported crops: Rice, Wheat, Cotton, Tomato, and 20+ more.`,
        suggestions: ["Upload photo", "Rice diseases", "Treatment tips"],
      }
    }

    if (input.includes("weather") || input.includes("rain")) {
      return {
        content: `Weather forecast for ${user?.location || "your area"}:

Today: 28°C, partly cloudy
Tomorrow: Light rain expected
3-day outlook: Good for farming

Recommendations:
• Apply fertilizer before rain
• Check drainage systems`,
        suggestions: ["7-day forecast", "Farming tips", "Weather alerts"],
      }
    }

    if (input.includes("price") || input.includes("market")) {
      return {
        content: `Current market prices:

Rice: ₹2,150/quintal (↑₹50)
Wheat: ₹2,300/quintal (↑₹25)
Sugarcane: ₹350/quintal (↑₹10)

Best selling time: Next 2-3 days
High demand expected this week.`,
        suggestions: ["All prices", "Price trends", "Best time to sell"],
      }
    }

    if (input.includes("scheme") || input.includes("loan")) {
      return {
        content: `Government schemes for you:

PM-KISAN: ₹6,000/year
Crop Loan: 4% interest rate
Crop Insurance: 2% premium

You're eligible for multiple benefits!
Required: Aadhaar, land records, bank details.`,
        suggestions: ["Check eligibility", "Apply now", "Required documents"],
      }
    }

    return {
      content: `I'm here to help with:

• Disease identification
• Weather updates  
• Market prices
• Government schemes
• Fertilizer advice
• Yield predictions

What would you like to know?`,
      suggestions: ["Crop health", "Weather", "Market rates"],
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
  }

  const speakMessage = (content: string) => {
    if ("speechSynthesis" in window) {
      const cleanedContent = content.replace(/[•₹↑↓]/g, '').replace(/\n/g, ' ')
      const utterance = new SpeechSynthesisUtterance(cleanedContent)
      utterance.lang = "en-IN"
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">KrishiBandu AI</h3>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/90">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="text-white hover:bg-white/20 rounded h-8 w-8 p-0"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area - Fixed Height with Scroll */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start space-x-2 max-w-[80%]`}>
                {message.type === "bot" && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.type === "user" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    ) : (
                      <div className="leading-relaxed whitespace-pre-line">
                        {message.content}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {formatTime(message.timestamp)}
                    </span>
                    
                    {message.type === "bot" && !message.isTyping && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs hover:bg-gray-100"
                        onClick={() => speakMessage(message.content)}
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {message.type === "user" && (
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Suggestions */}
          {messages.length > 0 && messages[messages.length - 1].suggestions && !isLoading && (
            <div className="flex flex-wrap gap-2 ml-8">
              {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full h-6 px-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              placeholder="Ask me anything about farming..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(inputValue)}
              disabled={isLoading}
              className="h-10 bg-gray-50 border-gray-200 focus:border-green-400 focus:bg-white rounded-lg text-sm"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleVoiceInput}
            className={`h-10 w-10 rounded-lg flex-shrink-0 ${
              isListening 
                ? "border-red-300 bg-red-50 text-red-500" 
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button 
            onClick={() => handleSendMessage(inputValue)} 
            disabled={!inputValue.trim() || isLoading}
            className="h-10 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400">Powered by KrishiBandu AI</span>
        </div>
      </div>
    </div>
  )
}
