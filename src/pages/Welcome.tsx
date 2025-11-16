import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.css';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/books');
  };

  return (
    <div className={styles.welcome} onClick={handleClick}>
      <div className={styles.heroBackground} />
      <p className={styles.heroText}>
        Get more reading done by committing to{' '}
        <span className={styles.bold}>five pages</span>
        {' '}or{' '}
        <span className={styles.bold}>five minutes</span>
      </p>
    </div>
  );
};
