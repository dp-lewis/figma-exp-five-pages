// Type definitions for our domain models
// These are based on the Prisma schema but provide app-level types

export interface Book {
  id: string;
  title: string;
  createdAt: Date;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  duration: number; // Duration in seconds
  createdAt: Date;
}

export interface Note {
  id: string;
  sessionId: string;
  content: string;
  createdAt: Date;
}

// Extended types with relations for display purposes

export interface BookWithStats extends Book {
  totalTimeLogged: number; // Total seconds across all sessions
  notesCount: number;
  lastUpdate: Date;
}

export interface ReadingSessionWithNotes extends ReadingSession {
  notes: Note[];
}

export interface BookDetail extends Book {
  sessions: ReadingSessionWithNotes[];
  totalTimeLogged: number;
  notesCount: number;
  lastUpdate: Date;
}
