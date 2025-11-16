export interface Book {
  id: string;
  title: string;
  coverImage?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  bookId: string;
  sessionId: string;
  content: string;
  createdAt: string;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
}
