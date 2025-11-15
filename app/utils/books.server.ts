import { db } from "./db.server";
import type { BookWithStats, BookDetail } from "~/types/models";

// Book operations
export async function getAllBooks(): Promise<BookWithStats[]> {
  const books = await db.book.findMany({
    include: {
      readingSessions: {
        include: {
          notes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return books.map((book) => {
    const totalTimeLogged = book.readingSessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    const notesCount = book.readingSessions.reduce(
      (sum, session) => sum + session.notes.length,
      0
    );
    const lastUpdate =
      book.readingSessions.length > 0
        ? new Date(
            Math.max(
              ...book.readingSessions.map((s) => s.createdAt.getTime())
            )
          )
        : book.createdAt;

    return {
      id: book.id,
      title: book.title,
      createdAt: book.createdAt,
      totalTimeLogged,
      notesCount,
      lastUpdate,
    };
  });
}

export async function getBookById(id: string): Promise<BookDetail | null> {
  const book = await db.book.findUnique({
    where: { id },
    include: {
      readingSessions: {
        include: {
          notes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!book) return null;

  const totalTimeLogged = book.readingSessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const notesCount = book.readingSessions.reduce(
    (sum, session) => sum + session.notes.length,
    0
  );
  const lastUpdate =
    book.readingSessions.length > 0
      ? new Date(
          Math.max(...book.readingSessions.map((s) => s.createdAt.getTime()))
        )
      : book.createdAt;

  return {
    id: book.id,
    title: book.title,
    createdAt: book.createdAt,
    sessions: book.readingSessions,
    totalTimeLogged,
    notesCount,
    lastUpdate,
  };
}

export async function createBook(title: string) {
  return db.book.create({
    data: { title },
  });
}

export async function deleteBook(id: string) {
  return db.book.delete({
    where: { id },
  });
}

// Reading Session operations
export async function createReadingSession(
  bookId: string,
  duration: number,
  noteContent?: string
) {
  return db.readingSession.create({
    data: {
      bookId,
      duration,
      notes: noteContent
        ? {
            create: {
              content: noteContent,
            },
          }
        : undefined,
    },
    include: {
      notes: true,
    },
  });
}

// Note operations
export async function addNoteToSession(sessionId: string, content: string) {
  return db.note.create({
    data: {
      sessionId,
      content,
    },
  });
}
