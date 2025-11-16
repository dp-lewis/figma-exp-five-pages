# Design System Integration Rules

## Project Overview
- **Framework**: React 19
- **Language**: TypeScript 5
- **Build Tool**: Vite 7
- **Styling**: CSS (ready for design tokens)

## Design System Structure

### 1. Token Definitions
**Location**: `src/tokens/` (to be created)
**Format**: TypeScript/CSS variables

```typescript
// src/tokens/colors.ts
export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  // ... tokens from Figma
}
```

### 2. Component Library
**Location**: `src/components/`
**Architecture**: Functional React components with TypeScript
**Pattern**: 
```typescript
// src/components/Button/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{children}</button>
}
```

### 3. Frameworks & Libraries
- **UI Framework**: React with TypeScript
- **Styling**: CSS with potential for CSS Modules or Styled Components
- **Build System**: Vite with hot module replacement

### 4. Asset Management
**Location**: `public/` for static assets, `src/assets/` for imported assets
**Pattern**:
```typescript
import logo from './assets/logo.svg'
// or
<img src="/images/hero.png" alt="Hero" />
```

### 5. Icon System
**Location**: `src/components/icons/` (to be created)
**Pattern**: SVG components or icon library (to be determined from Figma)

### 6. Styling Approach
**Current**: Plain CSS with modular approach
**Files**:
- `src/index.css` - Global styles and resets
- `src/App.css` - Component-specific styles
**Pattern**: Component-adjacent CSS files

### 7. Project Structure
```
figma-exp-five-pages/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components (5 pages)
│   ├── tokens/         # Design tokens from Figma
│   ├── assets/         # Images, fonts, etc.
│   ├── App.tsx         # Main app component
│   ├── App.css         # App styles
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies
```

## Figma Integration Guidelines

### Design Tokens
1. Extract colors, typography, spacing from Figma variables
2. Create TypeScript constants in `src/tokens/`
3. Use CSS variables for runtime theming

### Components
1. Match Figma component names to React component names
2. Use TypeScript interfaces for props matching Figma variants
3. Maintain 1:1 mapping between Figma components and React components where possible

### Responsive Design
- Use CSS media queries
- Follow mobile-first approach
- Breakpoints to be defined based on Figma designs

### Next Steps
- Connect to Figma to extract design tokens
- Identify the 5 pages from Figma
- Create page components and routing
- Build reusable component library
