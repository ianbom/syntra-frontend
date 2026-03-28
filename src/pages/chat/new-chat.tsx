import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconMessagePlus, IconSparkles } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInput } from "./components"
import { chatStore } from "./chat-store"

const suggestions = [
  "Apa yang bisa kamu bantu?",
  "Jelaskan tentang machine learning",
  "Bagaimana cara mengoptimalkan kode?",
  "Berikan tips produktivitas",
]

const NewChatPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    setIsLoading(true)

    try {
      // Create new chat with first message
      const chat = chatStore.createChat(message)

      // Navigate to detail chat with chat ID
      navigate(`/chat/${chat.id}`)
    } catch (error) {
      console.error("Failed to create chat:", error)
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl space-y-8">
                  {/* Header */}
                  <div className="text-center space-y-4">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                      <IconSparkles className="size-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Mulai Percakapan Baru
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Tanyakan apapun kepada asisten AI kami. Kami siap membantu Anda dengan berbagai pertanyaan.
                    </p>
                  </div>

                  {/* Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <IconMessagePlus className="size-5" />
                        Saran Pertanyaan
                      </CardTitle>
                      <CardDescription>
                        Klik salah satu saran atau ketik pertanyaan Anda sendiri
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            disabled={isLoading}
                            className="rounded-lg border bg-card p-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Input Area */}
                  <Card className="bg-background">
                    <ChatInput
                      onSend={handleSendMessage}
                      disabled={isLoading}
                      placeholder="Ketik pesan untuk memulai percakapan..."
                      autoFocus
                    />
                  </Card>

                  {isLoading && (
                    <p className="text-center text-sm text-muted-foreground">
                      Memulai percakapan...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default NewChatPage
