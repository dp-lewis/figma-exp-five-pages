import { Link } from "react-router";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onAddClick?: () => void;
  backTo?: string;
  showAdd?: boolean;
}

export function Navigation({ onAddClick, backTo = "/", showAdd = true }: NavigationProps) {
  const handleAddClick = (e: React.MouseEvent) => {
    console.log("Navigation: Add button clicked");
    if (onAddClick) {
      console.log("Navigation: Calling onAddClick");
      onAddClick();
    } else {
      console.log("Navigation: No onAddClick handler provided");
    }
  };

  return (
    <nav className={styles.navigation}>
      <Link to={backTo} className={styles.navButton}>
        <div className={styles.icon}>
          <div className={styles.iconArrowLeft} />
        </div>
        <span className={styles.label}>Back</span>
      </Link>
      
      {showAdd && (
        <button className={styles.navButton} onClick={handleAddClick} type="button">
          <div className={styles.icon}>
            <div className={styles.iconPlus} />
          </div>
          <span className={styles.label}>Add</span>
        </button>
      )}
    </nav>
  );
}
