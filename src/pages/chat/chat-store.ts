import type { Chat, Message, DocumentReference } from "./types"

// Simple in-memory chat store (in production, use Zustand or API)
const chats = new Map<string, Chat>()

const generateId = () => `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const generateRefId = () => `ref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Bot responses simulation
const botResponses = [
  "Terima kasih atas pertanyaannya! Saya akan membantu Anda dengan informasi yang Anda butuhkan.",
  "Pertanyaan yang bagus! Berdasarkan data yang tersedia, saya dapat memberikan beberapa insight.",
  "Saya memahami kebutuhan Anda. Mari kita bahas lebih detail tentang topik ini.",
  "Tentu saja! Saya siap membantu Anda. Berikut adalah informasi yang relevan.",
  "Terima kasih telah menghubungi. Saya akan memberikan jawaban terbaik untuk pertanyaan Anda.",
]

// Mock document references for RAG simulation
const mockDocuments: Omit<DocumentReference, "id">[] = [
  {
    title: "Panduan Penggunaan Sistem",
    excerpt: "Sistem ini dirancang untuk memudahkan pengguna dalam mengelola data dan informasi secara efisien dengan antarmuka yang intuitif.",
    pageNumber: 12,
    documentUrl: "/documents/panduan-sistem.pdf",
  },
  {
    title: "Manual Teknis Aplikasi",
    excerpt: "Arsitektur aplikasi menggunakan pola microservices untuk memastikan skalabilitas dan kemudahan maintenance.",
    pageNumber: 45,
    documentUrl: "/documents/manual-teknis.pdf",
  },
  {
    title: "Kebijakan Privasi dan Keamanan",
    excerpt: "Data pengguna dilindungi dengan enkripsi end-to-end dan disimpan sesuai dengan standar keamanan internasional.",
    pageNumber: 8,
    documentUrl: "/documents/kebijakan-privasi.pdf",
  },
  {
    title: "Prosedur Operasional Standar",
    excerpt: "Setiap proses bisnis harus mengikuti alur kerja yang telah ditetapkan untuk menjamin konsistensi dan kualitas layanan.",
    pageNumber: 23,
    documentUrl: "/documents/sop.pdf",
  },
  {
    title: "Laporan Analisis Data 2024",
    excerpt: "Berdasarkan analisis data kuartal terakhir, terdapat peningkatan signifikan dalam engagement pengguna sebesar 35%.",
    pageNumber: 67,
    documentUrl: "/documents/laporan-analisis.pdf",
  },
]

const getRandomReferences = (): DocumentReference[] => {
  const count = Math.floor(Math.random() * 3) + 1 // 1-3 references
  const shuffled = [...mockDocuments].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((doc) => ({
    ...doc,
    id: generateRefId(),
  }))
}

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

  addMessage: (chatId: string, content: string, role: "user" | "assistant", references?: DocumentReference[]): Message | null => {
    const chat = chats.get(chatId)
    if (!chat) return null

    const message: Message = {
      id: generateMessageId(),
      content,
      role,
      timestamp: new Date(),
      references,
    }

    chat.messages.push(message)
    chat.updatedAt = new Date()
    return message
  },

  getBotResponse: async (chatId: string, _userMessage: string): Promise<Message | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = getRandomBotResponse()
    const references = getRandomReferences()
    return chatStore.addMessage(chatId, response, "assistant", references)
  },

  getAllChats: (): Chat[] => {
    return Array.from(chats.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    )
  },
}
