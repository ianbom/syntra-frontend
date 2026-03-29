export interface DocumentReference {
  id: string
  title: string
  excerpt: string
  pageNumber: number
  documentUrl: string
}

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  references?: DocumentReference[]
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface ChatStore {
  chats: Map<string, Chat>
  getChat: (id: string) => Chat | undefined
  createChat: (firstMessage: string) => Chat
  addMessage: (chatId: string, content: string, role: "user" | "assistant") => void
}
