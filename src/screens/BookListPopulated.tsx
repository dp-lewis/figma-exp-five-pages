import React from 'react'

const books = [
  { title: 'The Midnight Library', author: 'Matt Haig' },
  { title: 'Atomic Habits', author: 'James Clear' },
  { title: 'The Overstory', author: 'Richard Powers' },
]

const BookListPopulated: React.FC = () => (
  <div className="screen screen-populated">
    <div className="header-bar" />
    <h2>Your books</h2>
    <div className="book-stack">
      {books.map((book) => (
        <div className="book-card" key={book.title}>
          <p className="book-title">{book.title}</p>
          <p className="book-author">{book.author}</p>
        </div>
      ))}
    </div>
    <div className="nav-placeholder" />
  </div>
)

export default BookListPopulated
