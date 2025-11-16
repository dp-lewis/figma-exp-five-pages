import React from 'react'

const notes = [
  'Old Major inspires the animals with a dream of a fair world.',
  'Napoleon begins to consolidate power quietly.',
  'Napoleon and the pigs slowly change the commandments.',
]

const BookDetail: React.FC = () => (
  <div className="screen screen-detail">
    <div className="header-bar" />
    <div className="detail-meta">
      <h2>Animal Farm</h2>
      <p>1 hour 30 minutes logged</p>
      <p>20 notes made</p>
      <p className="muted">Last update 3 days ago</p>
    </div>
    <div className="notes-list">
      <h3>Recent notes</h3>
      {notes.map((note) => (
        <p className="note" key={note}>
          {note}
        </p>
      ))}
    </div>
    <div className="nav-placeholder" />
  </div>
)

export default BookDetail
