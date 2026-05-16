"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Sparkles, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useDemoStore } from "@/lib/store"
import { MOCK_AI_RECOMMENDATIONS, MOCK_CLUBS, MOCK_EVENTS, DEMO_USERS } from "@/lib/mock-data"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const INITIAL_MESSAGES: Record<string, Message[]> = {
  student: [
    {
      id: "1",
      role: "assistant",
      content: "Hi Abebe! I'm your UniClubs AI assistant. I can help you discover clubs, find events, and get personalized recommendations based on your interests. What would you like to know?",
      timestamp: new Date(),
    },
  ],
  officer: [
    {
      id: "1",
      role: "assistant",
      content: "Hello Senait! I'm here to help you manage the Ethiopian Cultural Club more effectively. I can provide insights on member engagement, suggest event ideas, and help with analytics. How can I assist you today?",
      timestamp: new Date(),
    },
  ],
  admin: [
    {
      id: "1",
      role: "assistant",
      content: "Good day, Administrator! I'm your platform analytics assistant. I can help you monitor club activities, review registrations, and provide insights on platform performance. What would you like to explore?",
      timestamp: new Date(),
    },
  ],
}

// Simulated AI responses based on keywords
function generateAIResponse(message: string, role: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest") || lowerMessage.includes("club")) {
    if (role === "student") {
      const recs = MOCK_AI_RECOMMENDATIONS.student.clubs
      return `Based on your interests in Technology and your CS major, I'd recommend:\n\n1. **${recs[0].clubName}** (${recs[0].matchScore}% match) - ${recs[0].reason}\n\n2. **${recs[1].clubName}** (${recs[1].matchScore}% match) - ${recs[1].reason}\n\nWould you like more details about any of these clubs?`
    }
    return "I can help you discover clubs that match your interests. What areas are you most interested in? (Technology, Culture, Sports, Arts, Professional Development)"
  }
  
  if (lowerMessage.includes("event") || lowerMessage.includes("happening")) {
    const upcomingEvents = MOCK_EVENTS.slice(0, 3)
    return `Here are some upcoming events:\n\n${upcomingEvents.map(e => 
      `• **${e.title}** - ${new Date(e.date).toLocaleDateString()} at ${e.location}`
    ).join('\n')}\n\nWould you like to RSVP to any of these?`
  }
  
  if (lowerMessage.includes("analytics") || lowerMessage.includes("insight") || lowerMessage.includes("performance")) {
    if (role === "officer") {
      return `Here are your club's key insights:\n\n• Engagement is up **24%** this month\n• Your "Hackathon" post had 3x average engagement\n• Post engagement peaks on Tuesdays and Thursdays\n• 3 membership requests are pending\n\nWould you like a detailed breakdown of any metric?`
    }
    if (role === "admin") {
      return `Platform performance highlights:\n\n• **2,847** total users (+12% growth)\n• **58** active clubs\n• Peak activity on Wednesdays\n• STEM clubs have highest retention (85%)\n\nWould you like to dive deeper into any area?`
    }
  }
  
  if (lowerMessage.includes("member") || lowerMessage.includes("request")) {
    if (role === "officer") {
      return "You have **3 pending membership requests** for Ethiopian Cultural Club. Based on their profiles:\n\n• Bethlehem Assefa - Strong interest in traditional music\n• Nahom Tadesse - Experience organizing events\n• Selam Haile - Traditional dancer\n\nAll applicants seem like great fits! Would you like me to draft welcome messages?"
    }
  }
  
  if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
    return `I can help you with:\n\n• **Club Discovery** - Find clubs matching your interests\n• **Event Recommendations** - Discover upcoming events\n• **Analytics** - Understand engagement and trends\n• **Personalized Tips** - Based on your activity\n\nJust ask me anything about UniClubs!`
  }
  
  if (lowerMessage.includes("thank")) {
    return "You're welcome! Feel free to ask if you have any other questions. I'm here to help you make the most of UniClubs!"
  }
  
  // Default responses
  const defaults = [
    "That's an interesting question! Let me help you with that. Could you provide a bit more context about what specific information you're looking for?",
    "I'd be happy to help with that. Based on the platform data, I can provide insights on clubs, events, and engagement. What aspect would you like to focus on?",
    "Great question! I'm analyzing the relevant data to give you the best answer. Meanwhile, is there a specific club or event you're interested in?",
  ]
  
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export function AIChatbot() {
  const { currentRole, isDemoMode } = useDemoStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(
    INITIAL_MESSAGES[currentRole] || INITIAL_MESSAGES.student
  )
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Update initial messages when role changes
  useEffect(() => {
    setMessages(INITIAL_MESSAGES[currentRole] || INITIAL_MESSAGES.student)
  }, [currentRole])

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateAIResponse(input, currentRole),
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages(prev => [...prev, aiResponse])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isDemoMode) return null

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
            isMinimized
              ? "bottom-6 right-6 w-80 h-14"
              : "bottom-6 right-6 w-96 h-[600px] max-h-[80vh]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">UniClubs AI</h3>
                {!isMinimized && (
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className={message.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted"}>
                        {message.role === "assistant" ? (
                          <Sparkles className="w-4 h-4" />
                        ) : (
                          DEMO_USERS[currentRole]?.firstName[0] || "U"
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-border bg-muted/20">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {currentRole === "student" && (
                    <>
                      <button
                        onClick={() => setInput("Recommend clubs for me")}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Recommend clubs
                      </button>
                      <button
                        onClick={() => setInput("What events are happening this week?")}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Upcoming events
                      </button>
                    </>
                  )}
                  {currentRole === "officer" && (
                    <>
                      <button
                        onClick={() => setInput("Show me club analytics")}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        View analytics
                      </button>
                      <button
                        onClick={() => setInput("Review membership requests")}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Pending requests
                      </button>
                    </>
                  )}
                  {currentRole === "admin" && (
                    <>
                      <button
                        onClick={() => setInput("Show platform analytics")}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Platform stats
                      </button>
                      <button
                        onClick={() => setInput("What clubs need attention?")}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Action items
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
