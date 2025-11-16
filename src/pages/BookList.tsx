import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types';
import { getBooks, saveBook, getTotalMinutesForBook, getNotesForBook, getLastUpdateForBook } from '../utils/storage';
import { Navigation } from '../components/Navigation';
import styles from './BookList.module.css';

export const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const loadedBooks = getBooks();
    
    // Sort books by most recently updated (based on last reading session)
    const sortedBooks = loadedBooks.sort((a, b) => {
      const lastUpdateA = getLastUpdateForBook(a.id);
      const lastUpdateB = getLastUpdateForBook(b.id);
      
      // Books with no updates go to the end
      if (!lastUpdateA && !lastUpdateB) return 0;
      if (!lastUpdateA) return 1;
      if (!lastUpdateB) return -1;
      
      // Most recent first
      return new Date(lastUpdateB).getTime() - new Date(lastUpdateA).getTime();
    });
    
    setBooks(sortedBooks);
  };

  const handleAddBook = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewBookTitle('');
  };

  const handleSubmitBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookTitle.trim()) {
      const newBook: Book = {
        id: Date.now().toString(),
        title: newBookTitle.trim(),
        createdAt: new Date().toISOString(),
      };
      saveBook(newBook);
      loadBooks();
      handleCloseModal();
    }
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''} logged`;
    }
    return `${mins} minute${mins !== 1 ? 's' : ''} logged`;
  };

  const formatLastUpdate = (dateString: string | null): string => {
    if (!dateString) return 'No reading sessions yet';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Last update today';
    if (diffDays === 1) return 'Last update yesterday';
    return `Last update ${diffDays} days ago`;
  };

  return (
    <div className={styles.bookList}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>
          <span className={styles.bold}>five pages</span> or <span className={styles.bold}>five minutes</span>
        </p>
      </div>

      <p className={styles.sectionTitle}>Your books</p>

      {books.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>Add your first books</p>
        </div>
      ) : (
        <div className={styles.bookListContainer}>
          <div className={styles.bookListScroll}>
            {books.map((book, index) => {
              const totalMinutes = getTotalMinutesForBook(book.id);
              const notesCount = getNotesForBook(book.id).length;
              const lastUpdate = getLastUpdateForBook(book.id);

              return (
                <div key={book.id}>
                  {index > 0 && <div className={styles.divider} />}
                  <button className={styles.bookItem} onClick={() => handleBookClick(book.id)}>
                    <div className={styles.bookCover} />
                    <div className={styles.bookInfo}>
                      <h2 className={styles.bookTitle}>{book.title}</h2>
                      <div className={styles.bookStats}>
                        {totalMinutes > 0 && <div>{formatDuration(totalMinutes)}</div>}
                        {notesCount > 0 && <div>{notesCount} note{notesCount !== 1 ? 's' : ''} made</div>}
                        <div>{formatLastUpdate(lastUpdate)}</div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Navigation showBack={true} showAdd={true} onAdd={handleAddBook} backTo="/" />

      {showAddModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add a new book</h2>
            <form onSubmit={handleSubmitBook}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="bookTitle">
                  Title
                </label>
                <input
                  id="bookTitle"
                  type="text"
                  className={styles.input}
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  autoFocus
                  placeholder="Enter book title"
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={!newBookTitle.trim()}>
                Add book
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
