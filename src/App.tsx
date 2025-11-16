import { useMemo, useState } from 'react'
import './App.css'
import InitialScreen from './screens/InitialScreen'
import BookListEmpty from './screens/BookListEmpty'
import AddBook from './screens/AddBook'
import BookListPopulated from './screens/BookListPopulated'
import BookDetail from './screens/BookDetail'
import LiveSession from './screens/LiveSession'
import SessionSummary from './screens/SessionSummary'

const screenshotOrder = [
  { id: 'initial', label: 'Initial screen', Element: InitialScreen },
  { id: 'empty', label: 'Book list empty', Element: BookListEmpty },
  { id: 'add', label: 'Add book', Element: AddBook },
  { id: 'populated', label: 'Book list filled', Element: BookListPopulated },
  { id: 'detail', label: 'Book detail', Element: BookDetail },
  { id: 'live', label: 'Live session', Element: LiveSession },
  { id: 'summary', label: 'Session summary', Element: SessionSummary },
]

function App() {
  const [activeScreenId, setActiveScreenId] = useState(screenshotOrder[0].id)

  const ActiveScreen = useMemo(() => {
    const entry = screenshotOrder.find((screen) => screen.id === activeScreenId)
    return entry?.Element ?? InitialScreen
  }, [activeScreenId])

  return (
    <div className="app">
      <aside className="sidebar">
        <p className="brand">five pages</p>
        <p className="brand-sub">or five minutes</p>
        <div className="nav-list">
          {screenshotOrder.map((screen) => (
            <button
              key={screen.id}
              className={`nav-button ${screen.id === activeScreenId ? 'is-active' : ''}`}
              onClick={() => setActiveScreenId(screen.id)}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </aside>
      <section className="screen-host">
        <div className="phone-frame">
          <ActiveScreen />
        </div>
      </section>
    </div>
  )
}

export default App
