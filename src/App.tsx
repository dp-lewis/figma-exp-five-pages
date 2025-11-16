import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { BookList } from './pages/BookList';
import { BookDetail } from './pages/BookDetail';
import { ReadingSession } from './pages/ReadingSession';
import { SessionComplete } from './pages/SessionComplete';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/session/:bookId" element={<ReadingSession />} />
          <Route path="/session/:bookId/complete" element={<SessionComplete />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
