import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ReadingSession.module.css';

export const ReadingSession = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const startTimeRef = useRef<string>(new Date().toISOString());

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const handleStop = () => {
    setIsRunning(false);
    const endTime = new Date().toISOString();
    const durationMinutes = Math.floor(seconds / 60);
    
    navigate(`/session/${bookId}/complete`, {
      state: {
        startTime: startTimeRef.current,
        endTime,
        durationMinutes: durationMinutes > 0 ? durationMinutes : 1, // Minimum 1 minute
      },
    });
  };

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.session}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>
          <span className={styles.bold}>five pages</span> or <span className={styles.bold}>five minutes</span>
        </p>
      </div>

      <div className={styles.timerContainer}>
        <div className={styles.timerDisplay}>
          {formatTime(seconds)}
        </div>
        <button className={styles.stopButton} onClick={handleStop}>
          STOP
        </button>
      </div>
    </div>
  );
};
