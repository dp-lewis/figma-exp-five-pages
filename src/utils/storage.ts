import { Book, ReadingSession, Note } from '../types/index'

const STORAGE_KEYS = {
  BOOKS: 'five-pages:books',
  SESSIONS: 'five-pages:sessions',
  NOTES: 'five-pages:notes',
}

export function loadBooks(): Book[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books))
}

export function addBook(title: string): Book {
  const books = loadBooks()
  const newBook: Book = {
    id: `book-${Date.now()}`,
    title,
    createdAt: new Date(),
  }
  books.push(newBook)
  saveBooks(books)
  return newBook
}

export function loadSessions(): ReadingSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveSessions(sessions: ReadingSession[]): void {
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions))
}

export function addSession(bookId: string, duration: number): ReadingSession {
  const sessions = loadSessions()
  const newSession: ReadingSession = {
    id: `session-${Date.now()}`,
    bookId,
    duration,
    createdAt: new Date(),
  }
  sessions.push(newSession)
  saveSessions(sessions)
  return newSession
}

export function loadNotes(): Note[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NOTES)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes))
}

export function addNote(sessionId: string, content: string): Note {
  const notes = loadNotes()
  const newNote: Note = {
    id: `note-${Date.now()}`,
    sessionId,
    content,
    createdAt: new Date(),
  }
  notes.push(newNote)
  saveNotes(notes)
  return newNote
}
