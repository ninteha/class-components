# Pokemon Search App

A React class components application that allows users to search for Pokemon using the PokeAPI.

## Features

- Search Pokemon by name
- Display Pokemon details
- Error handling with Error Boundaries
- Loading states
- Responsive design

## Setup

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run dev
```

1. Open [http://localhost:5173](http://localhost:5173) in your browser

## Testing

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Watch mode for development:

```bash
npm run test:watch
```

## Code Quality

Run linting:

```bash
npm run lint
```

Format code:

```bash
npm run format:fix
```

## Project Structure

- `src/components/` - React components
  - `error-boundary.tsx` - Error handling component
  - `pokemon-item.tsx` - Individual Pokemon display
  - `results.tsx` - Search results display
  - `search-bar.tsx` - Search input component
- `src/services/` - API integration
- `src/types/` - TypeScript type definitions
- `src/__tests__/` - Test files

## Error Handling

The application includes comprehensive error handling:

- API errors are displayed to the user
- UI errors are caught by ErrorBoundary
- Console logging for debugging
- Fallback UI for recovery

## Contributing

1. Fork the repository
1. Create your feature branch
1. Commit your changes
1. Push to the branch
1. Create a Pull Request
