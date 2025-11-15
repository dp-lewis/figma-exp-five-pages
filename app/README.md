# App Structure

## Directories

- **app/** - Main application code
  - **routes/** - Route components (file-based routing)
  - **components/** - Reusable React components
  - **styles/** - CSS Module files and global styles
  - **utils/** - Utility functions and helpers
  - **root.tsx** - Root layout component
  - **routes.ts** - Route configuration
  - **entry.client.tsx** - Client entry point
  - **entry.server.tsx** - Server entry point

## Key Files

- **react-router.config.ts** - React Router configuration
- **vite.config.ts** - Vite bundler configuration
- **tsconfig.json** - TypeScript configuration

## Development

```bash
npm run dev    # Start development server on port 3000
npm run build  # Build for production
npm run start  # Start production server
```

## Routing

This app uses React Router v7 (formerly Remix) with file-based routing. Routes are defined in `app/routes/` directory.

## Styling

CSS Modules are used for component-specific styles. Design tokens will be defined in `app/styles/tokens.css`.
