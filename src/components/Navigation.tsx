import { useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';

interface NavigationProps {
  showBack?: boolean;
  showAdd?: boolean;
  onAdd?: () => void;
  backTo?: string; // Optional specific route to navigate back to
  addLabel?: string; // Optional custom label for add button
}

const IconArrowRight = () => (
  <div className={styles.iconArrowRight}>
    <div className={`${styles.arrowLine} ${styles.arrowLine1}`} />
    <div className={`${styles.arrowLine} ${styles.arrowLine2}`} />
  </div>
);

const IconPlus = () => (
  <div className={styles.iconPlus}>
    <div className={`${styles.plusLine} ${styles.plusLineH}`} />
    <div className={`${styles.plusLine} ${styles.plusLineV}`} />
  </div>
);

export const Navigation = ({ showBack = true, showAdd = true, onAdd, backTo, addLabel = 'Add' }: NavigationProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    }
  };

  return (
    <div className={styles.navigation}>
      {showBack && (
        <button className={styles.navButton} onClick={handleBack}>
          <div className={styles.navIcon}>
            <IconArrowRight />
          </div>
          <span className={styles.navLabel}>Back</span>
        </button>
      )}
      {!showBack && <div style={{ width: 70 }} />}
      
      {showAdd && (
        <button className={styles.navButton} onClick={handleAdd}>
          <div className={styles.navIcon}>
            <IconPlus />
          </div>
          <span className={styles.navLabel}>{addLabel}</span>
        </button>
      )}
      {!showAdd && <div style={{ width: 70 }} />}
    </div>
  );
};
