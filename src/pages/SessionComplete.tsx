import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { ReadingSession, Note } from '../types';
import { saveSession, saveNote } from '../utils/storage';
import { Navigation } from '../components/Navigation';
import styles from './SessionComplete.module.css';

interface LocationState {
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

export const SessionComplete = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state as LocationState;
  
  const [notes, setNotes] = useState('');

  if (!bookId || !sessionData) {
    navigate('/books');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSessionAndNotes();
  };

  const saveSessionAndNotes = () => {
    // Save the reading session
    const session: ReadingSession = {
      id: Date.now().toString(),
      bookId,
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
      durationMinutes: sessionData.durationMinutes,
    };
    saveSession(session);

    // Save notes if provided
    if (notes.trim()) {
      const note: Note = {
        id: (Date.now() + 1).toString(),
        bookId,
        sessionId: session.id,
        content: notes.trim(),
        createdAt: new Date().toISOString(),
      };
      saveNote(note);
    }

    // Navigate back to book detail
    navigate(`/books/${bookId}`);
  };

  const handleSkip = () => {
    saveSessionAndNotes();
  };

  return (
    <div className={styles.sessionComplete}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>
          <span className={styles.bold}>five pages</span> or <span className={styles.bold}>five minutes</span>
        </p>
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Notes from this session</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.notesBox}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your thoughts, reflections, or key takeaways from this reading session..."
            autoFocus
          />
          <button type="submit" className={styles.submitButton}>
            Add notes
          </button>
          <button type="button" className={styles.skipButton} onClick={handleSkip}>
            Skip and finish
          </button>
        </form>
      </div>

      <Navigation showBack={true} showAdd={false} />
    </div>
  );
};
