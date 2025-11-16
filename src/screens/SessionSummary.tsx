import React from 'react'

const SessionSummary: React.FC = () => (
  <div className="screen screen-summary">
    <div className="header-bar" />
    <h2>Notes from this session</h2>
    <div className="note-area">
      <p>Old Major gathers everyone to speak about a world without humans.</p>
      <button className="cta">Add notes</button>
    </div>
    <div className="nav-placeholder" />
  </div>
)

export default SessionSummary
