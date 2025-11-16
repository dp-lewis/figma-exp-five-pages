import React from 'react'

const BookListEmpty: React.FC = () => (
  <div className="screen screen-empty">
    <div className="header-bar" />
    <h2>Your books</h2>
    <div className="empty-card">
      <p>Add your first books</p>
    </div>
    <div className="nav-placeholder" />
  </div>
)

export default BookListEmpty
