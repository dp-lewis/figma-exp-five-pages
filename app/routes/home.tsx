import { Link } from "react-router";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <p className={styles.heroText}>
          Get more reading done by committing to <strong>five pages</strong> or{" "}
          <strong>five minutes</strong>
        </p>
      </div>
      <div className={styles.content}>
        <Link to="/books">
          <button className={styles.button}>Get Started</button>
        </Link>
      </div>
    </div>
  );
}
