import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { IconPlus, IconRobot } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChatInput, MessageBubble, TypingIndicator } from "./components"
import { chatStore } from "./chat-store"
import type { Message } from "./types"

const DetailChatPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [chatTitle, setChatTitle] = useState("")

  // Load chat on mount
  useEffect(() => {
    if (!id) {
      navigate("/chat/new")
      return
    }

    //

    const chat = chatStore.getChat(id)
    if (chat) {
      setMessages(chat.messages)
      setChatTitle(chat.title)

      // If only user message, trigger bot response
      if (chat.messages.length === 1 && chat.messages[0].role === "user") {
        getBotResponse(chat.messages[0].content)
      }
    } else {
      navigate("/chat/new")
    }
  }, [id, navigate])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, isBotTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getBotResponse = async (userMessage: string) => {
    if (!id) return

    setIsBotTyping(true)

    try {
      const botMessage = await chatStore.getBotResponse(id, userMessage)
      if (botMessage) {
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Failed to get bot response:", error)
    } finally {
      setIsBotTyping(false)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!id || isLoading) return

    setIsLoading(true)

    try {
      // Add user message
      const userMessage = chatStore.addMessage(id, content, "user")
      if (userMessage) {
        setMessages((prev) => [...prev, userMessage])
      }

      // Get bot response
      await getBotResponse(content)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b px-4 lg:px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <IconRobot className="size-4 text-primary" />
                </div>
                <div>
                  <h1 className="font-semibold text-sm line-clamp-1 max-w-[200px] sm:max-w-md">
                    {chatTitle || "Chat"}
                  </h1>
                  <p className="text-xs text-muted-foreground">Syntra AI</p>
                </div>
              </div>

              <Link to="/chat/new">
                <Button variant="outline" size="sm">
                  <IconPlus className="size-4" />
                  <span className="hidden sm:inline ml-1">Chat Baru</span>
                </Button>
              </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
              <div className="mx-auto max-w-3xl space-y-6">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {isBotTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t px-4 lg:px-6 py-4">
              <div className="mx-auto max-w-3xl">
                <Card className="p-0">
                  <ChatInput
                    onSend={handleSendMessage}
                    disabled={isLoading || isBotTyping}
                    placeholder={isBotTyping ? "Menunggu respons..." : "Ketik pesan..."}
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DetailChatPage
