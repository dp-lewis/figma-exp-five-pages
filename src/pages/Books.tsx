import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadBooks, addBook } from '../utils/storage'
import { Book } from '../types/index'
import Navigation from '../components/Navigation'
import './Books.module.css'

export default function Books() {
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])
  const [showModal, setShowModal] = useState(false)
  const [bookTitle, setBookTitle] = useState('')

  useEffect(() => {
    const loadedBooks = loadBooks()
    setBooks(loadedBooks)
  }, [])

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (bookTitle.trim()) {
      addBook(bookTitle)
      const loadedBooks = loadBooks()
      setBooks(loadedBooks)
      setBookTitle('')
      setShowModal(false)
    }
  }

  return (
    <div className="books-container">
      <header className="books-header">
        <h1 className="books-title">
          <strong>five pages</strong> or <strong>five minutes</strong>
        </h1>
      </header>

      <div className="books-content">
        <h2 className="books-section-title">Your books</h2>

        {books.length === 0 ? (
          <div className="books-empty-state">
            <p>Add your first books</p>
          </div>
        ) : (
          <div className="books-list">
            {books.map((book) => (
              <div 
                key={book.id}
                className="books-item"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                {book.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <Navigation onAddClick={() => setShowModal(true)} />

      {showModal && (
        <div className="books-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="books-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Book</h3>
            <form onSubmit={handleAddBook}>
              <input
                type="text"
                placeholder="Book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                autoFocus
              />
              <button type="submit">Add Book</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
