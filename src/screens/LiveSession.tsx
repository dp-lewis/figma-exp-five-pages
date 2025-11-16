import React from 'react'

const LiveSession: React.FC = () => (
  <div className="screen screen-session">
    <div className="header-bar" />
    <h2>Live session</h2>
    <div className="timer-card">
      <p className="timer-label">Time remaining</p>
      <p className="timer-value">1:36</p>
      <button className="cta-stop">STOP</button>
    </div>
    <p className="muted">Notes from 21st October</p>
    <div className="nav-placeholder" />
  </div>
)

export default LiveSession
