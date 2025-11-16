import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Book, Note, ReadingSession as ReadingSessionType } from '../types';
import { getBookById, getTotalMinutesForBook, getNotesForBook, getLastUpdateForBook, saveSession, saveNote } from '../utils/storage';
import { Navigation } from '../components/Navigation';
import styles from './BookDetail.module.css';

type DrawerView = 'none' | 'timer' | 'notes';

export const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [drawerView, setDrawerView] = useState<DrawerView>('none');
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionNote, setSessionNote] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const startTimeRef = useRef<string>('');

  useEffect(() => {
    if (bookId) {
      const foundBook = getBookById(bookId);
      if (foundBook) {
        setBook(foundBook);
        loadNotes();
      } else {
        navigate('/books');
      }
    }
  }, [bookId, navigate]);

  useEffect(() => {
    let interval: number | undefined;

    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  const loadNotes = () => {
    if (bookId) {
      const bookNotes = getNotesForBook(bookId);
      setNotes(bookNotes);
    }
  };

  const handleStartSession = () => {
    startTimeRef.current = new Date().toISOString();
    setSessionSeconds(0);
    setIsTimerRunning(true);
    setDrawerView('timer');
  };

  const handleStopSession = () => {
    setIsTimerRunning(false);
    setDrawerView('notes');
  };

  const handleSaveNotes = () => {
    if (!bookId) return;

    const endTime = new Date().toISOString();
    const durationMinutes = Math.floor(sessionSeconds / 60);

    // Save the reading session
    const session: ReadingSessionType = {
      id: Date.now().toString(),
      bookId,
      startTime: startTimeRef.current,
      endTime,
      durationMinutes: durationMinutes > 0 ? durationMinutes : 1,
    };
    saveSession(session);

    // Save notes if provided
    if (sessionNote.trim()) {
      const note: Note = {
        id: (Date.now() + 1).toString(),
        bookId,
        sessionId: session.id,
        content: sessionNote.trim(),
        createdAt: new Date().toISOString(),
      };
      saveNote(note);
    }

    // Reset and close drawer
    setSessionNote('');
    setDrawerView('none');
    loadNotes();
  };

  const handleCloseDrawer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    }
    setDrawerView('none');
    setSessionSeconds(0);
    setSessionNote('');
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''} logged`;
    }
    return `${mins} minute${mins !== 1 ? 's' : ''} logged`;
  };

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

      {/* Timer Drawer */}
      {drawerView === 'timer' && (
        <div className={styles.drawerOverlay} onClick={handleCloseDrawer}>
          <div className={styles.timerDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.timerDisplay}>
              {formatTime(sessionSeconds)}
            </div>
            <div className={styles.timerButtons}>
              <button className={styles.cancelButton} onClick={handleCloseDrawer}>
                CANCEL
              </button>
              <button className={styles.stopButton} onClick={handleStopSession}>
                STOP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Drawer */}
      {drawerView === 'notes' && (
        <div className={styles.drawerOverlay} onClick={handleCloseDrawer}>
          <div className={styles.notesDrawer} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.drawerTitle}>Notes from this session</h2>
            <textarea
              className={styles.notesInput}
              value={sessionNote}
              onChange={(e) => setSessionNote(e.target.value)}
              placeholder="Add your thoughts, reflections, or key takeaways from this reading session..."
              autoFocus
            />
            <button className={styles.saveNotesButton} onClick={handleSaveNotes}>
              Add notes
            </button>
            <button className={styles.skipButton} onClick={() => handleSaveNotes()}>
              Skip and finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
