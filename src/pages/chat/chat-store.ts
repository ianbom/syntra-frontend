import type { Chat, Message } from "./types"

// Simple in-memory chat store (in production, use Zustand or API)
const chats = new Map<string, Chat>()

const generateId = () => `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Bot responses simulation
const botResponses = [
  "Terima kasih atas pertanyaannya! Saya akan membantu Anda dengan informasi yang Anda butuhkan.",
  "Pertanyaan yang bagus! Berdasarkan data yang tersedia, saya dapat memberikan beberapa insight.",
  "Saya memahami kebutuhan Anda. Mari kita bahas lebih detail tentang topik ini.",
  "Tentu saja! Saya siap membantu Anda. Berikut adalah informasi yang relevan.",
  "Terima kasih telah menghubungi. Saya akan memberikan jawaban terbaik untuk pertanyaan Anda.",
]

const getRandomBotResponse = (): string => {
  return botResponses[Math.floor(Math.random() * botResponses.length)]
}

export const chatStore = {
  getChat: (id: string): Chat | undefined => {
    return chats.get(id)
  },

  createChat: (firstMessage: string): Chat => {
    const chatId = generateId()
    const now = new Date()

    const userMessage: Message = {
      id: generateMessageId(),
      content: firstMessage,
      role: "user",
      timestamp: now,
    }

    const chat: Chat = {
      id: chatId,
      title: firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : ""),
      messages: [userMessage],
      createdAt: now,
      updatedAt: now,
    }

    chats.set(chatId, chat)
    return chat
  },

  addMessage: (chatId: string, content: string, role: "user" | "assistant"): Message | null => {
    const chat = chats.get(chatId)
    if (!chat) return null

    const message: Message = {
      id: generateMessageId(),
      content,
      role,
      timestamp: new Date(),
    }

    chat.messages.push(message)
    chat.updatedAt = new Date()
    return message
  },

  getBotResponse: async (chatId: string, _userMessage: string): Promise<Message | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = getRandomBotResponse()
    return chatStore.addMessage(chatId, response, "assistant")
  },

  getAllChats: (): Chat[] => {
    return Array.from(chats.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    )
  },
}
