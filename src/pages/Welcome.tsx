import { useNavigate } from 'react-router-dom'
import './Welcome.module.css'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          Get more reading done by committing to <strong>five pages</strong> or <strong>five minutes</strong>
        </h1>
        <button 
          className="welcome-button"
          onClick={() => navigate('/books')}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
