import type { Book, ReadingSession, Note } from '../types';

const BOOKS_KEY = 'fivePages_books';
const SESSIONS_KEY = 'fivePages_sessions';
const NOTES_KEY = 'fivePages_notes';

// Books
export const getBooks = (): Book[] => {
  const stored = localStorage.getItem(BOOKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveBook = (book: Book): void => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const getBookById = (id: string): Book | undefined => {
  return getBooks().find(book => book.id === id);
};

// Reading Sessions
export const getSessions = (): ReadingSession[] => {
  const stored = localStorage.getItem(SESSIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveSession = (session: ReadingSession): void => {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getSessionsForBook = (bookId: string): ReadingSession[] => {
  return getSessions().filter(session => session.bookId === bookId);
};

// Notes
export const getNotes = (): Note[] => {
  const stored = localStorage.getItem(NOTES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveNote = (note: Note): void => {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

export const getNotesForBook = (bookId: string): Note[] => {
  return getNotes().filter(note => note.bookId === bookId);
};

// Stats calculations
export const getTotalMinutesForBook = (bookId: string): number => {
  const sessions = getSessionsForBook(bookId);
  return sessions.reduce((total, session) => total + session.durationMinutes, 0);
};

export const getLastUpdateForBook = (bookId: string): string | null => {
  const sessions = getSessionsForBook(bookId);
  if (sessions.length === 0) return null;
  
  const latest = sessions.reduce((latest, session) => 
    new Date(session.endTime) > new Date(latest.endTime) ? session : latest
  );
  
  return latest.endTime;
};
