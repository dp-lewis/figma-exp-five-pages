import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Book, Note } from '../types';
import { getBookById, getTotalMinutesForBook, getNotesForBook, getLastUpdateForBook } from '../utils/storage';
import { Navigation } from '../components/Navigation';
import styles from './BookDetail.module.css';

export const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (bookId) {
      const foundBook = getBookById(bookId);
      if (foundBook) {
        setBook(foundBook);
        const bookNotes = getNotesForBook(bookId);
        setNotes(bookNotes);
      } else {
        navigate('/books');
      }
    }
  }, [bookId, navigate]);

  const handleStartSession = () => {
    if (bookId) {
      navigate(`/session/${bookId}`);
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''} logged`;
    }
    return `${mins} minute${mins !== 1 ? 's' : ''} logged`;
  };

  const formatLastUpdate = (dateString: string | null): string => {
    if (!dateString) return 'No reading sessions yet';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Last update today';
    if (diffDays === 1) return 'Last update yesterday';
    return `Last update ${diffDays} days ago`;
  };

  const formatNoteDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long' 
    };
    return `Notes from ${date.toLocaleDateString('en-GB', options)}`;
  };

  const groupNotesByDate = (notes: Note[]): Map<string, Note[]> => {
    const groups = new Map<string, Note[]>();
    notes.forEach(note => {
      const date = new Date(note.createdAt).toLocaleDateString();
      if (!groups.has(date)) {
        groups.set(date, []);
      }
      groups.get(date)!.push(note);
    });
    return groups;
  };

  if (!book) {
    return null;
  }

  const totalMinutes = getTotalMinutesForBook(book.id);
  const lastUpdate = getLastUpdateForBook(book.id);
  const notesByDate = groupNotesByDate(notes);

  return (
    <div className={styles.bookDetail}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>
          <span className={styles.bold}>five pages</span> or <span className={styles.bold}>five minutes</span>
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.bookInfo}>
          <div className={styles.bookInfoText}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <div className={styles.bookStats}>
              {totalMinutes > 0 && <div className={styles.statLine}>{formatDuration(totalMinutes)}</div>}
              <div className={styles.statLine}>{notes.length} note{notes.length !== 1 ? 's' : ''} made</div>
              <div className={styles.statLine}>{formatLastUpdate(lastUpdate)}</div>
            </div>
          </div>
          <div className={styles.bookCover} />
        </div>

        <div className={styles.notesSection}>
          {notes.length === 0 ? (
            <div className={styles.emptyNotes}>
              No notes yet. Start a reading session to add notes.
            </div>
          ) : (
            Array.from(notesByDate.entries()).map(([date, dateNotes]) => (
              <div key={date} className={styles.noteGroup}>
                <h3 className={styles.noteDate}>{formatNoteDate(dateNotes[0].createdAt)}</h3>
                {dateNotes.map(note => (
                  <p key={note.id} className={styles.noteContent}>
                    {note.content}
                  </p>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <button className={styles.startSessionButton} onClick={handleStartSession}>
        Start Reading
      </button>

      <Navigation showBack={true} showAdd={false} />
    </div>
  );
};
