import { useNavigate } from 'react-router-dom'
import styles from './Welcome.module.css'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.gradient} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Get more reading done by committing to{' '}
          <strong>five pages</strong> or{' '}
          <strong>five minutes</strong>
        </h1>
      </div>
    </div>
  )
}
