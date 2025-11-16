export interface Book {
  id: string
  title: string
  createdAt: Date
}

export interface ReadingSession {
  id: string
  bookId: string
  duration: number
  createdAt: Date
}

export interface Note {
  id: string
  sessionId: string
  content: string
  createdAt: Date
}
