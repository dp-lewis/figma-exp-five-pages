# Five Pages or Five Minutes - Prototype Plan

## Overview
Reading tracking app built with Vite + React + TypeScript that helps users commit to reading 5 pages or 5 minutes at a time.

## Tech Stack
- **Framework**: Vite + React with TypeScript (client-side only)
- **Data Storage**: localStorage for simplicity (no database/ORM)
- **Routing**: React Router (client-side)
- **Styling**: CSS Modules with design tokens
- **UI**: React components matching Figma designs
- **Layout**: Mobile-only (393×852 viewport) - desktop implementation deferred

## User Journey
1. Welcome screen with app tagline
2. View book library (empty or populated)
3. Add new books
4. View book details with reading stats and notes
5. Start timed reading session (5:00 countdown/countup)
6. Stop session and add notes
7. View accumulated reading history per book

## Implementation Plan

### Phase 1: Foundation
1. **Set up Vite + React project structure**
   - Initialize Vite app with React + TypeScript
   - Install React Router for client-side routing
   - Configure src folder structure (pages, components, utils, types)
   - Set up CSS Modules

2. **Create data models and storage utilities**
   - Types: Book, ReadingSession, Note
   - localStorage helper functions (save/load/update)
   - In-memory state management with React Context or simple hooks

### Phase 2: Core Screens
3. **Build initial/welcome screen** (Frame 1:2)
   - Hero message display
   - Navigation to main app

4. **Build empty state book listing page** (Frame 1:43)
   - Header component
   - "Add your first books" empty state
   - Bottom navigation

5. **Implement add book modal/form** (Frame 1:110)
   - Title input field
   - Form submission with React state
   - Save to localStorage

6. **Build populated book listing page** (Frame 1:32)
   - BookListing component with dividers
   - Load books from localStorage
   - Clickable book items

7. **Create book detail page with notes** (Frame 4:231)
   - Display book title and stats
   - Show notes organized by date
   - Calculate reading session stats from localStorage data

### Phase 3: Reading Session Flow
8. **Implement reading session timer** (Frame 9:449)
   - 5:00 countdown timer (then count up)
   - STOP button functionality
   - Client-side React state management

9. **Create session completion and notes form** (Frame 10:488)
   - Session summary display
   - Notes textarea input
   - Save session + notes to localStorage

### Phase 4: Polish
10. **Build reusable Navigation component**
    - Bottom navigation bar
    - Route navigation between sections

11. **Style all screens to match Figma**
    - **Design tokens** for colors, typography, spacing
    - CSS Modules for component styles
    - **Mobile-only layout**: 393×852 viewport (fixed width)
    - Rounded rectangles, proper spacing
    - No responsive breakpoints needed for prototype

12. **Add data aggregation and stats**
    - Total time logged per book
    - Notes count
    - Last update date
    - Display in book detail view

13. **Test complete user journey**
    - End-to-end flow verification
    - Data persistence validation
    - User experience review

## Design System
Design tokens will include:
- Color palette (backgrounds, text, accents)
- Typography scale (headings, body, labels)
- Spacing system (margins, padding, gaps)
- Border radius values
- Component-specific tokens

## Icon Handling
- All icons should be handled as **SVG components**
- Create reusable SVG icon components (e.g., `IconArrowLeft.tsx`, `IconPlus.tsx`)
- Style icons with CSS and accept color/size props for flexibility

## Data Storage (localStorage)
Simple JSON objects stored in localStorage:
```typescript
books: Book[] = [
  { id: string, title: string, createdAt: Date }
]

readingSessions: ReadingSession[] = [
  { id: string, bookId: string, duration: number, createdAt: Date }
]

notes: Note[] = [
  { id: string, sessionId: string, content: string, createdAt: Date }
]
```

Helper functions:
- `loadBooks()`, `saveBooks(books)`, `addBook(book)`
- `loadSessions()`, `saveSessions(sessions)`, `addSession(session)`
- `loadNotes()`, `saveNotes(notes)`, `addNote(note)`

## Success Criteria
- All 7 screens implemented and functional
- Complete reading session flow works end-to-end
- Data persists between sessions
- UI matches Figma designs
- **Mobile-only layout (393×852)** - centered on larger screens
- Desktop/responsive layouts deferred to future iteration
