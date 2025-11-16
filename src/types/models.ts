// Data models for the Five Pages app

export interface Book {
  id: string;
  title: string;
  createdAt: Date;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  duration: number; // in seconds
  createdAt: Date;
}

export interface Note {
  id: string;
  sessionId: string;
  content: string;
  createdAt: Date;
}

// Stats calculated from sessions and notes
export interface BookStats {
  totalTimeLogged: number; // in seconds
  notesCount: number;
  lastUpdate: Date | null;
  sessionsCount: number;
}
